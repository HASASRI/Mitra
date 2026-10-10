import React, { useState, useRef, useEffect } from 'react';
import { TabType, UserProfile, AuthUser } from '../types';
import { 
  Sparkles, 
  Search, 
  Flame, 
  Bookmark, 
  Menu, 
  X, 
  Compass, 
  Layers, 
  BookOpen, 
  Briefcase, 
  Map, 
  FolderGit2, 
  UserCircle,
  LogIn,
  LogOut,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  profile: UserProfile;
  savedCount: number;
  authUser: AuthUser | null;
  onOpenSearch: () => void;
  onOpenAdvisor: () => void;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  profile,
  savedCount,
  authUser,
  onOpenSearch,
  onOpenAdvisor,
  onOpenAuthModal,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Compass className="w-4 h-4" /> },
    { id: 'platforms', label: 'Platforms', icon: <Layers className="w-4 h-4" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'placements', label: 'Placements', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile', icon: <UserCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-surface-container-high transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onSelectTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/20 shadow-md shadow-primary/20 group-hover:scale-105 group-hover:ring-primary/40 transition-all bg-gradient-to-tr from-primary to-primary-container shrink-0">
                <img 
                  src="/src/assets/images/mitra_logo_1791625654446.jpg" 
                  alt="Mitra Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized sparkle if image load fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl tracking-tight text-on-surface">
                    Mitra
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                    CSE/IT
                  </span>
                </div>
                <p className="text-[11px] text-outline font-medium tracking-tight -mt-0.5 hidden sm:block">
                  Your Career Companion
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-2xl border border-surface-container-high">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm shadow-primary/30 font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.id === 'profile' && savedCount > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white text-primary' : 'bg-primary/10 text-primary font-bold'
                    }`}>
                      {savedCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low border border-surface-container-high text-on-surface-variant hover:border-primary/40 hover:bg-white text-xs font-medium transition-all group shadow-2xs"
              title="Search resources (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-outline group-hover:text-primary transition-colors" />
              <span className="hidden sm:inline">Search Mitra...</span>
              <kbd className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-outline border border-surface-container-highest">
                ⌘K
              </kbd>
            </button>

            {/* AI Advisor Trigger Button */}
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-primary text-white text-xs font-bold shadow-xs hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">AI Mentor</span>
            </button>

            {/* Auth / Profile Area */}
            <div className="flex items-center gap-2 pl-1 border-l border-surface-container-high">
              {authUser ? (
                <>
                  <div 
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold"
                    title={`${profile.dailyStreakDays} Days Daily Practice Streak`}
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
                    <span>{profile.dailyStreakDays}d</span>
                  </div>

                  {/* Profile Avatar & Dropdown Trigger */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-surface-container transition-colors group focus:outline-none"
                    >
                      <div className="relative">
                        <img
                          src={profile.avatarUrl}
                          alt={profile.name}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=3525cd&color=fff`;
                          }}
                        />
                        {authUser.provider === 'google' && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white shadow-xs border border-surface-container flex items-center justify-center">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-bold text-on-surface hidden xl:block max-w-[100px] truncate">
                        {profile.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-outline group-hover:text-on-surface transition-colors hidden sm:block" />
                    </button>

                    {/* Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-surface-container-high p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="p-3 bg-surface-container-low rounded-xl mb-1.5">
                          <p className="text-xs font-bold text-on-surface truncate">{authUser.name}</p>
                          <p className="text-[11px] text-outline truncate">{authUser.email}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            {authUser.provider === 'google' ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                                Google Signed-In
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-bold border border-indigo-200">
                                Email Account
                              </span>
                            )}
                            <span className="text-[10px] text-outline font-medium">90% Ready</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            onSelectTab('profile');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container text-left transition-colors"
                        >
                          <UserCircle className="w-4 h-4 text-primary" />
                          <span>My Student Profile & ATS</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectTab('profile');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container text-left transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Account Security & 2FA</span>
                        </button>

                        <div className="my-1 border-t border-surface-container-high" />

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onSignOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 text-left transition-colors"
                        >
                          <LogOut className="w-4 h-4 text-rose-600" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onOpenAuthModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-surface-container-high hover:border-primary/50 hover:bg-slate-50 text-on-surface text-xs font-bold shadow-2xs transition-all"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    <span>Google Login</span>
                  </button>

                  <button
                    onClick={onOpenAuthModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-xs transition-all"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sign In</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-surface-container-high px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-high">
            <div className="flex items-center gap-2">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-8 h-8 rounded-full ring-2 ring-primary/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=3525cd&color=fff`;
                }}
              />
              <div>
                <p className="text-xs font-bold text-on-surface">{profile.name}</p>
                <p className="text-[11px] text-outline">{profile.branch} • {profile.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{profile.dailyStreakDays} days streak</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 mt-2 border-t border-surface-container-high">
            {authUser ? (
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-outline font-medium truncate">
                  Signed in as <strong className="text-on-surface">{authUser.email}</strong>
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50 flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container flex items-center justify-center gap-2 shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Continue with Google</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
