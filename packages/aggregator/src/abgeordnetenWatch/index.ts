import { fetchParliaments } from './parliaments';

(async (): Promise<void> => {
  await fetchParliaments();
})();
