import { removeStopwords, eng } from "stopword";
import { AccomplishmentCategory, Item, ItemVariant, RankedItem, RankedItemVariant, RankedSectionElement, Resume, ResumeSectionContent, SectionElement } from "../model/Resume";
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

  getSectionAnalysis(content: ResumeSectionContent) {
    return content.map(this.getSectionElementAnalysis);
  }

  getSectionElementAnalysis(sectionElement: SectionElement) {
    const rankedSectionElement = this.convertSectionElementAccomplishmentsToRankedAccomplishments(sectionElement);
    console.log(rankedSectionElement);
    //const rankedElement: SectionElement = this.convertItemToRankedItem(sectionElement) as SectionElement;
    //const accomplishmentRankTally = this.tallySectionElementRankings(rankedElement);
    //const rankedSectionElement: RankedSectionElement = {
    //  ...rankedElement as RankedSectionElement,
    //  overallRank: accomplishmentRankTally.overallRank,
    //  rankingStrategy: accomplishmentRankTally.rankingStrategy
    //}
    return rankedSectionElement;
  }

  convertSectionElementAccomplishmentsToRankedAccomplishments(sectionElement: SectionElement) {
    return {
      ...sectionElement,
      accomplishments: sectionElement.accomplishments.map((item, i) => {
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
    const optionContentKeywordArray = removeStopwords(itemOption.content.split(' ').map((word) => word.toLowerCase()), eng);
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

  tallySectionElementRankings(sectionElement: SectionElement): { overallRank: number, rankingStrategy: "totalRank" | "averageRank" } {
    let totalRank = 0;
    let rankEntries = 0;
    sectionElement.accomplishments.forEach((accomplishmentCategory: AccomplishmentCategory) => {
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