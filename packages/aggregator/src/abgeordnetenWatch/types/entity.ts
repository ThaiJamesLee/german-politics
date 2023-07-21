export enum EntityTypeEnum {
  parliamentPeriod = 'parliament_period',
  parliament = 'parliament',
  mandate = 'mandate',
  politician = 'politician',
}

export type EntityType = typeof EntityTypeEnum;
