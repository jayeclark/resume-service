import { ExternalLinks, Resume } from "../../model/Resume/Resume";
import { FULLRESUME_EXPERIENCE } from "./fullresume_experience";


export const FULL_RESUME: Resume = {
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
      FULLRESUME_EXPERIENCE
    ]
  }



