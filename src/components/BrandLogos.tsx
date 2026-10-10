import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

// -------------------------------------------------------------
// 1. PLATFORM LOGOS
// -------------------------------------------------------------

export const LeetCodeLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#282828" />
    {/* Upper dark curl */}
    <path
      d="M62 30C58 24 50 20 40 23C30 26 23 35 24 46C25 57 33 66 43 68C48 69 54 67 58 64"
      stroke="#B3B3B3"
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Inner Orange Chevron / Tongue */}
    <path
      d="M48 48L74 48"
      stroke="#FFA116"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <path
      d="M36 68L66 78"
      stroke="#FFA116"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
);

export const HackerRankLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#00EA64" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33 24H43V44H57V24H67V76H57V54H43V76H33V24Z"
      fill="#0A141E"
    />
  </svg>
);

export const CodeforcesLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#F8FAFC" />
    {/* 3 characteristic vertical contest bars */}
    <rect x="22" y="44" width="14" height="34" rx="4" fill="#3B82F6" />
    <rect x="43" y="22" width="14" height="56" rx="4" fill="#EF4444" />
    <rect x="64" y="34" width="14" height="44" rx="4" fill="#F59E0B" />
  </svg>
);

export const CodeChefLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#5B4638" />
    {/* Chef hat & star */}
    <path
      d="M36 44C32 44 28 47 28 52C28 57 32 60 36 60H64C68 60 72 57 72 52C72 47 68 44 64 44C65 40 64 36 60 33C56 30 51 31 49 33C47 28 40 28 36 33C33 36 34 41 36 44Z"
      fill="#FFFFFF"
    />
    <rect x="34" y="64" width="32" height="7" rx="3" fill="#FFFFFF" />
    <circle cx="50" cy="51" r="3" fill="#D97706" />
  </svg>
);

export const GFGLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#E8F5E9" />
    {/* GeeksforGeeks green interlocking dual curls */}
    <path
      d="M38 34C48 34 50 42 46 48C42 54 34 54 30 48C26 42 28 34 38 34Z"
      fill="#0F9D58"
    />
    <path
      d="M62 66C52 66 50 58 54 52C58 46 66 46 70 52C74 58 72 66 62 66Z"
      fill="#2E7D32"
    />
    <path
      d="M30 48C33 55 42 62 50 62C58 62 67 55 70 48"
      stroke="#0F9D58"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
);

export const FreeCodeCampLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#0A0A23" />
    {/* freeCodeCamp distinctive Flame mark */}
    <path
      d="M50 20C47 28 40 33 39 42C38 52 45 56 46 65C47 67 46 70 44 72C52 70 56 62 55 54C54 44 48 40 50 32C53 37 56 42 56 48C62 44 63 36 60 28C67 36 67 48 64 57C62 63 58 67 56 73C65 72 70 63 70 54C70 38 59 28 50 20Z"
      fill="#F59E0B"
    />
  </svg>
);

export const NeetCodeLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#18181B" />
    {/* NeetCode binary tree & code angle */}
    <path
      d="M30 36L44 50L30 64"
      stroke="#10B981"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="65" cy="35" r="7" fill="#6366F1" />
    <circle cx="58" cy="65" r="6" fill="#A855F7" />
    <circle cx="75" cy="65" r="6" fill="#3B82F6" />
    <path d="M65 42L58 59M65 42L75 59" stroke="#E4E4E7" strokeWidth="2.5" />
  </svg>
);

export const W3SchoolsLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#04AA6D" />
    <text
      x="50"
      y="63"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="36"
      fontWeight="900"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      W3
    </text>
  </svg>
);

export const GitHubLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#181717" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 20C33.4 20 20 33.4 20 50C20 63.3 28.6 74.5 40.6 78.5C42.1 78.8 42.6 77.8 42.6 77C42.6 76.3 42.6 73.8 42.6 71C34.2 72.8 32.5 67.2 32.5 67.2C31.2 63.7 29.2 62.8 29.2 62.8C26.5 60.9 29.4 61 29.4 61C32.4 61.2 34 64.3 34 64.3C36.7 68.9 41.1 67.6 42.8 66.8C43.1 64.8 43.9 63.5 44.8 62.7C38.1 62 31.1 59.4 31.1 47.9C31.1 44.6 32.3 41.9 34.2 39.8C33.9 39 32.8 35.9 34.5 31.7C34.5 31.7 37 30.9 42.8 34.8C45.2 34.1 47.7 33.8 50.2 33.8C52.7 33.8 55.2 34.1 57.6 34.8C63.4 30.9 65.9 31.7 65.9 31.7C67.6 35.9 66.5 39 66.2 39.8C68.2 41.9 69.3 44.6 69.3 47.9C69.3 59.5 62.2 61.9 55.5 62.7C56.6 63.7 57.6 65.5 57.6 68.4C57.6 72.6 57.6 75.9 57.6 77C57.6 77.8 58.1 78.8 59.7 78.5C71.6 74.5 80.2 63.3 80.2 50C80.2 33.4 66.6 20 50 20Z"
      fill="#FFFFFF"
    />
  </svg>
);

