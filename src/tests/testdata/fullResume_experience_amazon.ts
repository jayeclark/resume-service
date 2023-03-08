import { ItemCategory, SectionEntry } from "../../model/Resume/ResumeSectionEntry";
import { BulletPoint } from "../../model/Resume/Item";
import { Industry } from "../../model/JobDescription";

const AMZN_refundAuditor: ItemCategory = {
  id: "refund-auditor",
  variants: [
    "nonsense",
    "more nonsense",
    "Kotlin, AWS Lambda & DynamoDB auditing service project for automated refunds"
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

export const AMZN: SectionEntry = {
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