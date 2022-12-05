import { ExternalLinks, Resume } from "../../model/Resume/Resume";
import { ItemCategory, Experience, Job, SectionEntry } from "../../model/Resume/ResumeSectionEntry";
import { BulletPoint, Item, ItemVariantObject } from "../../model/Resume/Item";
import { Industry, RawJobDescription } from "../../model/JobDescription";

export function generateTestJobDescription(): RawJobDescription {
  return {
    company: "Goldstone Partners",
    industry: Industry.Healthcare,
    position: "Full Stack Engineer - US Remote",
    skills: [],
    required: [
      "Bachelor’s degree in computer science or engineering and 5+ years of experience building highly dynamic software applications in a web-based environment where the user experience is paramount",
      "Fluency in React, NodeJS, Mongo, and JavaScript using microservice patterns and presenting/consuming APIs",
      "Experience with iterative models, CPU-based consumption, AI and machine learning",
      "Detail-oriented with a gift for elegant authorship – useful documentation is essential",
      "A sharp mind with a knack for picking up new concepts quickly, thinking systemically and filling in the blanks when given an abstract objective",
      "Creative problem solver and creative thinker with the ability to multitask and switch priorities as needed",
      "Personal ethic that embodies the ideals of diversity and inclusion",
    ],
    preferred: [],
    role: [
      "The Regis Company is at the forefront of designing experiential learning programs for some of the world’s largest Fortune 500 organizations." ,
      "Headquartered in beautiful downtown Golden, Colorado, we deliver products with global reach.",
      "To date, we’ve empowered over 1.2 million learners across six continents and earned more than 50 awards, including Best New Hire Onboarding Program, Excellence in Blended Learning, Excellence in Executive Education, and so much more.",
      "If you’re passionate about education and technology, then let’s talk!.",
      "As the newest member of our R & D team, you will be responsible for new development, as well as enabling the integration of third-party components and services.",
      "You will be working on game - changing projects using cutting edge technologies to create a truly unique and powerful simulation platform.",
      "You have 5 + years of experience with web technologies and advanced knowledge of modern tech stacks.",
      "You are passionate about software engineering and a natural problem solver who thrives in a collaborative team environment.",
      "If you are ready for a new challenge helping us push the envelope on software development, let’s talk!",
      "Designing, developing, and testing software applications for our web-based products using React and JavaScript",
      "Working with other members of the engineering team to develop new features and functionality",
      "Actively participating in code review, testing, and troubleshooting applications and providing feedback for future development",
      "Managing the integration of third-party components, services, and APIs",
      "Creating and maintaining technical documentation",
      "Promoting a culture of continuous improvement in all that you do!",
    ],
    culture: [],
  }
}

const AMZN_refundAuditor: ItemCategory = {
  id: "refund-auditor",
  variants: [
    { variant: "Kotlin, AWS Lambda & DynamoDB auditing service project for automated refunds" }
  ],
}

const AMZN_eventDrivenInsightGeneration: ItemCategory = {
  id: "finch-insights",
  variants: [
    { variant: "Java, Gremlin & AWS Neptune Graph Database Insight Generation"}
  ],
}

const AMZN_orderRateMonitoring: ItemCategory = {
  id: "order-rate-monitoring",
  variants: [
    { variant: "Typescript/Node.js, Java/Apache Flink, AWS Sagemaker multimodel Inference time series anomaly detection w/React UI", keywords: [""], industries: [] as Industry[]}
  ],
}

const AMZN_operationalExcellence: ItemCategory = {
  id: "operational-excellence",
  variants: [
    { variant: "Operational Excellence", keywords: [""], industries: [] as Industry[]}
  ]
}

const AMZN_itemCategories: ItemCategory[] = [AMZN_refundAuditor, AMZN_eventDrivenInsightGeneration, AMZN_orderRateMonitoring, AMZN_operationalExcellence]

const AMZN_refundAuditor_items: BulletPoint[] =  [
    { 
      id: "refund-auditor-1",
      itemCategory: [0, "refund-auditor"],
      itemCategoryDisplayRequired: true,
      variants: ["Launched three SLA audits applied in near-real-time to 525K+ automated grocery delivery order refunds per year" ]
    },
    { 
      id: "refund-auditor-2",
      itemCategory: [0, "refund-auditor"],
      itemCategoryDisplayRequired: true,
      variants: [ "Expanded audit ticketing to include configurable reports & publishing to S3, saving ~$44,000 in future labor costs" ]
    },
    { 
      id: "refund-auditor-3",
      itemCategory: [0, "refund-auditor"],
      itemCategoryDisplayRequired: true,
      variants: [ "Designed machine learning audit plugins capable of generating up to $10M in cost savings" ]
    },
  ]

const AMZN_eventDrivenInsightGeneration_items: BulletPoint[] = [
    {
      id: "finch-insights-1",
      itemCategory: [1, "finch-insights"],
      itemCategoryDisplayRequired: true,
      variants: [ "Built prototype AWS Lambda & SNS graph stream event trigger system capable of processing 1M events per hour" ]
    }
  ]

const AMZN_orderRateMonitoring_items: BulletPoint[] = [{
  id: "amazon-3-1",
  itemCategory: [2, "order-rate-monitoring"],
  itemCategoryDisplayRequired: true,
  variants: ["Updated source code, developed ops runbook, communicated with stakeholders, and led training for handoff of order rate anomaly tech triage from telemetry on call to 24/7 consumer tech services team" ]
  }]

