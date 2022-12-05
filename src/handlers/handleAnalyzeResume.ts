import { removeStopwords, eng } from "stopword";
import { Item, RankedItem, ItemVariantObject, RankedItemVariantObject, BulletPoint } from "../model/Resume/Item";
import { Resume } from "../model/Resume/Resume";
import { ResumeSectionEntries, ItemCategory, RankedItemCategory, RankedSectionEntry, SectionEntry } from "../model/Resume/ResumeSectionEntry";
import { KeywordsMap } from "../model/Keywords";
import { ResumeSection } from "../model/Resume/ResumeSection";

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
    const newSections: ResumeSection[] = this.resume.sections.map((section) => {
      const rankedContent = this.getSectionContentAnalysis(section.content);
      const totalScore = this.tallySectionEntryScores(rankedContent);
      return {
        ...section,
        content: rankedContent,
        sumOfTotalScores: totalScore,
        averageOfTotalScores: totalScore / rankedContent.length
      }
    })

    this.processedResume = {
      ...this.resume,
      sections: newSections
    }
    return this.processedResume;
  }

  getSectionContentAnalysis(content: ResumeSectionEntries) {
    return content.map(this.getSectionEntryAnalysis) as ResumeSectionEntries;
  }


  getSectionEntryAnalysis(sectionEntry: SectionEntry) {
    const processedSectionEntry = this.convertItemToRankedItem(sectionEntry) as RankedSectionEntry;
    
    const categoryRankTally = this.tallySectionEntryItemRankings(processedSectionEntry);
    const rankedSectionEntry: RankedSectionEntry = {
      ...processedSectionEntry,
      overallScore: categoryRankTally.overallScore,
      rankingStrategy: categoryRankTally.rankingStrategy
    }
    return rankedSectionEntry;
  }

  private convertItemsToRankedItems(items: BulletPoint[] | ItemCategory[]) {
    return items.map((item) => this.convertItemToRankedItem(item))
        .sort(this.rankingPolicy === 'totalRank' ? sortInDescendingOrderOfBestRankingVariantTotalPoints : sortInDescendingOrderOfBestRankingVariantAveragePoints);
  }

  private convertItemToRankedItem(item: Item): RankedItem {

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


  private tallySectionEntryScores(content: ResumeSectionEntries) {
    return content
      .map((item: RankedSectionEntry) => item.overallScore)
      .reduce((a, b) => a + b);
  }

  private tallySectionEntryItemRankings(sectionEntry: SectionEntry): { overallScore: number, rankingStrategy: "totalRank" | "averageRank" } {
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
      overallScore: this.rankingPolicy === 'totalRank' ? totalRank : totalRank / rankEntries,
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