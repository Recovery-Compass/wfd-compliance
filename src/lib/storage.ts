/**
 * Supabase Storage Integration for Replicate Assets
 * Store and manage AI-generated content
 */

import { supabase } from './supabase';

interface UploadOptions {
  bucket: string;
  path: string;
  file: Blob | File;
  contentType?: string;
}

interface AssetMetadata {
  prompt?: string;
  model?: string;
  generatedAt: string;
  type: 'image' | 'video' | 'document';
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadAsset(options: UploadOptions): Promise<string> {
  const { bucket, path, file, contentType } = options;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      contentType: contentType || 'application/octet-stream',
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Upload AI-generated content from URL
 */
export async function uploadFromUrl(
  url: string,
  bucket: string,
  fileName: string,
  metadata?: AssetMetadata
): Promise<string> {
  // Fetch the content
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch content: ${response.statusText}`);
  }

  const blob = await response.blob();
  const contentType = response.headers.get('content-type') || 'application/octet-stream';

  // Generate path with metadata
  const timestamp = new Date().toISOString().split('T')[0];
  const path = `ai-generated/${timestamp}/${fileName}`;

  // Upload to Supabase
  const publicUrl = await uploadAsset({
    bucket,
    path,
    file: blob,
    contentType,
  });

  // Store metadata if provided
  if (metadata) {
    await supabase
      .from('ai_assets')
      .insert({
        url: publicUrl,
        bucket,
        path,
        ...metadata,
      });
  }

  return publicUrl;
}

/**
 * Save generated image to storage
 */
export async function saveGeneratedImage(
  imageUrl: string,
  prompt: string,
  model: string
): Promise<string> {
  const fileName = `image-${Date.now()}.png`;
  
  return uploadFromUrl(imageUrl, 'assets', fileName, {
    prompt,
    model,
    generatedAt: new Date().toISOString(),
    type: 'image',
  });
}

/**
 * Save generated video to storage
 */
export async function saveGeneratedVideo(
  videoUrl: string,
  prompt: string,
  model: string
): Promise<string> {
  const fileName = `video-${Date.now()}.mp4`;
  
  return uploadFromUrl(videoUrl, 'assets', fileName, {
    prompt,
    model,
    generatedAt: new Date().toISOString(),
    type: 'video',
  });
}

/**
 * Save processed document to storage
 */
export async function saveProcessedDocument(
  content: string,
  originalUrl: string,
  model: string
): Promise<string> {
  const fileName = `document-${Date.now()}.md`;
  const blob = new Blob([content], { type: 'text/markdown' });
  const path = `processed-docs/${new Date().toISOString().split('T')[0]}/${fileName}`;

  const publicUrl = await uploadAsset({
    bucket: 'documents',
    path,
    file: blob,
    contentType: 'text/markdown',
  });

  // Store metadata
  await supabase
    .from('ai_assets')
    .insert({
      url: publicUrl,
      bucket: 'documents',
      path,
      prompt: originalUrl,
      model,
      generatedAt: new Date().toISOString(),
      type: 'document',
    });

  return publicUrl;
}

/**
 * List AI-generated assets
 */
export async function listAIAssets(type?: 'image' | 'video' | 'document') {
  let query = supabase
    .from('ai_assets')
    .select('*')
    .order('generatedAt', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to list assets: ${error.message}`);
  }

  return data;
}

/**
 * Delete AI asset
 */
export async function deleteAIAsset(id: string) {
  // Get asset info
  const { data: asset, error: fetchError } = await supabase
    .from('ai_assets')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    throw new Error(`Failed to fetch asset: ${fetchError.message}`);
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from(asset.bucket)
    .remove([asset.path]);

  if (storageError) {
    throw new Error(`Failed to delete from storage: ${storageError.message}`);
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from('ai_assets')
    .delete()
    .eq('id', id);

  if (dbError) {
    throw new Error(`Failed to delete from database: ${dbError.message}`);
  }
}
