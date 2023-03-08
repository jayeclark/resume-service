import { LocalScoringMode } from '../model/Constants';

export interface Evaluator {
  evaluateText: (s: string[]) => number;
  getScoringMode?: () => LocalScoringMode;
}