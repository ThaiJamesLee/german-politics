import { DATA_DIR, METRICS_DIR } from '../constants';

import { PoliticianResult } from '../types/politician';
import { join } from 'path';
import { readDataFile } from './utils';
import { writeFileAndArchive } from '../../utils';

async function readPoliticians(
  file = join(DATA_DIR, 'politicians', 'politicians.json'),
): Promise<PoliticianResult[]> {
  return readDataFile(file);
}

async function readPoliticiansByParliament(
  file = join(METRICS_DIR, 'politiciansByParliament.json'),
): Promise<{ [key: string]: number[] }> {
  return readDataFile(file);
}

export type PartiesByParliament = {
  // Parliament
  [key: string]: {
    // Party and number of members
    party: string;
    members: number;
  }[];
};

async function getPartiesByParliament(): Promise<PartiesByParliament> {
  const politicians = await readPoliticians();
  const politiciansByParliament = await readPoliticiansByParliament();
  const metric: PartiesByParliament = {};
  const errors: string[] = [];

  for (const [parliament, politicanIds] of Object.entries(
    politiciansByParliament,
  )) {
    const membersByParty: {
      [key: string]: {
        party: string;
        members: number;
      };
    } = {};

    for (const id of politicanIds) {
      const politician = politicians.find(
        politician => politician.data.id == id,
      );

      if (!politician) {
        errors.push(
          `Could not find politician with the id "${id}" in "${parliament}"`,
        );
        continue;
      }

      const party = politician.data.party.label;
      if (!membersByParty[party]) {
        membersByParty[party] = {
          party,
          members: 0,
        };
      }

      membersByParty[party].members += 1;
    }

    metric[parliament] = Object.values(membersByParty);
  }

  if (errors.length) {
    console.log(errors.join('\n'));
  }

  return metric;
}

export async function createPartiesByParliamentsMetrics(
  today: string,
): Promise<void> {
  const metric = await getPartiesByParliament();
  await writeFileAndArchive(
    today,
    JSON.stringify(metric, null, 2),
    'partiesByParliaments.json',
    METRICS_DIR,
  );
}
