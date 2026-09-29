import { getWpJsonV2Base } from "@/lib/wp/env";

const apiBase = getWpJsonV2Base(process.env.NEXT_PUBLIC_WP_URL);

export function getWpApiUrl(): string {
  return apiBase;
}

/**
 * WordPress can return transient 5xx errors. Retry those with a backoff.
 * Each retry sends an X-Retry-Attempt header so Next.js's fetch memoization doesn't hand back the
 * failed response again. After the last attempt the (5xx) response is returned for the caller to handle.
 */
export async function fetchWithRetry(
  input: string,
  init?: RequestInit,
  attempts = 5
): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const headers = new Headers(init?.headers);
      if (attempt > 1) headers.set("X-Retry-Attempt", String(attempt));
      const res = await fetch(input, { ...init, headers });
      if (res.status < 500 || attempt >= attempts) return res;
    } catch (err) {
      if (attempt >= attempts) throw err;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** (attempt - 1)));
  }
}

/** Throws on any non-OK response except 404, which resolves to an empty list. */
export async function fetchWp<T>(
  path: string,
  params?: Record<string, string | number | undefined>
): Promise<T> {
  const searchParams = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    }
  }
  const url = `${apiBase}${path}${searchParams.toString() ? `?${searchParams}` : ""}`;
  const res = await fetchWithRetry(url, {
    next: { revalidate: 43200 },
    headers: { "Content-Type": "application/json" },
  });
  if (res.status === 404) return [] as unknown as T;
  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
