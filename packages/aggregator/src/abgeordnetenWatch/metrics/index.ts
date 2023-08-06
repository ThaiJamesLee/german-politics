import { createPartiesByParliamentsMetrics } from './partiesByParliament';
import { createPoliticiansByParliamentMetric } from './politiciansByParliament';

export async function createMetrics(): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  await createPoliticiansByParliamentMetric(today);
  await createPartiesByParliamentsMetrics(today);
}
