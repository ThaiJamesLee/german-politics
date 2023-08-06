import { DATA_DIR, METRICS_DIR } from '../constants';

import { CandidacyMandateCollectionResults } from '../types/mandate';
import { existsSync } from 'fs';
import { join } from 'path';
import { progressString } from '../fetchContent/utils';
import { readDataFile } from './utils';
import { readFile } from 'fs/promises';
import { writeFileAndArchive } from '../../utils';

type ParliamentInfo = {
  name: string;
  externalName: string;
  id: number;
};

type Parliaments = {
  landtage: ParliamentInfo[];
  buergerschaften: ParliamentInfo[];
  other: ParliamentInfo[];
};

async function readParliaments(
  file = join(DATA_DIR, 'parliaments', 'parliaments.json'),
): Promise<Parliaments> {
  return readDataFile(file);
}

async function getPoliticiansByParliament(
  mandateDir = join(DATA_DIR, 'parliaments', 'mandates'),
): Promise<{ [key: string]: number[] }> {
  const parliaments = await readParliaments();
  const parliamentPoliticianMap: { [key: string]: number[] } = {};
  const flattenedParliaments = [
    ...parliaments.buergerschaften.map(entry => entry.externalName),
    ...parliaments.landtage.map(entry => entry.externalName),
    ...parliaments.other.map(entry => entry.externalName),
  ];

  let i = 1;
  for (const parliament of flattenedParliaments) {
    process.stdout.cursorTo(0);
    process.stdout.clearLine(0);
    process.stdout.write(progressString(i, flattenedParliaments.length));

    parliamentPoliticianMap[parliament] = [];

    const mandates: CandidacyMandateCollectionResults = await readDataFile(
      join(mandateDir, `Mandates-${parliament}.json`),
    );

    for (const mandate of mandates.data) {
      parliamentPoliticianMap[parliament].push(mandate.politician.id);
    }
    i++;
  }

  return parliamentPoliticianMap;
}

export async function createPoliticiansByParliamentMetric(
  today: string,
): Promise<void> {
  const politiciansByParliamentMap = await getPoliticiansByParliament();

  await writeFileAndArchive(
    today,
    JSON.stringify(politiciansByParliamentMap, null, 2),
    'politiciansByParliament.json',
    METRICS_DIR,
  );
}
