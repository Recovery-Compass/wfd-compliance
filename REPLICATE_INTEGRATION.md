# Replicate Integration for WFD Compliance

Strategic AI model integration using Replicate's API.

## Features

### 1. **Image Generation** (Google Imagen 4 Fast)
- Generate marketing materials, report graphics, and visual content
- Cost-effective with high quality output
- Use case: Program promotional materials, social media content

### 2. **Document Processing** (Datalab Marker)
- Convert PDFs to markdown for easy processing
- Extract structured data from grant documents
- Use case: Automated grant application processing

### 3. **OCR** (Datalab OCR)
- Extract text from scanned documents and images
- 90+ language support with bounding boxes
- Use case: Digitizing handwritten forms, processing receipts

### 4. **Image Upscaling** (Crystal Upscaler)
- Enhance low-quality images of participants
- Optimized for portraits and faces
- Use case: Improving photo quality for official documents

### 5. **Video Generation** (Google Veo 3.1 Fast)
- Create promotional videos for programs
- Generate content for social media and outreach
- Use case: Program showcases, participant testimonials

## Setup

1. Get your Replicate API token from https://replicate.com/account/api-tokens

2. Add to your `.env.local`:
```bash
VITE_REPLICATE_API_TOKEN=your_token_here
```

3. (Optional) Customize models in `.env.local`:
```bash
VITE_REPLICATE_IMAGE_MODEL=google/imagen-4-fast
VITE_REPLICATE_OCR_MODEL=datalab-to/marker
VITE_REPLICATE_UPSCALE_MODEL=philz1337x/crystal-upscaler
VITE_REPLICATE_VIDEO_MODEL=google/veo-3.1-fast
VITE_REPLICATE_TEXT_EXTRACT_MODEL=datalab-to/ocr
```

## Usage

### In React Components

```typescript
import { useReplicate } from '@/hooks/use-replicate';

function MyComponent() {
  const { generateImage, extractPDF, isLoading } = useReplicate();

  const handleGenerate = async () => {
    const imageUrl = await generateImage('A recovery program success story');
    console.log(imageUrl);
  };

  return (
    <button onClick={handleGenerate} disabled={isLoading}>
      Generate Image
    </button>
  );
}
```

### Direct API Usage

```typescript
import { generateImage, extractTextFromPDF } from '@/lib/replicate';

// Generate an image
const imageUrl = await generateImage('Professional headshot');

// Extract text from PDF
const { markdown, json } = await extractTextFromPDF('https://example.com/doc.pdf');
```

## UI Component

Add the AI Tools Panel to any page:

```typescript
import { AIToolsPanel } from '@/components/AIToolsPanel';

function AdminPage() {
  return (
    <div>
      <AIToolsPanel />
    </div>
  );
}
```

## Cost Optimization

- **Imagen 4 Fast**: Use for most image generation (cheaper than Ultra)
- **Veo 3.1 Fast**: Use for video generation (cheaper than standard)
- **Batch Processing**: Process multiple items in parallel for efficiency
- **Caching**: Store generated assets in Supabase Storage to avoid regeneration

## Best Practices

1. **Validate inputs** before sending to API
2. **Handle timeouts** gracefully (PDFs/videos take longer)
3. **Store results** in Supabase for reuse
4. **Monitor costs** via Replicate dashboard
5. **Use appropriate models** for each task (Fast vs Ultra)

## Model Selection Guide

| Task | Recommended Model | Use When |
|------|------------------|----------|
| Quick images | google/imagen-4-fast | Speed/cost matters |
| High-quality images | google/imagen-4-ultra | Quality critical |
| PDF processing | datalab-to/marker | Need markdown output |
| Text extraction | datalab-to/ocr | Need bounding boxes |
| Portrait upscaling | philz1337x/crystal-upscaler | Faces/headshots |
| Video (fast) | google/veo-3.1-fast | Quick videos |
| Video (quality) | google/veo-3.1 | Premium quality |

## Workflow Integration Points

### 1. Participant Management
- Upscale participant photos for reports
- Generate professional headshots for staff profiles

### 2. Grant Applications
- Extract text from PDF grant documents
- OCR scanned forms and receipts
- Generate marketing materials for applications

### 3. Program Documentation
- Create video showcases of program success
- Generate infographics for reporting
- Process document uploads automatically

### 4. Compliance Reporting
- Extract data from scanned compliance documents
- Generate visual reports for stakeholders
- Create presentation materials

## Error Handling

All functions throw descriptive errors. Use try-catch:

```typescript
try {
  const result = await generateImage(prompt);
} catch (error) {
  console.error('Generation failed:', error.message);
  // Show user-friendly error message
}
```

## Environment Variables

Required:
- `VITE_REPLICATE_API_TOKEN` - Your Replicate API token

Optional (with defaults):
- `VITE_REPLICATE_IMAGE_MODEL` - Image generation model
- `VITE_REPLICATE_OCR_MODEL` - OCR model
- `VITE_REPLICATE_UPSCALE_MODEL` - Upscaling model
- `VITE_REPLICATE_VIDEO_MODEL` - Video generation model
- `VITE_REPLICATE_TEXT_EXTRACT_MODEL` - Text extraction model