export const ReplitLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#0E1525" />
    <path d="M26 28H48V46H26V28Z" fill="#F26207" />
    <path d="M48 46H74V64H48V46Z" fill="#F26207" />
    <path d="M26 64H48V82H26V64Z" fill="#F26207" />
  </svg>
);

export const KaggleLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#F0F9FF" />
    {/* Kaggle distinctive Blue K */}
    <path
      d="M32 24V76H43V54.5L62 76H76L53.5 50.5L74.5 24H60.5L43 46V24H32Z"
      fill="#20BEFF"
    />
  </svg>
);

export const GoogleColabLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFFFFF" />
    {/* Colab infinity loop (yellow & orange) */}
    <path
      d="M34 32C24 32 16 40 16 50C16 60 24 68 34 68C43 68 49 61 54 54L46 46C43 51 39 55 34 55C31 55 29 53 29 50C29 47 31 45 34 45C39 45 43 49 46 54L54 46C49 39 43 32 34 32Z"
      fill="#F9AB00"
    />
    <path
      d="M66 32C57 32 51 39 46 46L54 54C57 49 61 45 66 45C69 45 71 47 71 50C71 53 69 55 66 55C61 55 57 51 54 46L46 54C51 61 57 68 66 68C76 68 84 60 84 50C84 40 76 32 66 32Z"
      fill="#E37400"
    />
  </svg>
);

export const HuggingFaceLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFF9DB" />
    {/* Smiling face 🤗 */}
    <circle cx="50" cy="50" r="28" fill="#FFD21E" stroke="#E6AB00" strokeWidth="2" />
    {/* Eyes */}
    <circle cx="41" cy="44" r="3.5" fill="#18181B" />
    <circle cx="59" cy="44" r="3.5" fill="#18181B" />
    {/* Cheeks */}
    <circle cx="36" cy="52" r="3" fill="#F87171" opacity="0.6" />
    <circle cx="64" cy="52" r="3" fill="#F87171" opacity="0.6" />
    {/* Smile */}
    <path
      d="M40 54C43 60 57 60 60 54"
      stroke="#18181B"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Open Hugging hands */}
    <path
      d="M24 64C20 60 21 54 26 53C29 52 32 56 32 60"
      stroke="#FF9D00"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M76 64C80 60 79 54 74 53C71 52 68 56 68 60"
      stroke="#FF9D00"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const AWSLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#232F3E" />
    <text
      x="50"
      y="48"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="26"
      fontWeight="900"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      aws
    </text>
    {/* Amazon smile arrow */}
    <path
      d="M26 62C38 72 62 72 74 62"
      stroke="#FF9900"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path
      d="M72 58L76 63L71 66"
      fill="#FF9900"
    />
  </svg>
);

export const MicrosoftLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFFFFF" />
    {/* Microsoft 4 colored squares */}
    <rect x="25" y="25" width="22" height="22" fill="#F25022" />
    <rect x="53" y="25" width="22" height="22" fill="#7FBA00" />
    <rect x="25" y="53" width="22" height="22" fill="#00A4EF" />
    <rect x="53" y="53" width="22" height="22" fill="#FFB900" />
  </svg>
);

export const GoogleCloudLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFFFFF" />
    {/* 4-Color Cloud Shape */}
    <path
      d="M62 36C60 30 54 26 47 26C38 26 31 33 31 41C25 42 20 47 20 54C20 61 26 66 33 66H66C72 66 77 61 77 55C77 49 73 44 67 43C66 40 64 38 62 36Z"
      fill="#4285F4"
    />
    <circle cx="47" cy="42" r="10" fill="#34A853" />
    <circle cx="37" cy="54" r="8" fill="#FBBC05" />
    <circle cx="61" cy="52" r="9" fill="#EA4335" />
  </svg>
);

