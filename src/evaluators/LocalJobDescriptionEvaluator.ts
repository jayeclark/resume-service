import { LocalScoringMode } from "../model/Constants";
import { KeywordsMap } from '../model/Keywords';
import { JobDescriptionEvaluator } from './Evaluator';
import { ProcessedJobDescription, Skill } from '../model/JobDescription';

interface LocalJobDescriptionEvaluatorProps {
  scoringMode?: LocalScoringMode;
  weights?: Record<JobDescriptionProperty, number>
}

type JobDescriptionProperty = 'required' | 'preferred' | 'role' | 'culture' | 'skills'
type WordCountProperty = JobDescriptionProperty | 'count'

interface WordCount extends Record<string, Record<WordCountProperty, number>> { }

export class LocalJobDescriptionEvaluator implements JobDescriptionEvaluator {
  private readonly scoringMode: LocalScoringMode;
  private readonly weights: Record<JobDescriptionProperty, number>

  constructor({ scoringMode, weights }: LocalJobDescriptionEvaluatorProps) {
    this.scoringMode = scoringMode || LocalScoringMode.TOTAL
    this.weights = weights || {
      required: 2,
      preferred: 1, 
      role: 1, 
      culture: 1, 
      skills: 1
    }
  }

  getScoringMode() {
    return this.scoringMode;
  }

  evaluate(jobDescription: ProcessedJobDescription): KeywordsMap {
    const wordCount = this.getKeywordsCount(jobDescription)
    const keywordsMap = this.getKeywordScores(wordCount)
    return keywordsMap;
  }

  getKeywordsCount(jobDescription: ProcessedJobDescription): WordCount {
    
    const uniqueWords: string[] = [...new Set([
      ...jobDescription.required,
      ...jobDescription.preferred,
      ...jobDescription.role,
      ...jobDescription.culture,
      ...jobDescription.skills.filter((skill: Skill) => skill.importance > 0).map((skill: Skill) => skill.name)
    ])]

    const keywords: WordCount = Object.fromEntries(uniqueWords.map((word: string) => ([word, {
      required: 0,
      preferred: 0,
      role: 0,
      culture: 0,
      skills: 0,
      count: 0,
    }])));

    ["required", "preferred", "role", "culture", "skills"].forEach((property: JobDescriptionProperty) => {
      (jobDescription[property] as string[]).forEach((word: string) => {
        keywords[word][property] += 1;
        keywords[word].count += 1;
      })
    })

    return keywords as WordCount;
  }

  getKeywordScores(wordCount: WordCount): KeywordsMap {
    switch (this.scoringMode) {
      case LocalScoringMode.TOTAL:
        return this.getWordCountTotals(wordCount);
      case LocalScoringMode.AVERAGE:
        return this.getWordCountAverages(wordCount);
      case LocalScoringMode.LOG:
        return this.getWordCountLogs(wordCount);
      case LocalScoringMode.WEIGHTED:
        return this.getWeightedWordCounts(wordCount);
      default:
        return this.getWordCountTotals(wordCount);
    }
  }

  getWordCountTotals(wordCount: WordCount, multiplier?: number): KeywordsMap {
    const keywords = {} as KeywordsMap;
    for (let word in wordCount) {
      const count = Object.values(wordCount[word]).reduce((a, b) => a + b)
      keywords[word] = {
        count,
        totalWeight: count * (multiplier || 1)
      }
    }
    return keywords;
  }

  getWordCountAverages(wordCount: WordCount): KeywordsMap {
    return this.getWordCountTotals(wordCount, 0.2)
  }

  getWordCountLogs(wordCount: WordCount): KeywordsMap {
    const keywords = {} as KeywordsMap;
    for (let word in wordCount) {
      const count = Object.values(wordCount[word]).reduce((a, b) => a + b)
      keywords[word] = {
        count,
        totalWeight: Math.log2(count)
      }
    }
    return keywords;
  }

  getWeightedWordCounts(wordCount: WordCount) {
    const keywords = {} as KeywordsMap;
    Object.keys(wordCount).forEach((word) => {
      let count = 0;
      let totalWeight = 0;

      ["required", "preferred", "role", "culture", "skills"].forEach((property: JobDescriptionProperty) => {
        count += wordCount[word][property];
        totalWeight += wordCount[word][property] * this.weights[property]
      })

      keywords[word] = { count, totalWeight }
    })

    return keywords;
  }

}