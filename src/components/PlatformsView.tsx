import React, { useState, useMemo } from 'react';
import { Platform } from '../types';
import { PlatformLogo } from './BrandLogos';
import { 
  Layers, 
  Search, 
  ExternalLink, 
  Bookmark, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Code2, 
  GraduationCap, 
  Cpu, 
  Cloud, 
  HelpCircle,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface PlatformsViewProps {
  platforms: Platform[];
  savedPlatformIds: string[];
  onToggleSavePlatform: (id: string) => void;
}

export const PlatformsView: React.FC<PlatformsViewProps> = ({
  platforms,
  savedPlatformIds,
  onToggleSavePlatform,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);
  const [compareIds, setCompareIds] = useState<string[]>(['leetcode', 'hackerrank', 'codeforces']);

  const categories = [
    { id: 'all', label: 'All Platforms', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'coding', label: 'Coding & Practice', icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: 'learning', label: 'Learning & Tutorials', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'dev', label: 'Development & IDEs', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'ai', label: 'AI & Data Science', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'cloud', label: 'Cloud Computing', icon: <Cloud className="w-3.5 h-3.5" /> },
  ];

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
      const matchesQuery = 
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keyFeatures.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesDiff && matchesQuery;
    });
  }, [platforms, selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-surface-container-low via-surface to-surface-container rounded-3xl p-6 sm:p-8 border border-surface-container-high">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Directory for CSE / IT Engineers</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-on-surface tracking-tight">
            Platforms to Code, Build & Master
          </h1>
          <p className="text-sm text-outline leading-relaxed">
            Stop wondering where to start coding or which tools to use. We have hand-picked the official platforms categorized by their exact purpose in campus hiring, technical interviews, and open-source development.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container shadow-2xs hover:shadow-xs transition-all flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Compare Platforms Side-by-Side
            </button>
            <span className="text-xs text-outline font-medium">
              Showing {filteredPlatforms.length} of {platforms.length} verified platforms
            </span>
          </div>
        </div>
      </div>

      {/* 2. Filter Pills & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white border border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Level Filter */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platforms..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-surface-container-high text-xs font-medium text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white border border-surface-container-high text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Platform Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlatforms.map((platform) => {
          const isSaved = savedPlatformIds.includes(platform.id);

          return (
            <div
              key={platform.id}
              className="rounded-3xl bg-white border border-surface-container-high hover:border-primary/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-surface-container-high p-2 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                      <PlatformLogo id={platform.id} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display font-bold text-base text-on-surface">
                          {platform.name}
                        </h3>
                        {platform.isVerified && (
                          <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold" title="Official Verified Platform">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-primary font-medium">{platform.tagline}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleSavePlatform(platform.id)}
                    className={`p-2 rounded-xl transition-all ${
                      isSaved
                        ? 'text-primary bg-primary/10'
                        : 'text-outline hover:text-on-surface hover:bg-surface-container'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save platform'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} />
                  </button>
                </div>

                {/* Badge tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-container text-outline">
                    {platform.category}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {platform.difficulty}
                  </span>
                  {platform.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      ★ {platform.badge}
                    </span>
                  )}
                </div>

                {/* What it is used for */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-outline">
                    Why CSE/IT Students Use It
                  </p>
                  <p className="text-xs text-on-surface leading-relaxed">
                    {platform.bestFor}
                  </p>
                </div>

                {/* Key features checklist */}
                <div className="space-y-1.5 pt-1 border-t border-surface-container-high">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-outline">
                    Core Capabilities
                  </p>
                  <div className="space-y-1">
                    {platform.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Career Roles */}
                {platform.careerTarget && (
                  <div className="pt-2 text-[11px] text-outline">
                    <span className="font-semibold text-on-surface">Best for: </span>
                    {platform.careerTarget}
                  </div>
                )}
              </div>

              {/* Bottom footer button */}
              <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {platform.costTier}
                  </span>
                </div>

                <a
                  href={platform.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs hover:shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                >
                  Visit Official Platform
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlatforms.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-surface-container-high">
          <Layers className="w-12 h-12 text-outline mx-auto mb-3 opacity-40" />
          <h3 className="font-bold text-base text-on-surface">No platforms match your filters</h3>
          <p className="text-xs text-outline mt-1 max-w-sm mx-auto">
            Try resetting your search query or selecting "All Platforms" above.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. Platform Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col">
            <div className="p-5 border-b border-surface-container-high flex items-center justify-between bg-surface-container-lowest">
              <div>
                <h3 className="font-display font-bold text-lg text-on-surface">
                  Platform Comparison Matrix
                </h3>
                <p className="text-xs text-outline">
                  Understand when to choose LeetCode vs HackerRank vs Codeforces for your career phase
                </p>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Coding Platforms Comparison */}
              <div className="border border-surface-container-high rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container text-on-surface font-bold border-b border-surface-container-high">
                    <tr>
                      <th className="p-3">Feature</th>
                      <th className="p-3 text-primary">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md overflow-hidden shrink-0"><PlatformLogo id="leetcode" /></div>
                          <span>LeetCode</span>
                        </div>
                      </th>
                      <th className="p-3 text-emerald-700">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md overflow-hidden shrink-0"><PlatformLogo id="hackerrank" /></div>
                          <span>HackerRank</span>
                        </div>
                      </th>
                      <th className="p-3 text-blue-700">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md overflow-hidden shrink-0"><PlatformLogo id="codeforces" /></div>
                          <span>Codeforces</span>
                        </div>
                      </th>
                      <th className="p-3 text-amber-700">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-md overflow-hidden shrink-0"><PlatformLogo id="gfg" /></div>
                          <span>GeeksforGeeks</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-high">
                    <tr>
                      <td className="p-3 font-semibold text-outline">Primary Goal</td>
                      <td className="p-3 font-medium">Product Company OAs & Technical Interviews</td>
                      <td className="p-3 font-medium">College exams, language syntax & basic problem solving</td>
                      <td className="p-3 font-medium">Competitive programming speed, math & Olympiad mastery</td>
                      <td className="p-3 font-medium">Company-specific questions, articles & core CS theory</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-outline">Best Student Year</td>
                      <td className="p-3 font-medium">3rd & 4th Year</td>
                      <td className="p-3 font-medium">1st & 2nd Year</td>
                      <td className="p-3 font-medium">2nd to 4th Year (CP focused)</td>
                      <td className="p-3 font-medium">All Years</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-outline">Company Tagging</td>
                      <td className="p-3 font-medium text-emerald-700">★★★★★ (Industry Standard)</td>
                      <td className="p-3 font-medium text-amber-700">★★★☆☆</td>
                      <td className="p-3 font-medium text-outline">★☆☆☆☆ (Contest only)</td>
                      <td className="p-3 font-medium text-emerald-700">★★★★☆ (Mass Recruiters)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-outline">Recommended Milestone</td>
                      <td className="p-3 font-medium">Solve Top 150 (Blind 75 / NeetCode)</td>
                      <td className="p-3 font-medium">Earn 5-Star Problem Solving Badge</td>
                      <td className="p-3 font-medium">Reach Pupil / Specialist (1200-1400)</td>
                      <td className="p-3 font-medium">Must-Do Coding Sheet</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Cloud Platforms Comparison */}
              <div>
                <h4 className="font-bold text-sm text-on-surface mb-2">Cloud Providers Comparison for Students</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                    <span className="font-bold text-xs text-amber-900">AWS Skill Builder</span>
                    <p className="text-[11px] text-amber-800">
                      Highest market share (31%). Best for SDEs learning EC2, S3, Lambda, and DynamoDB for high-scale backend deployments.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                    <span className="font-bold text-xs text-blue-900">Microsoft Learn</span>
                    <p className="text-[11px] text-blue-800">
                      Free student sandbox without credit card. Best for enterprise IT, Azure App Service, and .NET ecosystem integration.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                    <span className="font-bold text-xs text-emerald-900">Google Cloud Skills Boost</span>
                    <p className="text-[11px] text-emerald-800">
                      Hands-on Qwiklabs credits. Best for BigQuery, Vertex AI, Kubernetes (GKE), and modern cloud-native architectures.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex justify-end">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
