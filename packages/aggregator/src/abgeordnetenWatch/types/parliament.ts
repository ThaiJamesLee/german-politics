import { EntityTypeEnum } from './entity';

interface Identifiable {
  id: number;
}

interface BaseObject extends Identifiable {
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
}

type ParliamentPeriodLink = BaseObject & {
  entity_type: EntityTypeEnum.parliamentPeriod;
};

export interface ParliamentPeriod extends BaseObject {
  entity_type: EntityTypeEnum.parliamentPeriod;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  parliament: Parliament;
  previous_period?: ParliamentPeriodLink;
  type: string;
  election_date: string | undefined;
  start_date_period: string;
  end_date_period: string;
}

export interface Parliament extends BaseObject {
  entity_type: EntityTypeEnum.parliament;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  label_external_long: string;
  current_project: ParliamentPeriodLink;
}
