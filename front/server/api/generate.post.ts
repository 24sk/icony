import { defineEventHandler, readBody } from "h3";
import { useRuntimeConfig } from "#imports";
import type { GenerateRequest, GenerateResponse } from "~/types/api";

export default defineEventHandler(
  async (event): Promise<GenerateResponse | { error: string }> => {
    const config = useRuntimeConfig();
    const body = await readBody<GenerateRequest>(event);

    if (!body?.prompt) {
      return { error: "プロンプトが未入力です。" };
    }

    const fullPrompt = body.imageUrl
      ? `以下の画像を参考にして、${body.prompt} → 画像URL: ${body.imageUrl}`
      : body.prompt;

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.openaiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1024x1024",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error?.error?.message || "OpenAI APIの呼び出しに失敗しました。",
      };
    }

    const data = await response.json();

    const imageUrl = data?.data?.[0]?.url;
    if (!imageUrl) {
      return { error: "画像生成に失敗しました。" };
    }

    return { imageUrl };
  }
);
