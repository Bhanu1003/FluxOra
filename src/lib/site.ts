// Central site config. Set VITE_SITE_URL to your custom domain (e.g. https://fluxora.com)
// in your hosting provider's environment settings — no code changes needed.

export const SITE_URL: string =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "";

export const absUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
