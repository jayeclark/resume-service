import { Job } from "../../model/Resume/ResumeSectionEntry";
import { BulletPoint } from "../../model/Resume/Item";

const BARTELL_general_items: BulletPoint[] = [
  {
  id: "bartell-webapp",
    itemCategoryDisplayRequired: false,
    variants: [{
      variant: "Developed PHP & MySQL dispatch & real-time IoT GPS tracking app with geofencing + adverse incident reporting, tracking fleet location & passengers for an airport shuttle service with more than 2M riders per year."
    }]
  }
]

export const BARTELL: Job = {
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