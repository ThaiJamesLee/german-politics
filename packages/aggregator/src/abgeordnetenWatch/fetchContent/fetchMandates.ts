import { CandidacyMandateCollectionResults } from '../types/mandate';
import { customFetch } from '../../utils';

export async function fetchMandatesByParliamentPeriod(
  id: number,
): Promise<CandidacyMandateCollectionResults> {
  return await customFetch(
    `https://www.abgeordnetenwatch.de/api/v2/candidacies-mandates?parliament_period=${id}`,
  );
}
