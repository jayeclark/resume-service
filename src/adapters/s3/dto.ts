import { Resume } from "../../model/Resume";

export function validateResumeAndConvertToJSONString(resumeObject: Resume): string {
  const obj = JSON.stringify(resumeObject);
  return obj;
}