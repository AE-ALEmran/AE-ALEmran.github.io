import React, { useEffect, useState } from 'react';
import { KeyRound, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { verifyResetToken, clearResetToken } from '../../utils/resetToken';
import { usePortfolio } from '../../context/PortfolioContext';

interface ResetPasskeyProps {
  token: string;
  onDone: () => void;
}

type State = 'verifying' | 'invalid' | 'ready' | 'saving' | 'success';

export const ResetPasskey: React.FC<ResetPasskeyProps> = ({ token, onDone }) => {
  const { setAdminPassword } = usePortfolio();
  const [state, setState] = useState<State>('verifying');
  const [newPasskey, setNewPasskey] = useState('');
  const [confirmPasskey, setConfirmPasskey] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Verify token on mount
    if (verifyResetToken(token)) {
      setState('ready');
    } else {
      setState('invalid');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasskey.length < 4) {
      setErrorMsg('Passkey must be at least 4 characters.');
      return;
    }
    if (newPasskey !== confirmPasskey) {
      setErrorMsg('Passkeys do not match.');
      return;
    }

    setState('saving');
    try {
      await setAdminPassword(newPasskey);
      clearResetToken(); // Invalidate token after use
      setState('success');
      // Clear the hash after 2 seconds and go to login
      setTimeout(() => {
        window.location.hash = '#admin';
        onDone();
      }, 2000);
    } catch {
      setState('ready');
      setErrorMsg('Failed to update passkey. Please try again.');
    }
  };

  if (state === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-950">
        <div className="flex flex-col items-center space-y-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
          <span className="text-sm">Verifying reset link...</span>
        </div>
      </div>
    );
  }

  if (state === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-2xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Link Expired or Invalid</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This reset link has expired or already been used. Reset links are valid for <strong>1 hour</strong>.
          </p>
          <button
            onClick={onDone}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 text-white font-semibold text-sm transition-all"
          >
            Request a New Link
          </button>
        </div>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-2xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Passkey Updated!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your new passkey has been saved securely. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-navy-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <button
          onClick={onDone}
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-500 hover:text-brand-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>

        <div className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto shadow-inner">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Set New Passkey
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Choose a strong passkey for your admin portal.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Passkey */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                New Passkey
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showNew ? 'text' : 'password'}
                  required
                  minLength={4}
                  value={newPasskey}
                  onChange={(e) => { setNewPasskey(e.target.value); setErrorMsg(''); }}
                  placeholder="Enter new passkey..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button type="button" onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Passkey */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm Passkey
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPasskey}
                  onChange={(e) => { setConfirmPasskey(e.target.value); setErrorMsg(''); }}
                  placeholder="Confirm new passkey..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Strength hint */}
            {newPasskey && (
              <p className={`text-xs ${newPasskey.length >= 8 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {newPasskey.length >= 8 ? '✓ Strong passkey' : '⚠ Use at least 8 characters for a stronger passkey'}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'saving'}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === 'saving' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Saving...</span></>
              ) : (
                <><KeyRound className="w-4 h-4" /><span>Save New Passkey</span></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
