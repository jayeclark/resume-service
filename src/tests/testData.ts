import { ExternalLinks, AccomplishmentCategory, Resume, Experience, ItemVariant, Item, Job } from "../model/Resume/Resume";
import { Industry, RawJobDescription } from "../model/JobDescription";

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

const AMZN_refundAuditor: AccomplishmentCategory = {
  id: "refund-auditor",
  variants: [
    { variant: "Kotlin, AWS Lambda & DynamoDB auditing service project for automated refunds"}
  ],
  items: [
    { 
      id: "refund-auditor-1",
      variants: [{
        variant: "Launched three SLA audits applied in near-real-time to 525K+ automated grocery delivery order refunds per year",
      }]
    },
    { 
      id: "refund-auditor-2",
      variants: [
        { variant: "Expanded audit ticketing to include configurable reports & publishing to S3, saving ~$44,000 in future labor costs" }
      ]
    },
    { 
      id: "refund-auditor-3",
      variants: [{
        variant: "Designed machine learning audit plugins capable of generating up to $10M in cost savings",
      }]
    },
  ]
}

const AMZN_eventDrivenInsightGeneration: AccomplishmentCategory = {
  id: "amazon-2",
  variants: [
    { variant: "Java, Gremlin & AWS Neptune Graph Database Insight Generation"}
  ],
  items: [
    {
      id: "amazon-2-1",
      variants: [{
        variant: "Built prototype AWS Lambda & SNS graph stream event trigger system capable of processing 1M events per hour"
      }]
    }
  ]
}

const AMZN_orderRateMonitoring: AccomplishmentCategory = {
  id: "amazon-3",
  variants: [
    { variant: "Typescript/Node.js, Java/Apache Flink, AWS Sagemaker multimodel Inference time series anomaly detection w/React UI", keywords: [""], industries: [] as Industry[]}
  ],
  items: [{
    id: "amazon-3-1",
    variants: [
      {variant: "Updated source code, developed ops runbook, communicated with stakeholders, and led training for handoff of order rate anomaly tech triage from telemetry on call to 24/7 consumer tech services team"}
    ]
  }]
}

const operationalExcellence_cdkUpgrades: Item = {
  id: "cdkUpgrades",
  variants: [
    { variant: "Upgraded, refactored & standardized CloudFormation architecture to AWS CDK V2 on 14 deployment pipelines" }
  ]
}

const operationalExcellence_onCallVelocity: Item = {
  id: "onCallVelocity",
  variants: [
    { variant: "Joined on-call rotation 60 days ahead of schedule, debugged & recovered service on Tier 1.5 and Tier 2 outages" }
  ]
}

const operationalExcellence_pipelineBlocks: Item = {
  id: "pipelineBlocks",
  variants: [
    { variant: "Reduced CI/CD pipeline block ticket time from 9.4 to 1.7 days & resolved 471 issues (stories + trouble tickets)" }
  ]
}

const operationalExcellence_pullRequestCount: Item = {
  id: "pullRequestCount",
  variants: [
    { variant: "Merged 136 pull requests in Typescript, Java, Kotlin, Python & shell script - 100,000+ lines of code changed" }
  ]
}

const AMZN_operationalExcellence: AccomplishmentCategory = {
  id: "amazon-4",
  variants: [
    { variant: "Operational Excellence", keywords: [""], industries: [] as Industry[]}
  ],
  items: [operationalExcellence_cdkUpgrades, operationalExcellence_onCallVelocity, operationalExcellence_pipelineBlocks, operationalExcellence_pullRequestCount]
}

const AMZN = {
  entity: "Amazon",
  role: "Software Development Engineer",
  start: new Date("2022-08-22"),
  end: new Date("2023-03-22"),
  accomplishments: [
    AMZN_refundAuditor,
    AMZN_eventDrivenInsightGeneration,
    AMZN_orderRateMonitoring,
    AMZN_operationalExcellence
  ]
}

const pareto_pullRequestCount: Item = {
  id: "pullRequestCount",
  variants: [
    { variant: "Merged 50 pull requests representing more than 200 commits" }
  ]
}

