import { Industry } from "../JobDescription";

// TODO: Add id string patterns
type id = string;

interface Conditions {
  companies: string[],
  roles: string[],
  peerBulletPoints: id[]
}

export interface ItemVariant extends Record<string, any>{
  variant: string;
  keywords?: string[];
  industries?: Industry[]
  excludeConditions?: Conditions;
  includeConditions?: Conditions;
  totalRank?: number
  averageRank?: number
}

export interface RankedItemVariant extends ItemVariant {
  totalRank: number
  averageRank: number
}

export interface Item {
  id: string;
  variants: ItemVariant[] | RankedItemVariant[]
  bestRankingVariantIndex?: number
  items?: Item[] | RankedItem[]
}

export interface RankedItem extends Item {
  bestRankingVariantIndex: number;
  bestRankingVariantPoints: number;
}

export interface BulletPoint extends Item {}

export interface ItemWithConditions extends Item {
  excludeConditions?: Conditions
  includeConditions?: Conditions
}


export interface AccomplishmentCategory extends ItemWithConditions {
  items: BulletPoint[]
}

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



export enum ExternalLinks {
  GitHub,
  LinkedIn,
  Portfolio
}

interface ContactInfo {
  genderNeutralName: string;
  name: string;
  phone: string;
  location: string;
  links: [{
    name: ExternalLinks;
    url: string;
  }]
}

export interface Resume {
  interactive: boolean
  metadata: {
    companyName: string;
    position: string;
    applicationDate: Date;
    fit: number;
    description: string;
  }
  contact: ContactInfo
  objective: string
  sections: ResumeSection[]
}