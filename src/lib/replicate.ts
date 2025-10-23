/**
 * Replicate API Integration
 * Strategic AI model integration for WFD Compliance Platform
 */

const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;
const BASE_URL = 'https://api.replicate.com/v1';

interface ReplicateConfig {
  model: string;
  input: Record<string, unknown>;
}

interface ReplicatePrediction {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  output?: unknown;
  error?: string;
  logs?: string;
}

/**
 * Create a prediction with Replicate API
 */
async function createPrediction(config: ReplicateConfig): Promise<ReplicatePrediction> {
  const response = await fetch(`${BASE_URL}/predictions`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: config.model,
      input: config.input,
    }),
  });

  if (!response.ok) {
    throw new Error(`Replicate API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get prediction status
 */
async function getPrediction(id: string): Promise<ReplicatePrediction> {
  const response = await fetch(`${BASE_URL}/predictions/${id}`, {
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Replicate API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Wait for prediction to complete
 */
async function waitForPrediction(id: string, maxWaitTime = 60000): Promise<ReplicatePrediction> {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWaitTime) {
    const prediction = await getPrediction(id);
    
    if (prediction.status === 'succeeded' || prediction.status === 'failed') {
      return prediction;
    }
    
    // Wait 1 second before polling again
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error('Prediction timeout');
}

/**
 * Generate an image using Google Imagen 4 Fast
 */
export async function generateImage(prompt: string): Promise<string> {
  const model = import.meta.env.VITE_REPLICATE_IMAGE_MODEL || 'google/imagen-4-fast';
  
  const prediction = await createPrediction({
    model,
    input: {
      prompt,
      aspect_ratio: '1:1',
      output_format: 'png',
    },
  });

  const result = await waitForPrediction(prediction.id);
  
  if (result.status === 'failed') {
    throw new Error(result.error || 'Image generation failed');
  }

  return result.output as string;
}

/**
 * Extract text from PDF using Datalab Marker
 */
export async function extractTextFromPDF(pdfUrl: string): Promise<{ markdown: string; json: unknown }> {
  const model = import.meta.env.VITE_REPLICATE_OCR_MODEL || 'datalab-to/marker';
  
  const prediction = await createPrediction({
    model,
    input: {
      pdf_url: pdfUrl,
    },
  });

  const result = await waitForPrediction(prediction.id, 120000); // 2 min timeout for PDFs
  
  if (result.status === 'failed') {
    throw new Error(result.error || 'PDF extraction failed');
  }

  return result.output as { markdown: string; json: unknown };
}

/**
 * OCR - Extract text from image with bounding boxes
 */
export async function extractTextFromImage(imageUrl: string): Promise<unknown> {
  const model = import.meta.env.VITE_REPLICATE_TEXT_EXTRACT_MODEL || 'datalab-to/ocr';
  
  const prediction = await createPrediction({
    model,
    input: {
      image: imageUrl,
    },
  });

  const result = await waitForPrediction(prediction.id);
  
  if (result.status === 'failed') {
    throw new Error(result.error || 'OCR failed');
  }

  return result.output;
}

/**
 * Upscale an image using Crystal Upscaler
 */
export async function upscaleImage(imageUrl: string, scaleFactor: number = 2): Promise<string> {
  const model = import.meta.env.VITE_REPLICATE_UPSCALE_MODEL || 'philz1337x/crystal-upscaler';
  
  const prediction = await createPrediction({
    model,
    input: {
      image: imageUrl,
      scale: scaleFactor,
    },
  });

  const result = await waitForPrediction(prediction.id);
  
  if (result.status === 'failed') {
    throw new Error(result.error || 'Image upscaling failed');
  }

  return result.output as string;
}

/**
 * Generate video using Google Veo 3.1 Fast
 */
export async function generateVideo(prompt: string, duration: number = 5): Promise<string> {
  const model = import.meta.env.VITE_REPLICATE_VIDEO_MODEL || 'google/veo-3.1-fast';
  
  const prediction = await createPrediction({
    model,
    input: {
      prompt,
      duration_seconds: duration,
    },
  });

  const result = await waitForPrediction(prediction.id, 300000); // 5 min timeout for videos
  
  if (result.status === 'failed') {
    throw new Error(result.error || 'Video generation failed');
  }

  return result.output as string;
}

/**
 * Generate high-quality video using ByteDance Seedance-1-Pro
 * Supports text-to-video and image-to-video at 480p/1080p for 5s or 10s
 */
export async function generateVideoSeedance(
  prompt: string,
  options?: {
    duration?: 5 | 10;
    resolution?: '480p' | '1080p';
    referenceImage?: string;
    seed?: number;
    cfgScale?: number;
  }
): Promise<string> {
  const model = import.meta.env.VITE_REPLICATE_SEEDANCE_MODEL || 'bytedance/seedance-1-pro';
  
  const input: Record<string, unknown> = {
    prompt,
    duration: options?.duration || 5,
    resolution: options?.resolution || '1080p',
  };

  // Add optional parameters
  if (options?.referenceImage) {
    input.image = options.referenceImage;
  }
  if (options?.seed !== undefined) {
    input.seed = options.seed;
  }
  if (options?.cfgScale !== undefined) {
    input.cfg_scale = options.cfgScale;
  }

  const prediction = await createPrediction({
    model,
    input,
  });

  const result = await waitForPrediction(prediction.id, 600000); // 10 min timeout for high-quality videos
  
  if (result.status === 'failed') {
    throw new Error(result.error || 'Seedance video generation failed');
  }

  return result.output as string;
}

/**
 * Batch process multiple images
 */
export async function batchProcessImages(
  images: string[],
  processor: (imageUrl: string) => Promise<unknown>
): Promise<unknown[]> {
  return Promise.all(images.map(processor));
}
