import fetch, { RequestInfo, RequestInit } from "node-fetch";

import { PUBLIC_URL } from "../constants";

export const PAGE_URL = "https://thaijameslee.github.io/german-politics/";

export async function customFetch<T>(
  url: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(PUBLIC_URL + url, init);

  if (response.ok) {
    return response.json();
  }

  throw new Error(response.statusText);
}
