"use client";

import {
  getCategories,
  getCategoryBySlug,
  getHomePageData,
  getPostBySlug,
  getPosts,
  getRelatedPosts,
  getResolvedPath,
  getShopItems,
  getSiteConfig,
  getWebStories,
  submitContactForm,
  submitNewsletter,
} from "@/lib/api/content";
import { useApiMutation, useApiQuery } from "@/lib/hooks/useApiQuery";
import type {
  ContactFormInput,
  NewsletterInput,
  PostQueryParams,
  ShopQueryParams,
  StoryQueryParams,
} from "@/lib/types/content";

export const useSiteConfig = () =>
  useApiQuery({
    queryKey: ["site-config"],
    queryFn: getSiteConfig,
    staleTime: 600_000,
  });

export const useCategories = () =>
  useApiQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 600_000,
  });

export const useHomePageData = () =>
  useApiQuery({
    queryKey: ["home-page"],
    queryFn: getHomePageData,
    staleTime: 300_000,
  });

export const usePosts = (params: PostQueryParams) =>
  useApiQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
    staleTime: 60_000,
  });

export const usePost = (slug: string) =>
  useApiQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: Boolean(slug),
  });

export const useRelatedPosts = (postSlug: string) =>
  useApiQuery({
    queryKey: ["related-posts", postSlug],
    queryFn: () => getRelatedPosts(postSlug, 3),
    enabled: Boolean(postSlug),
  });

export const useCategory = (slug: string) =>
  useApiQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 300_000,
  });

export const useResolvedPath = (slugSegments: string[]) =>
  useApiQuery({
    queryKey: ["resolved-path", slugSegments.join("/")],
    queryFn: () => getResolvedPath(slugSegments),
    enabled: slugSegments.length > 0,
  });

export const useShopItems = (params: ShopQueryParams) =>
  useApiQuery({
    queryKey: ["shop-items", params],
    queryFn: () => getShopItems(params),
    staleTime: 120_000,
  });

export const useWebStories = (params: StoryQueryParams) =>
  useApiQuery({
    queryKey: ["web-stories", params],
    queryFn: () => getWebStories(params),
    staleTime: 120_000,
  });

export const useContactMutation = () =>
  useApiMutation({
    mutationFn: (payload: ContactFormInput) => submitContactForm(payload),
  });

export const useNewsletterMutation = () =>
  useApiMutation({
    mutationFn: (payload: NewsletterInput) => submitNewsletter(payload),
  });
