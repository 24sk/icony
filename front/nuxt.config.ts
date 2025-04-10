// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  runtimeConfig: {
    // サーバー専用（API・ビルド内でのみ参照可能）
    awsRegion: process.env.AWS_REGION,
    s3Endpoint: process.env.S3_ENDPOINT,
    s3BucketName: process.env.S3_BUCKET_NAME,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,

    // クライアントでも使いたい値（例：S3表示URLなど）は public に書く
    public: {
      s3PublicEndpoint: process.env.S3_ENDPOINT,
    },
  },
});
