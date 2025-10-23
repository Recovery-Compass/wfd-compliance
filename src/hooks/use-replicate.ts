import { useState } from 'react';
import { generateImage, extractTextFromPDF, extractTextFromImage, upscaleImage, generateVideo, generateVideoSeedance } from '@/lib/replicate';
import { useToast } from '@/hooks/use-toast';

interface UseReplicateOptions {
  onSuccess?: (result: unknown) => void;
  onError?: (error: Error) => void;
}

export function useReplicate(options?: UseReplicateOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const handleImageGeneration = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const imageUrl = await generateImage(prompt);
      options?.onSuccess?.(imageUrl);
      toast({
        title: 'Success',
        description: 'Image generated successfully',
      });
      return imageUrl;
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePDFExtraction = async (pdfUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await extractTextFromPDF(pdfUrl);
      options?.onSuccess?.(result);
      toast({
        title: 'Success',
        description: 'PDF processed successfully',
      });
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageOCR = async (imageUrl: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await extractTextFromImage(imageUrl);
      options?.onSuccess?.(result);
      toast({
        title: 'Success',
        description: 'Text extracted successfully',
      });
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpscale = async (imageUrl: string, scaleFactor?: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await upscaleImage(imageUrl, scaleFactor);
      options?.onSuccess?.(result);
      toast({
        title: 'Success',
        description: 'Image upscaled successfully',
      });
      return result;
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoGeneration = async (prompt: string, duration?: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const videoUrl = await generateVideo(prompt, duration);
      options?.onSuccess?.(videoUrl);
      toast({
        title: 'Success',
        description: 'Video generated successfully',
      });
      return videoUrl;
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedanceVideoGeneration = async (
    prompt: string,
    options?: {
      duration?: 5 | 10;
      resolution?: '480p' | '1080p';
      referenceImage?: string;
      seed?: number;
      cfgScale?: number;
    }
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const videoUrl = await generateVideoSeedance(prompt, options);
      options?.onSuccess?.(videoUrl);
      toast({
        title: 'Success',
        description: `High-quality video generated (${options?.resolution || '1080p'})`,
      });
      return videoUrl;
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    generateImage: handleImageGeneration,
    extractPDF: handlePDFExtraction,
    extractText: handleImageOCR,
    upscaleImage: handleImageUpscale,
    generateVideo: handleVideoGeneration,
    generateVideoSeedance: handleSeedanceVideoGeneration,
  };
}
