import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useReplicate } from '@/hooks/use-replicate';
import { useState } from 'react';
import { Loader2, Download, FileText, Image as ImageIcon, Video, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AIToolsPanel() {
  const [imagePrompt, setImagePrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [seedancePrompt, setSeedancePrompt] = useState('');
  const [seedanceDuration, setSeedanceDuration] = useState<5 | 10>(5);
  const [seedanceResolution, setSeedanceResolution] = useState<'480p' | '1080p'>('1080p');
  const [seedanceImage, setSeedanceImage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const { 
    isLoading, 
    generateImage, 
    extractPDF, 
    extractText, 
    upscaleImage, 
    generateVideo,
    generateVideoSeedance 
  } = useReplicate();

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    const result = await generateImage(imagePrompt);
    setGeneratedImage(result as string);
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim()) return;
    const result = await generateVideo(videoPrompt, 5);
    setGeneratedVideo(result as string);
  };

  const handleGenerateSeedanceVideo = async () => {
    if (!seedancePrompt.trim()) return;
    const result = await generateVideoSeedance(seedancePrompt, {
      duration: seedanceDuration,
      resolution: seedanceResolution,
      referenceImage: seedanceImage.trim() || undefined,
    });
    setGeneratedVideo(result as string);
  };

  const handleExtractPDF = async () => {
    if (!pdfUrl.trim()) return;
    const result = await extractPDF(pdfUrl);
    setExtractedText(result.markdown);
  };

  const handleExtractText = async () => {
    if (!imageUrl.trim()) return;
    const result = await extractText(imageUrl);
    setExtractedText(JSON.stringify(result, null, 2));
  };

  const handleUpscaleImage = async () => {
    if (!imageUrl.trim()) return;
    const result = await upscaleImage(imageUrl, 2);
    setGeneratedImage(result as string);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Content Tools
        </CardTitle>
        <CardDescription>
          Generate images, process documents, and create videos for your reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="image">
              <ImageIcon className="w-4 h-4 mr-2" />
              Image
            </TabsTrigger>
            <TabsTrigger value="video">
              <Video className="w-4 h-4 mr-2" />
              Video
            </TabsTrigger>
            <TabsTrigger value="seedance">
              <Video className="w-4 h-4 mr-2" />
              Seedance Pro
            </TabsTrigger>
            <TabsTrigger value="pdf">
              <FileText className="w-4 h-4 mr-2" />
              PDF Extract
            </TabsTrigger>
            <TabsTrigger value="ocr">
              <FileText className="w-4 h-4 mr-2" />
              OCR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-prompt">Image Prompt</Label>
              <Textarea
                id="image-prompt"
                placeholder="Describe the image you want to generate..."
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              onClick={handleGenerateImage} 
              disabled={isLoading || !imagePrompt.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
            {generatedImage && (
              <div className="mt-4">
                <img src={generatedImage} alt="Generated" className="w-full rounded-lg" />
                <Button variant="outline" className="mt-2 w-full" asChild>
                  <a href={generatedImage} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </a>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-prompt">Video Prompt (Fast)</Label>
              <Textarea
                id="video-prompt"
                placeholder="Describe the video you want to generate..."
                value={videoPrompt}
                onChange={(e) => setVideoPrompt(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              onClick={handleGenerateVideo} 
              disabled={isLoading || !videoPrompt.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Generate Video (5s, Fast)
                </>
              )}
            </Button>
            {generatedVideo && (
              <div className="mt-4">
                <video src={generatedVideo} controls className="w-full rounded-lg" />
                <Button variant="outline" className="mt-2 w-full" asChild>
                  <a href={generatedVideo} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </a>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="seedance" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seedance-prompt">Video Prompt (High Quality)</Label>
              <Textarea
                id="seedance-prompt"
                placeholder="The sun rises slowly between tall buildings..."
                value={seedancePrompt}
                onChange={(e) => setSeedancePrompt(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <select
                  id="duration"
                  className="w-full p-2 border rounded-md"
                  value={seedanceDuration}
                  onChange={(e) => setSeedanceDuration(Number(e.target.value) as 5 | 10)}
                >
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resolution">Resolution</Label>
                <select
                  id="resolution"
                  className="w-full p-2 border rounded-md"
                  value={seedanceResolution}
                  onChange={(e) => setSeedanceResolution(e.target.value as '480p' | '1080p')}
                >
                  <option value="480p">480p (Faster)</option>
                  <option value="1080p">1080p (Higher Quality)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference-image">Reference Image URL (Optional)</Label>
              <Input
                id="reference-image"
                type="url"
                placeholder="https://example.com/reference.jpg"
                value={seedanceImage}
                onChange={(e) => setSeedanceImage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Add a reference image for image-to-video generation
              </p>
            </div>
            <Button 
              onClick={handleGenerateSeedanceVideo} 
              disabled={isLoading || !seedancePrompt.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating (this may take several minutes)...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Generate Seedance Pro Video
                </>
              )}
            </Button>
            {generatedVideo && (
              <div className="mt-4">
                <video src={generatedVideo} controls className="w-full rounded-lg" />
                <Button variant="outline" className="mt-2 w-full" asChild>
                  <a href={generatedVideo} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </a>
                </Button>
              </div>
            )}
          </TabsContent>
                <video src={generatedVideo} controls className="w-full rounded-lg" />
                <Button variant="outline" className="mt-2 w-full" asChild>
                  <a href={generatedVideo} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Video
                  </a>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pdf" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdf-url">PDF URL</Label>
              <Input
                id="pdf-url"
                type="url"
                placeholder="https://example.com/document.pdf"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleExtractPDF} 
              disabled={isLoading || !pdfUrl.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Extract Text from PDF
                </>
              )}
            </Button>
            {extractedText && (
              <div className="mt-4">
                <Textarea
                  value={extractedText}
                  readOnly
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="ocr" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleExtractText} 
                disabled={isLoading || !imageUrl.trim()}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Extract Text
                  </>
                )}
              </Button>
              <Button 
                onClick={handleUpscaleImage} 
                disabled={isLoading || !imageUrl.trim()}
                variant="secondary"
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Upscaling...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Upscale (2x)
                  </>
                )}
              </Button>
            </div>
            {extractedText && (
              <div className="mt-4">
                <Textarea
                  value={extractedText}
                  readOnly
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
