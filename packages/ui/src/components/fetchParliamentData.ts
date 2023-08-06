import { customFetch } from "../utils/fetchData";

type Parliament = {
  id: number;
  externalName: string;
  parliament: string;
};

type Parliaments = {
  other: Parliament[];
  landtage: Parliament[];
  buergerschaften: Parliament[];
};

export async function fetchParliaments(): Promise<Parliaments> {
  return customFetch<Parliaments>("/data/parliaments/parliaments.json");
}

export async function fetchPoliticiansByParliaments(): Promise<{
  [key: string]: number[];
}> {
  return customFetch("/data/metrics/politiciansByParliament.json");
}

export type PartiesByParliament = {
  // Parliament
  [key: string]: {
    // Party and number of members
    party: string;
    members: number;
  }[];
};

export async function fetchPartiesByParliament(): Promise<PartiesByParliament> {
  return customFetch("/data/metrics/partiesByParliaments.json");
}
