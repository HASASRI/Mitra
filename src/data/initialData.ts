import { 
  UserProfile, 
  Platform, 
  Course, 
  PlacementDrive, 
  CompanyPattern, 
  PrepRound, 
  RoadmapPhase, 
  Project 
} from '../types';

export const initialProfile: UserProfile = {
  name: 'Sri M.',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63FByiqXW5mVbJXXXCt-0voICmmNMjpHfZGIHvfHlNFsjofC1iOrQ7vN-3G_IO4vW8cNXPw-P3AN3oEaHGonJXYjG8ImXYnp3Ro-DHPhUThW1XAjDx64opjc6FLMlVrdR6a5qzJTV6x4uYvFTDTfIpgOFLyk3XrkDoUzqz_1qyCasRTbdpJ9ZBtxvJAZ0Etl8oQq3aChaRT4a0-aYf0QaeDUZ7zl0-V_sc-VSzFwMGOfu6GlGpjlczw',
  email: 'sri.m@nit.ac.in',
  rollNo: '2024MCS014',
  college: 'National Institute of Technology / Engineering College',
  degree: 'M.Tech in Computer Science and Engineering',
  degreeType: 'M.Tech (2 Years • 4 Semesters)',
  programDurationYears: 2,
  branch: 'Computer Science & Engineering',
  year: '2nd Year (Final Year)',
  semester: 'Semester 4',
  cgpa: 8.85,
  graduationDate: 'June 2026',
  primaryGoal: 'Full Stack Software Engineer (SDE-1 / SDE-2)',
  targetCompanyTypes: ['Tier-1 Product Companies (FAANG / Unicorns)', 'High-Growth Tech Startups', 'FinTech'],
  expectedCtcRange: '₹18L - ₹32L LPA',
  secondaryRoles: ['Backend Systems Engineer (Java/Go)', 'Cloud & DevOps Associate', 'AI/ML Systems Engineer'],
  readinessScore: 90,
  weeklyGoalHours: 18,
  weeklyLoggedHours: 14,
  activeSprintTitle: 'M.Tech Campus Placement Season & Thesis Defense • Target June 2026',
  nextMilestone: 'Dynamic Programming & React Ecosystem',
  leetCodeSolved: 142,
  leetCodeUsername: 'sri_codes',
  leetCodeRating: 1680,
  gitHubUsername: 'sri-dev',
  gitHubCommitsThisWeek: 28,
  gitHubRepos: 4,
  hackerRankUsername: 'sri_rank',
  hackerRankBadge: '5-Star Problem Solving • Gold Badge',
  codeforcesUsername: '',
  atsScore: 92,
  dailyStreakDays: 5,
  dailyHours: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 2.0 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Today', hours: 2.0, isToday: true },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 }
  ]
};

