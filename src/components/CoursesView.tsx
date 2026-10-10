import React, { useState, useMemo } from 'react';
import { Course } from '../types';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Bookmark, 
  CheckCircle, 
  Star, 
  Clock, 
  SlidersHorizontal, 
  Sparkles, 
  Filter,
  Check,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';

interface CoursesViewProps {
  courses: Course[];
  savedCourseIds: string[];
  enrolledCourseProgress: Record<string, number>;
  onToggleSaveCourse: (id: string) => void;
  onUpdateCourseProgress: (id: string, progress: number) => void;
  onOpenAdvisor: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  savedCourseIds,
  enrolledCourseProgress,
  onToggleSaveCourse,
  onUpdateCourseProgress,
  onOpenAdvisor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySaved, setOnlySaved] = useState<boolean>(false);
  const [showAiMatcherModal, setShowAiMatcherModal] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'dsa', label: 'Data Structures & Algorithms' },
    { id: 'web', label: 'Web & Full Stack' },
    { id: 'python_java', label: 'Python, C++ & Java' },
    { id: 'ai_data', label: 'AI, Machine Learning & Data' },
    { id: 'cloud_devops', label: 'Cloud & DevOps' },
    { id: 'sql', label: 'Databases & Core CS' },
    { id: 'aptitude', label: 'Aptitude & Placements' },
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCat = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesPrice = selectedPricing === 'all' || course.pricingType === selectedPricing;
      const matchesDiff = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
      const matchesSaved = !onlySaved || savedCourseIds.includes(course.id);
      const matchesQuery = 
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesPrice && matchesDiff && matchesSaved && matchesQuery;
    });
  }, [courses, selectedCategory, selectedPricing, selectedDifficulty, onlySaved, savedCourseIds, searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-primary text-white rounded-3xl p-6 sm:p-8 shadow-lg">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated Computer Science & IT Course Catalog</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Curated Courses for Real Career Skills
          </h1>
          <p className="text-indigo-100 text-sm leading-relaxed">
            From free Harvard CS50 and MIT OpenCourseWare to industry-standard bootcamps. Every course has verified links, cost transparency, and interactive progress tracking.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAiMatcherModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Course Matcher
            </button>
            <span className="text-xs text-indigo-200 font-medium">
              Showing {filteredCourses.length} curated courses
            </span>
          </div>
        </div>
      </div>

      {/* Visual Category Showcase Gallery */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Explore by Specialization
          </span>
          <span className="text-[11px] text-outline font-medium">Click category to filter courses</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {[
            {
              id: 'all',
              label: 'All Tracks',
              count: courses.length,
              imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
              badge: 'Full Catalog',
            },
            {
              id: 'dsa',
              label: 'DSA & Coding',
              count: courses.filter(c => c.category === 'dsa').length,
              imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
              badge: 'Blind 75',
            },
            {
              id: 'web',
              label: 'Web Dev',
              count: courses.filter(c => c.category === 'web').length,
              imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=400&q=80',
              badge: 'Full Stack',
            },
            {
              id: 'python_java',
              label: 'Python / Java',
              count: courses.filter(c => c.category === 'python_java').length,
              imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
              badge: 'Core SDE',
            },
            {
              id: 'ai_data',
              label: 'AI / ML',
              count: courses.filter(c => c.category === 'ai_data').length,
              imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80',
              badge: 'Deep Learning',
            },
            {
              id: 'cloud_devops',
              label: 'Cloud / DevOps',
              count: courses.filter(c => c.category === 'cloud_devops').length,
              imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80',
              badge: 'Docker & AWS',
            },
            {
              id: 'sql',
              label: 'SQL & Systems',
              count: courses.filter(c => c.category === 'sql').length,
              imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
              badge: 'OS & DBMS',
            },
            {
              id: 'aptitude',
              label: 'Placement OA',
              count: courses.filter(c => c.category === 'aptitude').length,
              imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
              badge: 'Speed Math',
            },
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative rounded-2xl overflow-hidden h-28 p-2 flex flex-col justify-between text-left group transition-all duration-300 ${
                  isSelected
                    ? 'ring-3 ring-primary shadow-md scale-[1.02]'
                    : 'border border-surface-container-high hover:shadow-sm opacity-90 hover:opacity-100 hover:scale-[1.01]'
                }`}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                <div className="relative z-10">
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-amber-400 text-stone-900' : 'bg-white/20 text-white backdrop-blur-xs'
                  }`}>
                    {cat.badge}
                  </span>
                </div>

                <div className="relative z-10 space-y-0.5">
                  <p className="font-bold text-xs text-white leading-tight line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {cat.label}
                  </p>
                  <p className="text-[10px] text-indigo-200">
                    {cat.count} {cat.count === 1 ? 'Course' : 'Courses'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Spotlight Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            High-Impact Recommendations for SDE-1
          </span>
          <span className="text-[11px] text-outline font-medium">Top Rated by Alumni</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((feat) => (
            <div
              key={`feat-${feat.id}`}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 h-48 border border-surface-container-high shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={feat.imageUrl}
                alt={feat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-85"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 p-4 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary/90 text-white backdrop-blur-xs">
                    {feat.platform}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900">
                    ★ {feat.rating}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-bold text-sm text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] text-indigo-200 line-clamp-1">
                    By {feat.provider} • {feat.duration}
                  </p>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400">
                      {feat.pricingType}
                    </span>
                    <a
                      href={feat.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-white hover:text-amber-300 flex items-center gap-1"
                    >
                      Explore <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white border border-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-surface-container-high">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Python, Java, DSA, Web..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-medium text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Pricing filter */}
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-semibold text-on-surface focus:outline-none"
            >
              <option value="all">All Pricing</option>
              <option value="100% Free">100% Free</option>
              <option value="Free to Audit">Free to Audit</option>
              <option value="Paid">Paid / Affordable</option>
            </select>

            {/* Difficulty filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-semibold text-on-surface focus:outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Saved Toggle */}
            <button
              onClick={() => setOnlySaved(!onlySaved)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                onlySaved
                  ? 'bg-purple-100 border-purple-300 text-purple-900 font-bold'
                  : 'bg-surface-container-low border-surface-container-high text-outline hover:text-on-surface'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Bookmarked ({savedCourseIds.length})
            </button>
          </div>
        </div>
      </div>

      {/* 3. Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isSaved = savedCourseIds.includes(course.id);
          const currentProgress = enrolledCourseProgress[course.id] ?? (course.progressPercent ?? 0);
          const isEnrolled = currentProgress > 0 || course.inProgress;

          return (
            <div
              key={course.id}
              className="rounded-3xl bg-white border border-surface-container-high hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Course Cover Image Banner */}
              <div className="h-44 sm:h-48 overflow-hidden bg-slate-900 relative">
                <img
                  src={course.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top overlay badges */}
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {course.platform}
                  </span>
                  {course.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 shadow-xs">
                      ★ {course.badge}
                    </span>
                  )}
                </div>

                {/* Floating Bookmark Button on Image */}
                <button
                  onClick={() => onToggleSaveCourse(course.id)}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md z-10 transition-all ${
                    isSaved ? 'bg-purple-600 text-white shadow-md' : 'bg-black/50 text-white hover:bg-black/70'
                  }`}
                  title={isSaved ? 'Saved' : 'Bookmark course'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                </button>

                {/* Bottom Overlay Row on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md ${
                    course.pricingType === '100% Free'
                      ? 'bg-emerald-500/90 text-white'
                      : course.pricingType === 'Free to Audit'
                      ? 'bg-blue-500/90 text-white'
                      : 'bg-amber-500/90 text-stone-900'
                  }`}>
                    {course.pricingType}
                  </span>
                  <span className="text-[11px] font-semibold text-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md bg-black/40">
                    {course.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Header row */}
                <div>
                  <h3 className="font-display font-bold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-outline mt-1">
                    <span>By <strong className="text-on-surface">{course.provider}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {course.rating}
                    </span>
                    <span>•</span>
                    <span className="text-[11px] font-medium text-outline">
                      {course.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Topics Pills */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-outline">Key Topics</p>
                  <div className="flex flex-wrap gap-1">
                    {course.topics.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-container-low text-on-surface">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Progress Tracking Slider */}
                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-on-surface flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-primary" />
                      Completion Progress
                    </span>
                    <span className="font-extrabold text-primary">{currentProgress}%</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={currentProgress}
                    onChange={(e) => onUpdateCourseProgress(course.id, Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-surface-container-high rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-outline">
                    <span>Not Started</span>
                    <span>Halfway</span>
                    <span>Completed ✓</span>
                  </div>
                </div>
              </div>

              {/* Bottom footer button */}
              <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
                <span className="text-[11px] text-outline">
                  {course.certificateIncluded ? '📜 Certificate Available' : '🎓 Audit Knowledge'}
                </span>

                <a
                  href={course.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs hover:shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                >
                  Go to Official Course
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-surface-container-high">
          <BookOpen className="w-12 h-12 text-outline mx-auto mb-3 opacity-40" />
          <h3 className="font-bold text-base text-on-surface">No courses found</h3>
          <p className="text-xs text-outline mt-1 max-w-sm mx-auto">
            Try adjusting your category, price filter, or search term.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPricing('all');
              setSelectedDifficulty('all');
              setOnlySaved(false);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* 4. AI Course Matcher Modal */}
      {showAiMatcherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden">
            <div className="p-5 border-b border-surface-container-high flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-on-surface">
                    Mitra AI Course Matcher
                  </h3>
                  <p className="text-xs text-outline">Personalized sequence for your exact targets</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiMatcherModal(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-950 space-y-2">
                <p className="font-bold">🎯 Recommended SDE Curriculum Order for Computer Science & Engineering (M.Tech / B.Tech):</p>
                <ol className="list-decimal pl-4 space-y-1.5 text-on-surface">
                  <li>
                    <strong>Step 1 (DSA Core):</strong> <em>TakeUForward Striver A2Z DSA Sheet</em> (100% Free) — Solves 80% of placement OA patterns.
                  </li>
                  <li>
                    <strong>Step 2 (Modern Web):</strong> <em>The Complete Web Development Bootcamp (Angela Yu)</em> or <em>freeCodeCamp Responsive Web & JavaScript</em>.
                  </li>
                  <li>
                    <strong>Step 3 (Core CS Exams):</strong> <em>NPTEL Operating Systems & DBMS (IIT KGP/Madras)</em> for interview technical grilling.
                  </li>
                  <li>
                    <strong>Step 4 (Aptitude Rounds):</strong> <em>Complete Quantitative Aptitude drills on PrepInsta</em>.
                  </li>
                </ol>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <span className="text-outline">Want to ask custom questions?</span>
                <button
                  onClick={() => {
                    setShowAiMatcherModal(false);
                    onOpenAdvisor();
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-700 text-white font-bold hover:bg-purple-800 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  Chat with Mitra AI Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
