import { Job } from "../../model/Resume/ResumeSectionEntry";
import { ExternalLinks } from "../../model/Resume/Resume";
import { Resume } from "../../model/Resume/Resume";

export const MINIMAL_TEST_RESUME: Resume = {
    contact: {
      genderNeutralName: "Jay Clark",
      name: "Jennifer \"Jay\" Clark",
      phone: "555 555 5555",
      location: "Somewhere, USA",
      links: [
        { name: ExternalLinks.GitHub, url: "https://www.github.com/jayeclark", keywords: ["open", "source", "github"] },
        { name: ExternalLinks.LinkedIn, url: "https://www.linkedin.com/in/jayeclark" },
        { name: ExternalLinks.Portfolio, url: "https://jayeclark.github.io" },
      ]
    },
    objective: "To get a great job",
    sections: [
      {
        type: "Experience",
        id: "experience",
        variants: ["Experience", "Work Experience"],
        content: [
          {
            id: "job-1",
            role: "Software Developer II",
            entity: "Company A",
            start: new Date("1980-01-01"),
            end: new Date("1981-01-01"),
            variants: ["Mid-Level Software Developer", "Software Developer II", "Software Developer"],
            itemCategories: [],
            items: []
          },
          {
            id: "job-2",
            role: "Software Developer",
            entity: "Company B",
            start: new Date("1981-01-01"),
            end: new Date("1982-01-01"),
            variants: ["Software Developer", "Software Developer I", "Software Engineer"],
            itemCategories: [],
            items: []
          },
          {
            id: "job-3",
            role: "Junior Software Developer",
            entity: "Company C",
            start: new Date("1982-01-01"),
            end: new Date("1983-01-01"),
            variants: ["Software Developer", "Junior Software Developer", "Engineer"],
            itemCategories: [],
            items: []
          }
        ]
      },
      {
        type: "Projects",
        id: "projects",
        variants: ["Projects", "Volunteer Projects", "Personal & Open Source Software Projects"],
        content: [
          {
            id: "project-1",
            entity: "Project A",
            start: new Date("1984-01-01"),
            end: new Date("1985-01-01"),
            variants: ["React | Typescript | Express | AWS", "React | Typescript | Node", "Serverless | DynamoDB | AWS"],
            itemCategories: [],
            items: []
          },
          {
            id: "project-2",
            entity: "Project B",
            start: new Date("1986-01-01"),
            end: new Date("1987-01-01"),
            variants: ["Software Developer", "Software Developer I", "Software Engineer"],
            itemCategories: [],
            items: []
          },
          {
            id: "project-3",
            entity: "Project C",
            start: new Date("1988-01-01"),
            end: new Date("1989-01-01"),
            variants: ["Software Developer", "Junior Software Developer", "Engineer"],
            itemCategories: [],
            items: []
          }
        ]
      }
    ]
  }