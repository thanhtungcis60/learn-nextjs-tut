export function encodeUrl(str: string): string {
  // Use browser btoa when available, otherwise use Buffer on Node (SSR-safe)
  let base64: string;
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    base64 = window.btoa(str);
  } else {
    base64 = Buffer.from(str, 'utf-8').toString('base64');
  }
  return encodeURIComponent(base64);
}

export function decodeUrl(str: string): string {
  const base64 = decodeURIComponent(str);
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return window.atob(base64);
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}