const pareto_CICD: Item = {
  id: "cicd",
  variants: [
    { variant: "Set up full CI/CD pipeline with unit tests, integration tests, code quality checks, and test deployments" }
  ]
}

const pareto_paidMaintainer: Item = {
  id: "paidMaintainer",
  variants: [
    { variant: "Served as paid maintainer and volunteer engineering manager on project, attracting 15 volunteer contributors" }
  ]
}

const pareto_codeQuality: Item = {
  id: "codeQuality",
  variants: [
    { variant: "Established and documented repository coding standards, issue templates, issue labeling practices, and testing policies" }
  ]
}

const OSS_Pareto: AccomplishmentCategory = {
  id: "oss_pareto",
  variants: [
    { variant: "React, AWS API Gateway, Websocket, Serverless Node.js & Vercel based Mentorship Platform" }
  ],
  items: [ pareto_pullRequestCount, pareto_CICD, pareto_paidMaintainer, pareto_codeQuality]
}

const education_courses: Item = {
  id: "education_certifications",
  variants: [
    { variant: "Completed a comprehensive program of self-study in CS including data structures & algorithms, math for machine learning, and system design"}
  ]
}

const education_certifications: Item = {
  id: "education_certifications",
  variants: [
    { variant: "Completed professional certificates in data science (18 months), full stack development (10 months), and machine learning (11 weeks)"}
  ]
}

const OSS_Education: AccomplishmentCategory = {
  id: "oss_education",
  variants: [
    { variant: "MIT xPro, HarvardX, and Open Courseware"}
  ],
  items: [education_certifications, education_courses]
}

const OSS_RailsDevs: AccomplishmentCategory = {
  id: "oss_railsdevs",
  variants: [] as ItemVariant[],
  items: [
    {
      id: "railsdevs",
      variants: [{
        variant: "Implemented notification system for Ruby on Rails/Postgres based reverse job board"
      }]
    }
  ]
}

const OSS: Job = {
  id: "oss",
  variants: [
    { variant: "OSS Sabbatical & Educational Break"}
  ],
  entity: "",
  role: "OSS Sabbatical & Educational Break",
  start: new Date("2020-08-20"),
  end: new Date("2022-07-22"),
  accomplishments: [ OSS_Pareto, OSS_Education, OSS_RailsDevs]
}

const OPG_general: AccomplishmentCategory = {
  id: "opg_general",
  variants: [] as ItemVariant[],
  items: [
    {
      id: "devTeam",
      variants: [{
        variant: "Led 4-person dev team (and participated as IC) to build a b2b data analytics platform for Twitch streaming media built on Scala, Spring, PostgreSQL and Redis"
      }]
    },
    {
      id: "microservices",
      variants: [{
        variant: "Built message-based microservices & REST API integrations for calendar, payday loans, & sponsored content"
      }]
    },
    {
      id: "machineLearning",
      variants: [{
        variant: "Developed a machine learning driven talent management SaaS, processing $20M+ in sponsored content payments"
      }]
    },
    {
      id: "amazonAppStore",
      variants: [{
        variant: "Debugged tablet streaming & embedded software issues for mobile esports events with the Amazon App Store "
      }]
    },
    {
      id: "partnerships",
      variants: [{
        variant: "Led successful technical collaborations with industry partners at Facebook, Microsoft, NVIDIA, Intel & Twitch"
      }]
    },
  ]
}

const OPG: Job = {
  id: 'online-performers-group',
  variants: [
    { variant: "Co-founder & Acting CTO"}
  ],
  entity: "Online Performers Group",
  role: "Co-founder & Acting CTO",
  start: new Date("2015-09-01"),
  end: new Date("2020-07-13"),
  accomplishments: [OPG_general]
}

const BARTELL_general: AccomplishmentCategory = {
  id: "bartell_general",
  variants: [] as ItemVariant[],
  items: [
    {
      id: "bartell-webapp",
      variants: [{
        variant: "Developed PHP & MySQL dispatch & real-time IoT GPS tracking app with geofencing + adverse incident reporting, tracking fleet location & passengers for an airport shuttle service with more than 2M riders per year."
      }]
    }
  ]
}

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
  accomplishments: [BARTELL_general]
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