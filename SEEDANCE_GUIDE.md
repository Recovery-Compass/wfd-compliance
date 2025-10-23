# ByteDance Seedance-1-Pro Integration

## Model Overview

**bytedance/seedance-1-pro** - Professional video generation with superior quality and control.

### Key Features
- **Text-to-Video**: Generate videos from descriptive prompts
- **Image-to-Video**: Animate static images with motion
- **Dual Duration**: 5-second or 10-second videos
- **Dual Resolution**: 480p (faster) or 1080p (higher quality)
- **Official Model**: Always-on, maintained, predictable pricing

### When to Use Seedance vs. Veo

| Use Seedance-1-Pro When | Use Veo 3.1 Fast When |
|------------------------|----------------------|
| Quality is critical | Speed is priority |
| Need 1080p resolution | 5s quick clips sufficient |
| Cinematic depth required | Cost is primary concern |
| Image-to-video needed | Simple text-to-video |
| Professional outputs | Prototyping/testing |

## Usage Examples

### Basic Text-to-Video

```typescript
import { generateVideoSeedance } from '@/lib/replicate';

const videoUrl = await generateVideoSeedance(
  'The sun rises slowly between tall buildings. Bicycle tires roll over a dew-covered street at dawn.'
);
```

### Advanced Options

```typescript
const videoUrl = await generateVideoSeedance(
  'Professional recovery program showcase with cinematic quality',
  {
    duration: 10,           // 5 or 10 seconds
    resolution: '1080p',    // '480p' or '1080p'
    referenceImage: 'https://example.com/reference.jpg', // Optional
    seed: 42,               // Optional: for reproducible results
    cfgScale: 7.5,          // Optional: prompt adherence strength
  }
);
```

### Image-to-Video

```typescript
const videoUrl = await generateVideoSeedance(
  'Slow camera movement revealing the details of the scene',
  {
    duration: 5,
    resolution: '1080p',
    referenceImage: 'https://example.com/photo.jpg', // Animate this image
  }
);
```

### React Hook Usage

```typescript
import { useReplicate } from '@/hooks/use-replicate';

function VideoGenerator() {
  const { generateVideoSeedance, isLoading } = useReplicate();

  const handleGenerate = async () => {
    const video = await generateVideoSeedance(
      'Recovery program success story with emotional impact',
      { duration: 10, resolution: '1080p' }
    );
    console.log('Video URL:', video);
  };

  return (
    <button onClick={handleGenerate} disabled={isLoading}>
      {isLoading ? 'Generating...' : 'Generate Video'}
    </button>
  );
}
```

## Prompt Engineering Tips

### Structure Your Prompts
```
[Camera Movement] Subject and Action. [Style/Atmosphere] Additional details.
```

Example:
```
[Ground-level follow shot] Bicycle tires roll over a dew-covered street at dawn. 
[Cinematic lighting] The cyclist passes through dappled light under a bridge as 
the entire city gradually wakes up.
```

### Good Prompts
- ✅ "A person walking through a forest at sunset, golden light filtering through trees"
- ✅ "Close-up of hands preparing food, steam rising, warm kitchen lighting"
- ✅ "Aerial view of a recovery center campus, peaceful morning atmosphere"

### Avoid
- ❌ Single-word prompts: "nature"
- ❌ Abstract concepts: "hope and healing"
- ❌ Too many disconnected elements

## Use Cases for WFD Compliance

### 1. Program Showcases
```typescript
// Create 10-second high-quality program overview
const showcase = await generateVideoSeedance(
  'Wide shot of recovery program participants in group therapy session, warm natural lighting, professional documentary style',
  { duration: 10, resolution: '1080p' }
);
```

### 2. Facility Tours
```typescript
// Virtual tour of facilities
const tour = await generateVideoSeedance(
  'Smooth camera movement through modern recovery center hallway, natural daylight, clean professional environment',
  { duration: 10, resolution: '1080p' }
);
```

### 3. Success Stories
```typescript
// Emotional testimonial backgrounds
const story = await generateVideoSeedance(
  'Person sitting in comfortable interview setting, soft lighting, hope and recovery theme',
  { duration: 5, resolution: '1080p' }
);
```

