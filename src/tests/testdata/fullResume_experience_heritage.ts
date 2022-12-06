import { Job } from "../../model/Resume/ResumeSectionEntry";
import { BulletPoint } from "../../model/Resume/Item";

const HERITAGE_general_items: BulletPoint[] = [
  {
  id: "heritage-general",
    itemCategoryDisplayRequired: false,
    variants: [{
      variant: "Obtained Construction Supervisor license, remodeled & sold residential real estate while completing dissertation."
    }]
  }
]

export const HERITAGE: Job = {
  id: "heritage",
  variants: [
    { variant: "Developer" },
    { variant: "Owner & General Manager" },
    { variant: "Builder"},
    { variant: "Construction Supervisor"}
  ],
  entity: "Heritage Restoration & Remodeling",
  role: "Developer",
  start: new Date("2007-09-01"),
  end: new Date("2013-07-01"),
  items: HERITAGE_general_items
}