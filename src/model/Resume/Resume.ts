import { ResumeSection } from "./ResumeSection";

export enum ExternalLinks {
  GitHub,
  LinkedIn,
  Portfolio
}

interface ContactInfo {
  genderNeutralName: string;
  name: string;
  phone: string;
  location: string;
  links: ({
    name: ExternalLinks;
    url: string;
    keywords?: string[];
  })[]
}

export interface Resume {
  interactive?: boolean
  metadata?: {
    companyName: string;
    position: string;
    applicationDate: Date;
    fit: number;
    description: string;
  }
  contact: ContactInfo
  objective: string
  sections: ResumeSection[]
}