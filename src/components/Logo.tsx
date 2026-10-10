import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'mark';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  showSubtitle = true,
  className = '',
  onClick,
}) => {
  // Dimensions mapping
  const sizeMap = {
    sm: {
      mark: 'w-7 h-7',
      text: 'text-base',
      badge: 'text-[9px] px-1 py-0.2',
      sub: 'text-[10px]',
      rounded: 'rounded-lg',
    },
    md: {
      mark: 'w-10 h-10',
      text: 'text-xl',
      badge: 'text-[10px] px-1.5 py-0.5',
      sub: 'text-[11px]',
      rounded: 'rounded-xl',
    },
    lg: {
      mark: 'w-14 h-14',
      text: 'text-2xl',
      badge: 'text-xs px-2 py-0.5',
      sub: 'text-xs',
      rounded: 'rounded-2xl',
    },
    xl: {
      mark: 'w-20 h-20',
      text: 'text-3xl',
      badge: 'text-xs px-2.5 py-1',
      sub: 'text-sm',
      rounded: 'rounded-2xl',
    },
  }[size];

  const logoMark = (
    <div className={`relative ${sizeMap.mark} flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
      {/* Ambient gradient glow behind the logo */}
      <div className={`absolute -inset-0.5 bg-gradient-to-tr from-primary via-indigo-500 to-amber-400 opacity-60 blur-[3px] ${sizeMap.rounded} group-hover:opacity-100 transition-opacity`} />
      
      {/* Main emblem container */}
      <div className={`relative w-full h-full overflow-hidden ${sizeMap.rounded} bg-[#0b1120] border border-white/20 shadow-md shadow-primary/20 flex items-center justify-center`}>
        <img
          src="/src/assets/images/mitra_app_logo_1791625092642.jpg"
          alt="Mitra Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-110"
          onError={(e) => {
            // Elegant SVG fallback if image cannot be rendered
            const target = e.currentTarget;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        {/* SVG Fallback */}
        <div 
          style={{ display: 'none' }}
          className="w-full h-full bg-gradient-to-tr from-[#1e1b4b] to-[#0f172a] items-center justify-center text-white"
        >
          <svg viewBox="0 0 40 40" className="w-4/5 h-4/5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L25 15H15L20 6Z" fill="#FBBF24" />
            <path d="M8 18C13 16 17 17 20 19C23 17 27 16 32 18V32C27 30 23 31 20 33C17 31 13 30 8 32V18Z" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 19V33" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 22L12 24L14 26" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 22L28 24L26 26" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );

  if (variant === 'mark') {
    return (
      <div 
        onClick={onClick} 
        className={`inline-flex items-center justify-center group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {logoMark}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 text-left group ${onClick ? 'cursor-pointer focus:outline-none' : ''} ${className}`}
    >
      {logoMark}

      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display font-black tracking-tight text-on-surface ${sizeMap.text} bg-gradient-to-r from-[#1e1b4b] via-[#3525cd] to-[#4338ca] bg-clip-text text-transparent`}>
            Mitra
          </span>
          <span className={`font-bold rounded-full bg-gradient-to-r from-primary/15 to-indigo-500/15 text-primary border border-primary/20 uppercase tracking-wider ${sizeMap.badge}`}>
            CSE/IT
          </span>
        </div>
        {variant === 'full' && showSubtitle && (
          <p className={`text-outline font-medium tracking-tight mt-0.5 hidden sm:block ${sizeMap.sub}`}>
            Your Career Companion
          </p>
        )}
      </div>
    </div>
  );
};
