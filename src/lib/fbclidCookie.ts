/**
 * Persists Facebook Click ID (fbclid) as the _fbc cookie for Conversions API matching.
 * Safe to call on every load; no-ops when fbclid is absent.
 */
export function persistFacebookClickIdFromUrl(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");
  if (!fbclid) return;

  const timestamp = Math.floor(Date.now() / 1000);
  const fbc = `fb.${timestamp}.${fbclid}`;
  document.cookie = `_fbc=${fbc}; path=/; max-age=7776000; SameSite=Lax`;
}
