import React, { useState } from 'react';
import { 
  UserProfile, 
  Platform, 
  Course, 
  Project, 
  TabType 
} from '../types';
import { scanResumeAts, AtsScanResponse } from '../services/aiService';
import { PhotoUploadModal } from './PhotoUploadModal';
import { Badges } from './Badges';
import { ResumeBuilder } from './ResumeBuilder';
import { 
  UserCircle, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Award, 
  Bookmark, 
  Flame, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Send, 
  X,
  Plus,
  Trash2,
  FileText,
  BarChart2,
  Camera,
  Upload,
  Image as ImageIcon,
  Trophy,
  ShieldCheck
} from 'lucide-react';
import { AuthUser } from '../types';
import { AccountSecuritySection } from './AccountSecuritySection';

interface ProfileViewProps {
  profile: UserProfile;
  platforms: Platform[];
  courses: Course[];
  projects: Project[];
  savedPlatformIds: string[];
  savedCourseIds: string[];
  savedProjectIds: string[];
  enrolledCourseProgress: Record<string, number>;
  authUser?: AuthUser | null;
  onSignOut?: () => void;
  onOpenAuthModal?: () => void;
  onUpdateProfile: (updated: UserProfile) => void;
  onToggleSavePlatform: (id: string) => void;
  onToggleSaveCourse: (id: string) => void;
  onToggleSaveProject: (id: string) => void;
  onUpdateCourseProgress: (id: string, progress: number) => void;
  onNavigateTab: (tab: TabType) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  platforms,
  courses,
  projects,
  savedPlatformIds,
  savedCourseIds,
  savedProjectIds,
  enrolledCourseProgress,
  authUser = null,
  onSignOut = () => {},
  onOpenAuthModal = () => {},
  onUpdateProfile,
  onToggleSavePlatform,
  onToggleSaveCourse,
  onToggleSaveProject,
  onUpdateCourseProgress,
  onNavigateTab,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'resume' | 'saved' | 'ats' | 'security' | 'settings'>('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>({ ...profile });

  // ATS Scanner state
  const [resumeText, setResumeText] = useState(
    'Built a collaborative web application using React, Node.js, and WebSockets. Implemented authentication with JWT and connected PostgreSQL database.'
  );
  const [isScanningAts, setIsScanningAts] = useState(false);
  const [atsResult, setAtsResult] = useState<AtsScanResponse | null>(null);

  // Saved items
  const savedPlatformsList = platforms.filter(p => savedPlatformIds.includes(p.id));
  const savedCoursesList = courses.filter(c => savedCourseIds.includes(c.id));
  const savedProjectsList = projects.filter(p => savedProjectIds.includes(p.id));

  // Avatar Preset Options
  const AVATAR_PRESETS = [
    { label: 'Engineering Student', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { label: 'Coder with Glasses', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' },
    { label: 'Software Developer', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { label: 'AI Researcher', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
    { label: 'Initials Monogram', url: `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=3525cd&color=fff&size=256` },
  ];

  // Helper to read & compress uploaded photo safely for localStorage
  const compressAndReadImage = (file: File, callback: (base64Url: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawUrl = event.target?.result as string;
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          callback(compressed);
        } else {
          callback(rawUrl);
        }
      };
      img.src = rawUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDirectPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndReadImage(file, (base64Url) => {
        onUpdateProfile({
          ...profile,
          avatarUrl: base64Url,
        });
      });
    }
  };

  const handleSaveProfileForm = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    setIsEditingProfile(false);
  };

  const handleRunAtsScan = async () => {
    if (!resumeText.trim()) return;
    setIsScanningAts(true);
    try {
      const result = await scanResumeAts(resumeText, profile.primaryGoal);
      setAtsResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanningAts(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Profile Banner */}
      <div className="bg-gradient-to-r from-surface-container-low via-surface to-surface-container rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative group">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-primary/20 shadow-md group-hover:brightness-90 transition-all"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=3525cd&color=fff&size=128`;
                }}
              />
              
              {/* Hover upload trigger overlay */}
              <button 
                type="button"
                onClick={() => setShowPhotoModal(true)}
                className="absolute inset-0 bg-black/50 text-white rounded-3xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity z-10 backdrop-blur-xs"
                title="Click to Upload Profile Picture"
              >
                <Camera className="w-5 h-5 text-white" />
                <span className="text-[10px] font-bold mt-0.5">Upload</span>
              </button>

              <span className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-amber-400 text-stone-900 shadow-xs z-20" title="Daily Streak Active">
                <Flame className="w-4 h-4 fill-amber-700 text-amber-700" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-on-surface">
                  {profile.name}
                </h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  {profile.rollNo}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-primary">
                {profile.primaryGoal} • Expected {profile.expectedCtcRange}
              </p>
              <p className="text-xs text-outline">
                {profile.degree} • {profile.college}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={() => setShowPhotoModal(true)}
              className="px-3.5 py-2.5 rounded-xl bg-white border border-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container shadow-2xs active:scale-95 transition-all flex items-center gap-2"
            >
              <Camera className="w-3.5 h-3.5 text-primary" />
              <span>Upload Photo</span>
            </button>

            <button
              onClick={() => {
                setEditForm({ ...profile });
                setIsEditingProfile(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs hover:shadow-xs transition-all flex items-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="pt-6 mt-6 border-t border-surface-container-high flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Academic', icon: <UserCircle className="w-3.5 h-3.5" /> },
            { id: 'resume', label: 'Resume & ATS Builder', icon: <FileText className="w-3.5 h-3.5" />, highlight: true },
            { id: 'badges', label: 'Badges & Achievements', icon: <Trophy className="w-3.5 h-3.5" /> },
            { id: 'saved', label: `Saved Resources (${savedPlatformIds.length + savedCourseIds.length + savedProjectIds.length})`, icon: <Bookmark className="w-3.5 h-3.5" /> },
            { id: 'ats', label: 'Quick ATS Bullet Scanner', icon: <Award className="w-3.5 h-3.5" /> },
            { id: 'security', label: 'Security & Account', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white border border-surface-container-high text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.highlight && activeTab !== tab.id && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Tab: Overview & Academic Info */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Academic & Career Goals */}
          <div className="lg:col-span-8 space-y-6">
            {/* Academic Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Academic Profile
                </h3>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  CGPA: {profile.cgpa} / 10
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-outline font-medium">Institution:</span>
                  <p className="font-bold text-on-surface mt-0.5">{profile.college}</p>
                </div>
                <div>
                  <span className="text-outline font-medium">Degree & Program:</span>
                  <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <p className="font-bold text-on-surface">{profile.degree}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold border border-purple-200">
                      {profile.degreeType || (profile.degree?.toLowerCase().includes('m.tech') || profile.degree?.toLowerCase().includes('mtech') ? 'M.Tech (2 Years • 4 Semesters)' : '4-Year Degree')}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-outline font-medium">Current Status:</span>
                  <p className="font-bold text-primary mt-0.5">
                    {profile.year} • {profile.semester}
                  </p>
                </div>
                <div>
                  <span className="text-outline font-medium">Target Graduation:</span>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <p className="font-bold text-on-surface">{profile.graduationDate}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                      2-Year Program
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Career & CTC Preferences */}
            <div className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Career Ambitions & CTC Target
                </h3>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-primary border border-indigo-200">
                  {profile.expectedCtcRange}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-outline font-medium">Primary Goal:</span>
                  <p className="font-bold text-base text-on-surface mt-0.5">{profile.primaryGoal}</p>
                </div>

                <div>
                  <span className="text-outline font-medium">Target Company Tiers:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {profile.targetCompanyTypes.map((tier, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-semibold text-xs">
                        {tier}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-outline font-medium">Secondary Roles of Interest:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {profile.secondaryRoles.map((role, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant font-medium text-xs">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Coding Handles & Activity */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coding Accounts Card */}
            <div className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs space-y-4">
              <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Connected Profiles
              </h3>

              <div className="space-y-3 text-xs">
                {/* LeetCode */}
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">LeetCode</span>
                    <span className="font-extrabold text-amber-600">{profile.leetCodeSolved} Solved</span>
                  </div>
                  <p className="text-outline">@{profile.leetCodeUsername} • Rating: {profile.leetCodeRating}</p>
                </div>

                {/* GitHub */}
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">GitHub</span>
                    <span className="font-extrabold text-emerald-600">{profile.gitHubCommitsThisWeek} Commits</span>
                  </div>
                  <p className="text-outline">@{profile.gitHubUsername} • {profile.gitHubRepos} Public Repos</p>
                </div>

                {/* HackerRank */}
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-on-surface">HackerRank</span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Gold
                    </span>
                  </div>
                  <p className="text-outline">{profile.hackerRankBadge}</p>
                </div>
              </div>
            </div>

            {/* Weekly Study Goal Meter */}
            <div className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-on-surface flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  Weekly Study Target
                </span>
                <span className="font-extrabold text-primary">
                  {profile.weeklyLoggedHours} / {profile.weeklyGoalHours} hrs
                </span>
              </div>

              <div className="w-full bg-surface-container-high rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (profile.weeklyLoggedHours / profile.weeklyGoalHours) * 100)}%` }}
                />
              </div>

              <p className="text-[11px] text-outline">
                {profile.weeklyGoalHours - profile.weeklyLoggedHours > 0
                  ? `${profile.weeklyGoalHours - profile.weeklyLoggedHours} hours remaining this week to reach your goal.`
                  : 'Weekly target achieved! Keep up the momentum! 🎉'}
              </p>
            </div>

            {/* Badges Spotlight Preview Card */}
            <div className="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/60 rounded-3xl p-6 border border-indigo-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-indigo-950 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Recent Badges
                </h3>
                <button
                  onClick={() => setActiveTab('badges')}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View All (14) →
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs text-on-surface truncate">10 Hours Studied</p>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Unlocked
                      </span>
                    </div>
                    <p className="text-[11px] text-outline truncate">{profile.weeklyLoggedHours} hrs logged this week</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs text-on-surface truncate">5 Projects Completed</p>
                      <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                        2 / 5 Shipped
                      </span>
                    </div>
                    <p className="text-[11px] text-outline truncate">3 more to unlock FAANG badge</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-indigo-100 shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs text-on-surface truncate">DSA Master</p>
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        {profile.leetCodeSolved} / 150
                      </span>
                    </div>
                    <p className="text-[11px] text-outline truncate">8 more problems to Gold badge</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('badges')}
                className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-indigo-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Open Accomplishments Hub</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2.4 Tab: Resume & ATS Builder */}
      {activeTab === 'resume' && (
        <ResumeBuilder
          profile={profile}
          projects={projects}
          onUpdateProfile={onUpdateProfile}
        />
      )}

      {/* 2.5 Tab: Badges & Gamified Achievements */}
      {activeTab === 'badges' && (
        <Badges 
          profile={profile}
          completedProjectsCount={2}
          totalProjectsCount={projects.length}
          savedResourcesCount={savedPlatformIds.length + savedCourseIds.length + savedProjectIds.length}
        />
      )}

      {/* 3. Tab: Saved Resources Hub */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          {/* Saved Platforms */}
          <div className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-base text-on-surface">
              Saved Platforms ({savedPlatformsList.length})
            </h3>
            {savedPlatformsList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPlatformsList.map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white border border-surface-container-high p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        {p.logoUrl ? (
                          <img src={p.logoUrl} alt={p.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="font-bold text-[10px] text-primary">{p.shortCode}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-on-surface truncate">{p.name}</h4>
                        <p className="text-[11px] text-outline truncate">{p.category} • {p.costTier}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a href={p.officialUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-primary hover:bg-white">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button onClick={() => onToggleSavePlatform(p.id)} className="p-1.5 rounded-lg text-rose-600 hover:bg-white" title="Remove bookmark">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-outline">No platforms saved yet. Explore the Platforms directory to bookmark your tools!</p>
            )}
          </div>

          {/* Saved / Enrolled Courses */}
          <div className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-base text-on-surface">
              Enrolled & Saved Courses ({savedCoursesList.length})
            </h3>
            {savedCoursesList.length > 0 ? (
              <div className="space-y-3">
                {savedCoursesList.map((c) => {
                  const progress = enrolledCourseProgress[c.id] ?? (c.progressPercent ?? 0);
                  return (
                    <div key={c.id} className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-xs text-on-surface">{c.title}</h4>
                        <p className="text-[11px] text-outline">{c.provider} • {c.duration} • {c.pricingType}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={progress}
                            onChange={(e) => onUpdateCourseProgress(c.id, Number(e.target.value))}
                            className="w-32 accent-primary h-1.5 bg-surface-container-high rounded cursor-pointer"
                          />
                          <span className="text-[10px] font-bold text-primary">{progress}% Complete</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <a href={c.officialUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1">
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                        <button onClick={() => onToggleSaveCourse(c.id)} className="p-1.5 rounded-xl text-rose-600 hover:bg-white">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-outline">No courses bookmarked yet.</p>
            )}
          </div>

          {/* Saved Projects */}
          <div className="bg-white rounded-3xl p-6 border border-surface-container-high shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-base text-on-surface">
              Tracked Projects ({savedProjectsList.length})
            </h3>
            {savedProjectsList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedProjectsList.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-xs text-on-surface">{p.title}</h4>
                        <button onClick={() => onToggleSaveProject(p.id)} className="text-rose-600 hover:text-rose-800">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-outline mt-1 line-clamp-2">{p.description}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-surface-container-high flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-primary">{p.statusText}</span>
                      <button onClick={() => onNavigateTab('projects')} className="text-primary font-bold hover:underline">
                        View Blueprint
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-outline">No projects saved yet.</p>
            )}
          </div>
        </div>
      )}

      {/* 4. Tab: ATS Resume Scanner */}
      {activeTab === 'ats' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-high">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                AI RECRUITER ENGINE
              </span>
              <h2 className="font-display font-bold text-xl text-on-surface mt-1">
                ATS Resume & Project Bullet Analyzer
              </h2>
              <p className="text-xs text-outline">
                Paste your resume summary or project bullet points to evaluate ATS match rate for {profile.primaryGoal}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-outline">Target Role:</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-xl">
                {profile.primaryGoal}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface">Paste Resume Bullets or Project Description:</label>
            <textarea
              rows={5}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here (e.g. Architected full-stack web application...)"
              className="w-full p-4 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary resize-y"
            />

            <div className="flex justify-end">
              <button
                onClick={handleRunAtsScan}
                disabled={isScanningAts || !resumeText.trim()}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary-container disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {isScanningAts ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Scanning with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Scan with ATS Engine
                  </>
                )}
              </button>
            </div>
          </div>

          {atsResult && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-purple-50/70 border border-primary/20 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-primary/20">
                <span className="font-display font-bold text-base text-on-surface">
                  ATS Scan Results
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-outline">Calculated ATS Score:</span>
                  <span className="font-display text-2xl font-extrabold text-primary">
                    {atsResult.atsScore} / 100
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-white rounded-xl border border-surface-container-high space-y-1">
                  <strong className="text-emerald-700 font-bold">Matched High-Impact Keywords:</strong>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {atsResult.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-surface-container-high space-y-1">
                  <strong className="text-rose-700 font-bold">Missing Keywords to Add:</strong>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {atsResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-medium">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {atsResult.bulletCritiques.length > 0 && (
                <div className="p-4 bg-white rounded-xl border border-surface-container-high space-y-2 text-xs">
                  <strong className="text-purple-900 font-bold">Recommended Bullet Rewrite (Google X-Y-Z):</strong>
                  <div className="space-y-1 bg-purple-50/50 p-3 rounded-lg border border-purple-100">
                    <p className="text-outline italic">Original: "{atsResult.bulletCritiques[0].original}"</p>
                    <p className="text-purple-950 font-semibold pt-1">✓ Improved: "{atsResult.bulletCritiques[0].improved}"</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Security & Account Tab */}
      {activeTab === 'security' && (
        <AccountSecuritySection
          authUser={authUser}
          onSignOut={onSignOut}
          onOpenAuthModal={onOpenAuthModal}
        />
      )}

      {/* 5. Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col">
            <div className="p-5 border-b border-surface-container-high flex items-center justify-between bg-surface-container-lowest">
              <h3 className="font-display font-bold text-lg text-on-surface">
                Update Student Profile
              </h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfileForm} className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Profile Photo Upload & Selector Section */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-3">
                <span className="font-bold text-on-surface block text-xs">
                  Profile Picture
                </span>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Avatar preview */}
                  <div className="relative">
                    <img
                      src={editForm.avatarUrl}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/30 shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(editForm.name || 'Student')}&background=3525cd&color=fff&size=128`;
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    {/* Device Upload Button */}
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="px-3 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container shadow-2xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload from Device (PNG/JPG)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              compressAndReadImage(file, (base64Url) => {
                                setEditForm({ ...editForm, avatarUrl: base64Url });
                              });
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          setEditForm({
                            ...editForm,
                            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(editForm.name || 'Student')}&background=3525cd&color=fff&size=256`,
                          });
                        }}
                        className="px-3 py-2 rounded-xl border border-surface-container-high bg-white text-on-surface font-semibold text-xs hover:bg-surface-container"
                      >
                        Reset to Initials
                      </button>
                    </div>

                    {/* Or URL input */}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={editForm.avatarUrl}
                        onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                        placeholder="Or paste external image URL..."
                        className="w-full p-2 rounded-xl bg-white border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary placeholder:text-outline"
                      />
                    </div>
                  </div>
                </div>

                {/* Preset Avatars Row */}
                <div className="pt-2 border-t border-surface-container-high">
                  <span className="text-[10px] font-bold uppercase text-outline block mb-1.5">
                    Or select a student avatar preset:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setEditForm({ ...editForm, avatarUrl: preset.url })}
                        className={`flex items-center gap-1.5 p-1.5 pr-2.5 rounded-xl border transition-all text-xs shrink-0 ${
                          editForm.avatarUrl === preset.url
                            ? 'bg-primary/10 border-primary text-primary font-bold shadow-2xs'
                            : 'bg-white border-surface-container-high text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-6 h-6 rounded-lg object-cover"
                        />
                        <span className="text-[11px] whitespace-nowrap">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-on-surface block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Roll / Student ID</label>
                  <input
                    type="text"
                    value={editForm.rollNo}
                    onChange={(e) => setEditForm({ ...editForm, rollNo: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">College / University</label>
                  <input
                    type="text"
                    value={editForm.college}
                    onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Degree Program</label>
                  <select
                    value={editForm.degree}
                    onChange={(e) => {
                      const newDegree = e.target.value;
                      const isNowMTech = newDegree.toLowerCase().includes('m.tech') || newDegree.toLowerCase().includes('mtech');
                      let updatedYear = editForm.year;
                      let updatedSem = editForm.semester;

                      if (isNowMTech) {
                        if (editForm.year.includes('3rd') || editForm.year.includes('4th')) {
                          updatedYear = '2nd Year (Final Year)';
                        }
                        if (['Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'].includes(editForm.semester)) {
                          updatedSem = 'Semester 4';
                        }
                      }

                      setEditForm({
                        ...editForm,
                        degree: newDegree,
                        degreeType: isNowMTech ? 'M.Tech (2 Years • 4 Semesters)' : 'B.Tech (4 Years • 8 Semesters)',
                        programDurationYears: isNowMTech ? 2 : 4,
                        year: updatedYear,
                        semester: updatedSem,
                      });
                    }}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary font-medium"
                  >
                    <option value="M.Tech in Computer Science and Engineering">M.Tech in Computer Science and Engineering (2-Year PG)</option>
                    <option value="M.Tech in Data Science & Artificial Intelligence">M.Tech in Data Science & AI (2-Year PG)</option>
                    <option value="B.Tech in Computer Science and Engineering">B.Tech in Computer Science and Engineering (4-Year UG)</option>
                    <option value="B.Tech in Information Technology">B.Tech in Information Technology (4-Year UG)</option>
                    <option value="MCA (Master of Computer Applications)">MCA (Master of Computer Applications - 2 Years)</option>
                    <option value="Dual Degree (B.Tech + M.Tech)">Dual Degree (B.Tech + M.Tech - 5 Years)</option>
                  </select>
                </div>

                {/* Info pill about M.Tech duration */}
                <div className="sm:col-span-2 p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 text-[11px] text-indigo-900 flex items-center justify-between gap-2">
                  <span>
                    💡 <strong>Program Duration Note:</strong> M.Tech is a <strong>2-year</strong> postgraduate program (4 Semesters total). For <strong>June 2026</strong> target graduation, your current status is <strong>2nd Year • Semester 4</strong>.
                  </span>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Current Academic Year</label>
                  <select
                    value={editForm.year}
                    onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary font-medium"
                  >
                    {(editForm.degree.toLowerCase().includes('m.tech') || editForm.degree.toLowerCase().includes('mtech')) ? (
                      <>
                        <option value="1st Year">1st Year (Foundations & Advanced Coursework)</option>
                        <option value="2nd Year (Final Year)">2nd Year (Final Year • Placement & Thesis)</option>
                      </>
                    ) : (
                      <>
                        <option value="1st Year">1st Year (Foundations)</option>
                        <option value="2nd Year">2nd Year (Core DSA & Tech Stack)</option>
                        <option value="3rd Year">3rd Year (Placement Preparation Sprint)</option>
                        <option value="4th Year">4th Year (Active Hiring Drives)</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Current Semester</label>
                  <select
                    value={editForm.semester}
                    onChange={(e) => setEditForm({ ...editForm, semester: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary font-medium"
                  >
                    {(editForm.degree.toLowerCase().includes('m.tech') || editForm.degree.toLowerCase().includes('mtech')) ? (
                      <>
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                        <option value="Semester 3">Semester 3</option>
                        <option value="Semester 4">Semester 4 (Final Placement Semester)</option>
                      </>
                    ) : (
                      <>
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                        <option value="Semester 3">Semester 3</option>
                        <option value="Semester 4">Semester 4</option>
                        <option value="Semester 5">Semester 5</option>
                        <option value="Semester 6">Semester 6</option>
                        <option value="Semester 7">Semester 7</option>
                        <option value="Semester 8">Semester 8</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Target Graduation Month & Year</label>
                  <input
                    type="text"
                    value={editForm.graduationDate}
                    onChange={(e) => setEditForm({ ...editForm, graduationDate: e.target.value })}
                    placeholder="e.g. June 2026"
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Branch / Specialization</label>
                  <input
                    type="text"
                    value={editForm.branch}
                    onChange={(e) => setEditForm({ ...editForm, branch: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">CGPA (out of 10)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.cgpa}
                    onChange={(e) => setEditForm({ ...editForm, cgpa: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Primary Career Goal</label>
                  <input
                    type="text"
                    value={editForm.primaryGoal}
                    onChange={(e) => setEditForm({ ...editForm, primaryGoal: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Expected CTC Range</label>
                  <input
                    type="text"
                    value={editForm.expectedCtcRange}
                    onChange={(e) => setEditForm({ ...editForm, expectedCtcRange: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">LeetCode Solved</label>
                  <input
                    type="number"
                    value={editForm.leetCodeSolved}
                    onChange={(e) => setEditForm({ ...editForm, leetCodeSolved: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Weekly Goal Hours</label>
                  <input
                    type="number"
                    value={editForm.weeklyGoalHours}
                    onChange={(e) => setEditForm({ ...editForm, weeklyGoalHours: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">Placement Readiness Score (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.readinessScore ?? 90}
                    onChange={(e) => setEditForm({ ...editForm, readinessScore: Math.min(100, Math.max(0, Number(e.target.value))) })}
                    className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary font-semibold text-emerald-600"
                  />
                </div>
              </div>

              <div className="p-4 bg-surface-container-low border-t border-surface-container-high flex items-center justify-end gap-2 -mx-6 -mb-6 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Photo Upload Modal */}
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
    </div>
  );
};
