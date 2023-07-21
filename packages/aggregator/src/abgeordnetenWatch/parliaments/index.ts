import { customFetch, writeFileAndArchive } from '../../utils';

import { ParliamentResult } from '../types';
import { join } from 'path';

const basePath = join(__dirname, '..', '..', '..', 'data', 'parliaments');

async function getListOfParliaments(
  parliaments: ParliamentResult,
  today: string,
): Promise<void> {
  const list = parliaments.data.map(entry => entry.label_external_long);
  await writeFileAndArchive(
    today,
    JSON.stringify(
      {
        other: list.filter(
          entry =>
            !entry.startsWith('Landtag') && !entry.startsWith('Bürgerschaft'),
        ),
        landtage: list.filter(entry => entry.startsWith('Landtag')),
        buergerschaften: list.filter(entry => entry.startsWith('Bürgerschaft')),
      },
      null,
      2,
    ),
    'parliaments.json',
    basePath,
  );
}

export async function fetchParliaments(): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);

  const parliaments: ParliamentResult = await customFetch(
    'https://www.abgeordnetenwatch.de/api/v2/parliaments',
  );

  await Promise.all([
    getListOfParliaments(parliaments, today),
    writeFileAndArchive(
      today,
      JSON.stringify(parliaments, null, 2),
      'source.json',
      basePath,
    ),
  ]);
}
