export interface KeywordData {
  count: number;
  totalWeight: number;
  countInDocument?: number;
}

export interface KeywordDataWithDocumentTally extends KeywordData {
  countInDocument: number;
}

export interface KeywordsMap extends Record<string, KeywordData> { }

export interface KeywordsMapWithDocumentTally extends Record<string, KeywordDataWithDocumentTally> { }