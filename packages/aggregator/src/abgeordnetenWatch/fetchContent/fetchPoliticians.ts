import {
  PoliticianCollectionResults,
  PoliticianResult,
} from '../types/politician';
import { customFetch, writeFileAndArchive } from '../../utils';
import { downloadBatch, promiseDelay } from './utils';
import { existsSync, readFileSync } from 'fs';

import { CandidacyMandate } from '../types/mandate';
import { DATA_DIR } from '../constants';
import { join } from 'path';
import { readFile } from 'fs/promises';

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
  politicians: PoliticianCollectionResults,
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
  politicians: PoliticianCollectionResults,
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
  politicians: PoliticianCollectionResults,
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

  const politicians: PoliticianCollectionResults = await customFetch(
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

export async function fetchPoliticanById(
  id: number,
): Promise<PoliticianResult> {
  return await customFetch(
    `https://www.abgeordnetenwatch.de/api/v2/politicians/${id}`,
  );
}

type ParliamentData = {
  parliament: string;
  externalName: string;
  id: number;
};

export async function readCandidacyMandatesLocal(): Promise<
  CandidacyMandate[]
> {
  const parliamentsFile = join(DATA_DIR, 'parliaments', 'parliaments.json');
  if (!existsSync(parliamentsFile)) {
    throw new Error(`Required file "${parliamentsFile}" not found!`);
  }

  const parliaments: {
    other: ParliamentData[];
    buergerschaften: ParliamentData[];
    landtage: ParliamentData[];
  } = JSON.parse(
    readFileSync(parliamentsFile, {
      encoding: 'utf-8',
    }),
  );

  const mandatesDir = join(DATA_DIR, 'parliaments', 'mandates');
  const readMandatesTasks = [];

  for (const parliament of [
    ...parliaments.buergerschaften,
    ...parliaments.landtage,
    ...parliaments.other,
  ]) {
    readMandatesTasks.push([
      parliament.externalName,
      JSON.parse(
        (
          await readFile(
            join(mandatesDir, `Mandates-${parliament.externalName}.json`),
          )
        ).toString('utf-8'),
      ),
    ]);
  }

  const readyTasks = await Promise.all(readMandatesTasks);
  return readyTasks
    .map(([, parliamentMandates]) => parliamentMandates.data)
    .flat();
}

export async function fetchAllPoliticiansFromParliaments(): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const mandates = await readCandidacyMandatesLocal();

  const downloadTasks = [];

  let i = 1;
  for (const mandate of mandates) {
    process.stdout.cursorTo(0);
    process.stdout.clearLine(0);
    process.stdout.write(`Progress: ${i}/${mandates.length}`);
    downloadTasks.push(await fetchPoliticanById(mandate.politician.id));
    promiseDelay(10);
    i++;
  }

  const politicians = downloadTasks;
  await writeFileAndArchive(
    today,
    JSON.stringify(politicians, null, 2),
    'politicians.json',
    join(DATA_DIR, 'politicians'),
  );
}
