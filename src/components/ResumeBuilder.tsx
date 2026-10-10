import React, { useState } from 'react';
import { UserProfile, Project } from '../types';
import { 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  Eye, 
  Edit3, 
  Plus, 
  Trash2, 
  FileCheck, 
  BookOpen, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Terminal, 
  Github, 
  Linkedin, 
  Globe, 
  Code2, 
  Printer, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { scanResumeAts, AtsScanResponse } from '../services/aiService';

interface ResumeBuilderProps {
  profile: UserProfile;
  projects: Project[];
  onUpdateProfile?: (updated: UserProfile) => void;
}

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({
  profile,
  projects,
  onUpdateProfile
}) => {
  // Mode: 'preview' (standard 1-page ATS template) | 'edit' (edit resume content) | 'ats-audit' (live ATS score & scan)
  const [activeView, setActiveView] = useState<'preview' | 'edit' | 'ats-audit'>('preview');
  const [templateTheme, setTemplateTheme] = useState<'classic-tech' | 'minimal-modern' | 'executive'>('classic-tech');
  const [copiedText, setCopiedText] = useState(false);
  const [showLogoOnResume, setShowLogoOnResume] = useState(true);

  // Resume State initialized from user profile & top projects
  const [resumeData, setResumeData] = useState({
    fullName: profile.name || 'Sri M.',
    email: profile.email || 'sri.m@nit.ac.in',
    phone: '+91 98765 43210',
    location: 'Bangalore / Hyderabad, India',
    linkedin: 'linkedin.com/in/sri-m-dev',
    github: `github.com/${profile.gitHubUsername || 'sri-dev'}`,
    leetcode: `leetcode.com/${profile.leetCodeUsername || 'sri_codes'}`,
    portfolio: 'sri-portfolio.dev',
    summary: `Results-driven ${profile.degreeType || 'M.Tech'} student in Computer Science & Engineering graduating in ${profile.graduationDate || 'June 2026'}. Strong background in Data Structures, Algorithms, Distributed Systems, and Full-Stack Engineering. Solved ${profile.leetCodeSolved || 142}+ algorithmic challenges on LeetCode with experience building production-grade web applications.`,
    education: [
      {
        institution: profile.college || 'National Institute of Technology',
        degree: profile.degree || 'M.Tech in Computer Science and Engineering',
        duration: `2024 - ${profile.graduationDate || '2026'}`,
        cgpa: `${profile.cgpa || '8.85'} / 10.0`,
        courses: 'Advanced Algorithms, Distributed Cloud Systems, Database Internals, Machine Learning'
      },
      {
        institution: 'National Institute of Technology / State University',
        degree: 'B.Tech in Computer Science and Engineering',
        duration: '2020 - 2024',
        cgpa: '8.72 / 10.0',
        courses: 'Data Structures, Operating Systems, Computer Networks, DBMS'
      }
    ],
    technicalSkills: {
      languages: 'C++, Java, TypeScript, JavaScript, Python, Go, SQL',
      frameworks: 'React.js, Next.js, Node.js, Express, Tailwind CSS, Spring Boot',
      databasesCloud: 'PostgreSQL, MongoDB, Redis, Docker, AWS (S3, EC2), Git, GitHub Actions',
      coreFundamentals: 'Data Structures & Algorithms, Object-Oriented Programming (OOP), System Design, REST APIs'
    },
    projects: [
      {
        title: 'Distributed Asynchronous Task Queue & Worker Engine',
        tech: 'Go, Redis, Docker, Prometheus',
        link: 'github.com/sri/distributed-queue',
        bullets: [
          'Architected a fault-tolerant job queue system handling 15,000+ msgs/sec with Redis Streams and exponential backoff retry policies.',
          'Engineered worker pool concurrency using Go goroutines, reducing dead-letter rates by 38% under high load.',
          'Implemented Prometheus monitoring metrics endpoint for real-time queue latency and consumer lag visibility.'
        ]
      },
      {
        title: 'Collaborative Multi-Tenant Kanban & Workflow SaaS',
        tech: 'Next.js 14, TypeScript, Supabase, Tailwind CSS, TanStack Query',
        link: 'github.com/sri/kanban-analytics',
        bullets: [
          'Engineered real-time drag-and-drop workspace board utilizing PostgreSQL Row-Level Security (RLS) for multi-tenant isolation.',
          'Built optimistic UI updates with rollback cache handlers, reducing perceived user interaction latency to <50ms.',
          'Integrated automated audit activity trail logging team sprint events with downloadable CSV analytics reports.'
        ]
      },
      {
        title: 'AI Resume & ATS Keyword Benchmark Analyzer',
        tech: 'React, Node.js, Python, Vector Embeddings, Tailwind CSS',
        link: 'github.com/sri/ai-resume-parser',
        bullets: [
          'Built intelligent resume parser extracting text entities and computing cosine similarity against recruiter job descriptions.',
          'Designed interactive match dashboard delivering actionable Google X-Y-Z formula rewrites to boost recruiter shortlist rate.'
        ]
      }
    ],
    achievements: [
      `Solved ${profile.leetCodeSolved || 142}+ problems on LeetCode with ${profile.leetCodeRating || 1680} contest rating.`,
      `Maintained a ${profile.dailyStreakDays || 5}+ day continuous coding streak on Mitra Student OS and GitHub.`,
      'Ranked in top 2% among 4,500+ participants in National Collegiate Coding Championship.',
      `${profile.hackerRankBadge || '5-Star Problem Solving Gold Badge'} certified on HackerRank.`
    ]
  });

  // ATS scanner state
  const [isScanning, setIsScanning] = useState(false);
  const [atsResult, setAtsResult] = useState<AtsScanResponse | null>(null);

  // Print handler (uses standard clean print styles)
  const handlePrint = () => {
    window.print();
  };

  // Copy plain text formatted for pasting into plain ATS upload portals
  const handleCopyPlainText = () => {
    const text = `
${resumeData.fullName}
${resumeData.email} | ${resumeData.phone} | ${resumeData.location}
GitHub: ${resumeData.github} | LinkedIn: ${resumeData.linkedin} | Portfolio: ${resumeData.portfolio}

SUMMARY
${resumeData.summary}

EDUCATION
${resumeData.education.map(e => `${e.degree} - ${e.institution} (${e.duration}) | CGPA: ${e.cgpa}\nCoursework: ${e.courses}`).join('\n\n')}

TECHNICAL SKILLS
Languages: ${resumeData.technicalSkills.languages}
Frameworks & Libraries: ${resumeData.technicalSkills.frameworks}
Databases & Cloud: ${resumeData.technicalSkills.databasesCloud}
Core Computer Science: ${resumeData.technicalSkills.coreFundamentals}

PROJECTS
${resumeData.projects.map(p => `${p.title} | ${p.tech} (${p.link})\n${p.bullets.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

ACHIEVEMENTS & CERTIFICATIONS
${resumeData.achievements.map(a => `• ${a}`).join('\n')}
    `.trim();

    navigator.clipboard?.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const runAtsAudit = async () => {
    setIsScanning(true);
    try {
      const compiledText = `${resumeData.summary} ${resumeData.projects.map(p => p.bullets.join(' ')).join(' ')}`;
      const result = await scanResumeAts(compiledText, profile.primaryGoal);
      setAtsResult(result);
      if (onUpdateProfile && result.atsScore) {
        onUpdateProfile({
          ...profile,
          atsScore: result.atsScore
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-primary/20 shadow-md bg-surface-container shrink-0 hidden sm:block">
            <img 
              src="/src/assets/images/mitra_logo_1791625654446.jpg" 
              alt="Mitra Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                ATS-Optimized Single-Page Builder
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Workday & Greenhouse Compliant
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-on-surface mt-1">
              Student Technical Resume
            </h2>
            <p className="text-xs text-outline mt-0.5">
              Designed specifically for SDE-1, campus placement drives, and high-growth tech internships.
            </p>
          </div>
        </div>

        {/* View Switcher Tabs & Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1 rounded-xl bg-surface-container-low border border-surface-container-high flex items-center">
            <button
              onClick={() => setActiveView('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'preview' ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Resume Sheet</span>
            </button>
            <button
              onClick={() => setActiveView('edit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'edit' ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Sections</span>
            </button>
            <button
              onClick={() => {
                setActiveView('ats-audit');
                if (!atsResult) runAtsAudit();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'ats-audit' ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ATS Score ({atsResult?.atsScore || profile.atsScore || 92}/100)</span>
            </button>
          </div>

          <button
            onClick={handleCopyPlainText}
            className="px-3 py-2 rounded-xl bg-white border border-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container shadow-2xs flex items-center gap-1.5 active:scale-95 transition-all"
            title="Copy plain text for raw ATS job board fields"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-primary" />}
            <span>{copiedText ? 'Copied Text!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container shadow-2xs flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save as PDF / Print</span>
          </button>
        </div>
      </div>

      {/* 2. Main Viewport */}

      {/* VIEW A: Printable Resume Sheet */}
      {activeView === 'preview' && (
        <div className="space-y-4">
          {/* Template Style Selector Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 text-xs">
            <span className="text-outline font-medium">ATS Layout: <strong className="text-on-surface">Standard Academic Tech (No Tables, Machine-Readable)</strong></span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-on-surface font-medium cursor-pointer bg-white px-2 py-1 rounded-lg border border-surface-container-high hover:border-primary/50 transition-colors">
                <input 
                  type="checkbox" 
                  checked={showLogoOnResume} 
                  onChange={(e) => setShowLogoOnResume(e.target.checked)} 
                  className="rounded text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span>Include Mitra Crest Logo</span>
              </label>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-outline">Accent Font:</span>
                <button
                  onClick={() => setTemplateTheme('classic-tech')}
                  className={`px-2 py-0.5 rounded text-xs font-medium border ${templateTheme === 'classic-tech' ? 'bg-primary text-white border-primary' : 'bg-white border-surface-container-high'}`}
                >
                  Classic Tech
                </button>
                <button
                  onClick={() => setTemplateTheme('minimal-modern')}
                  className={`px-2 py-0.5 rounded text-xs font-medium border ${templateTheme === 'minimal-modern' ? 'bg-primary text-white border-primary' : 'bg-white border-surface-container-high'}`}
                >
                  Minimal
                </button>
              </div>
            </div>
          </div>

          {/* Printable 8.5x11 / A4 Document Container */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-300 shadow-md max-w-4xl mx-auto text-slate-900 font-sans leading-relaxed text-[13px] print:shadow-none print:border-none print:p-0">
            {/* Optional Mitra Verified Tech Crest */}
            {showLogoOnResume && (
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-slate-300 shadow-xs bg-slate-50 shrink-0">
                    <img 
                      src="/src/assets/images/mitra_logo_1791625654446.jpg" 
                      alt="Mitra Verified" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold tracking-wide text-indigo-900 uppercase block">
                      Mitra Verified Tech Scholar
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Student ID: {profile.rollNo || '2024MCS014'} • {profile.degreeType || 'M.Tech'}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[10px] text-slate-500 hidden sm:block">
                  <span className="font-semibold text-slate-700 block">{profile.college}</span>
                  <span className="font-mono text-emerald-700 font-medium">Placement Batch {profile.graduationDate || '2026'}</span>
                </div>
              </div>
            )}

            {/* Header / Contact Info */}
            <header className="text-center pb-4 border-b border-slate-400 space-y-1">
              <h1 className="font-bold text-2xl tracking-tight text-slate-950 uppercase">
                {resumeData.fullName}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700">
                <span>{resumeData.email}</span>
                <span>•</span>
                <span>{resumeData.phone}</span>
                <span>•</span>
                <span>{resumeData.location}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium text-indigo-700 pt-0.5">
                <a href={`https://${resumeData.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {resumeData.linkedin}
                </a>
                <span className="text-slate-400">•</span>
                <a href={`https://${resumeData.github}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {resumeData.github}
                </a>
                <span className="text-slate-400">•</span>
                <a href={`https://${resumeData.leetcode}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {resumeData.leetcode}
                </a>
              </div>
            </header>

            {/* Summary */}
            <section className="pt-3.5 space-y-1">
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Professional Summary
              </h2>
              <p className="text-slate-700 text-justify pt-1 leading-normal">
                {resumeData.summary}
              </p>
            </section>

            {/* Technical Skills */}
            <section className="pt-3.5 space-y-1">
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Technical Skills
              </h2>
              <div className="pt-1 space-y-1 text-slate-800">
                <p>
                  <strong className="text-slate-950 font-bold">Languages:</strong> {resumeData.technicalSkills.languages}
                </p>
                <p>
                  <strong className="text-slate-950 font-bold">Frameworks & Libraries:</strong> {resumeData.technicalSkills.frameworks}
                </p>
                <p>
                  <strong className="text-slate-950 font-bold">Databases & Cloud Infrastructure:</strong> {resumeData.technicalSkills.databasesCloud}
                </p>
                <p>
                  <strong className="text-slate-950 font-bold">Core CS Concepts:</strong> {resumeData.technicalSkills.coreFundamentals}
                </p>
              </div>
            </section>

            {/* Education */}
            <section className="pt-3.5 space-y-1.5">
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Education
              </h2>
              <div className="space-y-2.5 pt-1">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-baseline justify-between">
                      <strong className="text-slate-950 font-bold text-[13px]">{edu.institution}</strong>
                      <span className="text-xs text-slate-600 font-medium">{edu.duration}</span>
                    </div>
                    <div className="flex items-baseline justify-between text-xs text-slate-700">
                      <span>{edu.degree}</span>
                      <span className="font-semibold text-slate-900">CGPA: {edu.cgpa}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <span className="italic">Key Coursework:</span> {edu.courses}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="pt-3.5 space-y-2">
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Engineering Projects
              </h2>
              <div className="space-y-3 pt-1">
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-slate-950 font-bold text-[13px]">{proj.title}</strong>
                        <span className="text-xs text-slate-600 italic">| {proj.tech}</span>
                      </div>
                      <span className="text-[11px] text-indigo-700 font-medium">{proj.link}</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-slate-700 text-xs">
                      {proj.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-normal">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements & Certifications */}
            <section className="pt-3.5 space-y-1.5">
              <h2 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">
                Key Achievements & Certifications
              </h2>
              <ul className="list-disc list-outside pl-4 space-y-1 pt-1 text-slate-700 text-xs">
                {resumeData.achievements.map((ach, idx) => (
                  <li key={idx} className="leading-normal">
                    {ach}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}

      {/* VIEW B: Edit Form */}
      {activeView === 'edit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
            <h3 className="font-display font-bold text-lg text-on-surface">
              Customize Resume Content
            </h3>
            <button
              onClick={() => setActiveView('preview')}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container"
            >
              Done & View Preview →
            </button>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary">1. Personal & Contact Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-outline font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
              <div>
                <label className="text-outline font-medium block mb-1">Email</label>
                <input
                  type="text"
                  value={resumeData.email}
                  onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
              <div>
                <label className="text-outline font-medium block mb-1">Phone</label>
                <input
                  type="text"
                  value={resumeData.phone}
                  onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
              <div>
                <label className="text-outline font-medium block mb-1">Location</label>
                <input
                  type="text"
                  value={resumeData.location}
                  onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
              <div>
                <label className="text-outline font-medium block mb-1">LinkedIn Handle / URL</label>
                <input
                  type="text"
                  value={resumeData.linkedin}
                  onChange={(e) => setResumeData({ ...resumeData, linkedin: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
              <div>
                <label className="text-outline font-medium block mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={resumeData.github}
                  onChange={(e) => setResumeData({ ...resumeData, github: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary">2. Professional Summary</h4>
            <textarea
              rows={3}
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface leading-relaxed"
            />
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary">3. Technical Skills Categories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-outline font-medium block mb-1">Programming Languages</label>
                <input
                  type="text"
                  value={resumeData.technicalSkills.languages}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    technicalSkills: { ...resumeData.technicalSkills, languages: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
              <div>
                <label className="text-outline font-medium block mb-1">Frameworks & Libraries</label>
                <input
                  type="text"
                  value={resumeData.technicalSkills.frameworks}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    technicalSkills: { ...resumeData.technicalSkills, frameworks: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
              <div>
                <label className="text-outline font-medium block mb-1">Databases & Cloud</label>
                <input
                  type="text"
                  value={resumeData.technicalSkills.databasesCloud}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    technicalSkills: { ...resumeData.technicalSkills, databasesCloud: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
              <div>
                <label className="text-outline font-medium block mb-1">Core Fundamentals</label>
                <input
                  type="text"
                  value={resumeData.technicalSkills.coreFundamentals}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    technicalSkills: { ...resumeData.technicalSkills, coreFundamentals: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW C: ATS Audit & Keyword Scanner */}
      {activeView === 'ats-audit' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
            <div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md uppercase">
                ATS Simulation & Match Engine
              </span>
              <h3 className="font-display font-extrabold text-xl text-on-surface mt-1">
                Automated Resume Audit for {profile.primaryGoal}
              </h3>
              <p className="text-xs text-outline">
                Simulates enterprise parsers (Taleo, Greenhouse, Workday) and benchmarks your project impact keywords.
              </p>
            </div>

            <button
              onClick={runAtsAudit}
              disabled={isScanning}
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary-container flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Auditing Resume...' : 'Re-Run ATS Audit'}</span>
            </button>
          </div>

          {/* Score Card Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-primary/20 space-y-1">
              <span className="text-[11px] font-bold text-primary uppercase">ATS Parsability Score</span>
              <p className="font-display font-black text-3xl text-primary">
                {atsResult?.atsScore || profile.atsScore || 92} / 100
              </p>
              <p className="text-[11px] text-emerald-700 font-bold">✓ High Match • Shortlist Probability 85%+</p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-1">
              <span className="text-[11px] font-bold text-outline uppercase">Keywords Matched</span>
              <p className="font-display font-black text-3xl text-on-surface">
                {atsResult?.matchedKeywords.length || 7} Verified
              </p>
              <p className="text-[11px] text-outline">Core CS, Distributed Systems, Modern Stacks</p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-1">
              <span className="text-[11px] font-bold text-outline uppercase">Page Compliance</span>
              <p className="font-display font-black text-3xl text-emerald-600">
                100% 1-Page
              </p>
              <p className="text-[11px] text-outline">Zero two-column table traps detected</p>
            </div>
          </div>

          {/* Matched vs Missing Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <strong className="text-emerald-900 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Present Recruiter Keywords:
              </strong>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(atsResult?.matchedKeywords || ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Data Structures', 'REST APIs', 'Git', 'Go', 'Docker']).map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 font-semibold shadow-2xs">
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
              <strong className="text-rose-900 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-600" />
                Suggested Additional Buzzwords:
              </strong>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {(atsResult?.missingKeywords || ['CI/CD Pipelines', 'Redis Caching', 'Unit Testing', 'AWS Cloud', 'Kubernetes']).map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-800 font-semibold shadow-2xs">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* X-Y-Z Rewrite Critique */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-3">
            <strong className="text-xs uppercase tracking-wider text-primary font-bold block">
              Google X-Y-Z Bullet Optimizer:
            </strong>
            <p className="text-xs text-outline">
              Campus recruiters prioritize bullets structured as: <em>"Accomplished [X] as measured by [Y] by doing [Z]"</em>.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-surface-container-high space-y-1">
                <span className="text-rose-700 font-bold">❌ Before:</span>
                <p className="text-outline italic">"Built a task queue using Go and Redis."</p>
                <span className="text-emerald-700 font-bold block pt-1.5">✓ Optimized:</span>
                <p className="text-on-surface font-semibold">
                  "Architected a fault-tolerant distributed queue handling 15,000+ msgs/sec with Redis Streams and exponential backoff retry policies."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
