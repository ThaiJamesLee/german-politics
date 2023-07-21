import { Metadata } from './metadata';
import { Parliament } from './parliament';

export interface ParliamentResult {
  meta: Metadata;
  data: Parliament[];
}
