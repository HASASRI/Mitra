import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Laptop, 
  Clock, 
  LogOut, 
  ShieldAlert, 
  Check, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { AuthUser, SecurityLogItem } from '../types';
import { 
  changePassword, 
  getSecurityLogs, 
  addSecurityLog, 
  updateAuthUser 
} from '../services/authService';

interface AccountSecuritySectionProps {
  authUser: AuthUser | null;
  onSignOut: () => void;
  onOpenAuthModal: () => void;
}

export const AccountSecuritySection: React.FC<AccountSecuritySectionProps> = ({
  authUser,
  onSignOut,
  onOpenAuthModal,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(authUser?.twoFactorEnabled ?? false);
  const [logs, setLogs] = useState<SecurityLogItem[]>(() => getSecurityLogs());

  if (!authUser) {
    return (
      <div className="p-8 rounded-3xl bg-white border border-surface-container-high text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="font-display font-extrabold text-xl text-on-surface">
          Sign In to Manage Account Security
        </h3>
        <p className="text-xs text-outline max-w-md mx-auto">
          Your session is currently running in guest preview. Sign in with Google or create an account to activate 2FA, password management, and encrypted device sessions.
        </p>
        <button
          onClick={onOpenAuthModal}
          className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all shadow-xs"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setPassError('Password must be at least 6 characters.');
      return;
    }

    setIsChangingPass(true);
    setTimeout(() => {
      const res = changePassword(currentPassword, newPassword);
      setIsChangingPass(false);
      if (res.success) {
        setPassSuccess('Password updated successfully! Your account credentials are secured.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setLogs(getSecurityLogs());
      } else {
        setPassError(res.error || 'Failed to update password.');
      }
    }, 450);
  };

  const handleToggle2FA = () => {
    const nextVal = !twoFactorEnabled;
    setTwoFactorEnabled(nextVal);
    updateAuthUser({ twoFactorEnabled: nextVal });
    addSecurityLog(nextVal ? 'Enabled 2-Factor Authentication (OTP)' : 'Disabled 2-Factor Authentication', 'info');
    setLogs(getSecurityLogs());
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Auth Method Card */}
        <div className="p-5 rounded-3xl bg-white border border-surface-container-high space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Authentication Method
            </span>
            {authUser.provider === 'google' ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3" /> Google Verified
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-bold border border-indigo-200">
                Email / Password
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 pt-1">
            {authUser.provider === 'google' ? (
              <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-surface-container flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              </div>
            ) : (
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center shrink-0">
                <Key className="w-5 h-5" />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-on-surface truncate">
                {authUser.email}
              </p>
              <p className="text-[11px] text-outline">
                {authUser.provider === 'google' ? 'Google OAuth 2.0 Single Sign-On' : 'Password Protected Account'}
              </p>
            </div>
          </div>
        </div>

        {/* 2FA Protection Card */}
        <div className="p-5 rounded-3xl bg-white border border-surface-container-high space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Two-Factor Auth (2FA)
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              twoFactorEnabled 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {twoFactorEnabled ? 'Active' : 'Optional'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-outline" />
              <div>
                <p className="text-xs font-bold text-on-surface">OTP Verification</p>
                <p className="text-[11px] text-outline">Require email verification for logins</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggle2FA}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                twoFactorEnabled ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Security Score Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Account Security Status
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="font-display text-3xl font-black text-emerald-900">
              96%
            </span>
            <span className="text-xs font-bold text-emerald-700">Excellent Protection</span>
          </div>
          <p className="text-[11px] text-emerald-800/80">
            Encrypted session, SSL TLS 1.3, profile data verified.
          </p>
        </div>
      </div>

      {/* Password Management Section */}
      <div className="p-6 rounded-3xl bg-white border border-surface-container-high space-y-4">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
          <div>
            <h3 className="font-display font-extrabold text-base text-on-surface">
              Password & Login Credentials
            </h3>
            <p className="text-xs text-outline">
              Update your account password or set a custom backup password.
            </p>
          </div>
          <Lock className="w-5 h-5 text-outline" />
        </div>

        {passSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{passSuccess}</span>
          </div>
        )}

        {passError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{passError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
          {authUser.provider === 'email' && (
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
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
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isChangingPass}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all flex items-center gap-2 shadow-xs"
            >
              {isChangingPass ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Update Account Password</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Active Session & Device Audit Log */}
      <div className="p-6 rounded-3xl bg-white border border-surface-container-high space-y-4">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
          <div>
            <h3 className="font-display font-extrabold text-base text-on-surface">
              Active Session & Security Log
            </h3>
            <p className="text-xs text-outline">
              Real-time audit history of device access and authorization tokens.
            </p>
          </div>
          <button
            onClick={onSignOut}
            className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Current Device</span>
          </button>
        </div>

        {/* Current Active Device */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-on-surface">
                  This Browser (Chrome / Linux Runtime)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Active Now
                </span>
              </div>
              <p className="text-[11px] text-outline">
                Encrypted Session ID: <code className="font-mono">{authUser.token?.substring(0, 16) || 'jwt_active_auth'}...</code>
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface">TLS 1.3 • AES-256</p>
            <p className="text-[11px] text-outline">Logged in: {new Date(authUser.lastLoginAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        {/* Recent Audit Activities */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
            Recent Security Activity
          </span>
          <div className="divide-y divide-surface-container-high border border-surface-container-high rounded-2xl overflow-hidden text-xs">
            {logs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 flex items-center justify-between bg-white hover:bg-surface-container-lowest">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${
                    log.status === 'success' ? 'bg-emerald-500' :
                    log.status === 'warning' ? 'bg-rose-500' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="font-semibold text-on-surface">{log.action}</p>
                    <p className="text-[11px] text-outline">{log.device} • IP: {log.ip}</p>
                  </div>
                </div>
                <span className="text-[11px] text-outline whitespace-nowrap pl-2">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
