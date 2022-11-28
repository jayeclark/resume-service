import { Item } from "./Item";
import { ResumeSectionEntries } from "./ResumeSectionEntry";

export interface ResumeSection extends Item {
  type: 'Experience' | 'Education' | 'SkillsAndCertifiations' | 'Projects'
  content: ResumeSectionEntries
  sumOfTotalRank?: number;
  averageOfTotalRank?: number;
  averageRank?: number;
}