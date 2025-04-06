import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readMultipartFormData, defineEventHandler } from "h3";
import { randomUUID } from "crypto";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();

const {
  awsRegion,
  s3Endpoint,
  s3BucketName,
  awsAccessKeyId,
  awsSecretAccessKey,
} = config;

const s3 = new S3Client({
  region: awsRegion,
  endpoint: s3Endpoint,
  forcePathStyle: true,
  credentials: {
    accessKeyId: awsAccessKeyId || "",
    secretAccessKey: awsSecretAccessKey || "",
  },
});

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  const file = formData?.find(({ name }) => name === "file");
  if (!file || !file.data || !file.filename) {
    return {
      error: "画像ファイルが送信されていません。",
    };
  }

  const extension = file.filename.split(".").pop() || "jpg";
  const objectKey = `${randomUUID()}.${extension}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: s3BucketName,
      Key: objectKey,
      Body: file.data,
      ContentType: file.type,
    })
  );

  const publicUrl = `${s3Endpoint}/${s3BucketName}/${objectKey}`;

  return {
    url: publicUrl,
  };
});