export const initialPlatforms: Platform[] = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    shortCode: 'LC',
    category: 'coding',
    difficulty: 'Intermediate',
    bestFor: 'Product-company interview preparation, company-tagged questions, weekly contests.',
    tagline: 'Industry Standard • Tech Interviews',
    badge: 'Industry Standard',
    isVerified: true,
    userStats: '142 Solved — Synced',
    officialUrl: 'https://leetcode.com',
    costTier: 'Freemium (Premium $35/mo)',
    relevancyRating: '★★★★★ (Highest)',
    careerTarget: 'Pre-Final / Final Year (Product Firms)',
    logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-leetcode-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-4-pack-logos-icons-3030006.png',
    keyFeatures: [
      '3000+ curated problems',
      'Discuss forum solutions',
      'Mock interview timer',
      'Top 150 interview sheets'
    ]
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    shortCode: 'HR',
    category: 'coding',
    difficulty: 'Beginner',
    bestFor: 'First-time coders, language proficiency certifications, campus hiring test simulations.',
    tagline: 'Beginner Friendly • Campus Drives',
    badge: 'TCS & Infosys Pattern',
    isVerified: true,
    userStats: 'Gold Badge Problem Solving',
    officialUrl: 'https://www.hackerrank.com',
    costTier: '100% Free for coders',
    relevancyRating: '★★★★☆',
    careerTarget: '1st - 3rd Year (Service & Mass Drives)',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
    keyFeatures: [
      'Topic-wise 30-day domain challenges',
      'Skill verification badges',
      'Language fundamentals (C++, Java, Python)'
    ]
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    shortCode: 'CF',
    category: 'competitive',
    difficulty: 'Advanced',
    bestFor: 'Building lightning-fast problem solving, rating ladder (Div 1 - Div 4), ICPC training.',
    tagline: 'Competitive Programming • High Speed',
    badge: 'Weekly Contests',
    isVerified: true,
    officialUrl: 'https://codeforces.com',
    costTier: '100% Free',
    relevancyRating: '★★★☆☆ (Niche / HFTs)',
    careerTarget: 'Competitive Coders & HFT Aspirants',
    logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-codeforces-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-2-pack-logos-icons-3029995.png',
    keyFeatures: [
      'Global timed contests',
      'Problem rating tags (800-3500)',
      'Active community editorials'
    ]
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    shortCode: 'CC',
    category: 'competitive',
    difficulty: 'Intermediate',
    bestFor: 'Star ratings (1-7 stars), monthly challenges, campus chapter leaderboards.',
    tagline: 'Contests & College Ranking',
    badge: 'Indian College Chapters',
    isVerified: true,
    officialUrl: 'https://www.codechef.com',
    costTier: '100% Free',
    relevancyRating: '★★★★☆',
    careerTarget: 'College Competitive Chapters',
    logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-codechef-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-2-pack-logos-icons-3029994.png',
    keyFeatures: [
      'Star-rated contests (Starters, Long Challenges)',
      'Video solutions',
      'Learning tracks'
    ]
  },
  {
    id: 'gfg',
    name: 'GeeksforGeeks',
    shortCode: 'GFG',
    category: 'learning',
    difficulty: 'All Levels',
    bestFor: 'Subject revision (OS, DBMS, CN), DSA topic breakdowns, company archive archives.',
    tagline: 'Comprehensive CS Library',
    badge: 'Core CS Library',
    isVerified: true,
    officialUrl: 'https://www.geeksforgeeks.org',
    costTier: 'Free articles / Paid courses',
    relevancyRating: '★★★★☆',
    careerTarget: 'All Years (Semester Exams + Technical rounds)',
    logoUrl: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
    keyFeatures: [
      'Structured DSA self-paced courses',
      'Standard interview sheet',
      'Quick theory notes'
    ]
  },
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    shortCode: 'fCC',
    category: 'learning',
    difficulty: 'Beginner',
    bestFor: 'Self-paced project-based full-stack web development, responsive design, JavaScript algorithms.',
    tagline: '100% Free • Verified Certs',
    badge: '100% Free Non-profit',
    isVerified: true,
    officialUrl: 'https://www.freecodecamp.org',
    costTier: '100% Free (Non-profit)',
    relevancyRating: '★★★★☆ (Project Portfolio)',
    careerTarget: 'Beginners building portfolio web apps',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png',
    keyFeatures: [
      '300-hour interactive certifications',
      'Zero setup browser IDE',
      'Massive YouTube curriculum'
    ]
  },
  {
    id: 'neetcode',
    name: 'NeetCode',
    shortCode: 'NC',
    category: 'coding',
    difficulty: 'Intermediate',
    bestFor: 'Visual DSA pattern learning, NeetCode 150 roadmap and Blind 75.',
    tagline: 'Video Explanations & Blind 75',
    badge: 'Visual DSA',
    isVerified: true,
    officialUrl: 'https://neetcode.io',
    costTier: 'Free Tier / Pro Upgrade',
    relevancyRating: '★★★★★',
    careerTarget: 'Product Company SDE Interviews',
    logoUrl: 'https://neetcode.io/favicon.ico',
    keyFeatures: [
      'Clean code templates in Py/Java/C++',
      'Spaced repetition tracker',
      'Video walkthroughs'
    ]
  },
  {
    id: 'w3schools',
    name: 'W3Schools',
    shortCode: 'W3',
    category: 'learning',
    difficulty: 'Beginner',
    bestFor: 'Quick syntax lookups, introductory HTML/CSS/JS/SQL and interactive "Try it Yourself" sandboxes.',
    tagline: 'Web Building Quick References',
    badge: 'Beginner Friendly',
    isVerified: true,
    officialUrl: 'https://www.w3schools.com',
    costTier: '100% Free Tutorials',
    relevancyRating: '★★★☆☆',
    careerTarget: '1st & 2nd Year Web Foundations',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/W3Schools_logo.svg',
    keyFeatures: [
      'Instant browser-based code sandboxes',
      'Clear bite-sized references for HTML, CSS, JS, SQL',
      'Interactive syntax exercises'
    ]
  },
  {
    id: 'github',
    name: 'GitHub',
    shortCode: 'GH',
    category: 'dev',
    difficulty: 'All Levels',
    bestFor: 'Version control, open-source contributions, showcasing projects to recruiters.',
    tagline: 'Industry Essential • Portfolio',
    badge: 'Must-have for Resumes',
    isVerified: true,
    userStats: '28 Commits this week • Connected',
    officialUrl: 'https://github.com',
    costTier: 'Free + Student Pack perks',
    relevancyRating: '★★★★★ (Resume Must-have)',
    careerTarget: 'Mandatory for all aspiring developers',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    keyFeatures: [
      'GitHub Pages hosting',
      'Student Developer Pack benefits',
      'GitHub Actions CI/CD'
    ]
  },
  {
    id: 'replit',
    name: 'Replit',
    shortCode: 'R',
    category: 'dev',
    difficulty: 'Beginner',
    bestFor: 'Quick prototyping, multiplayer collaborative coding, sharing live web demos.',
    tagline: 'Instant In-Browser IDE',
    badge: 'No Local Setup Needed',
    isVerified: true,
    officialUrl: 'https://replit.com',
    costTier: 'Free tier available',
    relevancyRating: '★★★☆☆',
    careerTarget: 'Hackathons & Rapid Demos',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Replit_dark_logo.svg',
    keyFeatures: [
      '50+ languages supported',
      'Instant zero-config deployments',
      'AI code helper'
    ]
  },
  {
    id: 'kaggle',
    name: 'Kaggle',
    shortCode: 'KGL',
    category: 'ai',
    difficulty: 'Intermediate',
    bestFor: 'Data Science competitions, free cloud GPU notebooks, and real-world ML datasets.',
    tagline: 'AI Competitions & Free GPUs',
    badge: 'Data Science Benchmark',
    isVerified: true,
    officialUrl: 'https://www.kaggle.com',
    costTier: '100% Free',
    relevancyRating: '★★★★★ (for AI/ML)',
    careerTarget: 'Data Analysts, ML Engineers, AI Researchers',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg',
    keyFeatures: [
      'Free P100 and T4 GPU compute hours',
      'Extensive public datasets repository',
      'Micro-courses with badges'
    ]
  },
  {
    id: 'colab',
    name: 'Google Colab',
    shortCode: 'COLAB',
    category: 'ai',
    difficulty: 'Beginner',
    bestFor: 'Jupyter notebooks in the cloud, deep learning experiments with PyTorch and TensorFlow.',
    tagline: 'Cloud Jupyter Notebooks',
    badge: 'Google Ecosystem',
    isVerified: true,
    officialUrl: 'https://colab.research.google.com',
    costTier: 'Free tier with T4 GPUs',
    relevancyRating: '★★★★★',
    careerTarget: 'Students running Python ML models without powerful local hardware',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg',
    keyFeatures: [
      'Zero configuration in-browser Jupyter',
      'Free GPU acceleration',
      'Direct Google Drive integration'
    ]
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    shortCode: 'HF',
    category: 'ai',
    difficulty: 'Intermediate',
    bestFor: 'Open-source AI models, LLM transformers, datasets, and Spaces web demos with Gradio/Streamlit.',
    tagline: 'The GitHub of Machine Learning',
    badge: 'Modern Generative AI',
    isVerified: true,
    officialUrl: 'https://huggingface.co',
    costTier: 'Free tier available',
    relevancyRating: '★★★★★',
    careerTarget: 'Generative AI & LLM Engineers',
    logoUrl: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
    keyFeatures: [
      '100,000+ open-source foundation models',
      'Hugging Face Spaces deployment',
      'Transformers & Diffusers libraries'
    ]
  },
  {
    id: 'aws-skill-builder',
    name: 'AWS Skill Builder',
    shortCode: 'AWS',
    category: 'cloud',
    difficulty: 'Intermediate',
    bestFor: 'Official Amazon Web Services cloud learning paths, Cloud Practitioner and Solutions Architect prep.',
    tagline: 'Official AWS Learning Center',
    badge: 'Industry Standard Cloud',
    isVerified: true,
    officialUrl: 'https://explore.skillbuilder.aws',
    costTier: '600+ Free Digital Courses',
    relevancyRating: '★★★★☆',
    careerTarget: 'Cloud Engineers, DevOps, Backend Architects',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    keyFeatures: [
      'Role-based cloud learning plans',
      'AWS Cloud Quest gamified practice',
      'Official certification prep material'
    ]
  },
  {
    id: 'ms-learn',
    name: 'Microsoft Learn',
    shortCode: 'MS',
    category: 'cloud',
    difficulty: 'Beginner',
    bestFor: 'Microsoft Azure cloud computing, C#/.NET, GitHub tooling, and student cloud credits.',
    tagline: 'Official Azure & Dev Pathways',
    badge: 'Enterprise Standard',
    isVerified: true,
    officialUrl: 'https://learn.microsoft.com',
    costTier: '100% Free interactive modules',
    relevancyRating: '★★★★☆',
    careerTarget: 'Enterprise IT, Azure Architects',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    keyFeatures: [
      'Interactive sandbox environments without credit card',
      'Student Certification discounts',
      'Structured career learning paths'
    ]
  },
  {
    id: 'gcp-skills-boost',
    name: 'Google Cloud Skills Boost',
    shortCode: 'GCP',
    category: 'cloud',
    difficulty: 'Intermediate',
    bestFor: 'Hands-on Qwiklabs cloud labs, Google Cloud Associate Cloud Engineer and Data Engineer training.',
    tagline: 'Official Google Cloud Labs',
    badge: 'Google Verified',
    isVerified: true,
    officialUrl: 'https://www.cloudskillsboost.google',
    costTier: 'Free introductory credits / Subscription',
    relevancyRating: '★★★★☆',
    careerTarget: 'GCP Cloud & Big Data Practitioners',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg',
    keyFeatures: [
      'Live Google Cloud console labs',
      'Skill Badges to share on LinkedIn',
      'Arcade challenges for students'
    ]
  }
];

