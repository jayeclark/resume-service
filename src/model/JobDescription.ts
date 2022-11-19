export enum Industry {
  Finance,
  Healthcare
}

export interface Skill {
  name: string;
  minYoE: number;
  importance: 0 | 1 | 2 | 3;
}

interface JobDescription extends Record<string, string | Industry | string[] | string[][] | Skill[] | [string, number][]> {
  company: string;
  industry: Industry;
  position: string;
  required: string[] | string[][] | [string, number][];
  preferred: string[] | string[][] | [string, number][];
  role: string[] | string[][] | [string, number][];
  culture: string[] | string[][];
  skills: Skill[];
}

export interface RawJobDescription extends JobDescription {
  required: string[];
  preferred: string[];
  role: string[];
  culture: string[];
}

export interface ProcessedJobDescription extends JobDescription {
  required: string[];
  preferred: string[];
  role: string[];
  culture: string[];
}

export interface JobDescriptionWeightingRules extends Record<string, number> {
  required: number;
  preferred: number;
  role: number;
  culture: number;
  skills: number;
}