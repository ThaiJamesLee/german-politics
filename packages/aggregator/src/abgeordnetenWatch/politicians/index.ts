import { customFetch, writeFileAndArchive } from '../../utils';

import { PoliticianResults } from '../types/politician';
import { join } from 'path';

const basePath = join(__dirname, '..', '..', '..', 'data', 'politicians');

function sanitizeOccupation(occupation: string): string {
  if (!occupation) {
    return 'unknown';
  }
  if (occupation.startsWith('Student')) {
    return 'Student';
  }
  if (occupation.startsWith('Steuerfachangestellt')) {
    return 'Steuerfachangestellt';
  }

  return occupation;
}

function sanitizeEducation(education: string | null): string {
  if (!education) {
    return 'unknown';
  }
  if (education.startsWith('Rechtsanw')) {
    return 'Rechtsanwalt';
  }

  return education;
}

async function aggregateByEducation(
  today: string,
  politicians: PoliticianResults,
): Promise<void> {
  const aggregate: { [key: string]: number[] } = {};

  for (const politician of politicians.data) {
    const key = sanitizeEducation(politician.education);
    if (!aggregate[key]) {
      aggregate[key] = [];
    }
    aggregate[key].push(politician.id);
  }

  await writeFileAndArchive(
    today,
    JSON.stringify(aggregate, null, 2),
    'politiciansByEducation.json',
    basePath,
  );
}

async function aggregateByOccupation(
  today: string,
  politicians: PoliticianResults,
): Promise<void> {
  const aggregate: { [key: string]: number[] } = {};

  for (const politician of politicians.data) {
    const key = sanitizeOccupation(politician.occupation);
    if (!aggregate[key]) {
      aggregate[key] = [];
    }
    aggregate[key].push(politician.id);
  }

  await writeFileAndArchive(
    today,
    JSON.stringify(aggregate, null, 2),
    'politiciansByOccupation.json',
    basePath,
  );
}

async function aggregateByParty(
  today: string,
  politicians: PoliticianResults,
): Promise<void> {
  const aggregate: {
    [key: string]: { politicianId: number; partyId: number }[];
  } = {};

  for (const politician of politicians.data) {
    const key = politician.party.label;
    if (!aggregate[key]) {
      aggregate[key] = [];
    }
    aggregate[key].push({
      politicianId: politician.id,
      partyId: politician.party.id,
    });
  }

  await writeFileAndArchive(
    today,
    JSON.stringify(aggregate, null, 2),
    'politiciansByParty.json',
    basePath,
  );
}

export async function fetchPoliticians(): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);

  const politicians: PoliticianResults = await customFetch(
    'https://www.abgeordnetenwatch.de/api/v2/politicians',
  );

  await Promise.all([
    writeFileAndArchive(
      today,
      JSON.stringify(politicians, null, 2),
      'source.json',
      basePath,
    ),
    aggregateByOccupation(today, politicians),
    aggregateByEducation(today, politicians),
    aggregateByParty(today, politicians),
  ]);
}