// -------------------------------------------------------------
// 2. PLACEMENT & RECRUITER COMPANY LOGOS
// -------------------------------------------------------------

export const GoogleCompanyLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFFFFF" />
    {/* Google 4-color G */}
    <path
      d="M72 50.8C72 49 71.8 47.4 71.5 45.8H50V54.4H62.4C61.8 57.3 60.1 59.8 57.4 61.5V67.3H65.3C70 63 72 57.5 72 50.8Z"
      fill="#4285F4"
    />
    <path
      d="M50 73C56.3 73 61.6 70.9 65.3 67.3L57.4 61.5C55.3 62.9 52.8 63.8 50 63.8C43.8 63.8 38.6 59.7 36.7 54.1H28.6V60.2C32.4 67.7 40.5 73 50 73Z"
      fill="#34A853"
    />
    <path
      d="M36.7 54.1C36.2 52.7 36 51.3 36 50C36 48.7 36.2 47.3 36.7 45.9V39.8H28.6C27 42.9 26 46.3 26 50C26 53.7 27 57.1 28.6 60.2L36.7 54.1Z"
      fill="#FBBC05"
    />
    <path
      d="M50 36.2C53.5 36.2 56.6 37.4 59.1 39.7L65.5 33.3C61.6 29.7 56.3 27 50 27C40.5 27 32.4 32.3 28.6 39.8L36.7 45.9C38.6 40.3 43.8 36.2 50 36.2Z"
      fill="#EA4335"
    />
  </svg>
);

export const AmazonCompanyLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFFFFF" />
    {/* Amazon black 'a' and signature smile */}
    <path
      d="M47 31C39 31 34 36 34 44C34 52 40 56 46 56C51 56 55 52 56 49V55H63V32H56V37C54 33 50 31 47 31ZM49 50C44 50 41 47 41 43C41 39 44 36 49 36C53 36 56 39 56 43C56 47 53 50 49 50Z"
      fill="#131921"
    />
    <path
      d="M25 67C41 78 65 77 76 66"
      stroke="#FF9900"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path d="M75 62L79 67L74 70" fill="#FF9900" />
  </svg>
);

export const MicrosoftCompanyLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <MicrosoftLogo className={className} />
);

export const TCSCompanyLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#004B87" />
    <text
      x="50"
      y="58"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="30"
      fontWeight="900"
      fill="#FFFFFF"
      letterSpacing="1"
      textAnchor="middle"
    >
      TCS
    </text>
    <rect x="28" y="65" width="44" height="3" rx="1.5" fill="#00B4D8" />
  </svg>
);

export const InfosysCompanyLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#007CC3" />
    <text
      x="50"
      y="59"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="22"
      fontWeight="900"
      fill="#FFFFFF"
      textAnchor="middle"
      letterSpacing="-0.5"
    >
      Infosys
    </text>
  </svg>
);

export const WiproCompanyLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFFFFF" />
    {/* Wipro multi-colored dots surrounding center */}
    <circle cx="50" cy="50" r="14" fill="#34313F" />
    <text
      x="50"
      y="55"
      fontFamily="sans-serif"
      fontSize="12"
      fontWeight="bold"
      fill="#FFFFFF"
      textAnchor="middle"
    >
      w
    </text>
    <circle cx="50" cy="24" r="5" fill="#E60000" />
    <circle cx="68" cy="32" r="5" fill="#FF7900" />
    <circle cx="76" cy="50" r="5" fill="#009900" />
    <circle cx="68" cy="68" r="5" fill="#0079C1" />
    <circle cx="50" cy="76" r="5" fill="#7F3F98" />
    <circle cx="32" cy="68" r="5" fill="#E6007E" />
    <circle cx="24" cy="50" r="5" fill="#00AEEF" />
    <circle cx="32" cy="32" r="5" fill="#FFC20E" />
  </svg>
);

export const RazorpayCompanyLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#0C2340" />
    {/* Razorpay iconic blue razor blade / lightning angle */}
    <path
      d="M32 74L48 24H64L48 50H66L38 74H32Z"
      fill="#3395FF"
    />
  </svg>
);

export const AccioJobLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#6366F1" />
    {/* Rocket icon */}
    <path
      d="M50 24C41 33 39 46 41 57L33 65L35 73L43 71L51 63C62 65 75 63 84 54C81 43 73 31 50 24Z"
      fill="#FFFFFF"
    />
    <circle cx="60" cy="44" r="4" fill="#6366F1" />
  </svg>
);