export const initialCourses: Course[] = [
  {
    id: 'web-bootcamp',
    title: 'The Complete 2024 Web Development Bootcamp',
    provider: 'Angela Yu',
    platform: 'Udemy',
    badge: 'In Progress (70%)',
    category: 'web',
    difficulty: 'Beginner',
    pricingType: 'Paid',
    duration: '65 hrs total',
    rating: 4.8,
    studentsCount: '1.2M students',
    certificateIncluded: true,
    officialUrl: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    description: 'Master HTML, CSS, JavaScript, Node.js, Express, React, PostgreSQL, and Web3 in one complete curriculum.',
    inProgress: true,
    progressPercent: 70,
    nextLesson: 'Building Secure Auth with JWT',
    topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Node/Express', 'PostgreSQL', 'REST APIs'],
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cs50',
    title: "CS50's Introduction to Computer Science",
    provider: 'Harvard University',
    platform: 'edX',
    badge: 'Recommended for SDE-1',
    category: 'dsa',
    difficulty: 'Beginner',
    pricingType: 'Free to Audit',
    duration: '12 Weeks (Self-Paced)',
    rating: 4.9,
    studentsCount: '4.8M students',
    certificateIncluded: true,
    officialUrl: 'https://cs50.harvard.edu/x/',
    description: 'The gold-standard foundations in C, Python, SQL, Memory, Algorithms, and data abstraction.',
    topics: ['C Language', 'Memory & Pointers', 'Data Structures', 'Python', 'SQL', 'Algorithms'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'docker-k8s',
    title: 'Docker & Kubernetes: The Practical Guide',
    provider: 'Maximilian Schwarzmüller',
    platform: 'Academind',
    badge: 'Skill Gap Match',
    category: 'cloud_devops',
    difficulty: 'Intermediate',
    pricingType: 'Paid',
    duration: '23 hrs',
    rating: 4.7,
    studentsCount: '780k students',
    certificateIncluded: true,
    officialUrl: 'https://academind.com',
    description: 'Containerize microservices, manage multi-container apps with Docker Compose, and deploy with Kubernetes.',
    topics: ['Docker', 'Containers', 'Docker Compose', 'Kubernetes', 'CI/CD'],
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dsa-self-paced',
    title: 'DSA Self-Paced (Comprehensive Placement Track)',
    provider: 'GeeksforGeeks',
    platform: 'GeeksforGeeks',
    badge: 'Campus Verified Track',
    category: 'dsa',
    difficulty: 'Intermediate',
    pricingType: 'Paid',
    duration: '10-12 Weeks',
    rating: 4.8,
    studentsCount: '140k students',
    certificateIncluded: true,
    officialUrl: 'https://www.geeksforgeeks.org/courses/dsa-self-paced',
    description: 'From Arrays and Strings to Dynamic Programming, Graphs, and Segment Trees with C++ and Java implementations.',
    topics: ['Arrays', 'Trees & Graphs', 'DP', 'C++/Java', 'Time Complexity'],
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'python-for-everybody',
    title: 'Python for Everybody Specialization',
    provider: 'Univ. of Michigan',
    platform: 'Coursera',
    badge: 'Free to Audit',
    category: 'python_java',
    difficulty: 'Beginner',
    pricingType: 'Free to Audit',
    duration: '8 Weeks • 3 hrs/wk',
    rating: 4.9,
    studentsCount: '1.1M students',
    certificateIncluded: true,
    officialUrl: 'https://www.coursera.org/specializations/python',
    description: 'Learn to program and analyze data with Python: data structures, networked application program interfaces, and databases.',
    topics: ['Python 3', 'Web Scraping', 'SQLite', 'JSON APIs'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'java-masterclass',
    title: 'Java Programming Masterclass (Updated 2024)',
    provider: 'Tim Buchalka',
    platform: 'Udemy',
    badge: 'Enterprise Java Focus',
    category: 'python_java',
    difficulty: 'Intermediate',
    pricingType: 'Paid',
    duration: '118 hrs of video',
    rating: 4.7,
    studentsCount: '780k students',
    certificateIncluded: true,
    officialUrl: 'https://www.udemy.com/course/java-the-complete-java-developer-course/',
    description: 'Master Java 17/21 OOP, collections framework, lambdas, concurrency, multithreading, and Spring basics.',
    topics: ['OOP Principles', 'Collections', 'Multithreading', 'Lambdas'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fullstack-open',
    title: 'Full Stack Open (Deep Dive to Modern Web Development)',
    provider: 'University of Helsinki',
    platform: 'Helsinki Open',
    badge: 'Highly Recommended • 100% Free Cert',
    category: 'web',
    difficulty: 'Intermediate',
    pricingType: '100% Free',
    duration: 'Self-Paced (~120 hrs)',
    rating: 4.95,
    studentsCount: 'SDE Essential',
    certificateIncluded: true,
    officialUrl: 'https://fullstackopen.com/en/',
    description: 'Master React, Redux, Node.js, Express, TypeScript, GraphQL, Docker, and CI/CD. Includes university credit equivalents.',
    topics: ['React 18', 'Node & Express', 'TypeScript', 'CI/CD Pipelines'],
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'odin-project',
    title: 'The Odin Project: Full Stack JavaScript Path',
    provider: 'The Odin Project Community',
    platform: 'The Odin Project',
    badge: '100% Free Open Source',
    category: 'web',
    difficulty: 'Intermediate',
    pricingType: '100% Free',
    duration: '~300 Hours Project-based',
    rating: 4.9,
    studentsCount: '250k Graduates',
    certificateIncluded: false,
    officialUrl: 'https://www.theodinproject.com/paths/full-stack-javascript',
    description: 'An active hands-on path building real portfolio repos: HTML/CSS, Vanilla JS, Git, React, Node, Express, MongoDB, and deployment.',
    topics: ['Git CLI', 'JavaScript ES6+', 'Node & MongoDB', 'Testing (Jest)'],
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ml-specialization',
    title: 'Machine Learning Specialization',
    provider: 'Andrew Ng / DeepLearning.AI',
    platform: 'Coursera / Stanford',
    badge: 'Free to Audit',
    category: 'ai_data',
    difficulty: 'Intermediate',
    pricingType: 'Free to Audit',
    duration: '3 Months • 5 hrs/wk',
    rating: 4.9,
    studentsCount: '500k+ students',
    certificateIncluded: true,
    officialUrl: 'https://www.deeplearning.ai/courses/machine-learning-specialization/',
    description: 'Master foundational AI concepts: Supervised Learning, Neural Networks, Decision Trees, and Unsupervised Learning techniques in Python.',
    topics: ['NumPy', 'Scikit-Learn', 'TensorFlow', 'Neural Networks'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kaggle-micro',
    title: 'Kaggle Micro-Courses Track',
    provider: 'Kaggle Learn',
    platform: 'Kaggle',
    badge: '100% Free Cert',
    category: 'ai_data',
    difficulty: 'Beginner',
    pricingType: '100% Free',
    duration: '4-8 hrs per topic',
    rating: 4.8,
    studentsCount: 'Hands-on Notebooks',
    certificateIncluded: true,
    officialUrl: 'https://www.kaggle.com/learn',
    description: 'Bite-sized practical modules: Pandas, Feature Engineering, Data Cleaning, Intro to Deep Learning, and Computer Vision with quick badges.',
    topics: ['Pandas', 'Data Viz', 'SQL Joins', 'Feature Engineering'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'quant-aptitude',
    title: 'Complete Quantitative Aptitude for Campus Placements',
    provider: 'PrepInsta / Mitra Verified',
    platform: 'PrepInsta',
    badge: 'Campus Standard',
    category: 'aptitude',
    difficulty: 'Beginner',
    pricingType: 'Paid',
    duration: '40 Hours of Drills',
    rating: 4.7,
    studentsCount: '95k students',
    certificateIncluded: false,
    officialUrl: 'https://prepinsta.com',
    description: 'Speed math formulas, Permutation & Combinations, Probability, Time & Work, and modern coding assessment verbal reasoning tests.',
    topics: ['Quant Speed Tricks', 'Data Interpretation', 'Company Mocks'],
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nptel-os-dbms',
    title: 'Operating Systems & Database Management Systems',
    provider: 'NPTEL / Swayam (IIT Kharagpur & IIT Madras)',
    platform: 'NPTEL',
    badge: 'Univ Credit & Placements',
    category: 'sql',
    difficulty: 'Intermediate',
    pricingType: '100% Free',
    duration: '12 Weeks (Free Lectures)',
    rating: 4.8,
    studentsCount: 'Free Video Lectures',
    certificateIncluded: true,
    officialUrl: 'https://nptel.ac.in',
    description: 'Core engineering subject interview preparation: Process scheduling, virtual memory, concurrency, ACID transactions, normalization & indexing.',
    topics: ['Threads & Locks', 'Virtual Memory', 'B-Trees & SQL', 'Normalization'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialPlacementDrives: PlacementDrive[] = [
  {
    id: 'tcs-nqt',
    company: 'Tata Consultancy Services',
    companyCode: 'TCS',
    programRole: 'TCS National Qualifier Test (NQT) 2025/2026',
    subRole: 'Ninja, Digital & Prime Cadres',
    location: 'Pan-India',
    eligibleBatches: '2025 & 2026 Batch',
    minEligibility: '6.0+ CGPA / 60% in X, XII & B.Tech (Max 1 Backlog)',
    deadlineText: 'Closing in 5 days',
    daysRemaining: 5,
    isUrgent: true,
    officialUrl: 'https://www.tcs.com/careers',
    examDate: 'May 10',
    addedToCalendar: true,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg'
  },
  {
    id: 'google-summer',
    company: 'Google India',
    companyCode: 'GOOG',
    programRole: 'Software Student Training in Engineering (STEP) / Summer Intern',
    subRole: 'Software Engineering Intern (Summer 2025)',
    location: 'Bangalore / Hyderabad',
    eligibleBatches: '2026 Batch Only',
    minEligibility: "Enrolled in accredited Bachelor's, No CGPA cutoff",
    deadlineText: '14 days left',
    daysRemaining: 14,
    officialUrl: 'https://careers.google.com/students',
    examDate: 'End of Month',
    addedToCalendar: false,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
  },
  {
    id: 'amazon-wow',
    company: 'Amazon Development Centre',
    companyCode: 'AMZN',
    programRole: 'Amazon WOW (Women in Tech Early Talent Drive) & Open SDE',
    subRole: 'SDE-1 (Campus & Internship)',
    location: 'Pan-India',
    eligibleBatches: '2025 & 2026 Batch',
    minEligibility: '6.5+ CGPA, B.Tech/M.Tech in CS/IT/Circuital',
    deadlineText: 'Closing Friday',
    daysRemaining: 3,
    isUrgent: true,
    officialUrl: 'https://www.amazon.jobs/en/teams/internships-for-students',
    addedToCalendar: true,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
  },
  {
    id: 'microsoft-engage',
    company: 'Microsoft India',
    companyCode: 'MSFT',
    programRole: 'Microsoft Engage Mentorship & Summer SWE Internship',
    subRole: 'Software Development Engineer Intern',
    location: 'Hyderabad / Noida / Bangalore',
    eligibleBatches: '2025 & 2026 Batch',
    minEligibility: '7.0+ CGPA or Equivalent, CS/IT or Circuit branches',
    deadlineText: '18 days left',
    daysRemaining: 18,
    officialUrl: 'https://careers.microsoft.com/students',
    examDate: 'June 2025',
    addedToCalendar: false,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
  },
  {
    id: 'infosys-dsy',
    company: 'Infosys Limited',
    companyCode: 'INFY',
    programRole: 'Infosys HackWithInfy & Specialist Programmer (DSE/SP)',
    subRole: 'Digital Specialist Engineer (9.5 LPA) & SP (6.5 LPA)',
    location: 'Pan-India Development Centers',
    eligibleBatches: '2025 & 2026 Batch',
    minEligibility: '65% aggregate throughout academic career',
    deadlineText: '10 days left',
    daysRemaining: 10,
    officialUrl: 'https://www.infosys.com/careers.html',
    examDate: 'May 25',
    addedToCalendar: false,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg'
  },
  {
    id: 'acciojob-mega',
    company: 'AccioJob / eLitmus National',
    companyCode: 'ACCIO',
    programRole: 'National Mega Off-Campus Drive (30+ Partner Startups)',
    subRole: 'Direct hiring test for 18 Product Startups',
    location: 'Remote / Hybrid',
    eligibleBatches: '2024, 2025, 2026',
    minEligibility: 'No Minimum CGPA criteria (Skill test based)',
    deadlineText: '21 days left',
    daysRemaining: 21,
    officialUrl: 'https://acciojob.com',
    examDate: '24th April',
    addedToCalendar: false,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg'
  }
];

export const initialCompanyPatterns: CompanyPattern[] = [
  {
    id: 'google',
    company: 'Google',
    code: 'G',
    role: 'Software Engineer (L3/SWE Campus)',
    ctcRange: '₹30L – ₹48L CTC Tier',
    difficulty: 'High Difficulty',
    stages: [
      'Round 1: OA (2 Hard DSA • 90m)',
      'Round 2: Tech DSA (Live 45m)',
      'Round 3: DSA + Core CS',
      'Round 4: Googleyness'
    ],
    frequentTopics: 'Graph shortest paths, Dynamic Programming on Trees, Segment Trees, and concurrency fundamentals.',
    questionCount: 42,
    category: 'product',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
  },
  {
    id: 'amazon',
    company: 'Amazon',
    code: 'A',
    role: 'SDE-1 (Campus & Amazon WOW)',
    ctcRange: '₹28L – ₹44L CTC Tier',
    difficulty: 'Medium-High',
    stages: [
      'Round 1: OA (Coding + Work Simulation)',
      'Round 2: Tech 1 (DSA + LPs)',
      'Round 3: Tech 2 (System Design / LLD)',
      'Round 4: Bar Raiser'
    ],
    frequentTopics: 'Priority Queues, Binary Search on Answer, HashMap design, and the 16 Amazon Leadership Principles.',
    questionCount: 38,
    category: 'product',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
  },
  {
    id: 'tcs',
    company: 'TCS Digital / Prime',
    code: 'TCS',
    role: 'Systems Engineer / Digital Specialist',
    ctcRange: '₹7.5L – ₹11.5L CTC',
    difficulty: 'Moderate',
    stages: [
      'Round 1: NQT Cognitive + Advanced Quants',
      'Round 2: Advanced Coding (2 Qs)',
      'Round 3: Combined Tech + MR + HR'
    ],
    frequentTopics: 'Number theory, matrix manipulation, basic recursion, string anagrams, and Java OOP inheritance.',
    questionCount: 55,
    category: 'service',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg'
  },
  {
    id: 'razorpay',
    company: 'Razorpay',
    code: 'RZP',
    role: 'Software Development Engineer 1',
    ctcRange: '₹24L – ₹32L CTC',
    difficulty: 'High Difficulty',
    stages: [
      'Round 1: HackerEarth OA (3 Problem sets)',
      'Round 2: Machine Coding (90 mins LLD)',
      'Round 3: Problem Solving & DSA',
      'Round 4: Culture Fit'
    ],
    frequentTopics: 'Low-level parking lot / splitwise design, concurrency locks, Redis queues, and idempotency keys.',
    questionCount: 30,
    category: 'fintech',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg'
  }
];

export const initialPrepRounds: PrepRound[] = [
  {
    number: 1,
    title: 'Quantitative, Logical & Verbal',
    tag: 'Elimination Round',
    icon: 'pie_chart',
    description: 'High speed accuracy drills for speed math, permutations & combinations, blood relations, and syllogisms.',
    recommendedResources: ['PrepInsta Prime', 'IndiaBIX Practice', 'RS Aggarwal Formulas'],
    stats: '40+ Full Tests Available'
  },
  {
    number: 2,
    title: 'Online Coding Assessment (OA)',
    tag: 'High Impact',
    icon: 'code_blocks',
    description: 'TCS NQT, Infosys InfyTQ, Capgemini pseudo-code, and LeetCode Medium data structures with time constraints.',
    recommendedResources: ['LeetCode Tagged', 'HackerRank OA', 'Live OA Timer Simulator'],
    stats: '85% Completed for Sri',
    isHighlight: true
  },
  {
    number: 3,
    title: 'Technical Interview & Core CS',
    tag: 'Target Area (65%)',
    icon: 'developer_board',
    description: 'In-depth discussions on OS process synchronization, DBMS indexing, Computer Networks (TCP vs UDP), and OOP principles.',
    recommendedResources: ['GeeksforGeeks Core Sheets', 'SQL Query Playground', 'LLD Design Patterns'],
    stats: '12 Core Cheat Sheets'
  },
  {
    number: 4,
    title: 'System Design & Architecture',
    tag: 'Product Companies',
    icon: 'hub',
    description: 'Fundamental principles of microservices, horizontal scaling, caching strategies (Redis), REST endpoints, and DB partitioning.',
    recommendedResources: ['Beginner Microservices', 'REST API Primer', 'Redis & DB Sharding'],
    stats: '8 Case Studies'
  },
  {
    number: 5,
    title: 'Behavioral & HR Round',
    tag: 'High Conversion',
    icon: 'record_voice_over',
    description: 'Master the STAR (Situation, Task, Action, Result) storytelling framework to present college projects and conflict resolution.',
    recommendedResources: ['STAR Framework Guide', 'Top 25 HR Answers', 'Leadership Scenarios'],
    stats: 'Interactive AI Prompts'
  },
  {
    number: 6,
    title: 'Resume & ATS Optimization',
    tag: 'Score: 90%',
    icon: 'description',
    description: 'Format resumes for Workday, Greenhouse, and Taleo parsers with quantifiable metric bullet points and active verbs.',
    recommendedResources: ['Mitra ATS Analyzer', 'GitHub Showcase Guide', 'Action Verbs List'],
    stats: "Sri's Resume: Verified"
  }
];

export const initialRoadmapPhases: RoadmapPhase[] = [
  {
    number: 1,
    title: 'Foundational Programming & DSA',
    status: 'Completed (100%)',
    period: 'Completed: Jan 2025',
    description: 'Core computational mastery, algorithm rigor, and memory management prerequisites required for technical screening rounds.',
    milestones: [
      {
        id: 'm1_1',
        code: '1.1',
        title: 'C++/Java OOP Concepts',
        description: 'Encapsulation, Polymorphism, Memory allocation, and Exception handling paradigms.',
        status: 'completed'
      },
      {
        id: 'm1_2',
        code: '1.2',
        title: 'Linear Data Structures',
        description: 'Arrays, Strings, LinkedLists, Stacks, Queues, and Sliding Window techniques.',
        status: 'completed'
      },
      {
        id: 'm1_3',
        code: '1.3',
        title: 'Advanced DSA & Problem Solving (140 Solved)',
        description: 'Binary Trees, BFS/DFS Traversal, Dijkstra Graph shortest path, and dynamic programming memoization.',
        status: 'completed'
      }
    ]
  },
  {
    number: 2,
    title: 'Modern Web Stack & API Engineering',
    status: 'In Progress (70%)',
    period: 'Feb – April 2025',
    description: 'Full-stack production development capabilities: building end-to-end resilient applications, secure authentication, and relational data architecture.',
    milestones: [
      {
        id: 'm2_1',
        code: '2.1',
        title: 'Frontend Core',
        description: 'React 18, TypeScript strict typing, Tailwind CSS architecture, and custom hook lifecycle management.',
        status: 'completed'
      },
      {
        id: 'm2_2',
        code: '2.2',
        title: 'Backend & REST APIs',
        description: 'Node.js/Express, JWT Bearer tokens, bcrypt hashing, error middleware, and sanitization.',
        status: 'completed'
      },
      {
        id: 'm2_3',
        code: '2.3',
        title: 'State & Data Fetching',
        description: 'TanStack Query (React Query v5) mutation invalidation, optimistic updates, Zustand global client state, and network hydration caching.',
        status: 'in_progress',
        estimatedHours: '4 hrs remaining',
        deadline: 'April 15',
        checklist: [
          { id: 'c1', text: 'Configure QueryClientProvider and custom staleTime cache layers', done: true },
          { id: 'c2', text: 'Implement useQuery with pagination & infinite scroll hooks', done: true },
          { id: 'c3', text: 'Integrate useMutation with optimistic UI rollback on network error', done: false },
          { id: 'c4', text: 'Build persistent auth slice using Zustand persist middleware', done: false }
        ],
        linkedPlatforms: [
          { name: 'GitHub Repo', url: 'https://github.com' },
          { name: 'LeetCode #380', url: 'https://leetcode.com' },
          { name: 'freeCodeCamp', url: 'https://freecodecamp.org' }
        ]
      },
      {
        id: 'm2_4',
        code: '2.4',
        title: 'Database Modeling & Relations',
        description: 'PostgreSQL schemas, Prisma ORM migrations, ACID transaction guarantees, and B-Tree indexing.',
        status: 'upcoming',
        courseLink: 'https://fullstackopen.com'
      }
    ]
  },
  {
    number: 3,
    title: 'System Design, Microservices & Cloud',
    status: 'Next Up (20%)',
    period: 'May – June 2025',
    description: 'Architecture fundamentals, distributed systems concepts, containerization, and AWS continuous deployment workflows.',
    milestones: [
      {
        id: 'm3_1',
        code: '3.1',
        title: 'Low-Level Design (LLD) & UML patterns',
        description: 'Object-oriented design patterns (Singleton, Factory, Observer, Strategy) and class diagrams.',
        status: 'upcoming'
      },
      {
        id: 'm3_2',
        code: '3.2',
        title: 'Redis caching strategies & message queues',
        description: 'Cache-aside pattern, pub/sub, rate limiting, and BullMQ task queues.',
        status: 'upcoming'
      },
      {
        id: 'm3_3',
        code: '3.3',
        title: 'Docker multi-stage containerization',
        description: 'Dockerfiles, multi-stage builds, Alpine base images, and docker-compose orchestration.',
        status: 'upcoming'
      },
      {
        id: 'm3_4',
        code: '3.4',
        title: 'AWS S3 static assets & EC2 NGINX deploy',
        description: 'Cloud hosting, SSL certificates via Certbot, reverse proxying, and CI/CD actions.',
        status: 'upcoming'
      }
    ]
  },
  {
    number: 4,
    title: 'Mock Assessments, Placement Sprints & Capstone',
    status: 'Upcoming (0%)',
    period: 'July – August 2025',
    description: 'High-stakes placement simulation, company-specific Online Assessment mocks, ATS resume audit, and campus hiring execution.',
    milestones: [
      {
        id: 'm4_1',
        code: '4.1',
        title: 'Tier-1 Product OA timed tests (90 mins)',
        description: 'Timed full tests matching Amazon, Google, and Microsoft testing portals.',
        status: 'upcoming'
      },
      {
        id: 'm4_2',
        code: '4.2',
        title: '3x Peer 1:1 Technical System & Coding Mocks',
        description: 'Live interactive pair interviewing with real senior mentors.',
        status: 'upcoming'
      },
      {
        id: 'm4_3',
        code: '4.3',
        title: 'Resume ATS score calibration (Goal > 90)',
        description: 'Quantifiable metric verification and bullet point polishing.',
        status: 'upcoming'
      },
      {
        id: 'm4_4',
        code: '4.4',
        title: 'Campus drive day-1 execution readiness',
        description: 'Final checklist before Day-1 dream companies arrive on campus.',
        status: 'upcoming'
      }
    ]
  }
];

export const initialProjects: Project[] = [
  {
    id: 'devconnect',
    title: 'DevConnect — Real-Time Peer Coding Platform',
    subtitle: 'Priority Capstone for SDE-1 Cohort',
    domain: 'web',
    tier: 'Intermediate',
    statusText: 'In Development • 65% Completed',
    statusPercent: 65,
    description: 'Collaborative pair programming platform with simultaneous multi-cursor remote execution, WebRTC audio channels, and sandboxed runner environments.',
    recruiterImpact: 'Validates real-time WebSockets, state synchronization, WebRTC audio streaming, and microservice container execution.',
    techStack: ['React 18', 'TypeScript', 'Node.js', 'WebSockets', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    githubUrl: 'https://github.com/sri/devconnect',
    previewUrl: '#',
    rfcDocUrl: '#',
    commitsCount: 28,
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmcgJcdr8aqpaNHndmQq_C4VuivvMrebJYPFLxozd33NkaKA21_3TBPCBeD5BojJrgj8PcoTpSEoGy7YxTWvxSbjbAsP6d5zG95IlipfeFPzR_vf9vmiqV3u70Bbc8KDcWRiXpcPAYeUElqV9hgE0RzTYHFecJj_hr1dlswvMTL4s3uAfILgdfg52jU9Vcm_9UxyCjM2fpCqneFumOPfbTfrgWw1yO5motpA6o0twt0TArOWHJl3TJEw',
    architectureDetails: {
      overview: 'DevConnect is architected as an event-driven collaborative workspace. Frontend uses React and Monaco Editor with Operational Transformation via Socket.io. Code execution jobs are sent to an isolated Docker container with strict CPU/memory limits and timeout guards.',
      keyComponents: [
        'Monaco Editor with multi-cursor cursors broadcasting over WebSockets',
        'WebRTC Mesh for peer-to-peer low-latency voice chat',
        'Node.js orchestrator dispatching compile jobs to ephemeral Docker runner containers',
        'PostgreSQL with Prisma for persistent room transcripts and user permissions'
      ],
      steps: [
        'Set up WebSocket server with room multiplexing and heartbeat pings',
        'Integrate Monaco Editor and bind cursor position changes to Socket events',
        'Build WebRTC peer connection manager with STUN fallback servers',
        'Create isolated Docker container runner with security sandboxing',
        'Deploy backend to Railway/Render and frontend to Vercel'
      ],
      sampleRepoClone: 'git clone https://github.com/mitra-student/devconnect-starter.git\ncd devconnect-starter\nnpm install\nnpm run dev'
    },
    sprintMilestones: [
      { text: 'WebRTC & Socket.io multi-cursor sync', status: 'done', note: 'Completed • Tested 4 peers' },
      { text: 'Secure JWT auth with GitHub OAuth', status: 'done', note: 'Completed • Token rotation active' },
      { text: 'Sandboxed Code Execution API with Docker', status: 'in_progress', note: 'In progress • 3 days remaining' },
      { text: 'Redis caching for live room states', status: 'pending', note: 'Next up in sprint queue' }
    ]
  },
  {
    id: 'ai-resume-parser',
    title: 'AI Resume Parser & ATS Match Score Engine',
    subtitle: 'Advanced • Recruiter Magnet',
    domain: 'ai',
    tier: 'Advanced',
    isRecruiterMagnet: true,
    statusText: 'Ready / Verified',
    statusPercent: 100,
    description: 'Extracts structured entities from PDF/Word resumes, benchmarks against job descriptions using vector embeddings (FAISS/Pinecone) and LLM scoring.',
    recruiterImpact: 'Highlighted in 94% of SDE-1 interviews for ML/Backend roles.',
    techStack: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'React', 'FAISS'],
    githubUrl: 'https://github.com/sri/ai-resume-parser',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKscuAh1BqIKYnqiGjDoVnNpKnTA1I69A57Z-b5eSi3SUtGzlKJ2ekrot4BPJL1xifNL69I7il9b5iT7dpP4Yrfg0nnXTPFEPh-QVUfFVR1JAhjPN5RTBGEVlCjrr5ZdFKlFtpFMZfg02eZ4FFcciRpCZgld9FCDLrSnBIzGcQjXQ4-Hve2liJNHP7CrBFkQtbyuGLf0WRvtXvrebLnESOEwVl8wLe-p-B4GG5u3Qb-R94hTuJHAwmQ',
    architectureDetails: {
      overview: 'Converts uploaded candidate resumes to standardized JSON using SpaCy NER and text-embedding models. Evaluates similarity against target job descriptions using Cosine Similarity on dense vector embeddings.',
      keyComponents: [
        'PDF parser & text normalizer using PyMuPDF',
        'Named Entity Recognition (NER) pipeline for extracting skills, institutions, and years of experience',
        'Vector store embedding indexing with FAISS',
        'FastAPI REST endpoints for instant file parsing and scoring'
      ],
      steps: [
        'Build PDF extraction parser handling multi-column layouts',
        'Train custom NER pipeline or use regex-guided heuristics for technical skills',
        'Generate dense sentence embeddings for job requirements and candidate bullets',
        'Compute cosine similarity and generate actionable gap suggestions',
        'Build React frontend with drag-and-drop file upload and visual match dials'
      ],
      sampleRepoClone: 'git clone https://github.com/mitra-student/ats-scorer-engine.git\ncd ats-scorer-engine\npip install -r requirements.txt\nuvicorn main:app --reload'
    }
  },
  {
    id: 'task-queue-worker',
    title: 'Distributed Task Queue & Background Worker',
    subtitle: 'Systems & Cloud Infrastructure',
    domain: 'cloud',
    tier: 'Advanced',
    statusText: 'Architecture Defined',
    statusPercent: 20,
    description: 'High-throughput task worker pool processing asynchronous video transcode jobs with Redis pub/sub, exponential retry backoff, and dead-letter queues.',
    recruiterImpact: 'Proves distributed systems knowledge, async concurrency control, and idempotency handling.',
    techStack: ['Go', 'Node.js', 'Redis', 'Docker', 'Prometheus'],
    githubUrl: 'https://github.com/sri/distributed-queue',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiU1HHHwQerNDMZzcdi_jbulNNQTTpZcrKlsTJhKV5w0yzFs5CUDLpIeXqs4hN8Uhng5l2LZtnrWrPzPH_Ooq92fxJzehtR1KUhaOhYcVSkN2L87deMiyvO1MyvzueWehUSs5lnA1FLUx2KjU4WeEIcwoFWDdzgfg5XeN06PzUENQWIhriVIv666WwTcS9gq1VJNW4_4Allo4i2DDFmFSCZRSJl8a6nSB1uLOPVCO3FGi7ukdu3glc8Q',
    architectureDetails: {
      overview: 'A fault-tolerant task queue system written in Go. Clients enqueue JSON payloads over HTTP; workers pull from Redis using reliable queues with heartbeat monitoring.',
      keyComponents: [
        'Redis sorted sets for delayed and scheduled jobs',
        'Worker pool with goroutine concurrency control',
        'Dead letter queue for jobs failing after 3 exponential backoff retries',
        'Prometheus metrics endpoint exporting throughput and error rates'
      ],
      steps: [
        'Implement producer HTTP endpoint in Go with payload validation',
        'Use Redis BLPOP / RPOPLPUSH for atomic job delivery without loss',
        'Handle graceful worker shutdown on SIGTERM without dropping in-flight jobs',
        'Expose Prometheus metrics for queue latency and processing times'
      ],
      sampleRepoClone: 'git clone https://github.com/mitra-student/distributed-task-worker.git\ncd distributed-task-worker\ngo run main.go'
    }
  },
  {
    id: 'kanban-analytics',
    title: 'Multi-Tenant Collaborative Kanban & Analytics',
    subtitle: 'Full Stack App',
    domain: 'web',
    tier: 'Intermediate',
    statusText: 'In Development',
    statusPercent: 50,
    description: 'Trello-style board with real-time drag-and-drop optimistic UI, role-based workspace permissions, and audit event logs.',
    recruiterImpact: 'Demonstrates clean relational schema design, complex UI state, and auditability.',
    techStack: ['Next.js 14', 'Supabase', 'Tailwind CSS', 'TanStack Query', 'TypeScript'],
    githubUrl: 'https://github.com/sri/kanban-analytics',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw_WyMIqXJeoy4oVkmoD_OOYlyYpKgbg37HkEhxfLRlHiDkTvmd8c6pFaHtD2OXDeQYkBDRl0K3l8eOID4Fr056gkj7oKrhzSCyLIpeY0NE7SW51mBoIVfeW_Xqx5XJ_zuoIVM6NKSXuffuihZZmgAelvqQsAKLwOhFBcvR1N-aKn2hKp6za9sJQMkikQVmktyw9motnJOfrr5KzQlJc9ioX9n-nLTAYW2wLI6z3JVKopv3wpd0qPUsA',
    architectureDetails: {
      overview: 'A scalable multi-tenant SaaS application allowing team workspaces with row-level security (RLS), drag-and-drop columns, and real-time activity audit trails.',
      keyComponents: [
        'Supabase PostgreSQL with Row Level Security (RLS)',
        'React Beautiful DnD or Pragmatic Drag and Drop for optimistic card moves',
        'TanStack Query mutation caching and rollback on sync error',
        'Audit event logger tracking card movements and status changes'
      ],
      steps: [
        'Design relational schema (Workspaces, Boards, Columns, Cards, Activities)',
        'Configure Supabase Auth and RLS policies per workspace member role',
        'Implement drag and drop with instant optimistic UI response',
        'Add analytics dashboard displaying burndown and task throughput'
      ],
      sampleRepoClone: 'git clone https://github.com/mitra-student/kanban-saas.git\ncd kanban-saas\nnpm install && npm run dev'
    }
  },
  {
    id: 'microservices-ecommerce',
    title: 'Microservices E-Commerce API Gateway',
    subtitle: 'Backend & gRPC',
    domain: 'cloud',
    tier: 'Advanced',
    statusText: 'Not Started',
    statusPercent: 0,
    description: 'Decoupled order, inventory, and payment microservices with gRPC communication, rate limiting, and centralized JWT validation.',
    recruiterImpact: 'Validates architecture boundaries, microservice communication, and gRPC protocol buffers.',
    techStack: ['Express / NestJS', 'gRPC', 'PostgreSQL', 'Docker Compose', 'Nginx'],
    githubUrl: 'https://github.com/sri/microservices-gateway',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWFnH4ASvEdDWjs1QI2i5nf-PfdoZj0J36tr30vzMwblC0oe-DmwV7nuq9WCOQIEicG71at2g8gfba8Nmtj6jc2xBB7xYmn3UveC7NBG-GiCgbKxcdbp-gNWWTTwMGRYPSPWv_QcMV8s7v0W3NwLV31LdxnaVQv7eFRlCwMO5lJUzaxJvENJeo09zFTYNXryS_ARrsyNKQ-NKN_v4OIqM9uO6n4cMD5rcA3mdCRxhQ993dhFcLlfGEbg',
    architectureDetails: {
      overview: 'Demonstrates enterprise microservice patterns: API Gateway entrypoint, internal high-speed gRPC communication between services, independent databases per service, and distributed tracing.',
      keyComponents: [
        'API Gateway with Nginx/Node.js reverse proxy and rate limiting',
        'Order Service, Inventory Service, and Payment Service with proto definitions',
        'Transactional outbox pattern for guaranteed message delivery',
        'Docker Compose networking configuration'
      ],
      steps: [
        'Define protobuf schemas for Order, Inventory, and Payment contracts',
        'Implement microservice handlers in Node.js / NestJS with gRPC',
        'Set up API Gateway validating JWT and routing client HTTP requests to gRPC',
        'Containerize each service and orchestrate via Docker Compose'
      ],
      sampleRepoClone: 'git clone https://github.com/mitra-student/microservices-mesh.git\ncd microservices-mesh\ndocker-compose up -d'
    }
  },
  {
    id: 'code-playground',
    title: 'Browser-Based Code Playground & Compiler Sandbox',
    subtitle: 'Developer Tooling',
    domain: 'devops',
    tier: 'Intermediate',
    statusText: 'Planned',
    statusPercent: 10,
    description: 'In-browser code runner supporting JavaScript/Python with Monaco editor, syntax highlighting, and virtualized file tree.',
    recruiterImpact: 'Highlights deep browser performance knowledge, Web Workers, and WebAssembly integration.',
    techStack: ['React', 'Web Workers', 'Monaco Editor', 'WebAssembly', 'Pyodide'],
    githubUrl: 'https://github.com/sri/code-playground',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDMngTUT0ygkKKlV79Ya1UXa10AAdpK0VFj2ArCAg4oO7eirA07122KYukRgcbNenFwStPnxUWgCOwtbBuD93s_UiNwlqA5mbRRbULFDgB5hEte8yukSvhbAE6VSQKAwkV0RqMmaPOpsAuJ35uUTGBAdtQtmSyAAkUZx9v3n67ZJOYUJbLFj2Xzd6pv6vvDopEtxrzLkFtaE4ZkibGwcSu-UanEMnL8QuM8xa-DxLrzaYpbZVeB0QGeg',
    architectureDetails: {
      overview: 'Executes untrusted user code safely directly in the browser! Uses Web Workers for isolated JavaScript evaluation and Pyodide (Wasm) for running Python locally without server compute costs.',
      keyComponents: [
        'Monaco Editor with IntelliSense and theme support',
        'Dedicated Web Worker sandbox preventing UI thread lockup',
        'Pyodide WebAssembly engine for Python execution',
        'Virtual in-memory file system with file tabs'
      ],
      steps: [
        'Embed Microsoft Monaco Editor with customized language syntax rules',
        'Spawn dedicated Web Worker with execution timeout termination',
        'Load Pyodide Wasm package and expose standard library packages',
        'Intercept console.log and errors to stream output to virtual terminal'
      ],
      sampleRepoClone: 'git clone https://github.com/mitra-student/wasm-playground.git\ncd wasm-playground\nnpm install && npm run dev'
    }
  },
  {
    id: 'crypto-tracker',
    title: 'Crypto & Stock Portfolio Tracker with WebSockets',
    subtitle: 'FinTech Live',
    domain: 'fintech',
    tier: 'Intermediate',
    statusText: 'In Progress',
    statusPercent: 40,
    description: 'Financial dashboard streaming ticker price updates with interactive Chart.js sparklines, profit/loss calculations, and price threshold alert notifications.',
    recruiterImpact: 'Displays handling of high-frequency data streams, math precision, and charting performance.',
    techStack: ['React', 'Finnhub API', 'WebSockets', 'Tailwind CSS', 'Chart.js'],
    githubUrl: 'https://github.com/sri/crypto-tracker',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnGhEr2bPzorb_efgiHcs93lJicRnaAZc5qZkuZzxOpMSEWZDBdeA5J8bQ88azyAJsB0bwNtPJK5hr8E_i9kfSfiRMyst9ceJs_zJYhlnoiwJs_z-Aw2DeKo8SXvrVnkDMCJHLx8eeFq4Im42N4d5ybVN-pZdW4BdMM6yxIoQ9dxrct_-M3tqIwT3Ky_ehs90ahRtxSOUTElNGYzAI9cNqwLsESl9ftIMdD98znkjvWyOlSJ1Ge9k--A',
    architectureDetails: {
      overview: 'Real-time financial dashboard connecting to Finnhub / Binance WebSocket streams with throttled state re-renders to maintain 60 FPS under continuous market updates.',
      keyComponents: [
        'WebSocket client with automatic reconnect and exponential backoff',
        'Throttled state reducer batching 50+ price updates per second',
        'Canvas-based Chart.js sparkline visualizations',
        'LocalStorage portfolio ledger calculating unrealized profit/loss'
      ],
      steps: [
        'Subscribe to real-time ticker trades via WebSocket',
        'Implement buffer queue to avoid React re-render thrashing',
        'Render smooth sparkline trends for 24h gainers/losers',
        'Add threshold alert sound effects and browser notifications'
      ],
      sampleRepoClone: 'git clone https://github.com/mitra-student/fintech-dashboard.git\ncd fintech-dashboard\nnpm install && npm run dev'
    }
  }
];
