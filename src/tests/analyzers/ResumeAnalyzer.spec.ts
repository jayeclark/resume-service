import { describe, it } from "mocha";
import { expect } from "chai";
import { generateTestJobDescription, generateTestResume } from "../testdata/testData";
import { JobDescriptionAnalyzer } from "../../analyzers/JobDescriptionAnalyzer";
import { ResumeAnalyzer } from "../../analyzers/ResumeAnalyzer";
import { RankedItem } from "../../model/Resume/Item";
import { SectionEntry } from "../../model/Resume/ResumeSectionEntry";
import { LocalResumeEvaluator } from '../../evaluators/LocalResumeTextEvaluator';
import { LocalScoringMode } from "../../model/Constants";
import { LocalJobDescriptionEvaluator } from '../../evaluators/LocalJobDescriptionEvaluator';

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
    const jobDescriptionEvaluator = new LocalJobDescriptionEvaluator({
      scoringMode: LocalScoringMode.TOTAL,
      weights: jobDescriptionWeightingRules
    })
    const jobAnalyzer = new JobDescriptionAnalyzer(jobDescription, jobDescriptionEvaluator)

    const map = jobAnalyzer.getJobDescriptionKeywordsMap();
    const resumeEvaluator = new LocalResumeEvaluator({
      scoringMode: LocalScoringMode.TOTAL,
      scoringGuide: map,
    })
    
    const resumeAnalyzer = new ResumeAnalyzer(resume, resumeEvaluator);
    //console.log(resumeAnalyzer);

    const resumeSectionEntry = resume.sections[0].content[0];

    const sectionEntryAnalysis = resumeAnalyzer.getSectionEntryAnalysis(resumeSectionEntry) as SectionEntry;
    console.log(sectionEntryAnalysis);
    console.log(sectionEntryAnalysis.itemCategories[0].variants)
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
    const jobDescriptionEvaluator = new LocalJobDescriptionEvaluator({
      scoringMode: LocalScoringMode.TOTAL,
      weights: jobDescriptionWeightingRules
    })
    const jobAnalyzer = new JobDescriptionAnalyzer(jobDescription, jobDescriptionEvaluator)


    const map = jobAnalyzer.getJobDescriptionKeywordsMap();
    const evaluator = new LocalResumeEvaluator({
      scoringMode: LocalScoringMode.TOTAL,
      scoringGuide: map,
    })
    
    const resumeAnalyzer = new ResumeAnalyzer(resume, evaluator);
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