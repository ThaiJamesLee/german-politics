import { BaseObject } from './base';
import { EntityTypeEnum } from './entity';
import { Metadata } from './metadata';
import { ParliamentPeriodLink } from './parliament';
import { PoliticianLink } from './politician';

type NullableString = string | null;

export interface ConsituencyLink extends BaseObject {
  entity_type: EntityTypeEnum.constituency;
}

export interface ElectoralData extends BaseObject {
  entity_type: EntityTypeEnum.electoralData;
  list_position: unknown;
  constituency_result: unknown;
  constituency_result_count: unknown;
  mandate_won: NullableString;
}

export interface FractionLink extends BaseObject {
  entity_type: EntityTypeEnum.fraction;
}

export interface FractionMembership extends BaseObject {
  entity_type: EntityTypeEnum.fractionMembership;
  fraction: FractionLink;
  valid_from: NullableString;
  valid_until: NullableString;
}

export interface CandidacyMandate extends BaseObject {
  type: EntityTypeEnum.mandate;
  entity_type: EntityTypeEnum.candidacyMandate;
  id_external_administration: NullableString;
  id_external_administration_description: NullableString;
  parliament_period: ParliamentPeriodLink;
  politician: PoliticianLink;
  start_date: NullableString;
  end_date: NullableString;
  info: NullableString;
  electoral_data: ElectoralData;
  fraction_membership: FractionMembership[];
}

export interface CandidacyMandateCollectionResults {
  meta: Metadata;
  data: CandidacyMandate[];
}
