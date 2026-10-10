import React, { useState, useEffect, useMemo } from 'react';
import { 
  Platform, 
  Course, 
  PlacementDrive, 
  Project, 
  TabType 
} from '../types';
import { 
  Search, 
  X, 
  Layers, 
  BookOpen, 
  Briefcase, 
  FolderGit2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  platforms: Platform[];
  courses: Course[];
  placementDrives: PlacementDrive[];
  projects: Project[];
  onNavigateTab: (tab: TabType) => void;
  onSelectCourse?: (course: Course) => void;
  onSelectProject?: (project: Project) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  platforms,
  courses,
  placementDrives,
  projects,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or focus
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        matchedPlatforms: platforms.slice(0, 3),
        matchedCourses: courses.slice(0, 3),
        matchedDrives: placementDrives.slice(0, 2),
        matchedProjects: projects.slice(0, 2),
        isSearching: false,
      };
    }

    const matchedPlatforms = platforms.filter(
      p => p.name.toLowerCase().includes(q) ||
           p.tagline.toLowerCase().includes(q) ||
           p.bestFor.toLowerCase().includes(q) ||
           p.category.toLowerCase().includes(q)
    );

    const matchedCourses = courses.filter(
      c => c.title.toLowerCase().includes(q) ||
           c.provider.toLowerCase().includes(q) ||
           c.topics.some(t => t.toLowerCase().includes(q)) ||
           c.category.toLowerCase().includes(q)
    );

    const matchedDrives = placementDrives.filter(
      d => d.company.toLowerCase().includes(q) ||
           d.programRole.toLowerCase().includes(q) ||
           d.subRole.toLowerCase().includes(q)
    );

    const matchedProjects = projects.filter(
      p => p.title.toLowerCase().includes(q) ||
           p.techStack.some(t => t.toLowerCase().includes(q)) ||
           p.description.toLowerCase().includes(q)
    );

    return {
      matchedPlatforms,
      matchedCourses,
      matchedDrives,
      matchedProjects,
      isSearching: true,
    };
  }, [query, platforms, courses, placementDrives, projects]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-surface-container-high bg-surface-container-lowest">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search platforms, courses, placements, projects (e.g., LeetCode, DSA, React, Amazon, TCS)..."
            autoFocus
            className="w-full text-sm font-medium text-on-surface placeholder:text-outline bg-transparent border-none outline-none focus:ring-0"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[11px] text-outline font-medium border border-surface-container-high px-1.5 py-0.5 rounded">
              ESC
            </span>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!results.isSearching && (
            <div className="flex items-center justify-between text-xs font-semibold text-outline px-1">
              <span>POPULAR & QUICK ACCESS</span>
              <span>Showing suggested recommendations</span>
            </div>
          )}

          {/* Platforms section */}
          {results.matchedPlatforms.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Platforms ({results.matchedPlatforms.length})
                </span>
                <button
                  onClick={() => {
                    onNavigateTab('platforms');
                    onClose();
                  }}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  View all platforms <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.matchedPlatforms.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest hover:border-primary/40 hover:shadow-xs transition-all flex items-center justify-between gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white border border-surface-container-high p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        {p.logoUrl ? (
                          <img src={p.logoUrl} alt={p.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="font-bold text-[10px] text-primary">{p.shortCode}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-on-surface truncate">{p.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container text-outline font-medium shrink-0">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-outline truncate mt-0.5">{p.tagline}</p>
                      </div>
                    </div>
                    <a
                      href={p.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-primary hover:bg-primary/10 shrink-0 transition-colors"
                      title={`Open official ${p.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses section */}
          {results.matchedCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Courses ({results.matchedCourses.length})
                </span>
                <button
                  onClick={() => {
                    onNavigateTab('courses');
                    onClose();
                  }}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  View all courses <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-2">
                {results.matchedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest hover:border-purple-300 hover:shadow-xs transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-on-surface truncate">{c.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-50 text-purple-700 font-semibold shrink-0">
                          {c.pricingType}
                        </span>
                      </div>
                      <p className="text-[11px] text-outline mt-0.5 truncate">
                        {c.provider} • {c.duration} • {c.topics.slice(0, 3).join(', ')}
                      </p>
                    </div>
                    <a
                      href={c.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg hover:bg-surface-container"
                    >
                      Learn <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placements section */}
          {results.matchedDrives.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Placements & Drives ({results.matchedDrives.length})
                </span>
                <button
                  onClick={() => {
                    onNavigateTab('placements');
                    onClose();
                  }}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  View placement hub <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.matchedDrives.map((d) => (
                  <div
                    key={d.id}
                    className="p-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest hover:border-emerald-300 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-on-surface">{d.company}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-medium">
                        {d.deadlineText}
                      </span>
                    </div>
                    <p className="text-[11px] text-outline line-clamp-1 mt-0.5">{d.programRole}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects section */}
          {results.matchedProjects.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  Projects ({results.matchedProjects.length})
                </span>
                <button
                  onClick={() => {
                    onNavigateTab('projects');
                    onClose();
                  }}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  View projects <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.matchedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest hover:border-blue-300 hover:shadow-xs transition-all"
                  >
                    <span className="font-bold text-xs text-on-surface line-clamp-1">{p.title}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.techStack.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {results.isSearching &&
            results.matchedPlatforms.length === 0 &&
            results.matchedCourses.length === 0 &&
            results.matchedDrives.length === 0 &&
            results.matchedProjects.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-8 h-8 text-outline mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold text-on-surface">No exact match for "{query}"</p>
                <p className="text-xs text-outline mt-1">
                  Try searching for keywords like "LeetCode", "Python", "DSA", "Angela Yu", "TCS", or "Docker".
                </p>
              </div>
            )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-xs text-outline">
          <span>Navigate Mitra quickly</span>
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-surface-container-high text-[10px]">ESC</kbd> to exit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
