import { Item, RankedItem, ItemVariantObject, RankedItemVariantObject, BulletPoint } from "../model/Resume/Item";
import { Resume } from "../model/Resume/Resume";
import { ResumeSectionEntries, ItemCategory, RankedItemCategory, RankedSectionEntry, SectionEntry } from "../model/Resume/ResumeSectionEntry";
import { ResumeSection, ExperienceSection, EducationSection, SkillsAndCertificationsSection, ProjectsSection } from '../model/Resume/ResumeSection';
import { Evaluator } from "../evaluators/Evaluator";

export class ResumeAnalyzer {
  private resume: Resume;
  private processedResume: Resume;
  private sectionRankingPolicy: 'total' | 'average';
  private readonly evaluator: Evaluator;

  constructor(resume: Resume, evaluator: Evaluator) {
    this.resume = resume;
    this.evaluator = evaluator;
  }

  getResumeAnalysis(): Resume {
    const newSections: ResumeSection[] = this.resume.sections.map(
      (section: ExperienceSection | EducationSection | ProjectsSection | SkillsAndCertificationsSection) => this.processSection(section)
    );

    this.processedResume = {
      ...this.resume,
      sections: newSections
    }
    return this.processedResume;
  }

  processSection<T>(section: ResumeSection): T {
    const rankedContent = this.getSectionEntriesAnalysis(section.content);
    const totalScore = this.getSectionEntriesScoreTally(rankedContent);
    return {
      ...section as T,
      content: rankedContent,
      sumOfTotalScores: totalScore,
      averageOfTotalScores: totalScore / rankedContent.length
    }
  }

  getSectionEntriesAnalysis(content: ResumeSectionEntries) {
    return content.map(this.getSectionEntryAnalysis) as ResumeSectionEntries;
  }


  getSectionEntryAnalysis(sectionEntry: SectionEntry) {
    const processedSectionEntry = this.convertItemToRankedItem(sectionEntry) as RankedSectionEntry;
    
    const categoryRankTally = this.getSectionEntryItemsScoreTally(processedSectionEntry);
    const rankedSectionEntry: RankedSectionEntry = {
      ...processedSectionEntry,
      overallScore: categoryRankTally.overallScore,
    }
    return rankedSectionEntry;
  }

  private convertItemsToRankedItems(items: BulletPoint[] | ItemCategory[]) {
    const rankedItems = items.map((item) => this.convertItemToRankedItem(item));
    const sortedRankedItems = rankedItems.sort(sortInDescendingOrderOfBestRankingVariant);
    return sortedRankedItems;
  }

  private convertItemToRankedItem(item: Item): RankedItem {
    const rankedItemVariants = this.getRankedItemVariants(item.variants);
    const bestRankingVariantIndex = this.getBestRankingItemVariantIndex(rankedItemVariants);

    const rankedItem: RankedItem = {
      ...item,
      variants: rankedItemVariants,
      bestRankingVariantIndex
    }

    // If the item contains child nodes, convert those to ranked items as well
    if ("items" in rankedItem) {
      rankedItem.items = this.convertItemsToRankedItems(rankedItem.items as BulletPoint[]);
    }

    // If the item contains category headings that map to certain items, convert them to ranked items
    if ("itemCategories" in rankedItem) {
      rankedItem.itemCategories = this.convertItemsToRankedItems(rankedItem.itemCategories as ItemCategory[]);
    }

    return rankedItem;
  }

  private getRankedItemVariants(itemVariants: (ItemVariantObject | RankedItemVariantObject | string)[]) {
    return itemVariants.map((variant) => this.convertItemVariantToRankedItemVariant(variant));
  }

  private getBestRankingItemVariantIndex(itemVariants: RankedItemVariantObject[]) {
    const bestRankingVariantIndices: number[] = this.getIndexesOfAllVariantsWithHighestScore(itemVariants);
    const shortestTopRankedVariant = this.getIndexOfTopScoringVariantWithShortestLength(itemVariants, bestRankingVariantIndices)
    
    return shortestTopRankedVariant;
  }

  private getIndexesOfAllVariantsWithHighestScore(itemVariants: RankedItemVariantObject[]): number[] {
    let bestRankingVariantIndices: number[] = [];
    let bestRankingVariantPoints = 0;
    itemVariants.forEach((variantObject, index) => {
      
      if (variantObject.score === bestRankingVariantPoints) {
        bestRankingVariantIndices.push(index);
      }
      if (variantObject.score > bestRankingVariantPoints) {
        bestRankingVariantPoints = variantObject.score;
        bestRankingVariantIndices = [index]
      } 
    })
    return bestRankingVariantIndices;
  }

  private getIndexOfTopScoringVariantWithShortestLength(itemVariants: RankedItemVariantObject[], bestRankingVariantIndices: number[]) {
    const variantLengths = bestRankingVariantIndices.map((idx: number) => itemVariants[idx].variant.length);
    const shortestVariant = variantLengths.findIndex((l: number) => l == Math.min(...variantLengths));
    return bestRankingVariantIndices[shortestVariant]
  }

  private convertItemVariantToRankedItemVariant(variant: ItemVariantObject | string): RankedItemVariantObject {
    const variantObject = typeof variant === 'string' ? { variant } : variant;
    return this.evaluator.evaluate(variantObject);
  }


  private getSectionEntriesScoreTally(content: ResumeSectionEntries) {
    return content
      .map((item: RankedSectionEntry) => item.overallScore)
      .reduce((a, b) => a + b);
  }

  private getSectionEntryItemsScoreTally(sectionEntry: SectionEntry): { overallScore: number, sectionRankingStrategy: "total" | "average" } {
    let totalScore = 0;
    let scoreEntries = 0;
    sectionEntry.itemCategories.forEach((itemCategory: RankedItemCategory) => {
      const bestRankingCategoryVariantIndex = itemCategory.bestRankingVariantIndex;
      totalScore += itemCategory.variants[bestRankingCategoryVariantIndex].score;
      scoreEntries += 1;
    })
    sectionEntry.items.forEach((item: RankedItem) => {
      const index = item.bestRankingVariantIndex;
      totalScore += item.variants[index].score
      scoreEntries += 1;
    }) 
    return {
      overallScore: this.sectionRankingPolicy === 'total' ? totalScore : totalScore / scoreEntries,
      sectionRankingStrategy: this.sectionRankingPolicy
    }
  }
}

function sortInDescendingOrderOfBestRankingVariant(a: RankedItem, b: RankedItem) {
  const [aBestVariant, bBestVariant] = [a.bestRankingVariantIndex, b.bestRankingVariantIndex]
  const [aVariants, bVariants] = [a.variants as RankedItemVariantObject[], b.variants as RankedItemVariantObject[]];
  return bVariants[bBestVariant].totalRank - aVariants[aBestVariant].totalRank
}