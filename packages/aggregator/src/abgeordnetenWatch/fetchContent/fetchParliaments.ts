import { ParliamentResult, ParliamentsCollectionResult } from '../types';
import { customFetch, writeFileAndArchive } from '../../utils';

import { join } from 'path';

const basePath = join(__dirname, '..', '..', '..', 'data', 'parliaments');

async function getListOfParliaments(
  parliaments: ParliamentsCollectionResult,
  today: string,
): Promise<void> {
  const list = parliaments.data.map(({ label, label_external_long, id }) => {
    return {
      parliament: label,
      externalName: label_external_long,
      id,
    };
  });
  await writeFileAndArchive(
    today,
    JSON.stringify(
      {
        other: list.filter(
          entry =>
            !entry.externalName.startsWith('Landtag') &&
            !entry.externalName.startsWith('Bürgerschaft'),
        ),
        landtage: list.filter(entry =>
          entry.externalName.startsWith('Landtag'),
        ),
        buergerschaften: list.filter(entry =>
          entry.externalName.startsWith('Bürgerschaft'),
        ),
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

  const parliaments: ParliamentsCollectionResult = await customFetch(
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

export async function fetchParliamentById(
  id: number,
): Promise<ParliamentResult> {
  const parliament: ParliamentResult = await customFetch(
    `https://www.abgeordnetenwatch.de/api/v2/parliaments/${id}`,
  );

  return parliament;
}
