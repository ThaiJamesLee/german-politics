import { fetchAllPoliticiansFromParliaments } from './fetchPoliticians';
import { fetchParliamentPeriodsAndMandates } from './fetchParliamentPeriod';
import { fetchParliaments } from './fetchParliaments';

export async function fetchData(): Promise<void> {
  console.log('Fetch parliament data...');
  await Promise.all([fetchParliaments()]);
  // Depends on parliaments
  await fetchParliamentPeriodsAndMandates();
  console.log('Fetch all politicians in the parliaments...');
  await fetchAllPoliticiansFromParliaments();
}
