import { removeStopwords, eng } from "stopword";
import { Item, RankedItem, ItemVariantObject, RankedItemVariantObject, BulletPoint } from "../model/Resume/Item";
import { Resume } from "../model/Resume/Resume";
import { ResumeSectionEntries, ItemCategory, RankedItemCategory, RankedSectionEntry, SectionEntry } from "../model/Resume/ResumeSectionEntry";
import { KeywordsMap } from "../model/Keywords";

export class HandleAnalyzeResume {
  private resume: Resume;
  private processedResume: Resume;
  private keywordsMap: KeywordsMap;
  private rankingPolicy: 'totalRank' | 'averageRank' = "totalRank"

  constructor(resume: Resume, keywordsMap: KeywordsMap, rankingPolicy?: 'totalRank' | 'averageRank') {
    this.resume = resume;
    this.keywordsMap = keywordsMap;
    if (rankingPolicy) { this.rankingPolicy = rankingPolicy };
  }

  getResumeAnalysis(): Resume {
    const newSections = this.resume.sections.map((section) => {
      return {
        ...section,
        content: this.getSectionAnalysis(section.content)
      }
    })
    this.processedResume = {
      ...this.resume,
      sections: newSections
    }
    return this.processedResume;
  }

  getSectionAnalysis(content: ResumeSectionEntries) {
    return content.map(this.getSectionEntryAnalysis) as ResumeSectionEntries;
  }

  getSectionEntryAnalysis(sectionEntry: SectionEntry) {
    const rankedSectionEntry = this.convertItemToRankedItem(sectionEntry);
    console.log(rankedSectionEntry)
    //const rankedElement: SectionEntry = this.convertItemToRankedItem(sectionEntry) as SectionEntry;
    //const accomplishmentRankTally = this.tallySectionEntryRankings(rankedElement);
    //const rankedSectionEntry: RankedSectionEntry = {
    //  ...rankedElement as RankedSectionEntry,
    //  overallRank: accomplishmentRankTally.overallRank,
    //  rankingStrategy: accomplishmentRankTally.rankingStrategy
    //}
    return rankedSectionEntry;
  }

  private convertItemsToRankedItems(items: BulletPoint[] | ItemCategory[]) {
    return items.map((item) => this.convertItemToRankedItem(item))
        .sort(this.rankingPolicy === 'totalRank' ? sortInDescendingOrderOfBestRankingVariantTotalPoints : sortInDescendingOrderOfBestRankingVariantAveragePoints);
  }

  convertItemToRankedItem(item: Item): RankedItem {

    const rankedItemVariants = this.rankItemVariants(item.variants);
    const bestRankingVariantIndex = this.getBestRankingItemVariantIndex(rankedItemVariants);

    const rankedItem: RankedItem = {
      ...item,
      variants: rankedItemVariants,
      bestRankingVariantIndex
    }

    if ("items" in rankedItem) {
      rankedItem.items = this.convertItemsToRankedItems(rankedItem.items as BulletPoint[]);
    }
    if ("itemCategories" in rankedItem) {
      rankedItem.itemCategories = this.convertItemsToRankedItems(rankedItem.itemCategories as ItemCategory[]);
    }

    return rankedItem;
  }

  private rankItemVariants(itemVariants: (ItemVariantObject | RankedItemVariantObject | string)[]) {
    return itemVariants.map((variant) => this.convertItemVariantToRankedItemVariant(variant));
  }

  private getBestRankingItemVariantIndex(itemVariants: RankedItemVariantObject[]) {
    let bestRankingVariants: number[] = [];
    let bestRankingVariantPoints = 0;

    itemVariants.map((variantObject, index) => {
      if (variantObject[this.rankingPolicy] === bestRankingVariantPoints) {
        bestRankingVariants.push(index);
      }
      if (variantObject[this.rankingPolicy] > bestRankingVariantPoints) {
        bestRankingVariantPoints = variantObject[this.rankingPolicy];
        bestRankingVariants = [index]
      } 
    })

    let bestRankingVariantIndex = bestRankingVariants[0];
    if (bestRankingVariants.length > 1) {
      let variantLength = 10000000;
      bestRankingVariants.forEach((idx) => {
        if (itemVariants[idx].variant.length < variantLength) {
          bestRankingVariantIndex = idx;
          variantLength = itemVariants[idx].variant.length;
        }
      })
    }
    return bestRankingVariantIndex;
  }

  private convertItemVariantToRankedItemVariant(variant: ItemVariantObject | string): RankedItemVariantObject {
    const variantObject = typeof variant === 'string' ? { variant } : variant;
    const optionContentKeywordArray = removeStopwords(variantObject.variant.split(' ').map((word) => word.toLowerCase()), eng);
    let totalPoints = 0;
    let matchedWords = 0;

    optionContentKeywordArray.forEach((word: string) => {
      if (word in this.keywordsMap) {
        totalPoints += this.keywordsMap[word].totalWeight;
        matchedWords += 1;
      }
    })
    const rankedItemOption: RankedItemVariantObject = {
      ...variantObject,
      totalRank: totalPoints,
      averageRank: totalPoints > 0 ? totalPoints / matchedWords : 0
    }
    return rankedItemOption;
  }

  tallySectionEntryRankings(sectionEntry: SectionEntry): { overallRank: number, rankingStrategy: "totalRank" | "averageRank" } {
    let totalRank = 0;
    let rankEntries = 0;
    sectionEntry.itemCategories.forEach((itemCategory: RankedItemCategory) => {
      const bestRankingCategoryVariantIndex = itemCategory.bestRankingVariantIndex;
      totalRank += itemCategory.variants[bestRankingCategoryVariantIndex][this.rankingPolicy];
      rankEntries += 1;
    })
    sectionEntry.items.forEach((item: RankedItem) => {
      const index = item.bestRankingVariantIndex;
      totalRank += item.variants[index][this.rankingPolicy]
      rankEntries += 1;
    }) 
    return {
      overallRank: this.rankingPolicy === 'totalRank' ? totalRank : totalRank / rankEntries,
      rankingStrategy: this.rankingPolicy
    }
  }
}

function sortInDescendingOrderOfBestRankingVariantTotalPoints(a: RankedItem, b: RankedItem) {
  const [aBestVariant, bBestVariant] = [a.bestRankingVariantIndex, b.bestRankingVariantIndex]
  const [aVariants, bVariants] = [a.variants as RankedItemVariantObject[], b.variants as RankedItemVariantObject[]];
  return bVariants[bBestVariant].totalRank - aVariants[aBestVariant].totalRank
}

function sortInDescendingOrderOfBestRankingVariantAveragePoints(a: RankedItem, b: RankedItem) {
  const [aBestVariant, bBestVariant] = [a.bestRankingVariantIndex, b.bestRankingVariantIndex]
  const [aVariants, bVariants] = [a.variants as RankedItemVariantObject[], b.variants as RankedItemVariantObject[]];
  return bVariants[bBestVariant].averageRank - aVariants[aBestVariant].averageRank
}