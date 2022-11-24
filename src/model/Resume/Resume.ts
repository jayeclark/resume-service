import { Industry } from "../JobDescription";
import { ResumeSection } from "./ResumeSection";

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