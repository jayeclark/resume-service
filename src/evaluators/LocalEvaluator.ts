import { LocalScoringMode } from "../model/Constants";
import { KeywordsMap } from '../model/Keywords';

interface LocalEvaluatorProps {
  scoringMode?: LocalScoringMode;
  scoringGuide: KeywordsMap;
}

export class LocalEvaluator {
  private readonly scoringMode: LocalScoringMode;
  private readonly scoringGuide: KeywordsMap;

  constructor({ scoringMode, scoringGuide }: LocalEvaluatorProps) {
    this.scoringMode = scoringMode || LocalScoringMode.total
    this.scoringGuide = scoringGuide
  }

  evaluateText(text: String[]) {
    switch (this.scoringMode) {
      case LocalScoringMode.total:
        return this.getTextScoreTotal(text).totalWeight;
      case LocalScoringMode.average:
        return this.getTextScoreAverage(text);
      case LocalScoringMode.log:
        return this.getTextScoreLog(text);
      default:
        return this.getTextScoreTotal(text);
    }
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