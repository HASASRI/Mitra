import React, { useState } from 'react';
import { 
  UserProfile, 
  Platform, 
  Course, 
  RoadmapPhase, 
  Project, 
  TabType,
  PlacementDrive,
  AuthUser
} from '../types';
import { PomodoroWidget } from './PomodoroWidget';
import { PhotoUploadModal } from './PhotoUploadModal';
import { PlatformLogo, CompanyLogo } from './BrandLogos';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Target, 
  Code2, 
  BookOpen, 
  Layers, 
  Compass, 
  Award, 
  Briefcase, 
  TrendingUp,
  Bookmark,
  ChevronRight,
  Zap,
  BarChart2,
  Timer,
  Camera,
  LogIn
} from 'lucide-react';

interface DashboardViewProps {
  profile: UserProfile;
  platforms: Platform[];
  courses: Course[];
  roadmapPhases: RoadmapPhase[];
  projects: Project[];
  placementDrives: PlacementDrive[];
  savedPlatformIds: string[];
  savedCourseIds: string[];
  savedProjectIds: string[];
  authUser?: AuthUser | null;
  onOpenAuthModal?: () => void;
  onToggleSavePlatform: (id: string) => void;
  onToggleSaveCourse: (id: string) => void;
  onToggleSaveProject: (id: string) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenAdvisor: () => void;
  onLogStudyTime?: (hours: number) => void;
  onUpdateProfile?: (updated: UserProfile) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  platforms,
  courses,
  roadmapPhases,
  projects,
  placementDrives,
  savedPlatformIds,
  savedCourseIds,
  savedProjectIds,
  authUser = null,
  onOpenAuthModal = () => {},
  onToggleSavePlatform,
  onToggleSaveCourse,
  onToggleSaveProject,
  onNavigateTab,
  onOpenSearch,
  onOpenAdvisor,
  onLogStudyTime,
  onUpdateProfile,
}) => {
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);

  // Pomodoro timer toggle state (persisted)
  const [showPomodoro, setShowPomodoro] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mitra_pomodoro_widget_open');
      return saved !== null ? saved === 'true' : true;
    } catch (e) {
      return true;
    }
  });

  const handleTogglePomodoro = () => {
    setShowPomodoro((prev) => {
      const nextVal = !prev;
      try {
        localStorage.setItem('mitra_pomodoro_widget_open', String(nextVal));
      } catch (e) {}
      return nextVal;
    });
  };

  // Top recommended platforms
  const recommendedPlatforms = platforms.slice(0, 4);
  // Top recommended courses
  const recommendedCourses = courses.slice(0, 3);
  // Suggested projects
  const suggestedProjects = projects.slice(0, 2);
  // Upcoming placement drive
  const urgentDrives = placementDrives.slice(0, 3);

  // Active roadmap phase
  const activePhase = roadmapPhases.find(p => p.number === 2) || roadmapPhases[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero Welcome & Readiness Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e1470] via-[#3525cd] to-[#4f46e5] text-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-primary/15">
        {/* Decorative backdrop elements */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-20 w-64 h-64 rounded-full bg-indigo-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            {/* Student Avatar + Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
              <div className="relative group shrink-0 self-start sm:self-auto">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl object-cover ring-4 ring-white/25 shadow-xl group-hover:brightness-95 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=3525cd&color=fff&size=128`;
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(true)}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 shadow-md transition-all active:scale-95"
                  title="Upload or Change Your Profile Picture"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide border border-white/20 mb-1.5 flex-wrap">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Campus Placement Cohort</span>
                  <span className="text-amber-300">•</span>
                  <span>{profile.year} • {profile.semester}</span>
                  <span className="text-amber-300">•</span>
                  <span>Target Graduation {profile.graduationDate}</span>
                </div>

                <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
                  Welcome back, {profile.name}! 👋
                </h1>
                <p className="text-indigo-200 text-base sm:text-lg font-semibold">
                  Your path to {profile.primaryGoal} is on track.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(true)}
                  className="mt-1 text-xs text-amber-300 hover:text-white font-bold inline-flex items-center gap-1.5 hover:underline"
                >
                  <Camera className="w-3 h-3" />
                  Upload Profile Picture
                </button>
              </div>
            </div>

            <p className="text-indigo-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              {profile.degree} student at {profile.college}. Keep up your {profile.dailyStreakDays}-day streak—you are preparing for {profile.targetCompanyTypes.join(', ')} with target CTC {profile.expectedCtcRange}.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {!authUser && (
                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm hover:bg-slate-100 shadow-lg active:scale-95 transition-all flex items-center gap-2 border border-white"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              )}
              <button
                onClick={() => onNavigateTab('roadmap')}
                className="px-4 py-2.5 rounded-xl bg-white text-primary font-bold text-xs sm:text-sm hover:bg-indigo-50 shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                View Career Roadmap
              </button>
              <button
                onClick={() => onNavigateTab('placements')}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/25 active:scale-95 transition-all flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                Placement Hub
              </button>
              <button
                onClick={handleTogglePomodoro}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm backdrop-blur-md border active:scale-95 transition-all flex items-center gap-2 ${
                  showPomodoro
                    ? 'bg-amber-400 text-stone-900 border-amber-300 shadow-md hover:bg-amber-300'
                    : 'bg-white/15 hover:bg-white/25 text-white border-white/25'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{showPomodoro ? 'Pomodoro Active' : 'Pomodoro Timer'}</span>
              </button>
              <button
                onClick={onOpenAdvisor}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-stone-900" />
                Ask Mitra AI
              </button>
            </div>
          </div>

          {/* Readiness & KPI Card */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-indigo-200">
                Placement Readiness
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Tier-1 Ready
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span 
                className="font-display text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(52,211,153,0.35)] select-none inline-block transition-all duration-300 hover:scale-105 cursor-default"
                title={`Placement Readiness Score: ${profile.readinessScore ?? 90}%`}
              >
                {profile.readinessScore ?? 90}%
              </span>
              <span className="text-xs text-indigo-200 font-medium">
                Overall Profile Strength
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-black/20 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-teal-300 h-2.5 rounded-full transition-all duration-1000"
                style={{ width: `${profile.readinessScore ?? 90}%` }}
              />
            </div>

            {/* KPI 3-column grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/15 text-center">
              <div>
                <p className="text-lg font-bold font-display">{profile.leetCodeSolved}</p>
                <p className="text-[10px] text-indigo-200 uppercase font-medium">LC Solved</p>
              </div>
              <div className="border-x border-white/15">
                <p className="text-lg font-bold font-display">{profile.atsScore}/100</p>
                <p className="text-[10px] text-indigo-200 uppercase font-medium">ATS Score</p>
              </div>
              <div>
                <p className="text-lg font-bold font-display">{profile.weeklyLoggedHours}h</p>
                <p className="text-[10px] text-indigo-200 uppercase font-medium">This Week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Access Shortcut Pills */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            title: 'Coding Practice',
            sub: 'LeetCode & CodeChef',
            icon: <Code2 className="w-5 h-5 text-indigo-600" />,
            tab: 'platforms' as TabType,
            bg: 'bg-indigo-50/70 hover:bg-indigo-100/70 border-indigo-100',
          },
          {
            title: 'Curated Courses',
            sub: 'DSA, Web & AI/ML',
            icon: <BookOpen className="w-5 h-5 text-purple-600" />,
            tab: 'courses' as TabType,
            bg: 'bg-purple-50/70 hover:bg-purple-100/70 border-purple-100',
          },
          {
            title: 'Campus Drives',
            sub: 'TCS, Amazon & Infosys',
            icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
            tab: 'placements' as TabType,
            bg: 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-100',
          },
          {
            title: 'Career Roadmap',
            sub: '4-Phase SDE Plan',
            icon: <Compass className="w-5 h-5 text-amber-600" />,
            tab: 'roadmap' as TabType,
            bg: 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-100',
          },
          {
            title: 'Capstone Projects',
            sub: 'Full Stack & Cloud',
            icon: <Layers className="w-5 h-5 text-blue-600" />,
            tab: 'projects' as TabType,
            bg: 'bg-blue-50/70 hover:bg-blue-100/70 border-blue-100',
          },
          {
            title: 'ATS Resume',
            sub: 'Score & Keyword Scan',
            icon: <Award className="w-5 h-5 text-rose-600" />,
            tab: 'profile' as TabType,
            bg: 'bg-rose-50/70 hover:bg-rose-100/70 border-rose-100',
          },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => onNavigateTab(item.tab)}
            className={`p-3.5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs group ${item.bg}`}
          >
            <div className="p-2 rounded-xl bg-white shadow-2xs w-fit mb-2.5 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <p className="font-bold text-xs text-on-surface line-clamp-1">{item.title}</p>
            <p className="text-[10px] text-outline font-medium line-clamp-1 mt-0.5">{item.sub}</p>
          </button>
        ))}
      </section>

      {/* 3. Main Dashboard Body: Left Column (Roadmap & Recommended) + Right Column (Weekly Tracker & Drives) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: 8 Cols */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* A. Active Roadmap Sprint Section */}
          <section className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                  CURRENT SPRINT • PHASE 2
                </span>
                <h2 className="font-display font-bold text-lg text-on-surface mt-1">
                  {activePhase.title}
                </h2>
                <p className="text-xs text-outline">{activePhase.period} • {activePhase.description}</p>
              </div>
              <button
                onClick={() => onNavigateTab('roadmap')}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group shrink-0"
              >
                Full Roadmap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Milestones list in this phase */}
            <div className="space-y-3">
              {activePhase.milestones.map((m) => {
                const isDone = m.status === 'completed';
                const isInProgress = m.status === 'in_progress';

                return (
                  <div
                    key={m.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-surface-container-lowest border-surface-container-high opacity-85'
                        : isInProgress
                        ? 'bg-primary/5 border-primary/30 shadow-2xs'
                        : 'bg-white border-surface-container-high'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                          ) : isInProgress ? (
                            <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-outline/40" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-on-surface">{m.title}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                              isDone ? 'bg-emerald-100 text-emerald-800' : isInProgress ? 'bg-indigo-100 text-indigo-800' : 'bg-surface-container text-outline'
                            }`}>
                              {isDone ? 'Done' : isInProgress ? 'In Progress' : 'Upcoming'}
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                            {m.description}
                          </p>

                          {/* Checklist preview for in-progress milestone */}
                          {m.checklist && (
                            <div className="mt-2.5 space-y-1.5 pl-1 border-l-2 border-primary/20">
                              {m.checklist.slice(0, 3).map((item) => (
                                <div key={item.id} className="flex items-center gap-2 text-xs">
                                  <input 
                                    type="checkbox" 
                                    checked={item.done} 
                                    readOnly 
                                    className="rounded border-primary/40 text-primary w-3.5 h-3.5"
                                  />
                                  <span className={item.done ? 'line-through text-outline' : 'text-on-surface'}>
                                    {item.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {m.estimatedHours && (
                        <span className="text-[10px] font-medium text-outline whitespace-nowrap bg-surface-container px-2 py-1 rounded-lg">
                          {m.estimatedHours}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* B. Recommended Platforms Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-on-surface">
                  Essential Platforms for {profile.branch}
                </h2>
                <p className="text-xs text-outline">
                  Curated coding, development, and cloud practice platforms
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('platforms')}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group"
              >
                Browse all {platforms.length} platforms <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedPlatforms.map((platform) => {
                const isSaved = savedPlatformIds.includes(platform.id);
                return (
                  <div
                    key={platform.id}
                    className="p-4 rounded-2xl bg-white border border-surface-container-high hover:border-primary/40 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-white border border-surface-container-high p-1.5 flex items-center justify-center shadow-2xs shrink-0 overflow-hidden">
                            <PlatformLogo id={platform.id} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-on-surface">{platform.name}</h3>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-container text-outline">
                              {platform.category.toUpperCase()} • {platform.difficulty}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onToggleSavePlatform(platform.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSaved ? 'text-primary bg-primary/10' : 'text-outline hover:text-on-surface hover:bg-surface-container'
                          }`}
                          title={isSaved ? 'Bookmarked' : 'Save platform'}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-primary' : ''}`} />
                        </button>
                      </div>

                      <p className="text-xs text-on-surface-variant mt-3 line-clamp-2">
                        {platform.bestFor}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {platform.keyFeatures.slice(0, 2).map((feat, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium text-outline bg-surface-container-low px-2 py-0.5 rounded-md"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-surface-container-high flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {platform.costTier}
                      </span>
                      <a
                        href={platform.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        Visit Official <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* C. Curated Recommended Courses */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-on-surface">
                  Recommended Courses for SDE-1
                </h2>
                <p className="text-xs text-outline">
                  Hand-picked high-quality courses with genuine completion tracking
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('courses')}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group"
              >
                All Courses <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="space-y-3">
              {recommendedCourses.map((course) => {
                const isSaved = savedCourseIds.includes(course.id);
                return (
                  <div
                    key={course.id}
                    className="p-4 rounded-2xl bg-white border border-surface-container-high hover:border-purple-300 hover:shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-on-surface">{course.title}</span>
                        {course.badge && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                            {course.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-outline">
                        By <span className="font-semibold text-on-surface">{course.provider}</span> • {course.platform} • {course.duration} • ★ {course.rating}
                      </p>

                      <p className="text-xs text-on-surface-variant line-clamp-1">
                        {course.description}
                      </p>

                      {/* Course progress if active */}
                      {course.inProgress && (
                        <div className="pt-1 flex items-center gap-2">
                          <div className="w-36 bg-surface-container-high rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${course.progressPercent}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-primary">
                            {course.progressPercent}% Completed
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => onToggleSaveCourse(course.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          isSaved ? 'text-purple-600 bg-purple-50' : 'text-outline hover:text-on-surface hover:bg-surface-container'
                        }`}
                        title="Bookmark course"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-purple-600' : ''}`} />
                      </button>

                      <a
                        href={course.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5"
                      >
                        Open Course <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* D. Suggested Recruiter Capstones */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-on-surface">
                  Suggested Capstone Projects
                </h2>
                <p className="text-xs text-outline">
                  Stand out in technical interviews with high-impact systems projects
                </p>
              </div>
              <button
                onClick={() => onNavigateTab('projects')}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 group"
              >
                Project Hub <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suggestedProjects.map((p) => {
                const isSaved = savedProjectIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="group rounded-2xl bg-white border border-surface-container-high overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="h-32 overflow-hidden bg-surface-container-high relative">
                      <img 
                        src={p.thumbnailUrl} 
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback stylish banner
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                          {p.tier}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-sm text-on-surface line-clamp-1">{p.title}</h3>
                        <button
                          onClick={() => onToggleSaveProject(p.id)}
                          className={`p-1 rounded-md shrink-0 ${
                            isSaved ? 'text-primary' : 'text-outline hover:text-on-surface'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-primary' : ''}`} />
                        </button>
                      </div>

                      <p className="text-xs text-outline line-clamp-2">
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.techStack.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface-container text-on-surface-variant"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-primary">
                        {p.statusText}
                      </span>
                      <button
                        onClick={() => onNavigateTab('projects')}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        Implementation Steps <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Side: 4 Cols Widgets */}
        <div className="lg:col-span-4 space-y-6">

          {/* 0. Pomodoro Study Timer Widget */}
          {showPomodoro ? (
            <PomodoroWidget
              isOpen={true}
              onToggle={handleTogglePomodoro}
              onLogStudyTime={onLogStudyTime}
            />
          ) : (
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-white rounded-3xl p-4 sm:p-5 border border-indigo-200/80 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xs">
                  <Clock className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-on-surface">
                    Pomodoro Study Timer
                  </h4>
                  <p className="text-[11px] text-outline">
                    25-min focused study intervals for SDE prep
                  </p>
                </div>
              </div>
              <button
                onClick={handleTogglePomodoro}
                className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs active:scale-95 transition-all shrink-0"
              >
                Start Timer
              </button>
            </div>
          )}

          {/* 1. Daily Practice & LeetCode Sync */}
          <div className="bg-white rounded-3xl p-5 border border-surface-container-high shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                Practice Activity
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {profile.dailyStreakDays} Days Streak 🔥
              </span>
            </div>

            {/* Daily Hours Bar Chart */}
            <div>
              <p className="text-xs text-outline mb-2">Weekly Study Hours ({profile.weeklyLoggedHours}/{profile.weeklyGoalHours} hrs goal)</p>
              <div className="flex items-end justify-between h-20 gap-1.5 pt-2 border-b border-surface-container-high pb-1">
                {profile.dailyHours.map((d, idx) => {
                  const maxH = 4.0;
                  const heightPercent = Math.min(100, (d.hours / maxH) * 100);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-surface-container rounded-t-md h-16 flex items-end justify-center p-0.5">
                        <div 
                          className={`w-full rounded-t-sm transition-all duration-500 ${
                            d.isToday ? 'bg-primary' : d.hours > 0 ? 'bg-indigo-300' : 'bg-transparent'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                          title={`${d.day}: ${d.hours} hours`}
                        />
                      </div>
                      <span className={`text-[10px] font-bold ${d.isToday ? 'text-primary' : 'text-outline'}`}>
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LeetCode & Coding Accounts snapshot */}
            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white border border-surface-container-high p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                    <PlatformLogo id="leetcode" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">LeetCode</p>
                    <p className="text-[11px] text-outline">@{profile.leetCodeUsername} • Contest {profile.leetCodeRating}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-amber-600">{profile.leetCodeSolved} Solved</p>
                  <p className="text-[10px] text-outline">Top 18%</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white border border-surface-container-high p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                    <PlatformLogo id="github" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">GitHub</p>
                    <p className="text-[11px] text-outline">@{profile.gitHubUsername} • {profile.gitHubRepos} repos</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-600">{profile.gitHubCommitsThisWeek} Commits</p>
                  <p className="text-[10px] text-outline">This week</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Urgent Placement Drives Countdown */}
          <div className="bg-white rounded-3xl p-5 border border-surface-container-high shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-rose-600" />
                Active Placement Drives
              </span>
              <button
                onClick={() => onNavigateTab('placements')}
                className="text-[11px] font-bold text-primary hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {urgentDrives.map((drive) => (
                <div
                  key={drive.id}
                  className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high hover:border-primary/30 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-white border border-surface-container-high p-0.5 shrink-0 overflow-hidden">
                        <CompanyLogo codeOrName={drive.company} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-xs text-on-surface">{drive.company}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      {drive.deadlineText}
                    </span>
                  </div>
                  <p className="text-xs text-outline line-clamp-1">{drive.programRole}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-outline">{drive.eligibleBatches}</span>
                    <a
                      href={drive.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Apply <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Daily Placement Problem of the Day */}
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl p-5 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between text-indigo-300 text-xs">
              <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Daily DSA Challenge
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-800 text-[10px] font-semibold">
                Medium
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white">
                3Sum & Two Pointer Optimization
              </h3>
              <p className="text-xs text-indigo-200/80 mt-1 leading-relaxed">
                Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i ≠ j ≠ k and sum is 0. Avoid duplicate triplets!
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-indigo-800/80 text-xs">
              <span className="text-indigo-300 text-[11px]">Asked at Amazon, Microsoft, TCS</span>
              <a
                href="https://leetcode.com/problems/3sum/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-1"
              >
                Solve on LeetCode <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 4. Mitra AI Coach Mini Card */}
          <div className="bg-gradient-to-tr from-purple-100 via-indigo-50 to-white rounded-3xl p-5 border border-purple-200/70 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-on-surface">Mitra Placement AI</h3>
                <p className="text-[10px] text-outline">Instant career & interview advice</p>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Have doubts about campus drives, resume keywords, or choosing between C++ vs Java? Ask your Mitra AI companion anytime.
            </p>

            <button
              onClick={onOpenAdvisor}
              className="w-full py-2 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs hover:shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Ask AI Companion
            </button>
          </div>

        </div>
      </div>

      {/* Photo Upload Modal */}
      {onUpdateProfile && (
        <PhotoUploadModal
          isOpen={showPhotoModal}
          onClose={() => setShowPhotoModal(false)}
          currentAvatarUrl={profile.avatarUrl}
          userName={profile.name}
          onSaveAvatar={(newUrl) => {
            onUpdateProfile({
              ...profile,
              avatarUrl: newUrl,
            });
          }}
        />
      )}
    </div>
  );
};
