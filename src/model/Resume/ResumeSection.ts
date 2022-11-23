import { ItemWithConditions, ResumeSectionEntries } from "./Resume";

export interface ResumeSection extends ItemWithConditions {
  type: 'Experience' | 'Education' | 'SkillsAndCertifiations' | 'Projects'
  content: ResumeSectionEntries
  sumOfTotalRank?: number;
  averageOfTotalRank?: number;
  averageRank?: number;
}