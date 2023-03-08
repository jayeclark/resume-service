import { removeStopwords, eng } from "stopword";
import { Item, RankedItem, ItemVariantObject, RankedItemVariantObject, BulletPoint } from "../model/Resume/Item";
import { Resume } from "../model/Resume/Resume";
import { ResumeSectionEntries, ItemCategory, RankedItemCategory, RankedSectionEntry, SectionEntry } from "../model/Resume/ResumeSectionEntry";
import { ResumeSection, ExperienceSection, EducationSection, SkillsAndCertificationsSection, ProjectsSection } from '../model/Resume/ResumeSection';
import { Evaluator } from "../evaluators/Evaluator";

export class HandleAnalyzeResume {
  private resume: Resume;
  private processedResume: Resume;
  private sectionRankingPolicy: 'total' | 'average';
  private readonly evaluator: Evaluator;

  constructor(resume: Resume, evaluator: Evaluator) {
    this.resume = resume;
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
    const rankedContent = this.getSectionContentAnalysis(section.content);
      const totalScore = this.tallySectionEntryScores(rankedContent);
      return {
        ...section as T,
        content: rankedContent,
        sumOfTotalScores: totalScore,
        averageOfTotalScores: totalScore / rankedContent.length
      }
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
    }
    return rankedSectionEntry;
  }

  private convertItemsToRankedItems(items: BulletPoint[] | ItemCategory[]) {
    return items.map((item) => this.convertItemToRankedItem(item))
        .sort(sortInDescendingOrderOfBestRankingVariant);
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
      if (variantObject.score === bestRankingVariantPoints) {
        bestRankingVariants.push(index);
      }
      if (variantObject.score > bestRankingVariantPoints) {
        bestRankingVariantPoints = variantObject.score;
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

    const score = this.evaluator.evaluateText(optionContentKeywordArray)

    const rankedItemOption: RankedItemVariantObject = {
      ...variantObject,
      score,
    }
    return rankedItemOption;
  }


  private tallySectionEntryScores(content: ResumeSectionEntries) {
    return content
      .map((item: RankedSectionEntry) => item.overallScore)
      .reduce((a, b) => a + b);
  }

  private tallySectionEntryItemRankings(sectionEntry: SectionEntry): { overallScore: number, sectionRankingStrategy: "total" | "average" } {
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