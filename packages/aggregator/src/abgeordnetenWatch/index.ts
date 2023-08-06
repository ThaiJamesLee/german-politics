import { createMetrics } from './metrics';
import { fetchData } from './fetchContent';

(async (): Promise<void> => {
  await fetchData();
  await createMetrics();
})();
