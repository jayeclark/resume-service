import { removeStopwords, eng } from "stopword";
import { AccomplishmentCategory, Item, ItemVariant, RankedItem, RankedItemVariant, Resume } from "../model/Resume/Resume";
import { ResumeSectionEntries, RankedSectionEntry, SectionEntry } from "../model/Resume/ResumeSectionEntry";
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
    return content.map(this.getSectionEntryAnalysis);
  }

  getSectionEntryAnalysis(sectionEntry: SectionEntry) {
    const rankedSectionEntry = this.convertSectionEntryAccomplishmentsToRankedAccomplishments(sectionEntry);
    console.log(rankedSectionEntry);
    //const rankedElement: SectionEntry = this.convertItemToRankedItem(sectionEntry) as SectionEntry;
    //const accomplishmentRankTally = this.tallySectionEntryRankings(rankedElement);
    //const rankedSectionEntry: RankedSectionEntry = {
    //  ...rankedElement as RankedSectionEntry,
    //  overallRank: accomplishmentRankTally.overallRank,
    //  rankingStrategy: accomplishmentRankTally.rankingStrategy
    //}
    return rankedSectionEntry;
  }

  convertSectionEntryAccomplishmentsToRankedAccomplishments(sectionEntry: SectionEntry) {
    return {
      ...sectionEntry,
      accomplishments: sectionEntry.accomplishments.map((item: Item, i: number) => {
        const converted = this.convertItemToRankedItem(item);
        return converted;
      })
    }
  }

  convertItemToRankedItem(item: Item): RankedItem {
    let bestRankingVariantIndex = -1;
    let bestRankingVariantPoints = 0;

    const rankedItemVariants = item.variants.map((variant, index) => {
      const rankedItemVariant: RankedItemVariant = this.convertItemVariantToRankedItemVariant(variant);
      if (rankedItemVariant[this.rankingPolicy] >= bestRankingVariantPoints) {
        bestRankingVariantPoints = rankedItemVariant[this.rankingPolicy];
        bestRankingVariantIndex = index;
      }
      return rankedItemVariant;
    });

    const rankedItem: RankedItem = {
      ...item,
      variants: rankedItemVariants,
      bestRankingVariantIndex,
      bestRankingVariantPoints
    }
    if ("items" in rankedItem) {
      rankedItem.items = rankedItem.items.map((item) => {
        const converted = this.convertItemToRankedItem(item)
        return converted
      }).sort((a, b) => b.bestRankingVariantPoints - a.bestRankingVariantPoints);
    }
    if ("accomplishments" in rankedItem) {
      rankedItem.accomplishments = (rankedItem.accomplishments as AccomplishmentCategory[])
        .map(this.convertItemToRankedItem)
        .sort((a,b) => b.bestRankingVariantPoints - a.bestRankingVariantPoints );
    }
    return rankedItem;
  }

  private convertItemVariantToRankedItemVariant(itemOption: ItemVariant): RankedItemVariant {
    const optionContentKeywordArray = removeStopwords(itemOption.variant.split(' ').map((word) => word.toLowerCase()), eng);
    let totalPoints = 0;
    let matchedWords = 0;

    optionContentKeywordArray.forEach((word: string) => {
      if (word in this.keywordsMap) {
        totalPoints += this.keywordsMap[word].totalWeight;
        matchedWords += 1;
      }
    })
    const rankedItemOption: RankedItemVariant = {
      ...itemOption,
      totalRank: totalPoints,
      averageRank: totalPoints > 0 ? totalPoints / matchedWords : 0
    }
    return rankedItemOption;
  }

  tallySectionEntryRankings(sectionEntry: SectionEntry): { overallRank: number, rankingStrategy: "totalRank" | "averageRank" } {
    let totalRank = 0;
    let rankEntries = 0;
    sectionEntry.accomplishments.forEach((accomplishmentCategory: AccomplishmentCategory) => {
      const bestRankingCategoryVariantIndex = accomplishmentCategory.bestRankingVariantIndex;
      totalRank += accomplishmentCategory.variants[bestRankingCategoryVariantIndex][this.rankingPolicy];
      rankEntries += 1;
      accomplishmentCategory.items.forEach((item: RankedItem) => {
        const bestRankingItemVariantIndex = item.bestRankingVariantIndex;
        totalRank += item.variants[bestRankingItemVariantIndex][this.rankingPolicy]
        rankEntries += 1;
      })
    })
    return {
      overallRank: totalRank,
      rankingStrategy: this.rankingPolicy
    }
  }
}