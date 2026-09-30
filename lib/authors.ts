/**
 * Real, verified authors and their public profiles. Only authors listed here get an
 * author card and `sameAs` in structured data, so retired personas never reappear.
 */
export interface AuthorProfile {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  pinterest?: string;
}

export const KNOWN_AUTHORS: Record<string, AuthorProfile> = {
  "Husnain Zahid": {
    instagram: "https://www.instagram.com/husnain_zahid.31/",
    facebook: "https://www.facebook.com/share/1DR5wTJEhQ/",
    linkedin: "https://www.linkedin.com/in/muhammad-husnain-zahid-6744673a0/",
  },
};

export function knownAuthorProfile(name?: string | null): AuthorProfile | null {
  if (!name) return null;
  return KNOWN_AUTHORS[name.trim()] ?? null;
}

export function authorSameAs(name?: string | null): string[] | undefined {
  const p = knownAuthorProfile(name);
  if (!p) return undefined;
  const links = [p.instagram, p.facebook, p.linkedin, p.pinterest].filter((v): v is string => Boolean(v));
  return links.length ? links : undefined;
}
