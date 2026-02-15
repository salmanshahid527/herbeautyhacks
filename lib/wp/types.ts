export interface WpPost {
  id: number;
  date: string;
  modified?: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
  sticky?: boolean;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
    author?: Array<{ id: number; name: string; avatar_urls?: { 96?: string } }>;
  };
}

export interface WpCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count?: number;
}

export interface WpUser {
  id: number;
  name: string;
  description: string;
  avatar_urls?: { 24?: string; 48?: string; 96?: string };
}

export interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
}
