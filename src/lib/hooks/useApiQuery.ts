"use client";

import {
  type MutationFunction,
  type QueryKey,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

interface ApiQueryOptions<TQueryData, TSelected = TQueryData> {
  queryKey: QueryKey;
  queryFn: () => Promise<TQueryData>;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  select?: (data: TQueryData) => TSelected;
}

interface ApiMutationOptions<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>;
}

export const useApiQuery = <TQueryData, TSelected = TQueryData>({
  queryKey,
  queryFn,
  enabled = true,
  staleTime = 60_000,
  gcTime = 300_000,
  select,
}: ApiQueryOptions<TQueryData, TSelected>) =>
  useQuery({
    queryKey,
    queryFn,
    enabled,
    staleTime,
    gcTime,
    select,
  });

export const useApiMutation = <TData, TVariables>({
  mutationFn,
}: ApiMutationOptions<TData, TVariables>) =>
  useMutation({
    mutationFn,
  });
