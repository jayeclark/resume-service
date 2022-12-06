import { ItemCategory, Job } from "../../model/Resume/ResumeSectionEntry";
import { BulletPoint, ItemVariantObject } from "../../model/Resume/Item";

const OSS_Pareto: ItemCategory = {
  id: "oss-pareto",
  variants: [
    { variant: "React, AWS API Gateway, Websocket, Serverless Node.js & Vercel based Mentorship Platform" }
  ],
}

const OSS_RailsDevs: ItemCategory = {
  id: "oss-railsdevs",
  variants: [] as ItemVariantObject[],
}

const OSS_Education: ItemCategory = {
  id: "oss-education",
  variants: [
    { variant: "MIT xPro, HarvardX, and Open Courseware"}
  ]
}

const pareto_pullRequestCount: BulletPoint = {
  id: "pullRequestCount",
  itemCategory: [0, "oss-pareto"],
  itemCategoryDisplayRequired: true,
  variants: [
    { variant: "Merged 50 pull requests representing more than 200 commits" }
  ]
}

const pareto_CICD: BulletPoint = {
  id: "cicd",
  itemCategory: [0, "oss-pareto"],
  itemCategoryDisplayRequired: true,
  variants: [
    { variant: "Set up full CI/CD pipeline with unit tests, integration tests, code quality checks, and test deployments" }
  ]
}

const pareto_paidMaintainer: BulletPoint = {
  id: "paidMaintainer",
  itemCategory: [0, "oss-pareto"],
  itemCategoryDisplayRequired: true,
  variants: [
    { variant: "Served as paid maintainer and volunteer engineering manager on project, attracting 15 volunteer contributors" }
  ]
}

const pareto_codeQuality: BulletPoint = {
  id: "codeQuality",
  itemCategory: [0, "oss-pareto"],
  itemCategoryDisplayRequired: true,
  variants: [
    { variant: "Established and documented repository coding standards, issue templates, issue labeling practices, and testing policies" }
  ]
}




const education_courses: BulletPoint = {
  id: "education_certifications",
  itemCategory: [1, "oss-education"],
  itemCategoryDisplayRequired: false,
  variants: [
    { variant: "Completed a comprehensive program of self-study in CS including data structures & algorithms, math for machine learning, and system design"}
  ]
}

const education_certifications: BulletPoint = {
  id: "education_certifications",
  itemCategory: [1, "oss-education"],
  itemCategoryDisplayRequired: false,
  variants: [
    { variant: "Completed professional certificates in data science (18 months), full stack development (10 months), and machine learning (11 weeks)"}
  ]
}


const OSS_RailsDevs_items: BulletPoint[] =  [
    {
      id: "railsdevs",
      itemCategory: [2, "oss-railsdevs"],
      itemCategoryDisplayRequired: true,
      variants: [{
        variant: "Implemented notification system for Ruby on Rails/Postgres based reverse job board"
      }]
    }
  ]

export const OSS: Job = {
  id: "oss",
  variants: [
    { variant: "OSS Sabbatical & Educational Break"}
  ],
  entity: "",
  role: "OSS Sabbatical & Educational Break",
  start: new Date("2020-08-20"),
  end: new Date("2022-07-22"),
  itemCategories: [OSS_Pareto, OSS_Education, OSS_RailsDevs],
  items: [
    pareto_pullRequestCount, pareto_CICD, pareto_codeQuality, pareto_paidMaintainer,
    education_certifications, education_courses,
    ...OSS_RailsDevs_items
  ]
}