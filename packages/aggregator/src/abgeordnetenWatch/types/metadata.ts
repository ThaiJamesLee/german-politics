interface ApiInformation {
  version: string;
  changelog: string;
  license: string;
  licence_link: string;
  documentation: string;
}

interface Result {
  count: number;
  total: number;
  range_start: number;
  range_end: number;
}

export interface Metadata {
  abgeordnetenwatch_api: ApiInformation;
  status: string;
  status_message: string;
  result: Result;
}
