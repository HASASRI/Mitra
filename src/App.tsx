import React, { useState, useEffect } from 'react';
import { TabType, UserProfile, AuthUser } from './types';
import { 
  initialProfile, 
  initialPlatforms, 
  initialCourses, 
  initialPlacementDrives, 
  initialCompanyPatterns, 
  initialPrepRounds, 
  initialRoadmapPhases, 
  initialProjects 
} from './data/initialData';
import { getCurrentUser, signOut as authSignOut } from './services/authService';

import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { PlatformsView } from './components/PlatformsView';
import { CoursesView } from './components/CoursesView';
import { PlacementsView } from './components/PlacementsView';
import { RoadmapView } from './components/RoadmapView';
import { ProjectsView } from './components/ProjectsView';
import { ProfileView } from './components/ProfileView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AIAdvisorModal } from './components/AIAdvisorModal';
import { AuthModal } from './components/AuthModal';
import { ProfileSetupModal } from './components/ProfileSetupModal';
import { Footer } from './components/Footer';
import { ShieldCheck, LogIn, Sparkles } from 'lucide-react';

export default function App() {
  // 0. User Authentication State
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(() => !getCurrentUser());
  const [authContextMessage, setAuthContextMessage] = useState<string>(
    'Please sign in with Google or create an account to access our campus placement roadmap & preparation hub.'
  );
  const [profileSetupOpen, setProfileSetupOpen] = useState(false);

  // 1. Current Active Tab
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');

  // 2. Persistent User Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mitra_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If profile had the erroneous 3rd Year / Semester 6, or old B.Tech default
        if (parsed.year === '3rd Year' || parsed.semester === 'Semester 6' || parsed.degree?.includes('B.Tech in Computer Science')) {
          return {
            ...parsed,
            degree: 'M.Tech in Computer Science and Engineering',
            degreeType: 'M.Tech (2 Years • 4 Semesters)',
            programDurationYears: 2,
            year: '2nd Year (Final Year)',
            semester: 'Semester 4',
            rollNo: (parsed.rollNo === '2021BCS041' || !parsed.rollNo) ? '2024MCS014' : parsed.rollNo,
            graduationDate: 'June 2026',
            activeSprintTitle: 'M.Tech Campus Placement Season & Thesis Defense • Target June 2026',
            readinessScore: 90,
          };
        }
        // Ensure readinessScore reflects 90% (handling previous cached values like 68, 78, 89)
        if (!parsed.readinessScore || parsed.readinessScore === 68 || parsed.readinessScore === 78 || parsed.readinessScore === 89 || parsed.readinessScore < 90) {
          return {
            ...parsed,
            readinessScore: 90,
          };
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read user profile from localStorage:', e);
    }
    return initialProfile;
  });

  // 3. Saved / Bookmarked Items
  const [savedPlatformIds, setSavedPlatformIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mitra_saved_platforms');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['leetcode', 'takeuforward', 'github'];
  });

  const [savedCourseIds, setSavedCourseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mitra_saved_courses');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['web-bootcamp', 'striver-dsa', 'cs50'];
  });

  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mitra_saved_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['devconnect', 'distributed-task-worker'];
  });

  // 4. Course Completion Progress Tracking (Course ID -> percentage)
  const [enrolledCourseProgress, setEnrolledCourseProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('mitra_course_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      'web-bootcamp': 70,
      'striver-dsa': 45,
      'cs50': 90,
    };
  });

  // 5. Modals State
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);

  // 6. Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mitra_user_profile', JSON.stringify(profile));
    } catch (e) {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('mitra_saved_platforms', JSON.stringify(savedPlatformIds));
    } catch (e) {}
  }, [savedPlatformIds]);

  useEffect(() => {
    try {
      localStorage.setItem('mitra_saved_courses', JSON.stringify(savedCourseIds));
    } catch (e) {}
  }, [savedCourseIds]);

  useEffect(() => {
    try {
      localStorage.setItem('mitra_saved_projects', JSON.stringify(savedProjectIds));
    } catch (e) {}
  }, [savedProjectIds]);

  useEffect(() => {
    try {
      localStorage.setItem('mitra_course_progress', JSON.stringify(enrolledCourseProgress));
    } catch (e) {}
  }, [enrolledCourseProgress]);

  // Global Keyboard Shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers for Toggling Saves
  const requireAuth = (message?: string): boolean => {
    if (!authUser) {
      setAuthContextMessage(message || 'Please sign in with Google or create an account to access this feature.');
      setAuthModalOpen(true);
      return false;
    }
    return true;
  };

  const handleSelectTab = (tab: TabType) => {
    // Whenever a new user tries to access features/tabs, ask to login first
    if (!authUser && tab !== 'dashboard') {
      requireAuth(`Please sign in with Google or create an account to access the ${tab.toUpperCase()} section.`);
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setAuthUser(user);
    if (!user.hasCompletedProfile) {
      // Prompt user to make profile immediately after logging in
      setProfileSetupOpen(true);
      showToast(`Welcome ${user.name}! Please set up your student placement profile.`);
    } else {
      setProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        avatarUrl: user.avatarUrl || prev.avatarUrl,
      }));
      showToast(`Welcome back, ${user.name}! 🚀`);
    }
  };

  const handleProfileComplete = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setProfileSetupOpen(false);
    setAuthUser(prev => prev ? { ...prev, hasCompletedProfile: true } : null);
    showToast('Student profile configured and ready! ✨');
  };

  const handleSignOut = () => {
    authSignOut();
    setAuthUser(null);
    showToast('Signed out of session safely.');
    setAuthContextMessage('Please sign in with Google or create an account to access the platform.');
    setAuthModalOpen(true);
  };

  const handleToggleSavePlatform = (id: string) => {
    if (!requireAuth('Please sign in to save learning platforms to your profile.')) return;
    setSavedPlatformIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from saved platforms' : 'Platform saved to your profile! 🔖');
      return updated;
    });
  };

  const handleToggleSaveCourse = (id: string) => {
    if (!requireAuth('Please sign in to bookmark courses to your profile.')) return;
    setSavedCourseIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Course removed from bookmarks' : 'Course saved to your profile! 🎓');
      return updated;
    });
  };

  const handleToggleSaveProject = (id: string) => {
    if (!requireAuth('Please sign in to save portfolio projects.')) return;
    setSavedProjectIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Project removed from saved' : 'Project added to your portfolio tracker! 🚀');
      return updated;
    });
  };

  const handleUpdateCourseProgress = (id: string, progress: number) => {
    if (!requireAuth('Please sign in to track course completion progress.')) return;
    setEnrolledCourseProgress(prev => ({
      ...prev,
      [id]: progress,
    }));
    showToast(`Updated course progress to ${progress}%`);
  };

  const handleLogStudyTime = (hours: number) => {
    if (!requireAuth('Please sign in to log focused study hours.')) return;
    setProfile(prev => {
      const updatedWeekly = Math.round((prev.weeklyLoggedHours + hours) * 10) / 10;
      const updatedDaily = prev.dailyHours.map(d => {
        if (d.isToday) {
          return { ...d, hours: Math.round((d.hours + hours) * 10) / 10 };
        }
        return d;
      });

      return {
        ...prev,
        weeklyLoggedHours: updatedWeekly,
        dailyHours: updatedDaily,
      };
    });
    showToast(`Logged +${hours}h focused study time to your profile! ⏱️`);
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
    showToast('Profile updated successfully! ✨');
  };

  const totalSavedCount = savedPlatformIds.length + savedCourseIds.length + savedProjectIds.length;

  return (
    <div className="min-h-screen bg-[#fbf8ff] text-[#1a1b21] flex flex-col font-body selection:bg-primary/20 selection:text-primary">
      {/* Guest Mode Security Notice Bar */}
      {!authUser && (
        <div className="bg-gradient-to-r from-primary via-indigo-900 to-primary-container text-white px-4 py-2 text-xs font-semibold shadow-xs flex items-center justify-between z-30">
          <div className="flex items-center gap-2 max-w-4xl">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="hidden sm:inline">
              Sign in with Google to personalize your campus placement roadmap, lock in 90% placement readiness, and save resources.
            </span>
            <span className="sm:hidden">
              Sign in with Google to unlock full placement roadmaps & profile.
            </span>
          </div>
          <button
            onClick={() => {
              setAuthContextMessage('Please sign in with Google or create an account to access all placement prep tools.');
              setAuthModalOpen(true);
            }}
            className="ml-2 px-3 py-1 rounded-lg bg-white text-primary font-bold text-xs hover:bg-slate-100 shrink-0 transition-colors flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        profile={profile}
        savedCount={totalSavedCount}
        authUser={authUser}
        onOpenSearch={() => {
          if (!requireAuth('Please sign in to use global search across all platforms & drives.')) return;
          setSearchModalOpen(true);
        }}
        onOpenAdvisor={() => {
          if (!requireAuth('Please sign in to consult with Mitra AI Placement Mentor.')) return;
          setAdvisorModalOpen(true);
        }}
        onOpenAuthModal={() => {
          setAuthContextMessage('Sign in or register to customize your placement preparation.');
          setAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
      />

      {/* Main Page Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'dashboard' && (
          <DashboardView
            profile={profile}
            platforms={initialPlatforms}
            courses={initialCourses}
            roadmapPhases={initialRoadmapPhases}
            projects={initialProjects}
            placementDrives={initialPlacementDrives}
            savedPlatformIds={savedPlatformIds}
            savedCourseIds={savedCourseIds}
            savedProjectIds={savedProjectIds}
            authUser={authUser}
            onOpenAuthModal={() => {
              setAuthContextMessage('Please sign in with Google or create an account to unlock all placement tools.');
              setAuthModalOpen(true);
            }}
            onToggleSavePlatform={handleToggleSavePlatform}
            onToggleSaveCourse={handleToggleSaveCourse}
            onToggleSaveProject={handleToggleSaveProject}
            onNavigateTab={handleSelectTab}
            onOpenSearch={() => {
              if (!requireAuth('Please sign in to search across all placement resources.')) return;
              setSearchModalOpen(true);
            }}
            onOpenAdvisor={() => {
              if (!requireAuth('Please sign in to chat with Mitra AI Placement Mentor.')) return;
              setAdvisorModalOpen(true);
            }}
            onLogStudyTime={handleLogStudyTime}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {currentTab === 'platforms' && (
          <PlatformsView
            platforms={initialPlatforms}
            savedPlatformIds={savedPlatformIds}
            onToggleSavePlatform={handleToggleSavePlatform}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesView
            courses={initialCourses}
            savedCourseIds={savedCourseIds}
            enrolledCourseProgress={enrolledCourseProgress}
            onToggleSaveCourse={handleToggleSaveCourse}
            onUpdateCourseProgress={handleUpdateCourseProgress}
            onOpenAdvisor={() => setAdvisorModalOpen(true)}
          />
        )}

        {currentTab === 'placements' && (
          <PlacementsView
            placementDrives={initialPlacementDrives}
            companyPatterns={initialCompanyPatterns}
            prepRounds={initialPrepRounds}
            onOpenAdvisor={() => setAdvisorModalOpen(true)}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapView
            profile={profile}
            roadmapPhases={initialRoadmapPhases}
            onOpenAdvisor={() => setAdvisorModalOpen(true)}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsView
            projects={initialProjects}
            savedProjectIds={savedProjectIds}
            onToggleSaveProject={handleToggleSaveProject}
            onOpenAdvisor={() => setAdvisorModalOpen(true)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            profile={profile}
            platforms={initialPlatforms}
            courses={initialCourses}
            projects={initialProjects}
            savedPlatformIds={savedPlatformIds}
            savedCourseIds={savedCourseIds}
            savedProjectIds={savedProjectIds}
            enrolledCourseProgress={enrolledCourseProgress}
            authUser={authUser}
            onSignOut={handleSignOut}
            onOpenAuthModal={() => {
              setAuthContextMessage('Sign in with Google to manage your account and security settings.');
              setAuthModalOpen(true);
            }}
            onUpdateProfile={handleUpdateProfile}
            onToggleSavePlatform={handleToggleSavePlatform}
            onToggleSaveCourse={handleToggleSaveCourse}
            onToggleSaveProject={handleToggleSaveProject}
            onUpdateCourseProgress={handleUpdateCourseProgress}
            onNavigateTab={handleSelectTab}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={handleSelectTab}
        onOpenAdvisor={() => {
          if (!requireAuth('Please sign in to access Mitra AI Mentor.')) return;
          setAdvisorModalOpen(true);
        }}
      />

      {/* Global Search Dialog (Cmd+K) */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        platforms={initialPlatforms}
        courses={initialCourses}
        placementDrives={initialPlacementDrives}
        projects={initialProjects}
        onNavigateTab={handleSelectTab}
      />

      {/* Mitra AI Advisor Chat Modal */}
      <AIAdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
        profile={profile}
      />

      {/* User Authentication & Google Sign-In Gate Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        contextMessage={authContextMessage}
      />

      {/* Student Profile Creation & Onboarding Modal */}
      <ProfileSetupModal
        isOpen={profileSetupOpen}
        authUser={authUser}
        initialProfile={profile}
        onComplete={handleProfileComplete}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-150">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