export const PrepInstaLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#6C5CE7" />
    <path
      d="M26 42L50 30L74 42L50 54L26 42Z"
      fill="#FFFFFF"
    />
    <path
      d="M34 47V60C34 66 50 71 50 71C50 71 66 66 66 60V47"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const CiscoCompanyLogo: React.FC<LogoProps> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="20" fill="#FFFFFF" />
    {/* Cisco bridge bars */}
    <rect x="22" y="48" width="6" height="24" rx="3" fill="#1BA0D7" />
    <rect x="33" y="36" width="6" height="36" rx="3" fill="#1BA0D7" />
    <rect x="44" y="44" width="6" height="28" rx="3" fill="#1BA0D7" />
    <rect x="55" y="36" width="6" height="36" rx="3" fill="#1BA0D7" />
    <rect x="66" y="48" width="6" height="24" rx="3" fill="#1BA0D7" />
    <text
      x="50"
      y="84"
      fontFamily="sans-serif"
      fontSize="12"
      fontWeight="900"
      fill="#1BA0D7"
      textAnchor="middle"
    >
      CISCO
    </text>
  </svg>
);

// -------------------------------------------------------------
// HELPER SELECTORS
// -------------------------------------------------------------

export const PlatformLogo: React.FC<{ id: string; className?: string }> = ({ id, className = 'w-full h-full' }) => {
  const norm = id.toLowerCase();
  if (norm.includes('leetcode')) return <LeetCodeLogo className={className} />;
  if (norm.includes('hackerrank')) return <HackerRankLogo className={className} />;
  if (norm.includes('codeforces')) return <CodeforcesLogo className={className} />;
  if (norm.includes('codechef')) return <CodeChefLogo className={className} />;
  if (norm.includes('gfg') || norm.includes('geeks')) return <GFGLogo className={className} />;
  if (norm.includes('freecodecamp')) return <FreeCodeCampLogo className={className} />;
  if (norm.includes('neetcode')) return <NeetCodeLogo className={className} />;
  if (norm.includes('w3schools')) return <W3SchoolsLogo className={className} />;
  if (norm.includes('github')) return <GitHubLogo className={className} />;
  if (norm.includes('replit')) return <ReplitLogo className={className} />;
  if (norm.includes('kaggle')) return <KaggleLogo className={className} />;
  if (norm.includes('colab')) return <GoogleColabLogo className={className} />;
  if (norm.includes('hugging')) return <HuggingFaceLogo className={className} />;
  if (norm.includes('aws')) return <AWSLogo className={className} />;
  if (norm.includes('microsoft')) return <MicrosoftLogo className={className} />;
  if (norm.includes('cloud') || norm.includes('gcp')) return <GoogleCloudLogo className={className} />;
  if (norm.includes('prepinsta')) return <PrepInstaLogo className={className} />;
  return <LeetCodeLogo className={className} />;
};

export const CompanyLogo: React.FC<{ codeOrName: string; className?: string }> = ({ codeOrName, className = 'w-full h-full' }) => {
  const norm = codeOrName.toLowerCase();
  if (norm.includes('google') || norm.includes('goog')) return <GoogleCompanyLogo className={className} />;
  if (norm.includes('amazon') || norm.includes('amzn')) return <AmazonCompanyLogo className={className} />;
  if (norm.includes('microsoft') || norm.includes('msft')) return <MicrosoftCompanyLogo className={className} />;
  if (norm.includes('tcs') || norm.includes('tata')) return <TCSCompanyLogo className={className} />;
  if (norm.includes('infosys') || norm.includes('infy')) return <InfosysCompanyLogo className={className} />;
  if (norm.includes('wipro')) return <WiproCompanyLogo className={className} />;
  if (norm.includes('razorpay')) return <RazorpayCompanyLogo className={className} />;
  if (norm.includes('cisco')) return <CiscoCompanyLogo className={className} />;
  if (norm.includes('accio') || norm.includes('elitmus')) return <AccioJobLogo className={className} />;
  if (norm.includes('prepinsta')) return <PrepInstaLogo className={className} />;
  if (norm.includes('gfg') || norm.includes('geeks')) return <GFGLogo className={className} />;
  // Fallback nicely to high-contrast badge
  return (
    <div className={`rounded-xl bg-primary text-white flex items-center justify-center font-extrabold text-xs shadow-2xs ${className}`}>
      {codeOrName.slice(0, 3).toUpperCase()}
    </div>
  );
};
