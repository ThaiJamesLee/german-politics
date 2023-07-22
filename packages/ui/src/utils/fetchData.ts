import fetch, { RequestInfo, RequestInit } from "node-fetch";

export const PAGE_URL = "https://thaijameslee.github.io/german-politics/";

export async function customFetch<T>(
  url: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(url, init);

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
}
