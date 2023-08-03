import { ParliamentPeriodResult, ParliamentsCollectionResult } from '../types';
import { customFetch, writeFileAndArchive } from '../../utils';
import { progressString, promiseDelay } from './utils';

import { DATA_DIR } from '../constants';
import { fetchMandatesByParliamentPeriod } from './fetchMandates';
import { join } from 'path';
import { readFile } from 'fs/promises';

async function fetchParliamentPeriod(
  id: number,
): Promise<ParliamentPeriodResult> {
  return await customFetch(
    `https://www.abgeordnetenwatch.de/api/v2/parliament-periods/${id}`,
  );
}

async function readParliamentsLocal(): Promise<ParliamentsCollectionResult> {
  return JSON.parse(
    (
      await readFile(join(DATA_DIR, 'parliaments', 'source.json'), {
        encoding: 'utf-8',
      })
    ).toString(),
  );
}

export async function fetchParliamentPeriodsAndMandates(): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const parliaments: ParliamentsCollectionResult = await readParliamentsLocal();
  const directory = join(DATA_DIR, 'parliaments');

  const downloadTasks = [];
  let i = 1;
  for (const parliament of parliaments.data) {
    downloadTasks.push(
      writeFileAndArchive(
        today,
        JSON.stringify(
          await fetchParliamentPeriod(parliament.current_project.id),
          null,
          2,
        ),
        `${parliament.label_external_long}.json`,
        directory,
      ),
    );

    downloadTasks.push(
      writeFileAndArchive(
        today,
        JSON.stringify(
          await fetchMandatesByParliamentPeriod(parliament.current_project.id),
          null,
          2,
        ),
        `Mandates-${parliament.label_external_long}.json`,
        join(directory, 'mandates'),
      ),
    );
    await promiseDelay(10);
    process.stdout.cursorTo(0);
    process.stdout.clearLine(0);
    process.stdout.write(progressString(i, parliaments.data.length));
    i++;
  }

  await Promise.all(downloadTasks);
}
