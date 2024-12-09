export type SectionType = "EDITOR" | "CHANGES" | "SETTINGS";
export type Section = {
  type: SectionType;
  label: string;
  component: any;
};
