import { BaseObject } from './base';
import { Metadata } from './metadata';
import { PartyLink } from './party';

export interface Politician extends BaseObject {
  first_name: string;
  last_name: string;
  birth_name: string | null;
  sex: string;
  year_of_birth: number | null;
  party: PartyLink;
  education: string | null;
  residence: string;
  occupation: string;
  statistic_questions: number | null;
  statistic_questions_answered: number | null;
  ext_id_bundestagsverwaltung: string | null;
}

export interface PoliticianResults {
  meta: Metadata;
  data: Politician[];
}
