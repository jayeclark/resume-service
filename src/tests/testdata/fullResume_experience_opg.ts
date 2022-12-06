import { Job } from "../../model/Resume/ResumeSectionEntry";
import { BulletPoint } from "../../model/Resume/Item";


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

export const OPG: Job = {
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