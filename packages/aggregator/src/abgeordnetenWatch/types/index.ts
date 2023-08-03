import { Parliament, ParliamentPeriod } from './parliament';

import { Metadata } from './metadata';

export interface ParliamentsCollectionResult {
  meta: Metadata;
  data: Parliament[];
}

export interface ParliamentResult {
  meta: Metadata;
  data: Parliament;
}

export interface ParliamentPeriodCollectionResult {
  meta: Metadata;
  data: ParliamentPeriod[];
}

export interface ParliamentPeriodResult {
  meta: Metadata;
  data: ParliamentPeriod;
}