### 4. Grant Applications
```typescript
// Professional presentation materials
const grant = await generateVideoSeedance(
  'Professional office setting with grant documents, organized workspace, trustworthy atmosphere',
  { duration: 5, resolution: '1080p' }
);
```

### 5. Social Media Content
```typescript
// Quick social media clips
const social = await generateVideoSeedance(
  'Inspiring recovery milestone celebration, uplifting atmosphere, community feeling',
  { duration: 5, resolution: '480p' } // 480p faster for social media
);
```

## Performance & Pricing

### Processing Time
- **5 seconds @ 480p**: ~2-3 minutes
- **5 seconds @ 1080p**: ~3-5 minutes
- **10 seconds @ 480p**: ~4-6 minutes
- **10 seconds @ 1080p**: ~5-10 minutes

### Cost Optimization
1. Use 480p for social media and quick previews
2. Reserve 1080p for professional presentations
3. Generate 5s clips when possible (faster, cheaper)
4. Cache results in Supabase storage for reuse
5. Use seed parameter for reproducible results (avoid regenerating)

## Integration with Storage

```typescript
import { generateVideoSeedance } from '@/lib/replicate';
import { saveGeneratedVideo } from '@/lib/storage';

async function createAndSaveVideo(prompt: string) {
  // Generate video
  const videoUrl = await generateVideoSeedance(prompt, {
    duration: 10,
    resolution: '1080p',
  });
  
  // Save to Supabase storage
  const storedUrl = await saveGeneratedVideo(
    videoUrl,
    prompt,
    'bytedance/seedance-1-pro'
  );
  
  return storedUrl;
}
```

## UI Component

The Seedance-1-Pro integration is available in the AI Tools Panel:

1. Navigate to the "Seedance Pro" tab
2. Enter your video prompt
3. Select duration (5s or 10s)
4. Choose resolution (480p or 1080p)
5. Optionally add a reference image URL
6. Click "Generate Seedance Pro Video"

## Troubleshooting

### Long Generation Times
- Normal for high-quality videos (5-10 minutes)
- 1080p takes longer than 480p
- 10s takes longer than 5s
- Use 480p for faster results

### "Prediction timeout" Error
- Increase timeout in `waitForPrediction()` call
- Currently set to 10 minutes (600000ms)
- May need more for complex prompts

### Low Quality Output
- Try increasing cfgScale (7-15 range)
- Add more descriptive details to prompt
- Use 1080p instead of 480p
- Check reference image quality (if using)

### CORS Errors
- Reference images must be publicly accessible
- Ensure proper URL format
- Use HTTPS URLs

## Best Practices

1. **Start with 5s @ 480p** for testing prompts
2. **Use descriptive camera directions** in prompts
3. **Keep prompts focused** on single coherent scenes
4. **Save successful prompts** for reuse
5. **Cache generated videos** to avoid regeneration costs
6. **Monitor usage** via Replicate dashboard
7. **Use reference images** for consistent style/subject

## Environment Variables

Add to `.env.local`:
```bash
VITE_REPLICATE_SEEDANCE_MODEL=bytedance/seedance-1-pro
```

## API Reference

### Function Signature
```typescript
async function generateVideoSeedance(
  prompt: string,
  options?: {
    duration?: 5 | 10;
    resolution?: '480p' | '1080p';
    referenceImage?: string;
    seed?: number;
    cfgScale?: number;
  }
): Promise<string>
```

### Parameters
- `prompt` (required): Descriptive text for video generation
- `duration` (optional): Video length in seconds (5 or 10, default: 5)
- `resolution` (optional): Output resolution ('480p' or '1080p', default: '1080p')
- `referenceImage` (optional): URL of image to animate
- `seed` (optional): Random seed for reproducibility
- `cfgScale` (optional): Classifier-free guidance scale (higher = more prompt adherence)

### Returns
- URL string of the generated video (MP4 format)

## Next Steps

1. Test with your use cases in the AI Tools Panel
2. Integrate into your report generation workflow
3. Create library of successful prompts
4. Set up automated video generation for recurring needs
5. Monitor costs and optimize resolution/duration choices
