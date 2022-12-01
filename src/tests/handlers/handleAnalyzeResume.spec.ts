import { describe, it } from "mocha";
import { expect } from "chai";
import { generateTestJobDescription, generateTestResume } from "../testData";
import { HandleAnalyzeJobDescription } from "../../handlers/handleAnalyzeJobDescription";
import { HandleAnalyzeResume } from "../../handlers/handleAnalyzeResume";
import { RankedItem, RankedItemVariantObject } from "../../model/Resume/Item";

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

    const resumeSectionEntry = resume.sections[0].content[0];
    const sectionEntryAnalysis = resumeAnalyzer.getSectionEntryAnalysis(resumeSectionEntry);
    console.log("sectionEntryAnalysis")
    console.log(sectionEntryAnalysis)
    const { variants, bestRankingVariantIndex } = sectionEntryAnalysis.items[0];
    const items: RankedItem[] = sectionEntryAnalysis.items as RankedItem[];
    const sortedVariants = items.sort((a: RankedItem, b: RankedItem) => {
      return b.variants[b.bestRankingVariantIndex].totalRank - a.variants[a.bestRankingVariantIndex].totalRank
    });
    console.log("sorted variants"
    )
    console.log(sortedVariants.map((v) => v.variants[v.bestRankingVariantIndex].content))
    console.log("----")
    console.log(variants)
    console.log(variants[bestRankingVariantIndex])
  })
})