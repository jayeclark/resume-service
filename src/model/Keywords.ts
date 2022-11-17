export interface KeywordData {
  count: number;
  totalWeight: number;
}

export interface KeywordsMap extends Record<string, KeywordData> {}