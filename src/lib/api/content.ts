import { authors, categories, posts, shopItems, siteConfig, webStories } from "@/lib/data/content";
import type {
  Category,
  ContactFormInput,
  HomePageData,
  MutationResponse,
  NewsletterInput,
  PaginatedResult,
  Post,
  PostQueryParams,
  PostSortOption,
  ResolvedPathResult,
  ShopItem,
  ShopQueryParams,
  ShopSortOption,
  StoryQueryParams,
  StorySortOption,
  WebStory,
} from "@/lib/types/content";

const SIMULATED_DELAY_MS = 120;

const wait = (ms = SIMULATED_DELAY_MS) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const normalize = (value: string) => value.trim().toLowerCase();

const byNewest = <T extends { publishedAt: string }>(a: T, b: T) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

const paginate = <T>(items: T[], page = 1, pageSize = 9): PaginatedResult<T> => {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;

  return {
    items: items.slice(start, end),
    meta: {
      page: safePage,
      pageSize: safePageSize,
      totalItems,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPreviousPage: safePage > 1,
    },
  };
};

const sortPosts = (items: Post[], sort: PostSortOption = "newest") => {
  const sorted = [...items];

  switch (sort) {
    case "oldest":
      sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
      break;
    case "trending":
      sorted.sort((a, b) => b.trendingScore - a.trendingScore);
      break;
    case "title":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "newest":
    default:
      sorted.sort(byNewest);
      break;
  }

  return sorted;
};

const sortShopItems = (items: ShopItem[], sort: ShopSortOption = "featured") => {
  const sorted = [...items];

  switch (sort) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "featured":
    default:
      sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
      break;
  }

  return sorted;
};

const sortStories = (items: WebStory[], sort: StorySortOption = "newest") => {
  const sorted = [...items];

  switch (sort) {
    case "oldest":
      sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
      break;
    case "title":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "newest":
    default:
      sorted.sort(byNewest);
      break;
  }

  return sorted;
};

const includesSearch = (search: string, values: string[]) => {
  if (!search) {
    return true;
  }

  const normalizedSearch = normalize(search);
  return values.some((value) => normalize(value).includes(normalizedSearch));
};

export const getSiteConfig = async () => {
  await wait();
  return siteConfig;
};

export const getCategories = async (): Promise<Category[]> => {
  await wait();
  return categories;
};

export const getAuthors = async () => {
  await wait();
  return authors;
};

export const getHomePageData = async (): Promise<HomePageData> => {
  await wait();

  const heroPost = posts.find((post) => post.featured) ?? posts[0];
  const trendingPosts = [...posts].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 4);
  const editorialSections = categories.slice(0, 3).map((category) => ({
    category,
    posts: sortPosts(posts.filter((post) => post.categorySlug === category.slug), "newest").slice(0, 3),
  }));
  const latestPosts = sortPosts(posts, "newest").slice(0, 6);

  return {
    heroPost,
    topicCards: categories,
    trendingPosts,
    editorialSections,
    authorSpotlight: authors[0],
    latestPosts,
  };
};

export const getPosts = async (params: PostQueryParams = {}): Promise<PaginatedResult<Post>> => {
  await wait();
  const { page = 1, pageSize = 9, search = "", category, sort = "newest" } = params;

  const filtered = posts.filter((post) => {
    const categoryMatches = !category || post.categorySlug === category;
    const searchMatches = includesSearch(search, [
      post.title,
      post.excerpt,
      post.categorySlug,
      ...post.tagSlugs,
    ]);

    return categoryMatches && searchMatches;
  });

  return paginate(sortPosts(filtered, sort), page, pageSize);
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  await wait();
  return posts.find((post) => post.slug === slug) ?? null;
};

export const getRelatedPosts = async (postSlug: string, limit = 3): Promise<Post[]> => {
  await wait();
  const targetPost = posts.find((post) => post.slug === postSlug);
  if (!targetPost) {
    return [];
  }

  const related = posts
    .filter((post) => post.id !== targetPost.id && post.categorySlug === targetPost.categorySlug)
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit);

  if (related.length >= limit) {
    return related;
  }

  const fallback = posts
    .filter((post) => post.id !== targetPost.id && post.categorySlug !== targetPost.categorySlug)
    .sort(byNewest)
    .slice(0, limit - related.length);

  return [...related, ...fallback];
};

export const getCategoryBySlug = async (slug: string): Promise<Category | null> => {
  await wait();
  return categories.find((category) => category.slug === slug) ?? null;
};

export const getResolvedPath = async (slugSegments: string[]): Promise<ResolvedPathResult> => {
  await wait();
  const normalizedSegments = slugSegments.map(normalize).filter(Boolean);

  if (normalizedSegments.length === 0 || normalizedSegments.length > 2) {
    return { type: "not-found", slugSegments: normalizedSegments };
  }

  if (normalizedSegments.length === 1) {
    const [singleSlug] = normalizedSegments;

    const matchedCategory = categories.find((category) => category.slug === singleSlug);
    if (matchedCategory) {
      return { type: "category", slugSegments: normalizedSegments, category: matchedCategory };
    }

    const matchedPost = posts.find((post) => post.slug === singleSlug);
    if (matchedPost) {
      return { type: "post", slugSegments: normalizedSegments, post: matchedPost };
    }

    return { type: "not-found", slugSegments: normalizedSegments };
  }

  const [categorySlug, postSlug] = normalizedSegments;
  const matchedCategory = categories.find((category) => category.slug === categorySlug);
  const matchedPost = posts.find((post) => post.slug === postSlug && post.categorySlug === categorySlug);

  if (matchedCategory && matchedPost) {
    return { type: "post", slugSegments: normalizedSegments, post: matchedPost };
  }

  return { type: "not-found", slugSegments: normalizedSegments };
};

export const getShopItems = async (params: ShopQueryParams = {}): Promise<PaginatedResult<ShopItem>> => {
  await wait();
  const { page = 1, pageSize = 8, search = "", category, sort = "featured" } = params;

  const filtered = shopItems.filter((item) => {
    const categoryMatches = !category || item.categorySlug === category;
    const searchMatches = includesSearch(search, [item.title, item.description, item.brand, item.categorySlug]);
    return categoryMatches && searchMatches;
  });

  return paginate(sortShopItems(filtered, sort), page, pageSize);
};

export const getWebStories = async (params: StoryQueryParams = {}): Promise<PaginatedResult<WebStory>> => {
  await wait();
  const { page = 1, pageSize = 9, search = "", category, sort = "newest" } = params;

  const filtered = webStories.filter((story) => {
    const categoryMatches = !category || story.categorySlug === category;
    const searchMatches = includesSearch(search, [story.title, story.excerpt, story.categorySlug]);
    return categoryMatches && searchMatches;
  });

  return paginate(sortStories(filtered, sort), page, pageSize);
};

export const submitContactForm = async (input: ContactFormInput): Promise<MutationResponse> => {
  await wait(240);

  if (!input.name.trim() || !input.email.trim() || !input.subject.trim() || !input.message.trim()) {
    throw new Error("Please complete all contact form fields before submitting.");
  }

  return {
    success: true,
    message: "Thanks for reaching out to HerBeautyHacks. We will get back to you shortly.",
    receivedAt: new Date().toISOString(),
  };
};

export const submitNewsletter = async (input: NewsletterInput): Promise<MutationResponse> => {
  await wait(180);

  if (!input.email.trim()) {
    throw new Error("Please enter your email address to subscribe.");
  }

  return {
    success: true,
    message: "You are in! Weekly beauty insights are heading to your inbox.",
    receivedAt: new Date().toISOString(),
  };
};
