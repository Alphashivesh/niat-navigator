'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  PARTNER_UNIVERSITIES,
  resolveUniversity,
  normalizeCollegeQuery,
  AdmissionStep,
  CollegeCategory,
} from '@/lib/universities';
import {
  CheckCircle2,
  Circle,
  Send,
  BellRing,
  Bot,
  Users,
  AlertTriangle,
  Sparkles,
  Search,
  ChevronDown,
  PlusCircle,
} from 'lucide-react';

interface StudentRecord {
  id: string;
  student_name: string;
  parent_phone: string;
  parent_email?: string;
  preferred_language: string;
  university_id: string;
  niat_steps: AdmissionStep[];
  university_steps: AdmissionStep[];
}

interface ReminderLog {
  id: string;
  language: string;
  message_preview: string;
  delivery_status: string;
}

const CATEGORIES: ('All' | CollegeCategory)[] = [
  'All',
  'NIAT Partner',
  'Public / Govt',
  'IIT',
  'NIT',
  'IIIT',
  'GFTI',
  'Private',
];

function renderInlineBold(text: string): React.ReactNode {
  const cleaned = text.replace(/^#{1,6}\s*/gm, '');
  const segments = cleaned.split(/<br\s*\/?>/gi);

  return segments.map((segment, segIdx) => {
    const parts = segment.split(/(\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={segIdx}>
        {segIdx > 0 && <br />}
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return (
              <strong key={idx} className="font-semibold text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return (
            <React.Fragment key={idx}>
              {part.replace(/\*\*/g, '')}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  });
}

function FormattedMessage({ text }: { text: string }) {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Group Markdown table lines
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim().startsWith('|') &&
        lines[i].trim().endsWith('|')
      ) {
        tableLines.push(lines[i].trim());
        i++;
      }

      const dataRows = tableLines.filter(
        (row) => !/^\|[\s:-]+\|/.test(row.replace(/\|/g, '|').trim()) || !row.replace(/[\s|:-]/g, '').length === false
      ).filter((row) => row.replace(/[\s|:-]/g, '').length > 0);

      if (dataRows.length > 0) {
        const parseCells = (row: string) =>
          row
            .slice(1, -1)
            .split('|')
            .map((cell) => cell.trim());

        const headers = parseCells(dataRows[0]);
        const bodyRows = dataRows.slice(1).map(parseCells);

        blocks.push(
          <div key={`tbl-${i}`} className="my-2 overflow-x-auto rounded-lg border border-slate-700">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead className="bg-slate-900 text-amber-300">
                <tr>
                  {headers.map((h, hi) => (
                    <th key={hi} className="px-2.5 py-1.5 font-semibold border-b border-slate-700">
                      {renderInlineBold(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/60">
                {bodyRows.map((cells, ri) => (
                  <tr key={ri}>
                    {cells.map((c, ci) => (
                      <td key={ci} className="px-2.5 py-1.5 align-top text-slate-200">
                        {renderInlineBold(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Horizontal divider
    if (trimmed === '---' || trimmed === '***') {
      blocks.push(<hr key={`hr-${i}`} className="border-slate-700 my-2" />);
      i++;
      continue;
    }

    // Markdown headings (###, ##, #) -> Clean Bold Heading
    if (/^#{1,6}\s+/.test(trimmed)) {
      const headingText = trimmed.replace(/^#{1,6}\s+/, '');
      blocks.push(
        <div key={`h-${i}`} className="font-bold text-amber-300 mt-2 mb-0.5">
          {renderInlineBold(headingText)}
        </div>
      );
      i++;
      continue;
    }

    // Empty line spacing
    if (trimmed === '') {
      blocks.push(<div key={`sp-${i}`} className="h-1.5" />);
      i++;
      continue;
    }

    // Standard paragraph / list line
    blocks.push(
      <div key={`p-${i}`} className="leading-relaxed">
        {renderInlineBold(line)}
      </div>
    );
    i++;
  }

  return <div className="space-y-0.5">{blocks}</div>;
}

export default function DualAdmissionNavigator() {
  const [activeTab, setActiveTab] = useState<'student' | 'growth'>('student');
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [logs, setLogs] = useState<ReminderLog[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  const [studentName, setStudentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [universityId, setUniversityId] = useState('chaitanya_hyd');
  const [preferredLanguage, setPreferredLanguage] = useState('Telugu');
  const [creating, setCreating] = useState(false);

  // Searchable College Combobox + "Other" Mode State
  const [collegeSearch, setCollegeSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | CollegeCategory>('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOtherCollege, setIsOtherCollege] = useState(false);
  const [customCollegeName, setCustomCollegeName] = useState('');
  const [customCollegeType, setCustomCollegeType] = useState<'Public / Govt' | 'Private'>('Private');
  const pickerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { role: 'user' | 'agent'; text: string; tools?: string[] }[]
  >([]);
  const [agentLoading, setAgentLoading] = useState(false);

  const loadData = async () => {
    const res = await fetch('/api/students');
    const data = await res.json();
    const fetchedStudents: StudentRecord[] = data.students || [];
    setStudents(fetchedStudents);
    setLogs(data.logs || []);
    if (!selectedId && fetchedStudents.length > 0) {
      setSelectedId(fetchedStudents[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredColleges = useMemo(() => {
    const q = normalizeCollegeQuery(collegeSearch);
    return PARTNER_UNIVERSITIES.filter((u) => {
      const matchesCat = categoryFilter === 'All' || u.category === categoryFilter;
      if (!matchesCat) return false;
      if (!q) return true;
      const haystack = normalizeCollegeQuery(
        `${u.name} ${u.city} ${u.category} ${u.searchAliases || ''}`
      );
      return haystack.includes(q);
    });
  }, [collegeSearch, categoryFilter]);

  const effectiveUniversityId = isOtherCollege
    ? `custom:${customCollegeType}:${customCollegeName.trim() || 'Custom College'}`
    : universityId;

  const selectedCollege = useMemo(
    () => resolveUniversity(effectiveUniversityId),
    [effectiveUniversityId]
  );

  const activeStudent = students.find((s) => s.id === selectedId);
  const activeUni = resolveUniversity(activeStudent?.university_id);

  const activateOtherCollegeMode = (prefillName = '') => {
    setIsOtherCollege(true);
    setCustomCollegeName(prefillName);
    setDropdownOpen(false);
    setCollegeSearch('');
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !parentPhone) return;
    if (isOtherCollege && !customCollegeName.trim()) return;

    setCreating(true);
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName,
        parentPhone,
        parentEmail,
        universityId: effectiveUniversityId,
        preferredLanguage,
      }),
    });
    const data = await res.json();
    setCreating(false);
    setStudentName('');
    setParentPhone('');
    setParentEmail('');
    setCustomCollegeName('');
    setIsOtherCollege(false);
    await loadData();
    if (data.student?.id) setSelectedId(data.student.id);
  };

  const toggleStep = async (owner: 'NIAT' | 'UNIVERSITY', stepId: string) => {
    if (!activeStudent) return;
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'TOGGLE_STEP',
        studentId: activeStudent.id,
        owner,
        stepId,
      }),
    });
    await loadData();
  };

  const askAgent = async (customPrompt?: string) => {
    const promptToSend = customPrompt || query;
    if (!promptToSend || !activeStudent) return;
    setQuery('');
    setChatHistory((prev) => [...prev, { role: 'user', text: promptToSend }]);
    setAgentLoading(true);

    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: activeStudent.id,
        userMessage: promptToSend,
        preferredLanguage: activeStudent.preferred_language,
      }),
    });
    const data = await res.json();
    setAgentLoading(false);
    setChatHistory((prev) => [
      ...prev,
      { role: 'agent', text: data.reply, tools: data.toolTrace },
    ]);
    await loadData();
  };

  const calcPct = (steps: AdmissionStep[] = []) =>
    steps.length
      ? Math.round(
          (steps.filter((s) => s.completed).length / steps.length) * 100
        )
      : 0;

  const badgeStyle = (cat: CollegeCategory) => {
    switch (cat) {
      case 'NIAT Partner':
        return 'bg-amber-950 text-amber-300 border-amber-700';
      case 'Public / Govt':
        return 'bg-emerald-950 text-emerald-300 border-emerald-700';
      case 'IIT':
        return 'bg-purple-950 text-purple-300 border-purple-700';
      case 'NIT':
        return 'bg-sky-950 text-sky-300 border-sky-700';
      case 'IIIT':
        return 'bg-indigo-950 text-indigo-300 border-indigo-700';
      case 'GFTI':
        return 'bg-teal-950 text-teal-300 border-teal-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              NIAT Bottom-of-Funnel System (Track B)
            </span>
            <h1 className="text-2xl font-bold mt-1">
              Dual-Admission Navigator & Parent Concierge
            </h1>
          </div>
          <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'student'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Student & Parent View
            </button>
            <button
              onClick={() => setActiveTab('growth')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'growth'
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Growth Manager Ops ({students.length})
            </button>
          </div>
        </div>

        {activeTab === 'student' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <form
                onSubmit={handleCreateStudent}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3"
              >
                <h2 className="font-semibold text-base text-amber-400">
                  + Onboard Post-NAT Lead
                </h2>
                <input
                  required
                  placeholder="Student Full Name (e.g. Karthik Reddy)"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  required
                  placeholder="Parent WhatsApp (+91...)"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                />
                <input
                  placeholder="Parent Email (for n8n demo alert)"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                />

                {/* Searchable A-Z College Selector + Always-Visible "Other" Button */}
                <div ref={pickerRef} className="relative space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-400 block">
                    Target University / College (A–Z • {PARTNER_UNIVERSITIES.length} Listed + Other)
                  </label>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="w-full bg-slate-950 border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-2 text-left text-sm flex items-center justify-between gap-2"
                  >
                    <div className="truncate">
                      <span className="font-medium text-slate-100">
                        {isOtherCollege
                          ? customCollegeName.trim() || 'Other College (Type Name Below)'
                          : selectedCollege.name}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        {isOtherCollege
                          ? `Custom Institution • ${customCollegeType}`
                          : `${selectedCollege.city} • ${selectedCollege.category}`}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-30 left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2.5 space-y-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          autoFocus
                          value={collegeSearch}
                          onChange={(e) => setCollegeSearch(e.target.value)}
                          placeholder="Search Jadavpur, IIT, NIT, IIIT, GFTI, NIAT, city..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition ${
                              categoryFilter === cat
                                ? 'bg-amber-500 text-slate-950 border-amber-500'
                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      <div className="max-h-48 overflow-y-auto divide-y divide-slate-800/70">
                        {filteredColleges.length === 0 ? (
                          <div className="py-4 px-2 text-center text-xs text-slate-400">
                            No exact match in the A–Z list for &ldquo;{collegeSearch}&rdquo;.
                          </div>
                        ) : (
                          filteredColleges.map((u) => (
                            <button
                              key={u.id}
                              type="button"
                              onClick={() => {
                                setIsOtherCollege(false);
                                setUniversityId(u.id);
                                setDropdownOpen(false);
                                setCollegeSearch('');
                              }}
                              className={`w-full text-left px-2.5 py-2 hover:bg-slate-800 transition flex items-start justify-between gap-2 ${
                                !isOtherCollege && u.id === universityId ? 'bg-slate-800/80' : ''
                              }`}
                            >
                              <div>
                                <div className="text-xs font-medium text-slate-100">
                                  {u.name}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {u.city}
                                </div>
                              </div>
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded border shrink-0 ${badgeStyle(
                                  u.category
                                )}`}
                              >
                                {u.category}
                              </span>
                            </button>
                          ))
                        )}
                      </div>

                      <div className="pt-1.5 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => activateOtherCollegeMode(collegeSearch.trim())}
                          className="w-full px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/50 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                        >
                          <PlusCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {collegeSearch.trim()
                              ? `Other (Not Found) — Use "${collegeSearch.trim()}"`
                              : 'Other (College Not Found) — Enter College Name'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {isOtherCollege && (
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-amber-500/50 space-y-2 mt-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-amber-400">
                          Enter Your College / University Name
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsOtherCollege(false)}
                          className="text-[10px] text-slate-400 hover:text-white underline"
                        >
                          Back to A–Z list
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        autoFocus
                        value={customCollegeName}
                        onChange={(e) => setCustomCollegeName(e.target.value)}
                        placeholder="Type exact college name..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                      />
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => setCustomCollegeType('Public / Govt')}
                          className={`flex-1 py-1 rounded text-[11px] font-medium border transition ${
                            customCollegeType === 'Public / Govt'
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          Public / Govt
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomCollegeType('Private')}
                          className={`flex-1 py-1 rounded text-[11px] font-medium border transition ${
                            customCollegeType === 'Private'
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          Private College
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="Telugu">Parent Language: Telugu</option>
                  <option value="Hindi">Parent Language: Hindi</option>
                  <option value="Tamil">Parent Language: Tamil</option>
                  <option value="Kannada">Parent Language: Kannada</option>
                  <option value="English">Parent Language: English</option>
                </select>
                <button
                  disabled={creating}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold py-2 rounded-lg text-sm transition"
                >
                  {creating
                    ? 'Generating Dual Tracker...'
                    : 'Generate Dual-Track Navigator'}
                </button>
              </form>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
                <h3 className="text-xs font-semibold uppercase text-slate-400">
                  Active Leads in Funnel
                </h3>
                {students.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedId(s.id);
                      setChatHistory([]);
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition ${
                      s.id === selectedId
                        ? 'bg-slate-800 border-amber-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="font-medium">{s.student_name}</div>
                    <div className="text-xs text-slate-400">
                      {s.preferred_language} • NIAT {calcPct(s.niat_steps)}% |
                      Univ {calcPct(s.university_steps)}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {activeStudent ? (
                <>
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${badgeStyle(
                            activeUni.category
                          )}`}
                        >
                          {activeUni.category}
                        </span>
                        <span className="text-xs text-amber-400 font-medium">
                          {activeUni.accreditation}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold mt-1">
                        {activeStudent.student_name} → {activeUni.name}
                      </h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Track: {activeUni.counsellingTrack}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">
                        University Seat Lock Deadline
                      </div>
                      <div className="text-base font-bold text-rose-400">
                        {activeUni.deadlineDate}
                      </div>
                      <div className="text-xs text-slate-400">
                        Parent Lang: {activeStudent.preferred_language}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-sky-400">
                          Track 1: NIAT Enrolment
                        </span>
                        <span className="text-xs font-bold bg-sky-950 text-sky-300 px-2 py-1 rounded">
                          {calcPct(activeStudent.niat_steps)}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        {activeStudent.niat_steps.map((step) => (
                          <div
                            key={step.id}
                            onClick={() => toggleStep('NIAT', step.id)}
                            className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 cursor-pointer flex gap-2.5 items-start"
                          >
                            {step.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div
                                className={`text-xs font-medium ${
                                  step.completed
                                    ? 'line-through text-slate-500'
                                    : 'text-slate-200'
                                }`}
                              >
                                {step.title}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                Doc: {step.requiredDoc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-sm text-amber-400">
                          Track 2: University / Counselling Admission
                        </span>
                        <span className="text-xs font-bold bg-amber-950 text-amber-300 px-2 py-1 rounded">
                          {calcPct(activeStudent.university_steps)}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        {activeStudent.university_steps.map((step) => (
                          <div
                            key={step.id}
                            onClick={() => toggleStep('UNIVERSITY', step.id)}
                            className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-600 cursor-pointer flex gap-2.5 items-start"
                          >
                            {step.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div
                                className={`text-xs font-medium ${
                                  step.completed
                                    ? 'line-through text-slate-500'
                                    : 'text-slate-200'
                                }`}
                              >
                                {step.title}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                Doc: {step.requiredDoc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-amber-400" />
                        <h3 className="font-semibold text-sm">
                          AI Dual-Admission Agent (Live DB + Rules + n8n Nudge)
                        </h3>
                      </div>
                      <button
                        onClick={() =>
                          askAgent(
                            `Audit my pending NIAT and ${activeUni.name} steps, verify my eligibility, and send a reminder in ${activeStudent.preferred_language} to my parent.`
                          )
                        }
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium"
                      >
                        <BellRing className="w-3.5 h-3.5" />
                        Trigger {activeStudent.preferred_language} Parent Nudge
                      </button>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 h-64 overflow-y-auto space-y-3 text-sm">
                      {chatHistory.length === 0 && (
                        <p className="text-slate-500 text-xs">
                          Ask anything about pending documents, UGC/WBJEE/JoSAA
                          requirements, or click the green button to trigger a
                          tool-calling parent reminder.
                        </p>
                      )}
                      {chatHistory.map((m, idx) => (
                        <div
                          key={idx}
                          className={
                            m.role === 'user' ? 'text-right' : 'text-left'
                          }
                        >
                          {m.tools && m.tools.length > 0 && (
                            <div className="inline-flex flex-wrap gap-1 mb-1">
                              {m.tools.map((t, ti) => (
                                <span
                                  key={ti}
                                  className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-full"
                                >
                                  ⚡ {t}
                                </span>
                              ))}
                            </div>
                          )}
                          <div
                            className={`inline-block max-w-[90%] rounded-lg px-3.5 py-2.5 text-xs text-left ${
                              m.role === 'user'
                                ? 'bg-amber-500 text-slate-950 font-medium'
                                : 'bg-slate-800/90 text-slate-100'
                            }`}
                          >
                            {m.role === 'user' ? (
                              m.text
                            ) : (
                              <FormattedMessage text={m.text} />
                            )}
                          </div>
                        </div>
                      ))}
                      {agentLoading && (
                        <div className="text-xs text-amber-400 animate-pulse">
                          Agent calling tools & verifying campus rules...
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && askAgent()}
                        placeholder={`Ask in English or ${activeStudent.preferred_language} (e.g. What documents are left for the university?)`}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => askAgent()}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-1"
                      >
                        <Send className="w-4 h-4" /> Ask
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center text-slate-400 text-sm">
                  Create your first post-NAT lead on the left to initialize both
                  admission tracks.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-400" /> Post-Counselling
                  Cohort
                </div>
                <div className="text-3xl font-bold mt-2">{students.length}</div>
                <div className="text-xs text-slate-500 mt-1">
                  Tracked across NIAT + Partner Universities
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" /> Dual-Track
                  Completed (100% Both)
                </div>
                <div className="text-3xl font-bold mt-2 text-emerald-400">
                  {
                    students.filter(
                      (s) =>
                        calcPct(s.niat_steps) === 100 &&
                        calcPct(s.university_steps) === 100
                    ).length
                  }
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Target Experiment Lift: +8 percentage points
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Automated
                  n8n Nudges Sent
                </div>
                <div className="text-3xl font-bold mt-2 text-amber-400">
                  {logs.length}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Multi-lingual parent reminders dispatched
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-sm">
                Live n8n Automation & Parent Reminder Log
              </h3>
              {logs.length === 0 ? (
                <p className="text-xs text-slate-500">
                  No reminders dispatched yet. Trigger one from the Student &
                  Parent View.
                </p>
              ) : (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs flex justify-between gap-4"
                    >
                      <div>
                        <span className="font-semibold text-amber-400">
                          [{log.language}]
                        </span>{' '}
                        <span className="text-slate-200">
                          {log.message_preview}
                        </span>
                      </div>
                      <span className="text-emerald-400 shrink-0 font-mono">
                        {log.delivery_status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}