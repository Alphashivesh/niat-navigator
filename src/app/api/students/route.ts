import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  NIAT_CORE_STEPS,
  resolveUniversity,
  AdmissionStep,
} from '@/lib/universities';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data: students } = await supabase
    .from('navigator_students')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: logs } = await supabase
    .from('reminder_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(15);

  return NextResponse.json({ students: students || [], logs: logs || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.action === 'TOGGLE_STEP') {
    const { data: current } = await supabase
      .from('navigator_students')
      .select('*')
      .eq('id', body.studentId)
      .single();

    if (!current) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const field = body.owner === 'NIAT' ? 'niat_steps' : 'university_steps';
    const currentSteps = current[field] as AdmissionStep[];
    const updatedSteps = currentSteps.map((step) =>
      step.id === body.stepId ? { ...step, completed: !step.completed } : step
    );

    const { data: updated } = await supabase
      .from('navigator_students')
      .update({ [field]: updatedSteps })
      .eq('id', body.studentId)
      .select()
      .single();

    return NextResponse.json({ student: updated });
  }

  const uni = resolveUniversity(body.universityId);

  const niatSteps: AdmissionStep[] = NIAT_CORE_STEPS.map((s, idx) => ({
    ...s,
    completed: idx < 2,
  }));
  const universitySteps: AdmissionStep[] = uni.universitySpecificSteps.map(
    (s) => ({
      ...s,
      completed: false,
    })
  );

  const { data: created, error } = await supabase
    .from('navigator_students')
    .insert({
      student_name: body.studentName,
      parent_phone: body.parentPhone,
      parent_email: body.parentEmail || '',
      preferred_language: body.preferredLanguage || 'Telugu',
      university_id: uni.id,
      pcm_percentage: Number(body.pcmPercentage) || 82,
      passout_year: Number(body.passoutYear) || 2026,
      niat_steps: niatSteps,
      university_steps: universitySteps,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (process.env.N8N_WEBHOOK_URL) {
    await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'NEW_NAVIGATOR_ONBOARDED',
        studentName: created.student_name,
        parentPhone: created.parent_phone,
        parentEmail: created.parent_email,
        university: uni.name,
        category: uni.category,
        language: created.preferred_language,
      }),
    }).catch(() => null);
  }

  return NextResponse.json({ student: created });
}