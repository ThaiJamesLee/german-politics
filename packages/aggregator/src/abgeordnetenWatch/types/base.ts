interface Identifiable {
  id: number;
}

export interface BaseObject extends Identifiable {
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
}
