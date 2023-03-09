import { KeywordData } from "../model/Keywords";
import { RawJobDescription, ProcessedJobDescription, JobDescriptionWeightingRules, Skill } from "../model/JobDescription";
import { removeStopwords, eng } from "stopword";
import { JobDescriptionEvaluator } from '../evaluators/Evaluator';

export class HandleAnalyzeJobDescription {
  private readonly jobDescription: RawJobDescription
  private evaluator: JobDescriptionEvaluator
  private readonly processedJobDescription: ProcessedJobDescription | null
  
  constructor(jobDescription: RawJobDescription, evaluator: JobDescriptionEvaluator) {
    this.jobDescription = jobDescription;
    this.evaluator = evaluator;
    this.processedJobDescription = this.getProcessedJobDescription()
  }

  getRawJobDescription() {
    return this.jobDescription;
  }

  getProcessedJobDescription(): ProcessedJobDescription {
    if (this.processedJobDescription) {
      return this.processedJobDescription;
    }
    return this.removeStopWordsFromJobDescription();;
  }

  getJobDescriptionKeywordsMap() {
    return this.evaluator.evaluate(this.getProcessedJobDescription())
  }

  private removeStopWordsFromJobDescription() {
    const jobDescriptionWithoutStopWords: ProcessedJobDescription = {
      ...this.jobDescription,
      required: removeStopWordsFromArray(this.jobDescription.required),
      preferred: removeStopWordsFromArray(this.jobDescription.preferred),
      role: removeStopWordsFromArray(this.jobDescription.role),
      culture: removeStopWordsFromArray(this.jobDescription.culture),
    };
    return jobDescriptionWithoutStopWords
  }
}

export function removeStopWordsFromArray(array: string[]) {
  const keywords: string[] = [];
  array.forEach((element: string) => {
    const allPunctuation = new RegExp(/[+.,\-()!]/, "g")
    const processedElement = element
      .replace(/\s&\s/g, "&")
      .replace(/\s\-\s/g, " ")
      .replace(/\-/g, "")
      .replace(allPunctuation, " ")
      .split(" ")
      .filter((x) => x != "" && !/[0-9]/.test(x));
    removeStopwords(processedElement, eng).forEach((keyword) => {
      keywords.push(keyword.toLowerCase());
      if (keyword.charAt(keyword.length - 1) === "s") {
        keywords.push(keyword.toLowerCase().slice(0, keyword.length - 1))
      }
    })
    
  });
  return keywords.length === 0 ? ([] as string[]) : keywords;
}
