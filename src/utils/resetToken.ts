// ─────────────────────────────────────────────────────────────────────────────
// Passkey Reset Token Utilities
// Generates a cryptographically random token stored in localStorage
// with an expiry time for secure one-time passkey reset.
// ─────────────────────────────────────────────────────────────────────────────

const RESET_TOKEN_KEY = 'emran_reset_token_v1';
const RESET_EXPIRY_KEY = 'emran_reset_expiry_v1';

/** Generate a secure random hex token (32 bytes = 64 hex chars) */
export function generateResetToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/** Store token + expiry in localStorage */
export function saveResetToken(token: string, ttlMs: number): void {
  const expiry = Date.now() + ttlMs;
  localStorage.setItem(RESET_TOKEN_KEY, token);
  localStorage.setItem(RESET_EXPIRY_KEY, String(expiry));
}

/** Verify a token is valid (matches stored token and not expired) */
export function verifyResetToken(token: string): boolean {
  const stored = localStorage.getItem(RESET_TOKEN_KEY);
  const expiry = Number(localStorage.getItem(RESET_EXPIRY_KEY) ?? '0');
  if (!stored || !expiry) return false;
  if (Date.now() > expiry) {
    clearResetToken();
    return false;
  }
  return stored === token;
}

/** Invalidate the token after use */
export function clearResetToken(): void {
  localStorage.removeItem(RESET_TOKEN_KEY);
  localStorage.removeItem(RESET_EXPIRY_KEY);
}
