import { ResumeSection } from "../../model/Resume/ResumeSection";
import { Job } from "../../model/Resume/ResumeSectionEntry";
import { AMZN } from "./fullResume_experience_amazon";
import { BARTELL } from "./fullResume_experience_bartell";
import { HERITAGE } from "./fullResume_experience_heritage";
import { OPG } from "./fullResume_experience_opg";
import { OSS } from "./fullResume_experience_oss";

export const FULLRESUME_EXPERIENCE: ResumeSection = {
        type: 'Experience',
        id: "experience",
        variants: [
          { variant: ""}
        ],
        content: [
          AMZN, OSS, OPG, BARTELL, HERITAGE
        ] as Job[]
      }