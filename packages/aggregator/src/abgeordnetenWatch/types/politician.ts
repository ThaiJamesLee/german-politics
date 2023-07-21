import { BaseObject } from './base';
import { PartyLink } from './party';

export interface Politician extends BaseObject {
  first_name: string;
  last_name: string;
  birth_name: string | null;
  sex: string;
  year_of_birth: string;
  party: PartyLink;
}
