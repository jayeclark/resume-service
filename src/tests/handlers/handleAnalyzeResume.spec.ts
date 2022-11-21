import { describe, it } from "mocha";
import { expect } from "chai";
import { generateTestJobDescription, generateTestResume } from "../testData";
import { HandleAnalyzeJobDescription } from "../../handlers/handleAnalyzeJobDescription";
import { HandleAnalyzeResume } from "../../handlers/handleAnalyzeResume";

describe('', () => {
  it('process resume as expected', () => {
    const jobDescription = generateTestJobDescription();
    const resume = generateTestResume();
    const jobDescriptionWeightingRules = {
      required: 50,
      preferred: 10,
      role: 10,
      culture: 10, 
      skills: 20
    }
    const jobAnalyzer = new HandleAnalyzeJobDescription(jobDescription, jobDescriptionWeightingRules)

    jobAnalyzer.processJobDescription(null)
    const map = jobAnalyzer.getJobDescriptionKeywordsMap();
    
    const resumeAnalyzer = new HandleAnalyzeResume(resume, map);
    //console.log(resumeAnalyzer);

    const resumeSectionElement = resume.sections[0].content[0];
    const sectionElementAnalysis = resumeAnalyzer.getSectionElementAnalysis(resumeSectionElement);
    console.log("sectionElementAnalysis")
    console.log(sectionElementAnalysis)
    const { variants, bestRankingVariantIndex } = sectionElementAnalysis.accomplishments[0].items[0];
    const items = sectionElementAnalysis.accomplishments[0].items;
    const sortedVariants = items.sort((a, b) => b.bestRankingVariantPoints - a.bestRankingVariantPoints);
    console.log("sorted variants"
    )
    console.log(sortedVariants.map((v) => v.variants[v.bestRankingVariantIndex].content))
    console.log("----")
    console.log(variants)
    console.log(variants[bestRankingVariantIndex])
  })
})