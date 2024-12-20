export interface IBasicFilterAndPaginationEvent {
  filter: string[];
  page: number;
  size: number;
  modeOrderStrict: boolean;
}
