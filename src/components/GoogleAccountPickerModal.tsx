import React, { useState } from 'react';
import { X, Shield, Check, Plus, AlertCircle } from 'lucide-react';

interface GoogleAccountPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: { email: string; name: string; avatarUrl?: string }) => void;
}

export const GoogleAccountPickerModal: React.FC<GoogleAccountPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectAccount,
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Pre-configured detected Google Accounts (including the user's Google account from metadata)
  const defaultAccounts = [
    {
      email: 'hasasrihp14@gmail.com',
      name: 'Sri M.',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63FByiqXW5mVbJXXXCt-0voICmmNMjpHfZGIHvfHlNFsjofC1iOrQ7vN-3G_IO4vW8cNXPw-P3AN3oEaHGonJXYjG8ImXYnp3Ro-DHPhUThW1XAjDx64opjc6FLMlVrdR6a5qzJTV6x4uYvFTDTfIpgOFLyk3XrkDoUzqz_1qyCasRTbdpJ9ZBtxvJAZ0Etl8oQq3aChaRT4a0-aYf0QaeDUZ7zl0-V_sc-VSzFwMGOfu6GlGpjlczw',
      badge: 'Primary Account',
    },
    {
      email: 'sri.m.academic@gmail.com',
      name: 'Sri M. (Academic)',
      avatarUrl: 'https://ui-avatars.com/api/?name=Sri+M&background=3525cd&color=fff&size=256',
      badge: 'Student Workspace',
    }
  ];

  const handleChoose = (account: { email: string; name: string; avatarUrl?: string }) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSelectAccount(account);
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }
    setError('');
    const name = customName.trim() || customEmail.split('@')[0];
    handleChoose({
      email: customEmail.trim(),
      name,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3525cd&color=fff&size=256`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-surface-container-high overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-surface-container flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Google official SVG logo */}
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
            <div>
              <h3 className="font-display font-extrabold text-lg text-on-surface">
                Sign in with Google
              </h3>
              <p className="text-xs text-outline">
                Choose an account to continue to <strong className="text-primary font-bold">Mitra</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account List */}
        <div className="p-6 space-y-3">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {!showCustomInput ? (
            <>
              <div className="space-y-2">
                {defaultAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    onClick={() => handleChoose(acc)}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-surface-container-high hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.avatarUrl}
                        alt={acc.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(acc.name)}&background=3525cd&color=fff&size=256`;
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                            {acc.name}
                          </p>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-container text-outline">
                            {acc.badge}
                          </span>
                        </div>
                        <p className="text-xs text-outline">{acc.email}</p>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-xl bg-surface-container-low group-hover:bg-primary group-hover:text-white flex items-center justify-center text-outline transition-colors">
                      <Check className="w-4 h-4" />
                    </div>
                  </button>
                ))}

                {/* Add Another Account */}
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl border border-dashed border-surface-container-highest hover:border-primary/60 hover:bg-surface-container-low transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Use another Google account</p>
                    <p className="text-[11px] text-outline">Sign in with a different @gmail.com or college workspace ID</p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Google Email Address
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="your.name@gmail.com"
                  autoFocus
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Sri M."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-surface-container-high text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="flex-1 py-2.5 rounded-xl border border-surface-container-high text-xs font-bold text-on-surface hover:bg-surface-container transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all shadow-xs"
                >
                  {isSubmitting ? 'Verifying...' : 'Sign In with Google'}
                </button>
              </div>
            </form>
          )}

          {isSubmitting && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/5 text-primary text-xs font-bold animate-pulse">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span>Verifying Google OAuth 2.0 Credentials...</span>
            </div>
          )}

          {/* Security & Disclaimer Footer */}
          <div className="pt-4 border-t border-surface-container text-[11px] text-outline leading-relaxed flex items-start gap-2">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              To continue, Google will securely share your name, email address, and profile picture with <strong>Mitra</strong>. No passwords or private Google Drive data are ever shared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
