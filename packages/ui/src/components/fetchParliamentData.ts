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
