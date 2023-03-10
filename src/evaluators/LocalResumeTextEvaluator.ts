import { LocalScoringMode } from "../model/Constants";
import { KeywordsMap, KeywordsMapWithDocumentTally, KeywordDataWithDocumentTally, KeywordData } from '../model/Keywords';
import { ResumeEvaluator } from "./Evaluator";
import { ItemVariantObject, RankedItemVariantObject } from '../model/Resume/Item';
import { removeStopwords, eng } from 'stopword';

interface LocalEvaluatorProps {
  scoringMode?: LocalScoringMode;
  scoringGuide: KeywordsMap | KeywordsMapWithDocumentTally;
}

export class LocalResumeEvaluator implements ResumeEvaluator {
  private readonly scoringMode: LocalScoringMode;
  private readonly scoringGuide: KeywordsMap | KeywordsMapWithDocumentTally;

  constructor({ scoringMode, scoringGuide }: LocalEvaluatorProps) {
    this.scoringMode = scoringMode || LocalScoringMode.TOTAL
    this.validateScoringGuide(scoringGuide);
    this.scoringGuide = scoringGuide
  }

  getScoringMode() {
    return this.scoringMode;
  }
  
  validateScoringGuide(scoringGuide: KeywordsMap | KeywordsMapWithDocumentTally): void {
    if (this.scoringMode === LocalScoringMode.WEIGHTED) {
      const words = Object.values(scoringGuide);
      if (!words.every((word: KeywordData | KeywordDataWithDocumentTally) => 'countInDocument' in word)) {
        throw new Error("Must provide a valid scoring guide with document tallies if using weighted scoring!")
      }
    }
  }

  evaluate(item: ItemVariantObject): RankedItemVariantObject {
    const optionContentKeywordArray = removeStopwords(item.variant.split(' ').map((word) => word.toLowerCase()), eng);
    const score = this.getVariantScore(optionContentKeywordArray);
    return { ...item, score }
  }

  getVariantScore(text: string[]): number {
    switch (this.scoringMode) {
      case LocalScoringMode.TOTAL:
        return this.getTextScoreTotal(text).totalWeight;
      case LocalScoringMode.AVERAGE:
        return this.getTextScoreAverage(text);
      case LocalScoringMode.LOG:
        return this.getTextScoreLog(text);
      default:
        return this.getTextScoreTotal(text).totalWeight;
    }
  }

  countMatchedKeywords(text: string[], seenCount: KeywordsMap): void {
    text.forEach((word: string) => {
      if (!(seenCount[word]?.countInDocument)) {
        seenCount[word].countInDocument = 0;
      }
      seenCount[word].countInDocument += 1
    })
  }

  getTextScoreTotal(text: String[]) {
    return text
      .map((word: string) => word.toLowerCase() in this.scoringGuide ? this.scoringGuide[word] : {count: 0, totalWeight: 0})
      .reduce((a, b) => ({ count: a.count + b.count, totalWeight: a.totalWeight + b.totalWeight }))
  }

  getTextScoreAverage(text: String[]) {
    const total = this.getTextScoreTotal(text);
    return total.totalWeight / total.count;
  }

  getTextScoreLog(text: String[]) {
    const total = this.getTextScoreTotal(text);
    return Math.log2(total.totalWeight);
  }
}