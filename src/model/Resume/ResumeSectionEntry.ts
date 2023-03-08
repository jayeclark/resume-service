import { Item, BulletPoint, RankedBulletPoint, RankedItem } from "./Item";

export interface ItemCategory extends Item { }
export interface RankedItemCategory extends RankedItem { }

export interface SectionEntry extends Item {
  entity: string;
  start: Date | null;
  end: Date | null;
  items: BulletPoint[] | RankedBulletPoint[];
  itemCategories?: ItemCategory[] | RankedItemCategory[];
}

export interface RankedSectionEntry extends SectionEntry {
  bestRankingVariantIndex: number;
  overallScore: number
}

export interface Job extends SectionEntry {
  role: string,
}
export interface RankedJob extends RankedSectionEntry { }

export interface Project extends SectionEntry { }
export interface RankedProject extends RankedSectionEntry{ }

export interface Degree extends SectionEntry { }
export interface RankedDegree extends RankedSectionEntry { }
export interface Skill extends SectionEntry {
  category: 'skill';
  yoe: number;
}
export interface RankedSkill extends RankedSectionEntry { }
export interface Certification extends SectionEntry {
  category: 'certification',
  expires?: Date
}
export interface RankedCertification extends RankedSectionEntry { }


export type Experience = (Job | RankedJob)[]
export type SkillsAndCertifications = (Skill | Certification | RankedSkill | RankedCertification)[]
export type Projects = (Project | RankedProject)[]
export type Education = (Degree | RankedDegree)[]
export type ResumeSectionEntries = Experience | Education | SkillsAndCertifications | Projects;
