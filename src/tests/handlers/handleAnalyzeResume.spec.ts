import { describe, it } from "mocha";
import { expect } from "chai";
import { generateTestJobDescription, generateTestResume } from "../testdata/testData";
import { HandleAnalyzeJobDescription } from "../../handlers/handleAnalyzeJobDescription";
import { HandleAnalyzeResume } from "../../handlers/handleAnalyzeResume";
import { RankedItem } from "../../model/Resume/Item";
import { SectionEntry } from "../../model/Resume/ResumeSectionEntry";
import { LocalEvaluator } from '../../evaluators/LocalEvaluator';
import { LocalScoringMode } from "../../model/Constants";

describe('RESUME ANALYZER', () => {
  it('generate expected results from getSectionEntryAnalysis', () => {
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
    const evaluator = new LocalEvaluator({
      scoringMode: LocalScoringMode.TOTAL,
      scoringGuide: map,
    })
    
    const resumeAnalyzer = new HandleAnalyzeResume(resume, evaluator);
    //console.log(resumeAnalyzer);

    const resumeSectionEntry = resume.sections[0].content[0];

    const sectionEntryAnalysis = resumeAnalyzer.getSectionEntryAnalysis(resumeSectionEntry) as SectionEntry;
    console.log(sectionEntryAnalysis);
    const { variants, bestRankingVariantIndex } = sectionEntryAnalysis.items[0];
    const items: RankedItem[] = sectionEntryAnalysis.items as RankedItem[];
    const sortedVariants = items.sort((a: RankedItem, b: RankedItem) => {
      return b.variants[b.bestRankingVariantIndex].totalRank - a.variants[a.bestRankingVariantIndex].totalRank
    });
  })

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
    const evaluator = new LocalEvaluator({
      scoringMode: LocalScoringMode.TOTAL,
      scoringGuide: map,
    })
    
    const resumeAnalyzer = new HandleAnalyzeResume(resume, evaluator);
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