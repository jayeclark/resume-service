import { RawJobDescription, ProcessedJobDescription } from '../model/JobDescription';
import { LocalScoringMode } from '../model/Constants';
import { ItemVariantObject, RankedItemVariantObject } from '../model/Resume/Item';
import { KeywordsMap } from '../model/Keywords';

export interface Evaluator {
  evaluate: (subject: any) => any;
  getScoringMode?: () => LocalScoringMode;
}

export interface ResumeEvaluator extends Evaluator {
  evaluate: (item: ItemVariantObject) => RankedItemVariantObject;
}

export interface JobDescriptionEvaluator extends Evaluator {
  evaluate: (description: ProcessedJobDescription) => KeywordsMap;
}