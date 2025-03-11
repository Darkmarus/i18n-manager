export interface IProperty {
  id: number;
  path: string[];
  value: any;
  status: 'CREATED' | 'MODIFIED' | 'DELETED' | null;
}

export interface IPagination {
  data: IProperty[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}
