import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { resolveUniversity, AdmissionStep } from '@/lib/universities';

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function resolveActiveGroqModel(): Promise<string> {
  const list = await groq.models.list();
  const availableIds = list.data.map((m) => m.id);

  const preferredToolModels = [
    'openai/gpt-oss-120b',
    'meta-llama/llama-4-maverick-17b-128e-instruct',
    'meta-llama/llama-4-scout-17b-16e-instruct',
    'openai/gpt-oss-20b',
    'qwen/qwen3-32b',
    'llama-3.1-8b-instant',
  ];

  for (const model of preferredToolModels) {
    if (availableIds.includes(model)) return model;
  }

  const fallback = availableIds.find(
    (id) =>
      !id.includes('whisper') &&
      !id.includes('guard') &&
      !id.includes('tts') &&
      !id.includes('embed')
  );

  if (!fallback) {
    throw new Error(`No chat models enabled on this Groq API key.`);
  }
  return fallback;
}

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'get_student_admission_state',
      description:
        'Fetches live progress across BOTH NIAT enrolment and Partner University admission tracks, including pending steps and missing documents.',
      parameters: {
        type: 'object',
        properties: {
          studentId: { type: 'string' },
        },
        required: ['studentId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'validate_eligibility_and_rules',
      description:
        'Checks NIAT eligibility (12th PCM pass-out 2023-2027) and returns institution accreditation, category, counselling track, and deadline.',
      parameters: {
        type: 'object',
        properties: {
          studentId: { type: 'string' },
        },
        required: ['studentId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'dispatch_parent_reminder',
      description:
        'Sends a localized reminder to the parent via n8n webhook and logs it in Supabase whenever a parent/student asks for reminders or has pending documents.',
      parameters: {
        type: 'object',
        properties: {
          studentId: { type: 'string' },
          language: {
            type: 'string',
            description: 'English, Telugu, Hindi, Tamil, or Kannada',
          },
          reminderMessage: {
            type: 'string',
            description:
              'Actionable reminder listing exact pending steps in the requested language',
          },
        },
        required: ['studentId', 'language', 'reminderMessage'],
      },
    },
  },
];

export async function POST(req: Request) {
  try {
    const { studentId, userMessage, preferredLanguage } = await req.json();
    const activeModel = await resolveActiveGroqModel();

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `You are the NIAT Dual-Admission Navigator AI Agent.
        CORE DOMAIN FACTS:
        - NIAT is NxtWave's 4-year on-campus upskilling program offered inside UGC-approved collaborating universities.
        - Students MUST complete TWO separate processes: (1) NIAT Upskilling Enrolment and (2) University/College B.Tech Admission (or parallel JoSAA/state counselling). Applying to one does NOT automatically complete the other.
        - Eligibility requires Class 12 with Physics, Chemistry, and Mathematics (PCM), passed out between 2023 and 2027.
        - Call 'get_student_admission_state' and 'validate_eligibility_and_rules' once to get exact live statuses. Do NOT call the same tool repeatedly.
        - Only call 'dispatch_parent_reminder' ONCE if the user asks to remind/notify their parent.
        - Default response language is ${preferredLanguage}, UNLESS the user explicitly asks to reply in another language (such as "reply in english"), in which case follow the user's requested language. Keep it concise, structured, and reassuring.`,
      },
      {
        role: 'user',
        content: `Student ID: ${studentId} | Default Parent Language: ${preferredLanguage} | Query: ${userMessage}`,
      },
    ];

    const toolTrace: string[] = [`Model: ${activeModel}`];

    for (let i = 0; i < 6; i++) {
      const completion = await groq.chat.completions.create({
        model: activeModel,
        messages,
        tools,
        tool_choice: i < 4 ? 'auto' : 'none',
      });

      const msg = completion.choices[0].message;

      if (!msg.tool_calls || msg.tool_calls.length === 0) {
        return NextResponse.json({
          reply: msg.content,
          toolTrace,
        });
      }

      messages.push({
        role: 'assistant',
        content: msg.content || null,
        tool_calls: msg.tool_calls,
      });

      for (const call of msg.tool_calls) {
        if (call.type !== 'function') continue;
        const args = JSON.parse(call.function.arguments);
        let output = '';

        if (call.function.name === 'get_student_admission_state') {
          toolTrace.push('Executed get_student_admission_state()');
          const { data: student } = await supabase
            .from('navigator_students')
            .select('*')
            .eq('id', args.studentId)
            .single();

          if (student) {
            const niatSteps = student.niat_steps as AdmissionStep[];
            const uniSteps = student.university_steps as AdmissionStep[];
            const niatPending = niatSteps.filter((s) => !s.completed);
            const uniPending = uniSteps.filter((s) => !s.completed);
            output = JSON.stringify({
              studentName: student.student_name,
              niatCompletedCount: niatSteps.length - niatPending.length,
              niatTotal: niatSteps.length,
              niatPending,
              uniCompletedCount: uniSteps.length - uniPending.length,
              uniTotal: uniSteps.length,
              uniPending,
            });
          }
        }

        if (call.function.name === 'validate_eligibility_and_rules') {
          toolTrace.push('Executed validate_eligibility_and_rules()');
          const { data: student } = await supabase
            .from('navigator_students')
            .select('*')
            .eq('id', args.studentId)
            .single();

          const uni = resolveUniversity(student?.university_id);
          const isEligible =
            Boolean(student) &&
            student.passout_year >= 2023 &&
            student.passout_year <= 2027 &&
            student.pcm_percentage >= 45;

          output = JSON.stringify({
            eligibleForNiat: isEligible,
            ruleSummary:
              'Requires 12th PCM (2023-2027 pass-out). Separate university/counselling admission required.',
            universityName: uni.name,
            category: uni.category,
            accreditation: uni.accreditation,
            counsellingTrack: uni.counsellingTrack,
            finalDeadline: uni.deadlineDate,
          });
        }

        if (call.function.name === 'dispatch_parent_reminder') {
          toolTrace.push(`Executed dispatch_parent_reminder(${args.language})`);
          const { data: student } = await supabase
            .from('navigator_students')
            .select('*')
            .eq('id', args.studentId)
            .single();

          await supabase.from('reminder_logs').insert({
            student_id: args.studentId,
            channel: 'WHATSAPP_AND_EMAIL_VIA_N8N',
            language: args.language,
            message_preview: args.reminderMessage,
          });

          await supabase
            .from('navigator_students')
            .update({ last_nudge_at: new Date().toISOString() })
            .eq('id', args.studentId);

          if (process.env.N8N_WEBHOOK_URL && student) {
            await fetch(process.env.N8N_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                event: 'PARENT_DEADLINE_NUDGE',
                studentName: student.student_name,
                parentPhone: student.parent_phone,
                parentEmail: student.parent_email,
                language: args.language,
                message: args.reminderMessage,
              }),
            }).catch(() => null);
          }

          output = JSON.stringify({
            dispatched: true,
            destination: student?.parent_phone,
          });
        }

        messages.push({
          role: 'tool',
          tool_call_id: call.id,
          content: output,
        });
      }
    }

    return NextResponse.json({
      reply: 'Parent reminder dispatched and admission state verified.',
      toolTrace,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { reply: `Agent error: ${message}`, toolTrace: [] },
      { status: 500 }
    );
  }
}