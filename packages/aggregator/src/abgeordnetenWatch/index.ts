import { fetchParliaments } from './parliaments';
import { fetchPoliticians } from './politicians';

(async (): Promise<void> => {
  await Promise.all([fetchParliaments(), fetchPoliticians()]);
})();
