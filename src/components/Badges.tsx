import React, { useState, useMemo } from 'react';
import { Badge, BadgeCategory, BadgeTier, UserProfile, Project } from '../types';
import { 
  Award, 
  Sparkles, 
  Flame, 
  BookOpen, 
  FolderGit2, 
  Terminal, 
  Zap, 
  Trophy, 
  CheckCircle, 
  Lock, 
  Clock, 
  Target, 
  ShieldCheck, 
  Code2, 
  Star, 
  HelpCircle,
  Share2,
  Filter
} from 'lucide-react';

interface BadgesProps {
  profile: UserProfile;
  completedProjectsCount?: number;
  totalProjectsCount?: number;
  savedResourcesCount?: number;
}

export const Badges: React.FC<BadgesProps> = ({
  profile,
  completedProjectsCount = 2,
  totalProjectsCount = 6,
  savedResourcesCount = 8,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory>('all');
  const [activeBadgeModal, setActiveBadgeModal] = useState<Badge | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  // Derive dynamic achievements from profile & stats
  const studyHours = profile.weeklyLoggedHours || 14;
  const leetCodeCount = profile.leetCodeSolved || 142;
  const streakDays = profile.dailyStreakDays || 5;
  const atsScore = profile.atsScore || 92;
  const commitsCount = profile.gitHubCommitsThisWeek || 28;

  // Build the complete roster of gamified badges
  const badgesList: Badge[] = useMemo(() => {
    return [
      // 1. Study Hours Badges
      {
        id: 'study-10h',
        title: '10 Hours Studied',
        description: 'Completed 10+ hours of dedicated learning and deep-work study this week.',
        category: 'study',
        tier: 'silver',
        iconName: 'clock',
        currentValue: studyHours,
        targetValue: 10,
        unit: 'hours',
        unlocked: studyHours >= 10,
        unlockedAt: 'Unlocked this week',
        perkReward: '+150 Focus XP • Study Consistency Buff',
        xpPoints: 150,
      },
      {
        id: 'study-25h',
        title: 'Deep Work Champion',
        description: 'Commit 25 hours of focused prep time in a single sprint.',
        category: 'study',
        tier: 'gold',
        iconName: 'zap',
        currentValue: studyHours,
        targetValue: 25,
        unit: 'hours',
        unlocked: studyHours >= 25,
        perkReward: '+300 Focus XP • Elite Work Ethic Title',
        xpPoints: 300,
      },
      {
        id: 'study-50h',
        title: 'Centurion Scholar',
        description: 'Log 50 total recorded study hours toward graduation & placement milestones.',
        category: 'study',
        tier: 'diamond',
        iconName: 'trophy',
        currentValue: studyHours,
        targetValue: 50,
        unit: 'hours',
        unlocked: studyHours >= 50,
        perkReward: '+750 XP • Gold Mitra Profile Frame',
        xpPoints: 750,
      },

      // 2. Projects Completed Badges
      {
        id: 'project-1',
        title: 'First Ship',
        description: 'Build and deploy your first production-ready portfolio project.',
        category: 'projects',
        tier: 'bronze',
        iconName: 'folder',
        currentValue: Math.max(1, completedProjectsCount),
        targetValue: 1,
        unit: 'projects',
        unlocked: completedProjectsCount >= 1,
        unlockedAt: 'Semester 3 Milestone',
        perkReward: '+100 Builder XP • Portfolio Showcase Live',
        xpPoints: 100,
      },
      {
        id: 'project-3',
        title: 'Full Stack Architect',
        description: 'Complete 3 end-to-end full stack web or cloud applications.',
        category: 'projects',
        tier: 'silver',
        iconName: 'terminal',
        currentValue: completedProjectsCount,
        targetValue: 3,
        unit: 'projects',
        unlocked: completedProjectsCount >= 3,
        perkReward: '+250 Builder XP • Recruiter Spotlight Ready',
        xpPoints: 250,
      },
      {
        id: 'project-5',
        title: '5 Projects Completed',
        description: 'Build and publish 5 industry-grade engineering projects to your portfolio.',
        category: 'projects',
        tier: 'gold',
        iconName: 'code',
        currentValue: completedProjectsCount,
        targetValue: 5,
        unit: 'projects',
        unlocked: completedProjectsCount >= 5,
        perkReward: '+500 Builder XP • FAANG Portfolio Certified',
        xpPoints: 500,
      },

      // 3. DSA & Coding Badges
      {
        id: 'dsa-50',
        title: 'Problem Solver',
        description: 'Crack 50 algorithm and data structure problems on LeetCode / HackerRank.',
        category: 'dsa',
        tier: 'bronze',
        iconName: 'terminal',
        currentValue: leetCodeCount,
        targetValue: 50,
        unit: 'problems',
        unlocked: leetCodeCount >= 50,
        unlockedAt: 'Verified via LeetCode',
        perkReward: '+120 Algorithmic XP',
        xpPoints: 120,
      },
      {
        id: 'dsa-100',
        title: 'Century Coder',
        description: 'Solve 100 Data Structures & Algorithms challenges across Trees, DP & Graphs.',
        category: 'dsa',
        tier: 'silver',
        iconName: 'zap',
        currentValue: leetCodeCount,
        targetValue: 100,
        unit: 'problems',
        unlocked: leetCodeCount >= 100,
        unlockedAt: 'Verified via LeetCode',
        perkReward: '+250 Algorithmic XP • Tier-1 Screening Ready',
        xpPoints: 250,
      },
      {
        id: 'dsa-master',
        title: 'DSA Master',
        description: 'Master advanced algorithms with 150+ solved challenges and competitive rating.',
        category: 'dsa',
        tier: 'gold',
        iconName: 'trophy',
        currentValue: leetCodeCount,
        targetValue: 150,
        unit: 'problems',
        unlocked: leetCodeCount >= 150,
        perkReward: '+500 Algorithmic XP • Technical Interview Maestro',
        xpPoints: 500,
      },

      // 4. Streaks & Discipline Badges
      {
        id: 'streak-3',
        title: 'Spark of Habit',
        description: 'Maintain a 3-day continuous daily coding and study streak.',
        category: 'streak',
        tier: 'bronze',
        iconName: 'flame',
        currentValue: streakDays,
        targetValue: 3,
        unit: 'days',
        unlocked: streakDays >= 3,
        unlockedAt: 'Streak Active',
        perkReward: '+80 Discipline XP',
        xpPoints: 80,
      },
      {
        id: 'streak-7',
        title: '7-Day Unstoppable Streak',
        description: 'Study every single day for a complete week without skipping.',
        category: 'streak',
        tier: 'silver',
        iconName: 'flame',
        currentValue: streakDays,
        targetValue: 7,
        unit: 'days',
        unlocked: streakDays >= 7,
        perkReward: '+200 Discipline XP • Momentum Multiplier (1.2x)',
        xpPoints: 200,
      },
      {
        id: 'streak-30',
        title: 'Iron Will (30-Day Streak)',
        description: 'Achieve legendary 30 days unbroken coding habit.',
        category: 'streak',
        tier: 'diamond',
        iconName: 'trophy',
        currentValue: streakDays,
        targetValue: 30,
        unit: 'days',
        unlocked: streakDays >= 30,
        perkReward: '+1000 Discipline XP • Legendary Student Flair',
        xpPoints: 1000,
      },

      // 5. Placement & Career Badges
      {
        id: 'ats-optima',
        title: 'ATS Resume Master (90+)',
        description: 'Score 90+ on the AI ATS resume scanner with recruiter keywords.',
        category: 'placement',
        tier: 'platinum',
        iconName: 'shield',
        currentValue: atsScore,
        targetValue: 90,
        unit: 'score',
        unlocked: atsScore >= 90,
        unlockedAt: `Scored ${atsScore}/100`,
        perkReward: '+350 Career XP • Tier-1 Resume Ready',
        xpPoints: 350,
      },
      {
        id: 'git-contributor',
        title: 'Open Source & Git Dynamo',
        description: 'Push 25+ weekly commits on GitHub repositories.',
        category: 'placement',
        tier: 'silver',
        iconName: 'terminal',
        currentValue: commitsCount,
        targetValue: 25,
        unit: 'commits',
        unlocked: commitsCount >= 25,
        unlockedAt: `${commitsCount} commits logged`,
        perkReward: '+180 Git XP • Verified Activity Signal',
        xpPoints: 180,
      },
      {
        id: 'curriculum-scholar',
        title: 'Curriculum Scholar',
        description: 'Bookmark and track at least 6 key learning resources & platforms.',
        category: 'study',
        tier: 'bronze',
        iconName: 'book',
        currentValue: savedResourcesCount,
        targetValue: 6,
        unit: 'saved',
        unlocked: savedResourcesCount >= 6,
        unlockedAt: `${savedResourcesCount} resources saved`,
        perkReward: '+100 Knowledge XP',
        xpPoints: 100,
      }
    ];
  }, [studyHours, leetCodeCount, streakDays, atsScore, commitsCount, completedProjectsCount, savedResourcesCount]);

  // Calculations for overview stats
  const unlockedBadges = badgesList.filter(b => b.unlocked);
  const totalBadgesCount = badgesList.length;
  const totalEarnedXP = unlockedBadges.reduce((acc, b) => acc + b.xpPoints, 0);
  const maxPossibleXP = badgesList.reduce((acc, b) => acc + b.xpPoints, 0);
  const unlockPercentage = Math.round((unlockedBadges.length / totalBadgesCount) * 100);

  // Filtered badges
  const filteredBadges = useMemo(() => {
    if (selectedCategory === 'all') return badgesList;
    return badgesList.filter(b => b.category === selectedCategory);
  }, [badgesList, selectedCategory]);

  // Color schemes by tier
  const getTierStyles = (tier: BadgeTier, unlocked: boolean) => {
    if (!unlocked) {
      return {
        cardBg: 'bg-surface-container-low/70 border-surface-container-high/80 text-on-surface-variant/60 opacity-80',
        badgePill: 'bg-stone-100 text-stone-500 border-stone-200',
        iconBg: 'bg-surface-container text-outline',
        glow: '',
      };
    }

    switch (tier) {
      case 'bronze':
        return {
          cardBg: 'bg-gradient-to-br from-amber-50/70 via-white to-amber-100/40 border-amber-200 text-stone-800 shadow-2xs hover:shadow-xs hover:border-amber-300',
          badgePill: 'bg-amber-100/80 text-amber-900 border-amber-300',
          iconBg: 'bg-gradient-to-tr from-amber-500 to-amber-400 text-white shadow-amber-200',
          glow: 'group-hover:ring-2 group-hover:ring-amber-300/50',
        };
      case 'silver':
        return {
          cardBg: 'bg-gradient-to-br from-slate-50/80 via-white to-indigo-50/30 border-slate-300 text-slate-900 shadow-2xs hover:shadow-xs hover:border-indigo-300',
          badgePill: 'bg-slate-100 text-slate-800 border-slate-300',
          iconBg: 'bg-gradient-to-tr from-slate-600 to-indigo-500 text-white shadow-slate-200',
          glow: 'group-hover:ring-2 group-hover:ring-indigo-300/50',
        };
      case 'gold':
        return {
          cardBg: 'bg-gradient-to-br from-amber-50 via-yellow-50/60 to-white border-amber-300 text-amber-950 shadow-2xs hover:shadow-xs hover:border-amber-400',
          badgePill: 'bg-amber-200/90 text-amber-950 border-amber-400 font-extrabold',
          iconBg: 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-white shadow-amber-300',
          glow: 'group-hover:ring-2 group-hover:ring-amber-400/50',
        };
      case 'platinum':
        return {
          cardBg: 'bg-gradient-to-br from-teal-50/80 via-white to-cyan-50/40 border-teal-200 text-teal-950 shadow-2xs hover:shadow-xs hover:border-teal-300',
          badgePill: 'bg-teal-100 text-teal-900 border-teal-300',
          iconBg: 'bg-gradient-to-tr from-teal-600 to-cyan-500 text-white shadow-teal-200',
          glow: 'group-hover:ring-2 group-hover:ring-teal-300/50',
        };
      case 'diamond':
        return {
          cardBg: 'bg-gradient-to-br from-purple-50 via-indigo-50/60 to-white border-purple-200 text-purple-950 shadow-2xs hover:shadow-xs hover:border-purple-300',
          badgePill: 'bg-purple-100 text-purple-900 border-purple-300',
          iconBg: 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 text-white shadow-purple-200',
          glow: 'group-hover:ring-2 group-hover:ring-purple-400/50',
        };
    }
  };

  const renderBadgeIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'clock':
        return <Clock className={className} />;
      case 'folder':
        return <FolderGit2 className={className} />;
      case 'terminal':
        return <Terminal className={className} />;
      case 'code':
        return <Code2 className={className} />;
      case 'flame':
        return <Flame className={className} />;
      case 'shield':
        return <ShieldCheck className={className} />;
      case 'book':
        return <BookOpen className={className} />;
      case 'zap':
        return <Zap className={className} />;
      case 'trophy':
      default:
        return <Trophy className={className} />;
    }
  };

  const handleShareBadge = (badge: Badge) => {
    const text = `🏆 I just unlocked the "${badge.title}" badge on Mitra Student OS! (${badge.description})`;
    navigator.clipboard?.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Hero Card with Gamification Stats */}
      <div className="bg-gradient-to-br from-primary via-indigo-900 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-32 -mb-20 w-48 h-48 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wide border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Gamified Accomplishments & Credentials</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Student Badges & Achievements
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Earn badges as you hit study targets, conquer Data Structures & Algorithms, ship portfolio projects, and maintain consistent coding streaks!
            </p>
          </div>

          {/* Gamified XP & Progress Box */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 w-full md:w-auto min-w-[280px] shrink-0 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-indigo-200">Unlocked Milestones</span>
              <span className="font-extrabold text-amber-300">
                {unlockedBadges.length} / {totalBadgesCount} Badges ({unlockPercentage}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-black/25 rounded-full h-2.5 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${unlockPercentage}%` }}
              />
            </div>

            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
              <div>
                <p className="text-[10px] uppercase font-bold text-indigo-200">Total Experience</p>
                <p className="font-display font-black text-lg text-white">
                  {totalEarnedXP} <span className="text-xs font-normal text-indigo-200">/ {maxPossibleXP} XP</span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-indigo-200">Current Rank</p>
                <p className="font-display font-bold text-amber-300 text-sm flex items-center gap-1 justify-end">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  {unlockedBadges.length >= 7 ? 'Master Tier' : unlockedBadges.length >= 4 ? 'Adept Engineer' : 'Rising Coder'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted core badges teaser */}
        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2.5 bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-[11px] truncate">10 Hours Studied</p>
              <p className="text-[10px] text-emerald-300 font-semibold">{studyHours >= 10 ? '✓ Completed' : `${studyHours}/10 hrs`}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="w-7 h-7 rounded-lg bg-teal-400/20 text-teal-300 flex items-center justify-center shrink-0">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-[11px] truncate">5 Projects Completed</p>
              <p className="text-[10px] text-teal-200 font-semibold">{completedProjectsCount >= 5 ? '✓ Completed' : `${completedProjectsCount}/5 Shipped`}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="w-7 h-7 rounded-lg bg-purple-400/20 text-purple-300 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-[11px] truncate">DSA Master</p>
              <p className="text-[10px] text-purple-200 font-semibold">{leetCodeCount >= 150 ? '✓ Completed' : `${leetCodeCount}/150 LeetCode`}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <div className="w-7 h-7 rounded-lg bg-orange-400/20 text-orange-300 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white text-[11px] truncate">Daily Streak</p>
              <p className="text-[10px] text-orange-300 font-semibold">{streakDays} Days Active 🔥</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category Filters & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-surface-container-high shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Badges', count: badgesList.length },
            { id: 'study', label: 'Study & Focus', count: badgesList.filter(b => b.category === 'study').length },
            { id: 'projects', label: 'Projects & Build', count: badgesList.filter(b => b.category === 'projects').length },
            { id: 'dsa', label: 'DSA & Coding', count: badgesList.filter(b => b.category === 'dsa').length },
            { id: 'streak', label: 'Streaks & Habits', count: badgesList.filter(b => b.category === 'streak').length },
            { id: 'placement', label: 'Career & Placement', count: badgesList.filter(b => b.category === 'placement').length },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as BadgeCategory)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-2xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-surface-container-high text-outline'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-[11px] text-outline font-medium px-2 shrink-0">
          Showing {filteredBadges.length} achievements
        </div>
      </div>

      {/* 3. Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => {
          const styles = getTierStyles(badge.tier, badge.unlocked);
          const progressPercent = Math.min(100, Math.round((badge.currentValue / badge.targetValue) * 100));

          return (
            <div
              key={badge.id}
              onClick={() => setActiveBadgeModal(badge)}
              className={`group relative rounded-3xl p-5 border transition-all cursor-pointer select-none flex flex-col justify-between ${styles.cardBg} ${styles.glow}`}
            >
              {/* Top row: Icon + Tier Pill + Unlocked status */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 shadow-sm transition-transform group-hover:scale-105 ${styles.iconBg}`}>
                    {renderBadgeIcon(badge.iconName, 'w-6 h-6')}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${styles.badgePill}`}>
                      {badge.tier}
                    </span>
                    {badge.unlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3 text-stone-400" />
                        Locked
                      </span>
                    )}
                  </div>
                </div>

                {/* Badge Details */}
                <div>
                  <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-1.5">
                    {badge.title}
                    {badge.unlocked && <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Progress & Bottom Bar */}
              <div className="pt-4 mt-4 border-t border-surface-container-high/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-outline font-medium">Progress</span>
                  <span className="font-extrabold text-on-surface">
                    {badge.currentValue} / {badge.targetValue} {badge.unit} ({progressPercent}%)
                  </span>
                </div>

                {/* Micro Progress Bar */}
                <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      badge.unlocked
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="font-bold text-primary flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary" />
                    +{badge.xpPoints} XP
                  </span>
                  <span className="text-outline text-[10px] group-hover:text-primary transition-colors font-medium">
                    Click for details →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Gamified Perks & Motivation Banner */}
      <div className="p-5 rounded-3xl bg-indigo-50/70 border border-indigo-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
            <Trophy className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-indigo-950">
              Placement Gamification & Interview Readiness
            </h4>
            <p className="text-xs text-indigo-900/80 mt-0.5">
              Badges boost your Mitra Placement Readiness Score and unlock recruiter verification tags on your candidate profile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-900 shadow-2xs">
            🎯 Next Target: {unlockedBadges.length < totalBadgesCount ? badgesList.find(b => !b.unlocked)?.title || 'All Badges Unlocked' : 'All Mastered!'}
          </span>
        </div>
      </div>

      {/* 5. Detail Modal for Badge Click */}
      {activeBadgeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveBadgeModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-container-high space-y-5 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
                  getTierStyles(activeBadgeModal.tier, activeBadgeModal.unlocked).iconBg
                }`}>
                  {renderBadgeIcon(activeBadgeModal.iconName, 'w-7 h-7')}
                </div>
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                    getTierStyles(activeBadgeModal.tier, activeBadgeModal.unlocked).badgePill
                  }`}>
                    {activeBadgeModal.tier} Tier
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-on-surface mt-1">
                    {activeBadgeModal.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveBadgeModal(null)}
                className="p-1.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface-variant space-y-2">
              <p className="font-medium text-sm text-on-surface">
                {activeBadgeModal.description}
              </p>
              {activeBadgeModal.perkReward && (
                <div className="pt-2 border-t border-surface-container-high flex items-center gap-2 text-indigo-700 font-semibold text-xs">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{activeBadgeModal.perkReward}</span>
                </div>
              )}
            </div>

            {/* Status / Criteria Tracker */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-outline font-medium">Achievement Requirement:</span>
                <span className="font-bold text-on-surface">
                  {activeBadgeModal.currentValue} / {activeBadgeModal.targetValue} {activeBadgeModal.unit}
                </span>
              </div>

              <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    activeBadgeModal.unlocked
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'bg-primary'
                  }`}
                  style={{
                    width: `${Math.min(100, (activeBadgeModal.currentValue / activeBadgeModal.targetValue) * 100)}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-outline">
                  Status: {activeBadgeModal.unlocked ? '🎉 Achieved' : '🔒 In Progress'}
                </span>
                <span className="font-bold text-primary">
                  Reward: +{activeBadgeModal.xpPoints} XP
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-surface-container-high flex items-center justify-between gap-3">
              <button
                onClick={() => handleShareBadge(activeBadgeModal)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-surface-container text-on-surface font-bold text-xs hover:bg-surface-container-high flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5 text-primary" />
                <span>{copiedShare ? 'Copied to Clipboard! 🎉' : 'Share Achievement'}</span>
              </button>

              <button
                onClick={() => setActiveBadgeModal(null)}
                className="py-2.5 px-5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container transition-all active:scale-95"
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
