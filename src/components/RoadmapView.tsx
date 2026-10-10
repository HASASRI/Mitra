import React, { useState } from 'react';
import { RoadmapPhase, UserProfile } from '../types';
import { 
  generatePersonalizedRoadmap, 
  RoadmapResponseData 
} from '../services/aiService';
import { 
  Map, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Calendar, 
  Clock, 
  BookOpen, 
  Layers, 
  ExternalLink, 
  Sliders, 
  RotateCcw,
  Download,
  Check
} from 'lucide-react';

interface RoadmapViewProps {
  profile: UserProfile;
  roadmapPhases: RoadmapPhase[];
  onOpenAdvisor: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  profile,
  roadmapPhases: initialPhases,
  onOpenAdvisor,
}) => {
  // Questionnaire input state
  const detectDegree = (): string => {
    const d = (profile.degree || '').toLowerCase();
    if (d.includes('m.tech') || d.includes('mtech')) return 'M.Tech';
    if (d.includes('mca')) return 'MCA';
    if (d.includes('bca')) return 'BCA';
    if (d.includes('b.sc')) return 'B.Sc CS/IT';
    return 'M.Tech';
  };

  const [degree, setDegree] = useState<string>(detectDegree());
  const [branch, setBranch] = useState(profile.branch || 'Computer Science & Engineering');
  const [currentYear, setCurrentYear] = useState(
    profile.year?.includes('1st') ? '1st Year (Semester 1-2)' : '2nd Year (Semester 3-4)'
  );
  const [codingLevel, setCodingLevel] = useState('Intermediate');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['C++', 'Python', 'Basic Web (HTML/CSS)']);
  const [skillInput, setSkillInput] = useState('');
  const [careerGoal, setCareerGoal] = useState(profile.primaryGoal || 'Software Development Engineer (SDE)');
  const [weeklyHours, setWeeklyHours] = useState(profile.weeklyGoalHours || 15);

  const [isGenerating, setIsGenerating] = useState(false);
  const [customRoadmap, setCustomRoadmap] = useState<RoadmapResponseData | null>(null);

  // Milestone completion state
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({
    'm1_1': true,
    'm1_2': true,
    'm1_3': true,
    'm2_1': true,
    'm2_2': true,
  });

  const toggleMilestone = (id: string) => {
    setCompletedMilestones(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      setSelectedSkills([...selectedSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  // Generate Personalized Roadmap
  const handleGenerateRoadmap = async () => {
    setIsGenerating(true);
    try {
      const data = await generatePersonalizedRoadmap({
        degree,
        branch,
        currentYear,
        existingSkills: selectedSkills,
        codingLevel,
        careerGoal,
        weeklyHours,
      });
      setCustomRoadmap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate overall milestone completion %
  const totalMilestones = initialPhases.reduce((acc, p) => acc + p.milestones.length, 0);
  const doneMilestonesCount = Object.values(completedMilestones).filter(Boolean).length;
  const overallProgress = Math.round((doneMilestonesCount / Math.max(1, totalMilestones)) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#201060] via-primary to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold border border-white/20">
            <Map className="w-3.5 h-3.5 text-amber-300" />
            <span>Structured Step-by-Step Learning Progression</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Personalized Career Roadmap
          </h1>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Eliminate career confusion. Tell us your background, skills, and target CTC, and Mitra generates an exact 4-phase step-by-step pathway from fundamentals to placement victory.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">
              🎯 Overall Milestone Completion: {overallProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Generator Questionnaire Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
              AI ROADMAP GENERATOR
            </span>
            <h2 className="font-display font-bold text-xl text-on-surface mt-1">
              Customize Your Career Profile
            </h2>
            <p className="text-xs text-outline">
              Answer 7 quick questions to receive a tailored semester-by-semester sequence
            </p>
          </div>

          <button
            onClick={() => {
              setCustomRoadmap(null);
            }}
            className="text-xs text-outline hover:text-on-surface flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          {/* Question 1: Degree */}
          <div className="space-y-1.5">
            <label className="font-bold text-on-surface">1. Your Degree Program</label>
            <select
              value={degree}
              onChange={(e) => {
                const newDeg = e.target.value;
                setDegree(newDeg);
                if ((newDeg === 'M.Tech' || newDeg === 'MCA') && (currentYear.includes('3rd') || currentYear.includes('4th'))) {
                  setCurrentYear('2nd Year (Semester 3-4)');
                }
              }}
              className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="M.Tech">M.Tech (2-Year Masters in Technology)</option>
              <option value="B.Tech">B.Tech / B.E. (4-Year Undergraduate)</option>
              <option value="MCA">MCA (2-Year Master of Computer Applications)</option>
              <option value="BCA">BCA (Bachelor of Computer Applications)</option>
              <option value="B.Sc CS/IT">B.Sc Computer Science / IT</option>
            </select>
          </div>

          {/* Question 2: Branch */}
          <div className="space-y-1.5">
            <label className="font-bold text-on-surface">2. Engineering Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
              <option value="Information Technology">Information Technology (IT)</option>
              <option value="AI & Data Science">AI & Data Science (AI&DS)</option>
              <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
              <option value="Other Non-Circuit Branch">Other / Non-Circuit (Mechanical, Civil, etc.)</option>
            </select>
          </div>

          {/* Question 3: Current Year */}
          <div className="space-y-1.5">
            <label className="font-bold text-on-surface">3. Current Year / Status</label>
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
            >
              {(degree === 'M.Tech' || degree === 'MCA') ? (
                <>
                  <option value="1st Year (Semester 1-2)">1st Year (Advanced Theory & Research Foundations)</option>
                  <option value="2nd Year (Semester 3-4)">2nd Year (Final Year • Placement Sprint & Thesis)</option>
                  <option value="Recent Graduate">Recent Graduate / Working Professional</option>
                </>
              ) : (
                <>
                  <option value="1st Year (Semester 1-2)">1st Year (Foundations)</option>
                  <option value="2nd Year (Semester 3-4)">2nd Year (Core DSA & Tech Stack)</option>
                  <option value="3rd Year (Semester 5-6)">3rd Year (Placement Preparation Sprint)</option>
                  <option value="4th Year (Semester 7-8)">4th Year (Active Hiring Drives)</option>
                  <option value="Recent Graduate">Recent Graduate / Working Professional</option>
                </>
              )}
            </select>
          </div>

          {/* Question 4: Coding Level */}
          <div className="space-y-1.5">
            <label className="font-bold text-on-surface">4. Current Coding Comfort</label>
            <select
              value={codingLevel}
              onChange={(e) => setCodingLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="Absolute Beginner">Absolute Beginner (Starting from loops/arrays)</option>
              <option value="Intermediate">Intermediate (Comfortable with basic DSA & 1 language)</option>
              <option value="Advanced">Advanced (150+ LeetCode solved, know graphs/DP)</option>
            </select>
          </div>

          {/* Question 5: Career Goal */}
          <div className="space-y-1.5">
            <label className="font-bold text-on-surface">5. Primary Career Goal</label>
            <select
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-surface-container-low border border-surface-container-high text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="Software Development Engineer (SDE)">Software Development Engineer (SDE-1)</option>
              <option value="Full-Stack Web Developer">Full-Stack Web Developer (React + Node/Postgres)</option>
              <option value="Backend Engineer">Backend Engineer (Java Spring / Go / Distributed Systems)</option>
              <option value="Frontend Engineer">Frontend Engineer (React / Next.js / UI Systems)</option>
              <option value="AI / Machine Learning Engineer">AI / Machine Learning Engineer</option>
              <option value="Data Scientist / Analyst">Data Scientist / Data Analyst</option>
              <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
              <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            </select>
          </div>

          {/* Question 6: Weekly Study Hours */}
          <div className="space-y-1.5">
            <label className="font-bold text-on-surface">
              6. Dedicated Study Time: <strong className="text-primary">{weeklyHours} hrs / week</strong>
            </label>
            <input
              type="range"
              min="5"
              max="35"
              step="5"
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-outline">
              <span>5 hrs (Casual)</span>
              <span>15 hrs (Recommended)</span>
              <span>30+ hrs (Bootcamp)</span>
            </div>
          </div>
        </div>

        {/* Question 7: Existing Skills Tags */}
        <div className="space-y-2 pt-2 border-t border-surface-container-high">
          <label className="text-xs font-bold text-on-surface">7. Existing Skills / Languages Known:</label>
          <div className="flex flex-wrap items-center gap-2">
            {selectedSkills.map((s, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-xl bg-surface-container text-xs font-semibold text-on-surface flex items-center gap-1.5 border border-surface-container-high"
              >
                {s}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s)}
                  className="hover:text-rose-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm pt-1">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="Add skill (e.g. C++, Java, Git, React)..."
              className="flex-1 p-2 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-2 rounded-xl bg-surface-container font-bold text-xs text-on-surface hover:bg-surface-container-high"
            >
              Add
            </button>
          </div>
        </div>

        {/* Generate CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-outline">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Mitra will calculate exact prerequisites, project recommendations, and OA topics.</span>
          </div>

          <button
            onClick={handleGenerateRoadmap}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-container hover:to-indigo-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Generating Custom Roadmap with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Generate Tailored Roadmap
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. AI Generated Roadmap Feedback Summary (if active) */}
      {customRoadmap && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 border border-primary/30 space-y-4 shadow-sm animate-in fade-in">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                AI CUSTOMIZED PATHWAY
              </span>
              <h3 className="font-display font-bold text-lg text-on-surface">
                {careerGoal} — {customRoadmap.estimatedWeeks}-Week Master Plan
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {customRoadmap.summary}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-3.5 bg-white rounded-2xl border border-surface-container-high space-y-1.5">
              <strong className="text-primary font-bold">Weekly Study Distribution:</strong>
              <p className="text-on-surface">📅 Weekdays: {customRoadmap.weeklySchedule.weekdays}</p>
              <p className="text-on-surface">🚀 Weekends: {customRoadmap.weeklySchedule.weekends}</p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-surface-container-high space-y-1.5">
              <strong className="text-emerald-700 font-bold">Key Placement Strategy Tips:</strong>
              <ul className="list-disc pl-4 space-y-1 text-on-surface">
                {customRoadmap.placementTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4. Visual 4-Phase Roadmap Timeline */}
      <div className="space-y-8">
        <div>
          <h2 className="font-display font-bold text-xl text-on-surface">
            Step-by-Step Learning Timeline
          </h2>
          <p className="text-xs text-outline">
            Follow the sequence: complete prerequisites before moving to the next phase
          </p>
        </div>

        <div className="space-y-6">
          {initialPhases.map((phase) => {
            const phaseMilestones = phase.milestones;
            const completedInPhase = phaseMilestones.filter(m => completedMilestones[m.id]).length;
            const isPhaseDone = completedInPhase === phaseMilestones.length;

            return (
              <div
                key={phase.number}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-2xs space-y-6"
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-high">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl font-extrabold text-base flex items-center justify-center shrink-0 ${
                      isPhaseDone
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-primary text-white shadow-md shadow-primary/20'
                    }`}>
                      {isPhaseDone ? '✓' : `P${phase.number}`}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-lg text-on-surface">
                          Phase {phase.number}: {phase.title}
                        </h3>
                      </div>
                      <p className="text-xs text-outline">{phase.period} • {phase.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-container text-primary">
                      {completedInPhase} / {phaseMilestones.length} Completed
                    </span>
                  </div>
                </div>

                {/* Milestones in this phase */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phaseMilestones.map((m) => {
                    const isChecked = !!completedMilestones[m.id];

                    return (
                      <div
                        key={m.id}
                        onClick={() => toggleMilestone(m.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isChecked
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : 'bg-surface-container-low border-surface-container-high hover:border-primary/40'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-surface-container-high text-outline">
                              Milestone {m.code}
                            </span>
                            <div className="mt-0.5">
                              {isChecked ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                              ) : (
                                <Circle className="w-5 h-5 text-outline" />
                              )}
                            </div>
                          </div>

                          <h4 className={`font-bold text-xs ${
                            isChecked ? 'line-through text-on-surface-variant' : 'text-on-surface'
                          }`}>
                            {m.title}
                          </h4>

                          <p className="text-xs text-outline line-clamp-3">
                            {m.description}
                          </p>

                          {/* Checklist preview */}
                          {m.checklist && (
                            <div className="pt-1 space-y-1">
                              {m.checklist.map((item) => (
                                <div key={item.id} className="text-[11px] text-on-surface-variant flex items-center gap-1.5">
                                  <span>•</span>
                                  <span className={item.done ? 'line-through text-outline' : ''}>
                                    {item.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="pt-3 mt-3 border-t border-surface-container-high flex items-center justify-between text-[10px] text-outline">
                          <span>{isChecked ? 'Marked complete' : 'Click to mark complete'}</span>
                          {m.estimatedHours && <span>{m.estimatedHours}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
