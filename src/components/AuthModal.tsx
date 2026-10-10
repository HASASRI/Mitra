import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  KeyRound, 
  RefreshCw,
  Sparkles,
  Shield
} from 'lucide-react';
import { 
  signInWithGoogle, 
  signInWithEmail, 
  signUpWithEmail, 
  requestPasswordReset, 
  resetPassword 
} from '../services/authService';
import { AuthUser } from '../types';
import { GoogleAccountPickerModal } from './GoogleAccountPickerModal';

export type AuthMode = 'signin' | 'signup' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
  initialMode?: AuthMode;
  contextMessage?: string; // Reason why auth is requested (e.g. "Sign in to access your placement roadmap")
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin',
  contextMessage,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googlePickerOpen, setGooglePickerOpen] = useState(false);

  // Sign In & Sign Up Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot Password Flow States
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1); // 1: Email, 2: OTP, 3: New Password
  const [resetCode, setResetCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);

  // Feedback & Loading
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Password Security Strength Calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };

  const passwordScore = getPasswordStrength(mode === 'forgot' ? newPassword : password);

  // Handle Sign In with Email
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const result = signInWithEmail(email, password);
      setIsLoading(false);
      if (result.success && result.user) {
        onSuccess(result.user);
        onClose();
      } else {
        setErrorMessage(result.error || 'Invalid email or password.');
      }
    }, 400);
  };

  // Handle Sign Up with Email
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    if (passwordScore < 2) {
      setErrorMessage('Please choose a stronger password (at least 8 chars with letters & numbers).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = signUpWithEmail(name, email, password);
      setIsLoading(false);
      if (result.success && result.user) {
        onSuccess(result.user);
        onClose();
      } else {
        setErrorMessage(result.error || 'Failed to create account.');
      }
    }, 500);
  };

  // Handle Google Sign In
  const handleGoogleAccountSelect = (googleAccount: { email: string; name: string; avatarUrl?: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = signInWithGoogle(googleAccount);
      setIsLoading(false);
      onSuccess(user);
      onClose();
    }, 400);
  };

  // Handle Request Password Reset Code (Step 1)
  const handleRequestResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = requestPasswordReset(email);
      setIsLoading(false);
      if (res.success && res.code) {
        setGeneratedCode(res.code);
        setForgotStep(2);
        setSuccessMessage(`A 6-digit verification code has been dispatched to ${email}`);
        setResendCountdown(60);
      } else {
        setErrorMessage(res.error || 'Could not send verification code.');
      }
    }, 500);
  };

  // Handle Verify Code (Step 2)
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (resetCode.trim().length !== 6) {
      setErrorMessage('Please enter the full 6-digit security code.');
      return;
    }

    if (generatedCode && resetCode.trim() !== generatedCode) {
      setErrorMessage('Invalid 6-digit code. Please verify the code or request a new one.');
      return;
    }

    setForgotStep(3);
    setSuccessMessage('Code verified! Please create your new secure password.');
  };

  // Handle Final Password Reset (Step 3)
  const handleFinalPasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = resetPassword(email, resetCode, newPassword);
      setIsLoading(false);
      if (res.success) {
        setSuccessMessage('Password reset successfully! Automatically signing you in...');
        setTimeout(() => {
          // Auto sign in with the new password
          const loginRes = signInWithEmail(email, newPassword);
          if (loginRes.success && loginRes.user) {
            onSuccess(loginRes.user);
            onClose();
          } else {
            setMode('signin');
            setPassword(newPassword);
          }
        }, 800);
      } else {
        setErrorMessage(res.error || 'Failed to reset password.');
      }
    }, 500);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
        <div 
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
          role="dialog"
          aria-modal="true"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-primary via-indigo-700 to-primary-container p-5 text-white relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="font-display font-extrabold text-base tracking-tight">
                Mitra Career & Placement Hub
              </span>
            </div>

            <h2 className="font-display font-bold text-xl text-white">
              {mode === 'signin' && 'Welcome Back'}
              {mode === 'signup' && 'Create Your Student Account'}
              {mode === 'forgot' && 'Account Recovery & Security'}
            </h2>

            <p className="text-xs text-white/80 mt-1 leading-relaxed">
              {contextMessage || (
                mode === 'signin' ? 'Sign in to access curated placement roadmaps, test rounds, and your personalized score.' :
                mode === 'signup' ? 'Join hundreds of students preparing for campus placement season & top tech careers.' :
                'Verify your identity via 2-step verification code to reset your password.'
              )}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-surface-container-high bg-surface-container-low shrink-0">
            <button
              type="button"
              onClick={() => { setMode('signin'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
                mode === 'signin'
                  ? 'border-primary text-primary bg-white'
                  : 'border-transparent text-outline hover:text-on-surface'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 ${
                mode === 'signup'
                  ? 'border-primary text-primary bg-white'
                  : 'border-transparent text-outline hover:text-on-surface'
              }`}
            >
              Create Account
            </button>
            {mode === 'forgot' && (
              <button
                type="button"
                className="flex-1 py-3 text-xs font-bold transition-all border-b-2 border-primary text-primary bg-white"
              >
                Reset Password
              </button>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            {/* Feedback Notifications */}
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Google One-Click Login Option (Primary in Sign-In and Sign-Up) */}
            {mode !== 'forgot' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setGooglePickerOpen(true)}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-surface-container-high bg-white hover:bg-slate-50 hover:border-slate-300 text-on-surface font-bold text-xs shadow-2xs hover:shadow-xs active:scale-[0.99] transition-all group"
                >
                  {/* Google SVG */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold ml-1">
                    Instant
                  </span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="w-full border-t border-surface-container-high" />
                  <span className="absolute px-3 bg-white text-[11px] font-semibold text-outline uppercase tracking-wider">
                    or continue with email
                  </span>
                </div>
              </div>
            )}

            {/* TAB 1: SIGN IN */}
            {mode === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    College / Personal Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. hasasrihp14@gmail.com"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-on-surface">Password</label>
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
                      className="text-[11px] font-bold text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface-variant font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-surface-container-highest text-primary focus:ring-primary"
                    />
                    <span>Remember this device</span>
                  </label>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-xs hover:shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Sign In & Unlock Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-outline pt-2">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setErrorMessage(''); setSuccessMessage(''); }}
                    className="font-bold text-primary hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </form>
            )}

            {/* TAB 2: CREATE ACCOUNT (SIGN UP) */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sri M."
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. hasasrihp14@gmail.com"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {password.length > 0 && (
                    <div className="mt-2 space-y-1.5 animate-in fade-in">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-outline">Security Strength:</span>
                        <span className={`font-bold ${
                          passwordScore <= 1 ? 'text-rose-600' :
                          passwordScore === 2 ? 'text-amber-600' :
                          passwordScore === 3 ? 'text-blue-600' :
                          'text-emerald-600'
                        }`}>
                          {passwordScore <= 1 && 'Weak'}
                          {passwordScore === 2 && 'Fair'}
                          {passwordScore === 3 && 'Strong'}
                          {passwordScore === 4 && 'Excellent 🛡️'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 h-1.5">
                        <div className={`rounded-full ${passwordScore >= 1 ? 'bg-rose-500' : 'bg-surface-container-high'}`} />
                        <div className={`rounded-full ${passwordScore >= 2 ? 'bg-amber-500' : 'bg-surface-container-high'}`} />
                        <div className={`rounded-full ${passwordScore >= 3 ? 'bg-blue-500' : 'bg-surface-container-high'}`} />
                        <div className={`rounded-full ${passwordScore >= 4 ? 'bg-emerald-500' : 'bg-surface-container-high'}`} />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-xs hover:shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Register & Create Profile</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-outline pt-2">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setErrorMessage(''); setSuccessMessage(''); }}
                    className="font-bold text-primary hover:underline"
                  >
                    Sign In instead
                  </button>
                </p>
              </form>
            )}

            {/* TAB 3: FORGOT PASSWORD FLOW */}
            {mode === 'forgot' && (
              <div className="space-y-4">
                {/* Step Indicators */}
                <div className="flex items-center justify-between px-2 py-2 rounded-xl bg-surface-container-low text-[11px] font-bold">
                  <span className={forgotStep === 1 ? 'text-primary font-black' : 'text-outline'}>
                    1. Send OTP
                  </span>
                  <span className="text-outline">→</span>
                  <span className={forgotStep === 2 ? 'text-primary font-black' : 'text-outline'}>
                    2. Verify Code
                  </span>
                  <span className="text-outline">→</span>
                  <span className={forgotStep === 3 ? 'text-primary font-black' : 'text-outline'}>
                    3. New Password
                  </span>
                </div>

                {/* Step 1: Request Code */}
                {forgotStep === 1 && (
                  <form onSubmit={handleRequestResetCode} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface block mb-1">
                        Enter Registered Account Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. hasasrihp14@gmail.com"
                          required
                          autoFocus
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <p className="text-[11px] text-outline mt-1.5">
                        We'll send a 6-digit one-time security authentication token to this address.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4" />
                          <span>Dispatch Verification OTP</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Step 2: Verification Code Input */}
                {forgotStep === 2 && (
                  <form onSubmit={handleVerifyCode} className="space-y-4">
                    {/* Simulated Secure Inbox Delivery Notification */}
                    {generatedCode && (
                      <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1.5 text-indigo-900">
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                            Security OTP Sent
                          </span>
                          <span className="font-mono font-black text-primary px-2 py-0.5 rounded bg-white border border-indigo-200">
                            {generatedCode}
                          </span>
                        </div>
                        <p className="text-[11px] text-indigo-800 leading-tight">
                          Verification code generated for <strong>{email}</strong>.
                        </p>
                        <button
                          type="button"
                          onClick={() => setResetCode(generatedCode)}
                          className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors"
                        >
                          Auto-fill 6-Digit Code ({generatedCode})
                        </button>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-bold text-on-surface block mb-1">
                        6-Digit Security Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 849201"
                        required
                        autoFocus
                        className="w-full tracking-widest text-center text-lg font-mono font-bold py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-on-surface focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-outline">Didn't receive code?</span>
                      <button
                        type="button"
                        onClick={(e) => handleRequestResetCode(e as any)}
                        disabled={resendCountdown > 0}
                        className="font-bold text-primary hover:underline disabled:text-outline"
                      >
                        Resend code {resendCountdown > 0 && `(${resendCountdown}s)`}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setForgotStep(1)}
                        className="flex-1 py-2.5 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container"
                      >
                        Verify Code
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Enter New Password */}
                {forgotStep === 3 && (
                  <form onSubmit={handleFinalPasswordReset} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-on-surface block mb-1">
                        New Secure Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          autoFocus
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-on-surface block mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-outline absolute left-3.5 top-3" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low focus:bg-white text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Reset Password & Sign In</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setErrorMessage(''); setSuccessMessage(''); }}
                    className="text-xs font-bold text-outline hover:text-on-surface"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Security Assurance Footer */}
          <div className="p-3 bg-surface-container-low border-t border-surface-container flex items-center justify-between text-[11px] text-outline shrink-0 px-6">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>TLS 1.3 Certified Encrypted</span>
            </span>
            <span>Zero Tracking • Student Privacy First</span>
          </div>
        </div>
      </div>

      {/* Google Account Chooser Modal */}
      <GoogleAccountPickerModal
        isOpen={googlePickerOpen}
        onClose={() => setGooglePickerOpen(false)}
        onSelectAccount={handleGoogleAccountSelect}
      />
    </>
  );
};
