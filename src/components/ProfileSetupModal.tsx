import React, { useState } from 'react';
import { 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Building2, 
  Clock, 
  Award,
  Check
} from 'lucide-react';
import { UserProfile, AuthUser } from '../types';
import { markProfileCompleted } from '../services/authService';

interface ProfileSetupModalProps {
  isOpen: boolean;
  authUser: AuthUser | null;
  initialProfile: UserProfile;
  onComplete: (updatedProfile: UserProfile) => void;
}

export const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  isOpen,
  authUser,
  initialProfile,
  onComplete,
}) => {
  const [formData, setFormData] = useState<UserProfile>(() => ({
    ...initialProfile,
    name: authUser?.name || initialProfile.name,
    email: authUser?.email || initialProfile.email,
    avatarUrl: authUser?.avatarUrl || initialProfile.avatarUrl,
    readinessScore: initialProfile.readinessScore || 90, // Keep 90% default
  }));

  const [step, setStep] = useState<1 | 2>(1); // 1: Academic & College, 2: Career Targets & Readiness
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const targetCompaniesOptions = [
    'Tier-1 Product Companies (FAANG / Unicorns)',
    'High-Growth Tech Startups',
    'FinTech & Quantitative Trading',
    'Enterprise Cloud & DevOps',
    'AI / DeepTech Labs',
  ];

  const handleToggleCompanyType = (item: string) => {
    setFormData(prev => {
      const exists = prev.targetCompanyTypes.includes(item);
      const updated = exists
        ? prev.targetCompanyTypes.filter(x => x !== item)
        : [...prev.targetCompanyTypes, item];
      return { ...prev, targetCompanyTypes: updated.length ? updated : [item] };
    });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      markProfileCompleted();
      setIsSubmitting(false);
      onComplete({
        ...formData,
        readinessScore: Number(formData.readinessScore) || 90,
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-indigo-700 to-primary-container p-6 text-white shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Welcome to Mitra • New User Onboarding</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white">
            Create Your Campus Placement Profile
          </h2>
          <p className="text-xs text-white/80 mt-1 max-w-lg">
            Hi {authUser?.name || 'there'}! Personalize your profile so Mitra can tailor company test patterns, syllabus roadmaps, and your placement readiness score.
          </p>

          {/* Stepper tabs */}
          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === 1 ? 'bg-white text-primary shadow-xs' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>1. College & Academic</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                step === 2 ? 'bg-white text-primary shadow-xs' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>2. Career Goals & Readiness</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Student Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Roll Number / Student ID
                  </label>
                  <input
                    type="text"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    placeholder="e.g. 2024MCS014"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  College / Institute Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. National Institute of Technology / Engineering College"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Degree & Specialization
                  </label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="e.g. M.Tech in Computer Science and Engineering"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Branch / Department
                  </label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    placeholder="e.g. Computer Science & Engineering"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Current Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2nd Year (Final Year)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Current Semester
                  </label>
                  <input
                    type="text"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    placeholder="e.g. Semester 4"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Target Graduation
                  </label>
                  <input
                    type="text"
                    value={formData.graduationDate}
                    onChange={(e) => setFormData({ ...formData, graduationDate: e.target.value })}
                    placeholder="e.g. June 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center gap-2 shadow-xs"
                >
                  <span>Next: Career Goals & Readiness</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Primary Dream Career Role
                </label>
                <div className="relative">
                  <Target className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                    placeholder="e.g. Full Stack Software Engineer (SDE-1 / SDE-2)"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Expected Placement CTC Package
                  </label>
                  <input
                    type="text"
                    value={formData.expectedCtcRange}
                    onChange={(e) => setFormData({ ...formData, expectedCtcRange: e.target.value })}
                    placeholder="e.g. ₹18L - ₹32L LPA"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Placement Readiness Score (%)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={formData.readinessScore}
                      onChange={(e) => setFormData({ ...formData, readinessScore: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface font-black text-primary focus:outline-none focus:border-primary"
                    />
                    <span className="text-xs font-bold px-2 py-2 rounded-xl bg-primary/10 text-primary shrink-0">
                      Target 90%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1.5">
                  Target Company Tiers
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {targetCompaniesOptions.map((tier) => {
                    const isSelected = formData.targetCompanyTypes.includes(tier);
                    return (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => handleToggleCompanyType(tier)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-primary/10 border-primary text-primary font-bold shadow-2xs'
                            : 'bg-white border-surface-container-high text-on-surface hover:bg-surface-container-low'
                        }`}
                      >
                        <span className="truncate pr-2">{tier}</span>
                        {isSelected && <Check className="w-4 h-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Weekly Study Goal (Hours/Week)
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formData.weeklyGoalHours}
                      onChange={(e) => setFormData({ ...formData, weeklyGoalHours: Number(e.target.value) })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    LeetCode Username (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.leetCodeUsername}
                    onChange={(e) => setFormData({ ...formData, leetCodeUsername: e.target.value })}
                    placeholder="e.g. sri_codes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low text-xs text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-surface-container-high flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Configuring Profile...</span>
                  ) : (
                    <>
                      <span>Complete Profile & Unlock Mitra Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
