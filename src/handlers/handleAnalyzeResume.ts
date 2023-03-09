import { Resume } from "../model/Resume/Resume";
import { ResumeAnalyzer } from '../analyzers/ResumeAnalyzer';
import { LocalResumeEvaluator } from '../evaluators/LocalResumeTextEvaluator';
import { LocalScoringMode, ResumeAnalysisMode } from "../model/Constants";
import { RawJobDescription } from '../model/JobDescription';
import { handleAnalyzeJobDescription } from './handleAnalyzeJobDescription';


interface UnauthedUserResumeAnalysisPayload {
  resume?: Resume; // TODO: Probably want to actually process from PDF or string
  jobDescription: RawJobDescription
}

interface AuthedUserResumeAnalysisPayload {
  resumeId?: string;
}

type ResumeAnalysisPayload = UnauthedUserResumeAnalysisPayload | AuthedUserResumeAnalysisPayload

export function handleAnalyzeResume(payload: ResumeAnalysisPayload) {
  if ('resume' in payload) {
    const scoringGuide = handleAnalyzeJobDescription(payload.jobDescription, ResumeAnalysisMode.LOCAL);
    const evaluator = new LocalResumeEvaluator({ 
      scoringMode: LocalScoringMode.TOTAL, 
      scoringGuide
    })
    const resumeAnalyzer = new ResumeAnalyzer(payload.resume, evaluator)
    return resumeAnalyzer.getResumeAnalysis();
  }
  if ('resumeId' in payload) {
    // retrieve resume from DB and analyze it
    return {} as Resume
  }
}