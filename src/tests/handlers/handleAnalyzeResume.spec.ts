import { describe, it } from "mocha";
import { expect } from "chai";
import { generateTestJobDescription, generateTestResume } from "../testData";
import { HandleAnalyzeJobDescription } from "../../handlers/handleAnalyzeJobDescription";
import { HandleAnalyzeResume } from "../../handlers/handleAnalyzeResume";
import { RankedItem } from "../../model/Resume/Item";
import { SectionEntry } from "../../model/Resume/ResumeSectionEntry";

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

    const sectionEntryAnalysis = resumeAnalyzer.getSectionEntryAnalysis(resumeSectionEntry) as SectionEntry;
    const { variants, bestRankingVariantIndex } = sectionEntryAnalysis.items[0];
    const items: RankedItem[] = sectionEntryAnalysis.items as RankedItem[];
    const sortedVariants = items.sort((a: RankedItem, b: RankedItem) => {
      return b.variants[b.bestRankingVariantIndex].totalRank - a.variants[a.bestRankingVariantIndex].totalRank
    });
  })
})