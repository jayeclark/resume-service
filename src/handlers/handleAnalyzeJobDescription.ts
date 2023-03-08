import { KeywordData } from "../model/Keywords";
import { RawJobDescription, ProcessedJobDescription, JobDescriptionWeightingRules, Skill } from "../model/JobDescription";
import { removeStopwords, eng } from "stopword";

export class HandleAnalyzeJobDescription {
  private readonly jobDescription: RawJobDescription
  private weighting: JobDescriptionWeightingRules
  private processedJobDescription: ProcessedJobDescription | null
  
  constructor(jobDescription: RawJobDescription, weighting: JobDescriptionWeightingRules) {
    this.jobDescription = jobDescription;
    this.weighting = weighting;
  }

  getRawJobDescription() {
    return this.jobDescription;
  }

  getProcessedJobDescription(weighting?: JobDescriptionWeightingRules): ProcessedJobDescription {
    if (this.processedJobDescription !== null && !weighting) {
      return this.processedJobDescription;
    }
    this.processJobDescription(weighting)
    return this.processedJobDescription;
  }

  getJobDescriptionKeywordsMap(weighting?: JobDescriptionWeightingRules) {
    if (weighting) {
      this.setWeighting(weighting);
    }
    return this.tallyJobDescriptionKeywords();
  }

  setWeighting(weighting: JobDescriptionWeightingRules) {
    this.weighting = weighting;
  }

  getCurrentWeighting() {
    return this.weighting;
  }

  processJobDescription(weighting: JobDescriptionWeightingRules | null) {
    if (weighting !== null) this.setWeighting(weighting);
    this.removeStopWordsFromJobDescription();
  }

  private removeStopWordsFromJobDescription() {
    const jobDescriptionWithoutStopWords: ProcessedJobDescription = {
      ...this.jobDescription,
      required: removeStopWordsFromArray(this.jobDescription.required),
      preferred: removeStopWordsFromArray(this.jobDescription.preferred),
      role: removeStopWordsFromArray(this.jobDescription.role),
      culture: removeStopWordsFromArray(this.jobDescription.culture),
    };
    this.processedJobDescription = jobDescriptionWithoutStopWords
  }

  private tallyJobDescriptionKeywords() {
    const keywords: Record<string, KeywordData> = {};
    ["required", "preferred", "role", "culture"].forEach((property) => {
      (this.processedJobDescription[property] as string[]).forEach((word) => {
        addToTally(keywords, word, this.weighting[property])
      })
    })
    this.processedJobDescription.skills
      .filter((skill: Skill) => skill.importance > 0)
      .forEach((skill: Skill) => addToTally(keywords, skill.name, skill.importance * this.weighting.skills / 3))
    return keywords;
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

function addToTally(tallyObject: Record<string, KeywordData>, word: string, weight: number) {
    if (!(word in tallyObject)) {
      tallyObject[word] = { count: 0, totalWeight: 0 };
    }
    tallyObject[word].count += 1;
    tallyObject[word].totalWeight += weight;
}