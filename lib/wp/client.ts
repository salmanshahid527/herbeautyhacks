import { getWpJsonV2Base } from "@/lib/wp/env";

const apiBase = getWpJsonV2Base(process.env.NEXT_PUBLIC_WP_URL);

export function getWpApiUrl(): string {
  return apiBase;
}

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
  const res = await fetch(url, {
    next: { revalidate: 3600 },
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
