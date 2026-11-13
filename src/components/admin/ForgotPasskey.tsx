import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { EMAIL_CONFIG } from '../../config/emailConfig';
import { generateResetToken, saveResetToken } from '../../utils/resetToken';

interface ForgotPasskeyProps {
  onBack: () => void;
}

type State = 'idle' | 'sending' | 'sent' | 'error';

export const ForgotPasskey: React.FC<ForgotPasskeyProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only allow the registered recovery email
    if (email.trim().toLowerCase() !== EMAIL_CONFIG.recoveryEmail.toLowerCase()) {
      setErrorMsg('This email is not registered as the recovery address.');
      setState('error');
      return;
    }

    setState('sending');
    setErrorMsg('');

    try {
      // Generate a secure one-time token valid for 1 hour
      const token = generateResetToken();
      saveResetToken(token, EMAIL_CONFIG.tokenTTL);

      // Build the reset link
      const resetLink = `${window.location.origin}${window.location.pathname}#admin-reset?token=${token}`;

      // Send email via EmailJS
      await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        {
          to_email: EMAIL_CONFIG.recoveryEmail,
          to_name: 'Md. Al Emran',
          reset_link: resetLink,
          expires_in: '1 hour',
          site_url: window.location.origin,
        },
        { publicKey: EMAIL_CONFIG.publicKey }
      );

      setState('sent');
    } catch (err) {
      console.error('EmailJS error:', err);
      setErrorMsg(
        'Failed to send recovery email. Please check your EmailJS configuration or try again later.'
      );
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Check Your Email</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A passkey reset link has been sent to{' '}
              <span className="font-semibold text-brand-500">{EMAIL_CONFIG.recoveryEmail}</span>.
              The link expires in <strong>1 hour</strong>.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Click the link in the email to set a new passkey. Check your spam folder if you don't see it.
            </p>
            <button
              onClick={onBack}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-navy-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-500 hover:text-brand-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </button>

        <div className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto shadow-inner">
              <Mail className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Recover Passkey
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter your registered recovery email. A reset link will be sent to your inbox.
            </p>
          </div>

          {/* Error */}
          {state === 'error' && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Recovery Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === 'error') setState('idle');
                  }}
                  placeholder="Enter your recovery email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 text-white font-semibold text-sm shadow-md hover:shadow-brand-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === 'sending' ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
              ) : (
                <><Send className="w-4 h-4" /><span>Send Reset Link</span></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
