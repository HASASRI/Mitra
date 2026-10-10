import React from 'react';
import { TabType } from '../types';
import { Sparkles, Heart, ExternalLink, Code2, BookOpen, Map, Briefcase, Layers } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenAdvisor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenAdvisor }) => {
  return (
    <footer className="mt-20 border-t border-surface-container-high bg-white text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/20 shadow-md shadow-primary/20 bg-gradient-to-tr from-primary to-primary-container shrink-0">
                <img 
                  src="/src/assets/images/mitra_logo_1791625654446.jpg" 
                  alt="Mitra Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl tracking-tight text-on-surface">
                  Mitra
                </span>
                <span className="text-[10px] ml-1.5 font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                  Career Companion
                </span>
              </div>
            </div>

            <p className="text-xs text-outline leading-relaxed max-w-sm">
              The one-stop platform for Computer Science & IT students and tech professionals. Know what to learn, where to code, which courses to master, how to build projects, and how to crack your dream campus placement.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-outline">
              <span>Built with precision for CSE engineers • Sri M.</span>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface">
              Main Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigateTab('dashboard')} className="text-outline hover:text-primary transition-colors">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('platforms')} className="text-outline hover:text-primary transition-colors">
                  Platforms Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('courses')} className="text-outline hover:text-primary transition-colors">
                  Curated Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('placements')} className="text-outline hover:text-primary transition-colors">
                  Campus Placements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('roadmap')} className="text-outline hover:text-primary transition-colors">
                  Career Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('projects')} className="text-outline hover:text-primary transition-colors">
                  Capstone Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('profile')} className="text-outline hover:text-primary transition-colors">
                  My Profile & ATS
                </button>
              </li>
            </ul>
          </div>

          {/* Placement Resources */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface">
              Verified Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary flex items-center gap-1 transition-colors">
                  LeetCode <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://takeuforward.org" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary flex items-center gap-1 transition-colors">
                  TakeUForward (Striver) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://prepinsta.com" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary flex items-center gap-1 transition-colors">
                  PrepInsta Prime <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary flex items-center gap-1 transition-colors">
                  GitHub Open Source <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://kaggle.com" target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary flex items-center gap-1 transition-colors">
                  Kaggle Competitions <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* AI Mentorship CTA */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface">
              Need Guidance?
            </h4>
            <p className="text-xs text-outline leading-relaxed">
              Have doubts regarding syllabus priorities, choosing between technologies, or interview strategies?
            </p>
            <button
              onClick={onOpenAdvisor}
              className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Chat with Mitra AI
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-outline">
          <p>© {new Date().getFullYear()} Mitra — Your Career Companion. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Genuine official links</span>
            <span>•</span>
            <span>No fake postings</span>
            <span>•</span>
            <span>CSE / IT Placement Benchmark</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
