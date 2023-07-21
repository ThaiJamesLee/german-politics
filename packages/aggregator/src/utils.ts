import { dirname, join } from 'path';
import fetch, { RequestInfo, RequestInit } from 'node-fetch';

import { existsSync } from 'fs';
import fsPromise from 'fs/promises';

export async function customFetch<T>(
  url: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, init);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
}

export async function writeFile(
  content: string,
  filePath: string,
): Promise<void> {
  const directory = dirname(filePath);
  if (!existsSync(directory)) {
    await fsPromise.mkdir(directory, { recursive: true });
  }

  await fsPromise.writeFile(filePath, content);
}

export async function writeFileAndArchive(
  date: string,
  content: string,
  fileName: string,
  basePath = '',
): Promise<void> {
  Promise.all([
    writeFile(content, join(basePath, fileName)),
    writeFile(content, join(basePath, date, fileName)),
  ]);
}
