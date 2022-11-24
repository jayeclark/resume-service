import { Item, AccomplishmentCategory } from "./Resume";

export interface SectionElement extends Item {
  entity: string;
  role: string;
  start: Date | null;
  end: Date | null;
  accomplishments: AccomplishmentCategory[] | null
}

export interface RankedSectionElement extends SectionElement {
  bestRankingVariantIndex: number;
  overallRank: number
  rankingStrategy: "totalRank" | "averageRank"
}

export interface Job extends SectionElement {}
export interface Project extends SectionElement {}
export interface Degree extends SectionElement {}
export interface Skill extends SectionElement {
  category: 'skill';
  yoe: number;
}
export interface Certification extends SectionElement {
  category: 'certification',
  expires?: Date
}
export type Experience = Job[]
export type SkillsAndCertifications = (Skill | Certification)[]
export type Projects = Project[]
export type Education = Degree[]
export type ResumeSectionEntries = Experience | Education | SkillsAndCertifications | Projects;
