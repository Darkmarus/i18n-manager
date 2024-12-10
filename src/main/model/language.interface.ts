import type { IProperty } from "./pagination.interface";

export interface Language {
  filename: string;
  name: string;
  fsPath: string;
  data: any;
  flatten: IProperty[];
}
