import { RawJobDescription } from '../model/JobDescription';
import { KeywordsMap } from '../model/Keywords';
import { ResumeAnalysisMode } from '../model/Constants';
import { LocalJobDescriptionEvaluator } from '../evaluators/LocalJobDescriptionEvaluator';
import { SagemakerResumeTextEvaluator } from '../evaluators/SagemakerResumeTextEvaluator';

export function handleAnalyzeJobDescription(
  jobDescription: RawJobDescription,
  mode: ResumeAnalysisMode,
  authedUser?: any, // TODO: Fix/create type
): KeywordsMap {
  const evaluator = mode === ResumeAnalysisMode.LOCAL ? new LocalJobDescriptionEvaluator() : new SagemakerResumeTextEvaluator();
  const keywordsMap = evaluator.evaluate(jobDescription);
  if (authedUser) {
    // Placeholder - Save job description analysis
  }
  return keywordsMap; // Will be used to generate a word cloud in addition to resume building.
}