const operationalExcellence_cdkUpgrades: BulletPoint = {
  id: "cdkUpgrades",
  itemCategory: [3, "operational-excellence"],
  itemCategoryDisplayRequired: false,
  variants: ["Upgraded, refactored & standardized CloudFormation architecture to AWS CDK V2 on 14 deployment pipelines"]
}

const operationalExcellence_onCallVelocity: BulletPoint = {
  id: "onCallVelocity",
  itemCategory: [3, "operational-excellence"],
  itemCategoryDisplayRequired: false,
  variants: [
    { variant: "Joined on-call rotation 60 days ahead of schedule, debugged & recovered service on Tier 1.5 and Tier 2 outages" }
  ]
}

const operationalExcellence_pipelineBlocks: BulletPoint = {
  id: "pipelineBlocks",
  itemCategory: [3, "operational-excellence"],
  itemCategoryDisplayRequired: false,
  variants: [
    { variant: "Reduced CI/CD pipeline block ticket time from 9.4 to 1.7 days & resolved 471 issues (stories + trouble tickets)" }
  ]
}

const operationalExcellence_pullRequestCount: BulletPoint = {
  id: "pullRequestCount",
  itemCategory: [3, "operational-excellence"],
  itemCategoryDisplayRequired: false,
  variants: [
    { variant: "Merged 136 pull requests in Typescript, Java, Kotlin, Python & shell script - 100,000+ lines of code changed" }
  ]
}



const AMZN: SectionEntry = {
  id: "amzn",
  entity: "Amazon",
  variants: ["Software Development Engineer"],
  role: "Software Development Engineer",
  start: new Date("2022-08-22"),
  end: new Date("2023-03-22"),
  itemCategories: AMZN_itemCategories,
  items: [
    ...AMZN_refundAuditor_items, ...AMZN_eventDrivenInsightGeneration_items, 
    ...AMZN_orderRateMonitoring_items,
    operationalExcellence_cdkUpgrades, operationalExcellence_onCallVelocity,
    operationalExcellence_pipelineBlocks, operationalExcellence_pullRequestCount
  ]
}

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

const OSS: Job = {
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

const OPG_items: BulletPoint[] = [
    {
    id: "devTeam",
      itemCategoryDisplayRequired: false,
      variants: [{
        variant: "Led 4-person dev team (and participated as IC) to build a b2b data analytics platform for Twitch streaming media built on Scala, Spring, PostgreSQL and Redis"
      }]
    },
    {
      id: "microservices",
      itemCategoryDisplayRequired: false,
      variants: [{
        variant: "Built message-based microservices & REST API integrations for calendar, payday loans, & sponsored content"
      }]
    },
    {
      id: "machineLearning",
      itemCategoryDisplayRequired: false,
      variants: [{
        variant: "Developed a machine learning driven talent management SaaS, processing $20M+ in sponsored content payments"
      }]
    },
    {
      id: "amazonAppStore",
      itemCategoryDisplayRequired: false,
      variants: [{
        variant: "Debugged tablet streaming & embedded software issues for mobile esports events with the Amazon App Store "
      }]
    },
    {
      id: "partnerships",
      itemCategoryDisplayRequired: false,
      variants: [{
        variant: "Led successful technical collaborations with industry partners at Facebook, Microsoft, NVIDIA, Intel & Twitch"
      }]
    },
  ]

const OPG: Job = {
  id: 'online-performers-group',
  variants: [
    { variant: "Co-founder & Acting CTO"}
  ],
  entity: "Online Performers Group",
  role: "Co-founder & Acting CTO",
  start: new Date("2015-09-01"),
  end: new Date("2020-07-13"),
  items: OPG_items
}

const BARTELL_general_items: BulletPoint[] = [
  {
  id: "bartell-webapp",
    itemCategoryDisplayRequired: false,
    variants: [{
      variant: "Developed PHP & MySQL dispatch & real-time IoT GPS tracking app with geofencing + adverse incident reporting, tracking fleet location & passengers for an airport shuttle service with more than 2M riders per year."
    }]
  }
]

const BARTELL: Job = {
  id: "bartell",
  variants: [
    { variant: "Technical Consultant" },
    { variant: "Consultant" },
    { variant: "Technical & Data Consultant"}
  ],
  entity: "Bartell & Associates",
  role: "Technical & Data Consultant",
  start: new Date("2013-08-01"),
  end: new Date("2015-08-04"),
  items: BARTELL_general_items
}

export function generateTestResume(): Resume {
  return {
    interactive: false,
    metadata: {
      companyName: "",
      position: "",
      applicationDate: new Date(),
      fit: -1,
      description: ""
    },
    contact: {
      genderNeutralName: "Jay Clark",
      name: "Jennifer \"Jay\" Clark",
      phone: "617 905 9612",
      location: "San Diego, CA",
      links: [{
        name: ExternalLinks.GitHub,
        url: "https://www.github.com/jayeclark"
      }]
    },
    objective: "To get a great job",
    sections: [
      {
        type: 'Experience',
        id: "experience",
        variants: [
          { variant: ""}
        ],
        content: [
          AMZN, OSS, OPG, BARTELL
        ] as Job[]
      }
    ]
  }
}