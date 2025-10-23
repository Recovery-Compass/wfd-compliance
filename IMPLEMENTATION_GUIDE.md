# Replicate AI Integration - Implementation Guide

## Overview
This implementation integrates Replicate's AI models into your WFD Compliance platform with zero friction, dynamically adapting to your existing workflow.

## Strategic Model Selection

Based on your workflow needs, these models were selected for optimal balance of cost, quality, and speed:

1. **Google Imagen 4 Fast** - Image generation (cost-effective)
2. **Google Veo 3.1 Fast** - Video generation (fast, affordable)
3. **Datalab Marker** - PDF to Markdown conversion
4. **Datalab OCR** - Text extraction with 90+ languages
5. **Crystal Upscaler** - Portrait/face enhancement

## Quick Start

### 1. Run Setup Script
```bash
cd ~/Projects/recovery-compass/wfd-compliance
./scripts/setup-replicate.sh
```

### 2. Configure API Token
Get your token from [Replicate Dashboard](https://replicate.com/account/api-tokens)

Add to `.env.local`:
```bash
VITE_REPLICATE_API_TOKEN=r8_YOUR_TOKEN_HERE
```

### 3. Setup Supabase (Optional - for asset storage)
Run the migration in your Supabase dashboard:
```bash
cat supabase/migrations/ai_assets.sql
```

Create two storage buckets:
- `assets` (public) - for images/videos
- `documents` (public) - for processed documents

### 4. Add UI Component
Import the AI Tools Panel in your admin interface:

```typescript
import { AIToolsPanel } from '@/components/AIToolsPanel';

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1>Admin Dashboard</h1>
      <AIToolsPanel />
      {/* Rest of your dashboard */}
    </div>
  );
}
```

## Integration Points

### A. Participant Management
**Use Case**: Enhance participant photos for official documents

```typescript
import { upscaleImage } from '@/lib/replicate';
import { saveGeneratedImage } from '@/lib/storage';

async function enhanceParticipantPhoto(photoUrl: string) {
  // Upscale the image 2x
  const enhancedUrl = await upscaleImage(photoUrl, 2);
  
  // Save to Supabase storage
  const storedUrl = await saveGeneratedImage(
    enhancedUrl,
    'Enhanced participant photo',
    'crystal-upscaler'
  );
  
  return storedUrl;
}
```

### B. Grant Applications
**Use Case**: Extract text from PDF grant documents

```typescript
import { extractTextFromPDF } from '@/lib/replicate';
import { saveProcessedDocument } from '@/lib/storage';

async function processGrantDocument(pdfUrl: string) {
  // Extract text and structure
  const { markdown, json } = await extractTextFromPDF(pdfUrl);
  
  // Save processed version
  const storedUrl = await saveProcessedDocument(
    markdown,
    pdfUrl,
    'datalab-marker'
  );
  
  return { markdown, json, storedUrl };
}
```

### C. Marketing Materials
**Use Case**: Generate images for social media and reports

```typescript
import { generateImage } from '@/lib/replicate';
import { saveGeneratedImage } from '@/lib/storage';

async function createMarketingImage(prompt: string) {
  // Generate the image
  const imageUrl = await generateImage(prompt);
  
  // Save to storage
  const storedUrl = await saveGeneratedImage(
    imageUrl,
    prompt,
    'google/imagen-4-fast'
  );
  
  return storedUrl;
}
```

### D. Program Showcases
**Use Case**: Create promotional videos

```typescript
import { generateVideo } from '@/lib/replicate';
import { saveGeneratedVideo } from '@/lib/storage';

async function createProgramVideo(description: string) {
  // Generate 5-second video
  const videoUrl = await generateVideo(description, 5);
  
  // Save to storage
  const storedUrl = await saveGeneratedVideo(
    videoUrl,
    description,
    'google/veo-3.1-fast'
  );
  
  return storedUrl;
}
```

### E. Document Processing
**Use Case**: OCR scanned forms and receipts

```typescript
import { extractTextFromImage } from '@/lib/replicate';

async function processScannedForm(imageUrl: string) {
  // Extract text with bounding boxes
  const ocrResult = await extractTextFromImage(imageUrl);
  
  // Process the structured data
  return ocrResult;
}
```

## Usage with React Hook

```typescript
import { useReplicate } from '@/hooks/use-replicate';

function MyComponent() {
  const { 
    generateImage, 
    extractPDF, 
    upscaleImage,
    generateVideo,
    isLoading 
  } = useReplicate({
    onSuccess: (result) => {
      console.log('Success:', result);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  return (
    <div>
      <button 
        onClick={() => generateImage('Recovery program success')}
        disabled={isLoading}
      >
        Generate Image
      </button>
    </div>
  );
}
```

## Cost Optimization Strategies

1. **Use Fast Models**: Prefer `imagen-4-fast` and `veo-3.1-fast` for most use cases
2. **Cache Results**: Store generated assets in Supabase to avoid regeneration
3. **Batch Processing**: Process multiple items in parallel
4. **Monitor Usage**: Check your Replicate dashboard regularly

## Workflow Integration Examples

### Example 1: Automated Report Generation
```typescript
async function generateComplianceReport(data: ReportData) {
  // Generate cover image
  const coverImage = await generateImage(
    'Professional compliance report cover for recovery program'
  );
  
  // Process any attached PDFs
  const processedDocs = await Promise.all(
    data.attachments.map(url => extractTextFromPDF(url))
  );
  
  // Generate summary video
  const summaryVideo = await generateVideo(
    'Overview of recovery program achievements',
    5
  );
  
  return {
    coverImage,
    processedDocs,
    summaryVideo,
  };
}
```

### Example 2: Participant Onboarding
```typescript
async function processParticipantDocuments(documents: Document[]) {
  const results = await Promise.all(
    documents.map(async (doc) => {
      if (doc.type === 'pdf') {
        return extractTextFromPDF(doc.url);
      } else if (doc.type === 'image') {
        return extractTextFromImage(doc.url);
      }
    })
  );
  
  return results;
}
```

### Example 3: Social Media Content
```typescript
async function createSocialMediaPost(programName: string, achievement: string) {
  // Generate image
  const image = await generateImage(
    `Celebratory image for ${programName}: ${achievement}`
  );
  
  // Generate short video
  const video = await generateVideo(
    `Success story: ${achievement}`,
    5
  );
  
  return { image, video };
}
```

## Testing

Test the integration:
```bash
npm run dev
```

Navigate to your admin dashboard and use the AI Tools Panel to:
1. Generate a test image
2. Extract text from a sample PDF
3. Upscale an image
4. Generate a short video

## Monitoring & Maintenance

1. **API Usage**: Monitor at https://replicate.com/account/billing
2. **Error Logs**: Check browser console and network tab
3. **Storage**: Monitor Supabase storage usage
4. **Performance**: Use React DevTools to check render performance

## Troubleshooting

### Issue: "API token not configured"
**Solution**: Add `VITE_REPLICATE_API_TOKEN` to `.env.local`

### Issue: "Prediction timeout"
**Solution**: Increase timeout in `waitForPrediction()` function

### Issue: "Storage upload failed"
**Solution**: Verify Supabase buckets exist and have correct policies

### Issue: "CORS error"
**Solution**: Ensure your domain is whitelisted in Replicate settings

## Next Steps

1. ✅ Run setup script
2. ✅ Add API token to `.env.local`
3. ✅ Run Supabase migration
4. ✅ Add AIToolsPanel to your admin interface
5. ✅ Test each feature
6. ✅ Integrate into your workflows
7. ✅ Monitor usage and costs

## Support

- **Replicate Docs**: https://replicate.com/docs
- **Model Documentation**: See individual model pages on Replicate
- **Integration Issues**: Check REPLICATE_INTEGRATION.md
- **API Status**: https://status.replicate.com

## Files Created

```
wfd-compliance/
├── .env.replicate.template      # Environment template
├── src/
│   ├── lib/
│   │   ├── replicate.ts         # Core API integration
│   │   └── storage.ts           # Supabase storage helpers
│   ├── hooks/
│   │   └── use-replicate.ts     # React hook
│   └── components/
│       └── AIToolsPanel.tsx     # UI component
├── scripts/
│   └── setup-replicate.sh       # Setup automation
├── supabase/
│   └── migrations/
│       └── ai_assets.sql        # Database schema
├── REPLICATE_INTEGRATION.md     # Technical docs
└── IMPLEMENTATION_GUIDE.md      # This file
```
