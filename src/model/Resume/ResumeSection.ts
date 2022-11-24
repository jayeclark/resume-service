import { ItemWithConditions } from "./Resume";
import { ResumeSectionEntries } from "./ResumeSectionEntry";

export interface ResumeSection extends ItemWithConditions {
  type: 'Experience' | 'Education' | 'SkillsAndCertifiations' | 'Projects'
  content: ResumeSectionEntries
  sumOfTotalRank?: number;
  averageOfTotalRank?: number;
  averageRank?: number;
}