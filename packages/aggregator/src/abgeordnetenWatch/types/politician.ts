import { BaseObject } from './base';
import { EntityTypeEnum } from './entity';
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

export interface PoliticianCollectionResults {
  meta: Metadata;
  data: Politician[];
}

export interface PoliticianResult {
  meta: Metadata;
  data: Politician;
}

export interface PoliticianLink extends BaseObject {
  entity_type: EntityTypeEnum.politician;
}
