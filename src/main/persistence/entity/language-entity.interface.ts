export interface LanguageEntity {
  id?: number;
  data: string;
  lang: string;
  status?: "CREATED" | "MODIFIED" | "DELETED";
}
