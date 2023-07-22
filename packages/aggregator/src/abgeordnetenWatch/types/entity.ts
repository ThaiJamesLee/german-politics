export enum EntityTypeEnum {
  parliamentPeriod = 'parliament_period',
  parliament = 'parliament',
  mandate = 'mandate',
  politician = 'politician',
  electoralData = 'electoral_data',
  fractionMembership = 'fraction_membership',
  candidacyMandate = 'candidacy_mandate',
}

export type EntityType = typeof EntityTypeEnum;
