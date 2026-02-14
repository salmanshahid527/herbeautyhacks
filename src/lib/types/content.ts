export type PostSortOption = "newest" | "oldest" | "trending" | "title";
export type ShopSortOption = "featured" | "price-low" | "price-high" | "rating";
export type StorySortOption = "newest" | "oldest" | "title";

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  brandName: string;
  domain: string;
  tagline: string;
  announcement: string;
  socialLinks: SocialLink[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  accentClass: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatar: string;
  socialLinks: SocialLink[];
}

export interface PostSection {
  id: string;
  heading: string;
  content: string[];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  categorySlug: string;
  tagSlugs: string[];
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  trendingScore: number;
  featured?: boolean;
  sections: PostSection[];
}

export interface ShopItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  categorySlug: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  featured?: boolean;
  affiliateUrl: string;
}

export interface WebStory {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  categorySlug: string;
  publishedAt: string;
  readTimeMinutes: number;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface PostQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  sort?: PostSortOption;
}

export interface ShopQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  sort?: ShopSortOption;
}

export interface StoryQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  sort?: StorySortOption;
}

export interface EditorialSectionData {
  category: Category;
  posts: Post[];
}

export interface HomePageData {
  heroPost: Post;
  topicCards: Category[];
  trendingPosts: Post[];
  editorialSections: EditorialSectionData[];
  authorSpotlight: Author;
  latestPosts: Post[];
}

export type ResolvedPathResult =
  | {
      type: "category";
      slugSegments: string[];
      category: Category;
    }
  | {
      type: "post";
      slugSegments: string[];
      post: Post;
    }
  | {
      type: "not-found";
      slugSegments: string[];
    };

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterInput {
  email: string;
  source?: string;
}

export interface MutationResponse {
  success: boolean;
  message: string;
  receivedAt: string;
}
