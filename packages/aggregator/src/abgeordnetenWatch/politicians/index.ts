import { customFetch, writeFileAndArchive } from '../../utils';

import { join } from 'path';

const basePath = join(__dirname, '..', '..', '..', 'data', 'politicians');

export async function fetchPoliticians(): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);

  const politicians = await customFetch(
    'https://www.abgeordnetenwatch.de/api/v2/politicians',
  );

  await Promise.all([
    writeFileAndArchive(
      today,
      JSON.stringify(politicians, null, 2),
      'source.json',
      basePath,
    ),
  ]);
}
