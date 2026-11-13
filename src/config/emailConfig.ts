// ─────────────────────────────────────────────────────────────────────────────
// EmailJS Configuration for Passkey Recovery
// Sign up free at https://www.emailjs.com and fill in the values below.
// ─────────────────────────────────────────────────────────────────────────────

export const EMAIL_CONFIG = {
  // From EmailJS Dashboard → Account → API Keys
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',

  // From EmailJS Dashboard → Email Services (after connecting Gmail)
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',

  // From EmailJS Dashboard → Email Templates
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',

  // The verified recovery email address
  recoveryEmail: 'alemranak13@gmail.com',

  // Reset token TTL in milliseconds (1 hour)
  tokenTTL: 60 * 60 * 1000,
};
