import { Industry } from "../JobDescription";

export interface Item {
  id: string;
  variants: (ItemVariantObject | string)[] | RankedItemVariantObject[]
  bestRankingVariantIndex?: number;
  excludeConditions?: Conditions;
  includeConditions?: Conditions;
}

interface Conditions {
  companies: string[],
  roles: string[],
  peerBulletPoints: id[]
}

// TODO: Add id string patterns
type id = string;

export interface ItemVariantObject extends Record<string, any>{
  variant: string;
  keywords?: string[];
  industries?: Industry[]
  excludeConditions?: Conditions;
  includeConditions?: Conditions;
  totalRank?: number
  averageRank?: number
}

export interface RankedItemVariantObject extends ItemVariantObject {
  totalRank: number
  averageRank: number
}

export interface RankedItem extends Item {
  variants: RankedItemVariantObject[];
  bestRankingVariantIndex: number;
}

export interface CategoryOptions {
  itemCategory?: [number, string];
  itemCategoryDisplayRequired: boolean;
}

export type BulletPoint = Item & CategoryOptions;
export type RankedBulletPoint = RankedItem & CategoryOptions;
