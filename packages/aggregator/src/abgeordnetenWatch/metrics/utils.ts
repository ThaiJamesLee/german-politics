import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

export async function readDataFile<T>(filePath: string): Promise<T> {
  if (existsSync(filePath)) {
    return JSON.parse(await readFile(filePath, { encoding: 'utf-8' }));
  }

  throw new Error(`Could not find file "${filePath}"!`);
}
