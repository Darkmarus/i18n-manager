
export interface IProperty {
  path: string[];
  value: any;
}

export interface IPagination {
  data: IProperty[];
  page: number;
  size: number;
  total: number;
}
