import React, { useState } from 'react';
import { PlacementDrive, CompanyPattern, PrepRound } from '../types';
import { CompanyLogo, PlatformLogo } from './BrandLogos';
import { 
  mockPlacementQuestions, 
  interviewQuestionsList, 
  PlacementQuestion 
} from '../data/placementQuestions';
import { evaluateMockAnswer, MockEvalResponse } from '../services/aiService';
import { 
  Briefcase, 
  FileText, 
  Code2, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  AlertCircle, 
  RefreshCw,
  Send,
  Building2,
  Calendar,
  Layers
} from 'lucide-react';

interface PlacementsViewProps {
  placementDrives: PlacementDrive[];
  companyPatterns: CompanyPattern[];
  prepRounds: PrepRound[];
  onOpenAdvisor: () => void;
}

type PlacementSubTab = 'drives' | 'quiz' | 'companies' | 'rounds' | 'ai-mock' | 'resume';

export const PlacementsView: React.FC<PlacementsViewProps> = ({
  placementDrives,
  companyPatterns,
  prepRounds,
  onOpenAdvisor,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<PlacementSubTab>('drives');

  // Interactive Mock Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // AI Mock Interviewer State
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [userInterviewAnswer, setUserInterviewAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<MockEvalResponse | null>(null);

  // Handle Mock Quiz Option Selection
  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
  };

  // Calculate Quiz Score
  const calculateScore = () => {
    let score = 0;
    mockPlacementQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setCurrentQuizIndex(0);
  };

  // Handle AI Mock Interview Submission
  const handleEvaluateAnswer = async () => {
    if (!userInterviewAnswer.trim()) return;
    setIsEvaluating(true);
    setEvalResult(null);

    const activeQ = interviewQuestionsList[selectedQuestionIndex];
    try {
      const result = await evaluateMockAnswer({
        question: activeQ.question,
        userAnswer: userInterviewAnswer,
        category: activeQ.category,
        role: activeQ.role,
      });
      setEvalResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Campus & Off-Campus Placement Command Center</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Crack Campus Drives & SDE-1 Interviews
          </h1>
          <p className="text-emerald-100/90 text-sm leading-relaxed">
            Everything in one place: active hiring drives, company-specific test patterns (TCS, Amazon, Razorpay), interactive aptitude tests, core CS revision, and AI mock interview feedback.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="pt-3 flex flex-wrap items-center gap-2">
            {[
              { id: 'drives', label: 'Active Drives & Deadlines' },
              { id: 'quiz', label: 'Interactive Placement Mock Test' },
              { id: 'companies', label: 'Company OA Patterns' },
              { id: 'rounds', label: 'Round-by-Round Guide' },
              { id: 'ai-mock', label: 'AI Mock Interviewer' },
              { id: 'resume', label: 'ATS Resume Checklist' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as PlacementSubTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeSubTab === tab.id
                    ? 'bg-emerald-400 text-stone-950 shadow-md font-extrabold'
                    : 'bg-white/10 hover:bg-white/20 text-emerald-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. SubTab 1: Active Placement Drives */}
      {activeSubTab === 'drives' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl text-on-surface">
                Campus & Off-Campus Hiring Drives (2025 - 2026 Batch)
              </h2>
              <p className="text-xs text-outline">
                Verified registration links directly to official career portals
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {placementDrives.length} Open Drives
            </span>
          </div>

          {/* Hiring Companies Logo Showcase Banner */}
          <div className="bg-gradient-to-r from-surface-container-low via-surface to-surface-container rounded-3xl p-5 border border-surface-container-high space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-outline flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                Top Campus Recruiters Hiring Tech Graduates
              </span>
              <span className="text-[11px] text-primary font-semibold">Tier-1 Product & Mass Recruiters</span>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 pt-1">
              {[
                { name: 'Google', code: 'GOOG' },
                { name: 'Amazon', code: 'AMZN' },
                { name: 'Microsoft', code: 'MSFT' },
                { name: 'TCS', code: 'TCS' },
                { name: 'Infosys', code: 'INFY' },
                { name: 'Wipro', code: 'WIPRO' },
                { name: 'Razorpay', code: 'RAZOR' },
                { name: 'Cisco', code: 'CISCO' },
              ].map((comp) => (
                <div
                  key={comp.code}
                  className="bg-white rounded-2xl p-2 border border-surface-container-high shadow-2xs flex flex-col items-center justify-center gap-1 hover:border-primary/40 hover:scale-105 transition-all group"
                  title={`${comp.name} Campus Hiring`}
                >
                  <div className="w-9 h-9 flex items-center justify-center overflow-hidden">
                    <CompanyLogo codeOrName={comp.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold text-on-surface truncate max-w-full">{comp.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placementDrives.map((drive) => (
              <div
                key={drive.id}
                className="rounded-3xl bg-white border border-surface-container-high p-6 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-surface-container-high p-2 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                      <CompanyLogo codeOrName={drive.company} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      {drive.deadlineText}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                      {drive.company}
                    </h3>
                    <p className="text-xs font-semibold text-primary mt-0.5">{drive.programRole}</p>
                    <p className="text-xs text-outline">{drive.subRole} • {drive.location}</p>
                  </div>

                  <div className="pt-2 border-t border-surface-container-high space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-outline">
                      <span>Eligible:</span>
                      <strong className="text-on-surface">{drive.eligibleBatches}</strong>
                    </div>
                    <div className="flex items-center justify-between text-outline">
                      <span>Min Criteria:</span>
                      <strong className="text-on-surface">{drive.minEligibility}</strong>
                    </div>
                    {drive.examDate && (
                      <div className="flex items-center justify-between text-outline">
                        <span>Expected Exam:</span>
                        <strong className="text-indigo-600">{drive.examDate}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-surface-container-high">
                  <a
                    href={drive.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    Apply on Official Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SubTab 2: Interactive Placement Mock Test */}
      {activeSubTab === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-high">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                PRACTICE ASSESSMENT
              </span>
              <h2 className="font-display font-bold text-xl text-on-surface mt-1">
                Mitra Campus Placement Readiness Quiz
              </h2>
              <p className="text-xs text-outline">
                Real questions asked in TCS Digital, Amazon, Infosys, and Cognizant OA rounds
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isQuizSubmitted ? (
                <div className="text-right">
                  <span className="text-xs text-outline">Your Score</span>
                  <p className="text-xl font-display font-extrabold text-emerald-600">
                    {calculateScore()} / {mockPlacementQuestions.length} ({Math.round((calculateScore() / mockPlacementQuestions.length) * 100)}%)
                  </p>
                </div>
              ) : (
                <span className="text-xs font-semibold text-outline">
                  Answered: {Object.keys(selectedAnswers).length} / {mockPlacementQuestions.length}
                </span>
              )}

              <button
                onClick={handleResetQuiz}
                className="px-3.5 py-1.5 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>

          {/* Question Stepper Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {mockPlacementQuestions.map((q, idx) => {
              const isSelected = selectedAnswers[idx] !== undefined;
              const isCorrect = isQuizSubmitted && selectedAnswers[idx] === q.correctIndex;
              const isWrong = isQuizSubmitted && isSelected && selectedAnswers[idx] !== q.correctIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuizIndex(idx)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs shrink-0 transition-all ${
                    currentQuizIndex === idx
                      ? 'ring-2 ring-primary ring-offset-2'
                      : ''
                  } ${
                    isQuizSubmitted
                      ? isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isWrong
                        ? 'bg-rose-500 text-white'
                        : 'bg-surface-container text-outline'
                      : isSelected
                      ? 'bg-primary text-white'
                      : 'bg-surface-container-low text-on-surface'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question Body */}
          {mockPlacementQuestions[currentQuizIndex] && (() => {
            const currentQ = mockPlacementQuestions[currentQuizIndex];
            const chosenAnswer = selectedAnswers[currentQuizIndex];

            return (
              <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                    Category: {currentQ.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-outline">
                    <span>Asked at:</span>
                    <span className="font-semibold text-on-surface">
                      {currentQ.companyTags.join(', ')}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-on-surface leading-snug">
                  {currentQuizIndex + 1}. {currentQ.question}
                </h3>

                {currentQ.codeSnippet && (
                  <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                )}

                {/* Options List */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isPicked = chosenAnswer === optIdx;
                    const isRightOption = isQuizSubmitted && optIdx === currentQ.correctIndex;
                    const isWrongOption = isQuizSubmitted && isPicked && optIdx !== currentQ.correctIndex;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQuizIndex, optIdx)}
                        disabled={isQuizSubmitted}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                          isRightOption
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                            : isWrongOption
                            ? 'bg-rose-50 border-rose-500 text-rose-950'
                            : isPicked
                            ? 'bg-primary/10 border-primary text-primary font-bold'
                            : 'bg-white border-surface-container-high text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isPicked ? 'bg-primary text-white' : 'bg-surface-container text-outline'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isRightOption && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box when submitted */}
                {isQuizSubmitted && (
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5 animate-in fade-in">
                    <p className="font-bold text-amber-900 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      Detailed Explanation:
                    </p>
                    <p className="text-amber-950 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Question Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-surface-container-high">
                  <button
                    disabled={currentQuizIndex === 0}
                    onClick={() => setCurrentQuizIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl border border-surface-container-high text-xs font-semibold disabled:opacity-40 hover:bg-white"
                  >
                    Previous Question
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuizIndex < mockPlacementQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuizIndex(prev => prev + 1)}
                        className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container"
                      >
                        Next Question
                      </button>
                    ) : !isQuizSubmitted ? (
                      <button
                        onClick={() => setIsQuizSubmitted(true)}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm"
                      >
                        Submit Test & View Results
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 4. SubTab 3: Company Patterns */}
      {activeSubTab === 'companies' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-xl text-on-surface">
              Company-Specific Hiring Rounds & Packages
            </h2>
            <p className="text-xs text-outline">
              Syllabus breakdown for mass recruiters, Tier-1 product giants, and fintech unicorns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyPatterns.map((comp) => (
              <div
                key={comp.id}
                className="rounded-3xl bg-white border border-surface-container-high p-6 space-y-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-surface-container-high p-2 flex items-center justify-center shadow-2xs shrink-0 overflow-hidden">
                      <CompanyLogo codeOrName={comp.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-on-surface">{comp.company}</h3>
                      <p className="text-xs font-semibold text-primary">{comp.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {comp.ctcRange}
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-outline">
                    Recruitment Stages:
                  </p>
                  <div className="space-y-1">
                    {comp.stages.map((stg, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-on-surface">
                        <span className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center font-bold text-[10px] text-primary">
                          {idx + 1}
                        </span>
                        <span>{stg}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs space-y-1">
                  <strong className="text-primary font-bold">Frequently Tested Topics:</strong>
                  <p className="text-on-surface leading-relaxed">{comp.frequentTopics}</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-outline">
                  <span>{comp.questionCount}+ Past Questions Analyzed</span>
                  <span className="font-semibold text-on-surface">Difficulty: {comp.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SubTab 4: Round-by-Round Preparation Guide */}
      {activeSubTab === 'rounds' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-display font-bold text-xl text-on-surface">
              4-Stage Placement Mastery Playbook
            </h2>
            <p className="text-xs text-outline">
              Clear roadmaps and formulas for every round from OA to HR
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prepRounds.map((round) => (
              <div
                key={round.number}
                className="rounded-3xl bg-white border border-surface-container-high p-6 space-y-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                      R{round.number}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-on-surface">
                        {round.title}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        {round.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-on-surface leading-relaxed">
                  {round.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-surface-container-high text-xs">
                  <strong className="text-outline font-bold text-[10px] uppercase">
                    Recommended Study Resources:
                  </strong>
                  <div className="flex flex-wrap gap-2">
                    {round.recommendedResources.map((res, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs flex items-center gap-1.5 border border-surface-container-high"
                      >
                        <div className="w-4 h-4 rounded-md overflow-hidden shrink-0">
                          <PlatformLogo id={res} />
                        </div>
                        <span>{res}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl text-xs text-outline flex items-center justify-between">
                  <span>Coverage:</span>
                  <strong className="text-primary">{round.stats}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SubTab 5: AI Mock Interviewer */}
      {activeSubTab === 'ai-mock' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-high">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                POWERED BY MITRA AI
              </span>
              <h2 className="font-display font-bold text-xl text-on-surface mt-1">
                AI Placement Mock Interview Practice
              </h2>
              <p className="text-xs text-outline">
                Answer real technical or behavioral questions and receive instant scoring and keyword feedback
              </p>
            </div>

            <button
              onClick={onOpenAdvisor}
              className="px-3.5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition-all flex items-center gap-1.5 self-start sm:self-center"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask AI Mentor
            </button>
          </div>

          {/* Question Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface">Select Interview Question to Practice:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {interviewQuestionsList.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestionIndex(idx);
                    setEvalResult(null);
                  }}
                  className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                    selectedQuestionIndex === idx
                      ? 'bg-purple-50 border-purple-400 font-bold text-purple-950 shadow-2xs'
                      : 'bg-surface-container-lowest border-surface-container-high text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-outline block mb-0.5">
                    {q.category}
                  </span>
                  <p className="line-clamp-2">{q.question}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Active Question Prompt */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-2">
            <span className="text-xs font-bold text-primary">Selected Prompt:</span>
            <p className="text-sm font-bold text-on-surface">
              "{interviewQuestionsList[selectedQuestionIndex].question}"
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-outline">Keywords recruiters look for:</span>
              {interviewQuestionsList[selectedQuestionIndex].idealKeywords.map((kw, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-surface-container-high text-on-surface-variant font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Answer Input Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-on-surface">Your Response:</label>
              <span className="text-[11px] text-outline">
                {userInterviewAnswer.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              rows={5}
              value={userInterviewAnswer}
              onChange={(e) => setUserInterviewAnswer(e.target.value)}
              placeholder="Type your explanation or response here just as you would speak it to the interviewer..."
              className="w-full p-4 rounded-2xl bg-surface-container-low border border-surface-container-high text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary placeholder:text-outline resize-y"
            />

            <div className="flex justify-end">
              <button
                onClick={handleEvaluateAnswer}
                disabled={isEvaluating || !userInterviewAnswer.trim()}
                className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                {isEvaluating ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Evaluating with AI...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Evaluate My Response
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Evaluation Feedback Card */}
          {evalResult && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-purple-50/70 border border-purple-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-purple-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-700" />
                  <span className="font-display font-bold text-base text-purple-950">
                    Interview Evaluation Result
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-200 text-purple-900">
                    {evalResult.verdict}
                  </span>
                  <span className="font-display text-xl font-extrabold text-purple-700">
                    {evalResult.score}/10
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-1">
                  <strong className="text-emerald-700 font-bold">Strengths:</strong>
                  <ul className="list-disc pl-4 space-y-1 text-on-surface">
                    {evalResult.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-1">
                  <strong className="text-amber-800 font-bold">Improvements Needed:</strong>
                  <ul className="list-disc pl-4 space-y-1 text-on-surface">
                    {evalResult.improvements.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-purple-100 space-y-1 text-xs">
                <strong className="text-purple-900 font-bold">Model Exemplary Answer:</strong>
                <p className="text-on-surface leading-relaxed">{evalResult.modelAnswer}</p>
              </div>

              {evalResult.followUpQuestion && (
                <div className="p-3 bg-purple-100/60 rounded-xl text-xs text-purple-950 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Interviewer's Follow-Up Question: </span>
                    <span>"{evalResult.followUpQuestion}"</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 7. SubTab 6: ATS Resume Checklist */}
      {activeSubTab === 'resume' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-surface-container-high shadow-xs space-y-6">
          <div>
            <h2 className="font-display font-bold text-xl text-on-surface">
              ATS-Optimized Resume Blueprint for Tech Students
            </h2>
            <p className="text-xs text-outline">
              Campus recruiters spend less than 6 seconds screening resumes. Follow this checklist to ensure your resume clears automated ATS filters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-3">
              <span className="text-xs font-bold text-primary uppercase">1. Google X-Y-Z Formula</span>
              <p className="text-xs text-on-surface leading-relaxed">
                Describe projects using: <em>"Accomplished [X] as measured by [Y] by doing [Z]"</em>.
              </p>
              <div className="p-3 rounded-xl bg-white border border-surface-container-high text-[11px] space-y-1">
                <span className="text-rose-700 font-semibold">❌ Bad:</span>
                <p className="text-outline">Built a chat app using React and Socket.io.</p>
                <span className="text-emerald-700 font-semibold block pt-1">✓ Strong:</span>
                <p className="text-on-surface font-medium">Architected real-time chat application serving 200 concurrent users with 99.8% uptime using React, Node.js, and WebSockets.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-3">
              <span className="text-xs font-bold text-purple-700 uppercase">2. ATS Format Rules</span>
              <ul className="text-xs space-y-2 text-on-surface">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Single-page PDF format (never multi-column Word)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Standard section headings (Skills, Projects, Education)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>No tables, icons, or graphic skill-bar percentages</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Clickable GitHub, LeetCode, and LinkedIn links</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high space-y-3">
              <span className="text-xs font-bold text-emerald-700 uppercase">3. High-Priority Keywords</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Data Structures', 'Algorithms', 'C++', 'Java', 'Python', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'REST APIs', 'Git', 'CI/CD', 'AWS', 'System Design'].map((kw, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-surface-container-high text-on-surface font-medium">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
