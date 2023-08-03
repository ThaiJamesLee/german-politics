import { fetchAllPoliticiansFromParliaments } from './fetchContent/fetchPoliticians';
import { fetchParliamentPeriodsAndMandates } from './fetchContent/fetchParliamentPeriod';
import { fetchParliaments } from './fetchContent/fetchParliaments';

async function fetchData(): Promise<void> {
  console.log('Fetch parliament data...');
  await Promise.all([fetchParliaments()]);
  // Depends on parliaments
  await fetchParliamentPeriodsAndMandates();
  console.log('Fetch all politicians in the parliaments...');
  await fetchAllPoliticiansFromParliaments();
}

(async (): Promise<void> => {
  await fetchData();
})();
