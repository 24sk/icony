/**
 * 画像生成リクエスト
 */
export interface GenerateRequest {
  /**
   * プロンプト
   */
  prompt: string;
  /**
   * MinIOまたはS3に保存されている画像URL
   */
  imageUrl?: string;
}

/**
 * 画像生成レスポンス
 */
export interface GenerateResponse {
  /**
   * 生成された画像URL
   */
  imageUrl: string;
}
