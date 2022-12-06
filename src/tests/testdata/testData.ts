import { Resume } from "../../model/Resume/Resume";
import { Industry, RawJobDescription } from "../../model/JobDescription";
import { FULL_RESUME } from "./fullResume";

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



export function generateTestResume(referenceData = FULL_RESUME): Resume {
  return referenceData;
}