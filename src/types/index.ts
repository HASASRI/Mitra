export type TabType = 
  | 'dashboard' 
  | 'platforms' 
  | 'courses' 
  | 'placements' 
  | 'roadmap' 
  | 'projects' 
  | 'profile';

export interface UserProfile {
  name: string;
  avatarUrl: string;
  email: string;
  rollNo: string;
  college: string;
  degree: string;
  degreeType?: string;
  programDurationYears?: number;
  branch: string;
  year: string;
  semester: string;
  cgpa: number;
  graduationDate: string;
  primaryGoal: string;
  targetCompanyTypes: string[];
  expectedCtcRange: string;
  secondaryRoles: string[];
  readinessScore: number;
  weeklyGoalHours: number;
  weeklyLoggedHours: number;
  activeSprintTitle: string;
  nextMilestone: string;
  leetCodeSolved: number;
  leetCodeUsername: string;
  leetCodeRating: number;
  gitHubUsername: string;
  gitHubCommitsThisWeek: number;
  gitHubRepos: number;
  hackerRankUsername: string;
  hackerRankBadge: string;
  codeforcesUsername: string;
  atsScore: number;
  dailyStreakDays: number;
  dailyHours: { day: string; hours: number; isToday?: boolean }[];
}

export interface Platform {
  id: string;
  name: string;
  shortCode: string;
  category: 'coding' | 'learning' | 'dev' | 'ai' | 'cloud' | 'competitive';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  bestFor: string;
  tagline: string;
  keyFeatures: string[];
  officialUrl: string;
  badge?: string;
  isVerified?: boolean;
  userStats?: string;
  costTier: string;
  relevancyRating: string;
  careerTarget: string;
  logoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  platform: string;
  badge?: string;
  category: 'python_java' | 'dsa' | 'web' | 'ai_data' | 'cloud_devops' | 'sql' | 'aptitude';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  pricingType: '100% Free' | 'Free to Audit' | 'Paid';
  duration: string;
  rating: number;
  studentsCount: string;
  certificateIncluded: boolean;
  officialUrl: string;
  description: string;
  inProgress?: boolean;
  progressPercent?: number;
  topics: string[];
  nextLesson?: string;
  imageUrl?: string;
}

export interface PlacementDrive {
  id: string;
  company: string;
  companyCode: string;
  programRole: string;
  subRole: string;
  location: string;
  eligibleBatches: string;
  minEligibility: string;
  deadlineText: string;
  daysRemaining: number;
  isUrgent?: boolean;
  officialUrl: string;
  examDate?: string;
  addedToCalendar?: boolean;
  logoUrl?: string;
}

export interface CompanyPattern {
  id: string;
  company: string;
  code: string;
  role: string;
  ctcRange: string;
  difficulty: 'Moderate' | 'Medium-High' | 'High Difficulty';
  stages: string[];
  frequentTopics: string;
  questionCount: number;
  category: 'product' | 'service' | 'startup' | 'fintech';
  logoUrl?: string;
}

export interface PrepRound {
  number: number;
  title: string;
  tag: string;
  icon: string;
  description: string;
  recommendedResources: string[];
  stats: string;
  isHighlight?: boolean;
}

export interface RoadmapMilestone {
  id: string;
  code: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  estimatedHours?: string;
  deadline?: string;
  checklist?: { id: string; text: string; done: boolean }[];
  linkedPlatforms?: { name: string; url: string }[];
  courseLink?: string;
}

export interface RoadmapPhase {
  number: number;
  title: string;
  status: 'Completed (100%)' | 'In Progress (70%)' | 'Next Up (20%)' | 'Upcoming (0%)';
  period: string;
  description: string;
  milestones: RoadmapMilestone[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  domain: 'web' | 'cloud' | 'ai' | 'devops' | 'fintech';
  tier: 'Intermediate' | 'Advanced';
  isRecruiterMagnet?: boolean;
  statusText: string;
  statusPercent?: number;
  description: string;
  recruiterImpact: string;
  techStack: string[];
  githubUrl: string;
  previewUrl?: string;
  rfcDocUrl?: string;
  commitsCount?: number;
  thumbnailUrl: string;
  architectureDetails: {
    overview: string;
    keyComponents: string[];
    steps: string[];
    sampleRepoClone: string;
  };
  sprintMilestones?: { text: string; status: 'done' | 'in_progress' | 'pending'; note: string }[];
}

export type BadgeCategory = 'all' | 'study' | 'projects' | 'dsa' | 'streak' | 'placement';

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'study' | 'projects' | 'dsa' | 'streak' | 'placement';
  tier: BadgeTier;
  iconName: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  unlocked: boolean;
  unlockedAt?: string;
  perkReward?: string;
  xpPoints: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  provider: 'google' | 'email';
  isEmailVerified: boolean;
  hasCompletedProfile: boolean;
  twoFactorEnabled?: boolean;
  createdAt: string;
  lastLoginAt: string;
  token?: string;
}

export interface SecurityLogItem {
  id: string;
  timestamp: string;
  action: string;
  device: string;
  ip: string;
  location: string;
  status: 'success' | 'warning' | 'info';
}
