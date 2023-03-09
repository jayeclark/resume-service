import { describe, it } from "mocha";
import { expect } from "chai";
import { generateTestJobDescription } from "../testdata/testData";
import { HandleAnalyzeJobDescription } from "../../handlers/handleAnalyzeJobDescription";
import { LocalScoringMode } from '../../model/Constants';
import { LocalJobDescriptionEvaluator } from "../../evaluators/LocalJobDescriptionEvaluator";

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
    const jobDescriptionEvaluator = new LocalJobDescriptionEvaluator({
      scoringMode: LocalScoringMode.TOTAL,
      weights: jobDescriptionWeightingRules
    })

    const jobAnalyzer = new HandleAnalyzeJobDescription(jobDescription, jobDescriptionEvaluator)

    const map = jobAnalyzer.getJobDescriptionKeywordsMap();
    console.log(Object.keys(map).length)
  })
})