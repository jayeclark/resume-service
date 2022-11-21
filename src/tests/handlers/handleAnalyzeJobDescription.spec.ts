import { describe, it } from "mocha";
import { expect } from "chai";
import { generateTestJobDescription } from "../testData";
import { HandleAnalyzeJobDescription, removeStopWordsFromArray } from "../../handlers/handleAnalyzeJobDescription";

describe('', () => {
  it('remove stop words from description generates expected output', () => {
    const jobDescription = generateTestJobDescription();
    const jobDescriptionWeightingRules = {
      required: 50,
      preferred: 10,
      role: 10,
      culture: 10, 
      skills: 20
    }
    const jobAnalyzer = new HandleAnalyzeJobDescription(jobDescription, jobDescriptionWeightingRules)

    const withoutStopWords = jobAnalyzer.processJobDescription(null)

    const map = jobAnalyzer.getJobDescriptionKeywordsMap();
    console.log(Object.keys(map).length)
  })
})