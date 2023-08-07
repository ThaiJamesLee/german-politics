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

export type Politician = {
  meta: unknown;
  data: {
    id: number;
    label: string;
    sex: string;
    year_of_birth: number;
    party: {
      id: number;
      label: string;
    };
    first_name: string;
    last_name: string;
    qid_wikidata: string | null;
    abgeordnetenwatch_url: string;
  };
};

export async function fetchAllPoliticians(): Promise<Politician[]> {
  return customFetch("/data/politicians/politicians.json");
}
