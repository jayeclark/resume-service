import { PutObjectCommand, GetObjectCommand, HeadBucketCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";
import { Resume } from "../../model/Resume";
import { validateResumeAndConvertToJSONString } from "./dto";

const BUCKET_NAME = `mydevinterview-resume-service-${process.env.STAGE}-${process.env.region}`;


export async function doesBucketExist(bucketName: string) {
  const response = await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }))
  return response.$metadata.httpStatusCode === 200 ? true : false;
}

export async function createBucket(bucketName: string) {
  if (!doesBucketExist(bucketName)) {
    try {
      return await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
    } catch (e) {
      console.log("Error", e);
    }
  }
}

export async function getResumeDocument(key: string) {
  try {
    s3Client.send(new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    }))
  } catch (e) {
    console.log("Error", e)
  }
}

export async function saveResumeDocument(key: string, resume: Resume) {
  try {
    createBucket(BUCKET_NAME);
    s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: validateResumeAndConvertToJSONString(resume)
    }))
  } catch (e) {
    console.log("Error", e)
  }
}