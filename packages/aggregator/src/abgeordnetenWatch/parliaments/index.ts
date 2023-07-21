import { customFetch, writeFile } from '../../utils';

import { ParliamentResult } from '../types';
import { join } from 'path';

async function writeFileAndArchive(
  date: string,
  content: string,
  fileName: string,
  basePath = join(__dirname, '..', '..', '..', 'data', 'parliaments'),
): Promise<void> {
  Promise.all([
    writeFile(content, join(basePath, fileName)),
    writeFile(content, join(basePath, date, fileName)),
  ]);
}

export async function fetchParliaments(): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);

  const parliaments: ParliamentResult = await customFetch(
    'https://www.abgeordnetenwatch.de/api/v2/parliaments',
  );

  const list = parliaments.data.map(entry => entry.label_external_long);
  await writeFileAndArchive(
    today,
    JSON.stringify(parliaments, null, 2),
    'source.json',
  );
  await writeFileAndArchive(
    today,
    JSON.stringify(list, null, 2),
    'parliaments.json',
  );
}
