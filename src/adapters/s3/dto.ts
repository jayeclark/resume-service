import { Resume } from "../../model/Resume/Resume";

export function validateResumeAndConvertToJSONString(resumeObject: Resume): string {
  const obj = JSON.stringify(resumeObject);
  return obj;
}