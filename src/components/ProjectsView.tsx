import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { 
  FolderGit2, 
  Search, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Code2, 
  Terminal, 
  Layers, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronRight, 
  X,
  FileCode,
  SlidersHorizontal
} from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  savedProjectIds: string[];
  onToggleSaveProject: (id: string) => void;
  onOpenAdvisor: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  savedProjectIds,
  onToggleSaveProject,
  onOpenAdvisor,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [copiedCloneId, setCopiedCloneId] = useState<string | null>(null);
  const [copiedResumeBullet, setCopiedResumeBullet] = useState(false);

  // Domains
  const domains = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web & Full Stack' },
    { id: 'cloud', label: 'Cloud & Distributed' },
    { id: 'ai', label: 'AI & Data Science' },
    { id: 'fintech', label: 'FinTech & Real-Time' },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesDomain = selectedDomain === 'all' || p.domain === selectedDomain;
      const matchesTier = selectedTier === 'all' || p.tier === selectedTier;
      const matchesQuery = 
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesDomain && matchesTier && matchesQuery;
    });
  }, [projects, selectedDomain, selectedTier, searchQuery]);

  const handleCopyClone = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCloneId(id);
    setTimeout(() => setCopiedCloneId(null), 2000);
  };

  const handleCopyResumeBullet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResumeBullet(true);
    setTimeout(() => setCopiedResumeBullet(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-primary text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold border border-white/20">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-300" />
            <span>Recruiter-Magnet Portfolio Projects</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Build Real Systems, Not Just Clones
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            Move beyond simple to-do lists. Build full-stack microservices, real-time WebSockets, distributed workers, and AI pipelines that impress technical interviewers and pass recruiter screenings.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <span className="text-xs text-blue-200 font-semibold">
              Showing {filteredProjects.length} architected project blueprints
            </span>
          </div>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {domains.map((dom) => {
            const isActive = selectedDomain === dom.id;
            return (
              <button
                key={dom.id}
                onClick={() => setSelectedDomain(dom.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white border border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {dom.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-surface-container-high">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech stack, e.g. React, Go, Docker..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-medium text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-semibold text-on-surface focus:outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced (Recruiter Magnet)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isSaved = savedProjectIds.includes(project.id);

          return (
            <div
              key={project.id}
              className="rounded-3xl bg-white border border-surface-container-high hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Thumbnail banner */}
              <div className="h-44 overflow-hidden bg-slate-900 relative">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-xs">
                    {project.domain.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/90 text-white backdrop-blur-xs">
                    {project.tier}
                  </span>
                </div>

                <button
                  onClick={() => onToggleSaveProject(project.id)}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
                    isSaved ? 'bg-primary text-white' : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                  title={isSaved ? 'Saved to Profile' : 'Save project'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-display font-bold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-primary font-semibold mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Recruiter impact chip */}
                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Why Recruiters Love This:
                  </span>
                  <p className="text-on-surface leading-snug">{project.recruiterImpact}</p>
                </div>

                {/* Tech stack tags */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-outline">Tech Stack</p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-surface-container text-on-surface"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
                <span className="text-xs font-bold text-outline">
                  {project.statusText}
                </span>

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs hover:shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                >
                  View Blueprint <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Architecture Deep-Dive Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-surface-container-high flex items-start justify-between bg-gradient-to-r from-surface-container-low to-surface">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                  {activeModalProject.domain.toUpperCase()} • {activeModalProject.tier}
                </span>
                <h3 className="font-display font-bold text-xl text-on-surface mt-1.5">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs text-outline">{activeModalProject.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Architecture Overview */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-on-surface flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  System Architecture Overview
                </h4>
                <p className="text-xs text-on-surface leading-relaxed p-4 rounded-2xl bg-surface-container-low border border-surface-container-high">
                  {activeModalProject.architectureDetails.overview}
                </p>
              </div>

              {/* Key Architecture Components */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-on-surface">
                  Key Technical Components
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalProject.architectureDetails.keyComponents.map((comp, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-surface-container-low border border-surface-container-high text-xs flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-on-surface">{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation Steps */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-on-surface">
                  Step-by-Step Implementation Guide
                </h4>
                <div className="space-y-2">
                  {activeModalProject.architectureDetails.steps.map((st, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-surface-container-high bg-white text-xs flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-on-surface font-medium">{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Quickstart Clone Command */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm text-on-surface flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-600" />
                    Quickstart Starter Command
                  </h4>
                  <button
                    onClick={() => handleCopyClone(activeModalProject.architectureDetails.sampleRepoClone, activeModalProject.id)}
                    className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    {copiedCloneId === activeModalProject.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Command
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800">
                  <code>{activeModalProject.architectureDetails.sampleRepoClone}</code>
                </pre>
              </div>

              {/* Resume Bullet Point Template */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-700" />
                    Google X-Y-Z Resume Bullet Formula:
                  </span>
                  <button
                    onClick={() => handleCopyResumeBullet(`Architected ${activeModalProject.title} utilizing ${activeModalProject.techStack.join(', ')}, ${activeModalProject.recruiterImpact.toLowerCase()}`)}
                    className="text-xs text-purple-700 font-bold hover:underline flex items-center gap-1"
                  >
                    {copiedResumeBullet ? 'Copied to Clipboard!' : 'Copy for Resume'}
                  </button>
                </div>
                <p className="text-xs text-purple-950 italic bg-white p-3 rounded-xl border border-purple-100">
                  "Architected {activeModalProject.title} utilizing {activeModalProject.techStack.join(', ')}, {activeModalProject.recruiterImpact.toLowerCase()}"
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
              <button
                onClick={() => onToggleSaveProject(activeModalProject.id)}
                className="px-4 py-2 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-white flex items-center gap-1.5"
              >
                <Bookmark className={`w-3.5 h-3.5 ${savedProjectIds.includes(activeModalProject.id) ? 'fill-primary text-primary' : ''}`} />
                {savedProjectIds.includes(activeModalProject.id) ? 'Saved in Profile' : 'Save Project to Profile'}
              </button>

              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2 rounded-xl bg-primary text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
