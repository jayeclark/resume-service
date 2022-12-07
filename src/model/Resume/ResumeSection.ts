import { Item } from "./Item";
import { Education, Experience, Projects, SkillsAndCertifications } from "./ResumeSectionEntry";

export type ResumeSection = ExperienceSection | EducationSection | SkillsAndCertificationsSection | ProjectsSection

export interface ExperienceSection extends Item {
  type: 'Experience';
  content: Experience;
  sumOfTotalScores?: number;
  averageOfTotalScores?: number;
}

export interface EducationSection extends Item {
  type: 'Education';
  content: Education;
  sumOfTotalScores?: number;
  averageOfTotalScores?: number;
}

export interface SkillsAndCertificationsSection extends Item {
  type: 'Experience';
  content: SkillsAndCertifications;
  sumOfTotalScores?: number;
  averageOfTotalScores?: number;
}

export interface ProjectsSection extends Item {
  type: 'Projects';
  content: Projects;
  sumOfTotalScores?: number;
  averageOfTotalScores?: number;
}