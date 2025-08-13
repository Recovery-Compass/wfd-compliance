/**
 * Cloudflare Worker: Security Headers and WAF
 * Deploy this to Cloudflare Workers and route wfd-compliance.org through it
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // WAF Rules - Block sensitive paths
    const blockedPaths = [
      '/.env',
      '/.git',
      '/wp-admin',
      '/phpMyAdmin',
      '/.aws',
      '/.ssh',
      '/config.json',
      '/package-lock.json',
      '/yarn.lock',
      '/_next/static/*.map', // Source maps
    ];
    
    for (const path of blockedPaths) {
      if (url.pathname.match(new RegExp(path.replace(/\*/g, '.*')))) {
        return new Response('Forbidden', { 
          status: 403,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }
    
    // Rate limiting for API endpoints
    if (url.pathname.startsWith('/api/')) {
      const clientIP = request.headers.get('CF-Connecting-IP');
      const rateLimitKey = `${clientIP}:${url.pathname}`;
      
      // Simple rate limit: 100 requests per minute per IP per endpoint
      // In production, use Cloudflare's Rate Limiting or KV for persistence
    }
    
    // Fetch the original response
    const response = await fetch(request);
    
    // Clone response to modify headers
    const modifiedResponse = new Response(response.body, response);
    const headers = modifiedResponse.headers;
    
    // Security Headers
    
    // Content Security Policy - Strict but practical
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.supabase.co https://*.recovery-compass.org wss://*.supabase.co",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; ');
    
    headers.set('Content-Security-Policy', csp);
    
    // Strict Transport Security (HSTS) - 1 year
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Prevent MIME type sniffing
    headers.set('X-Content-Type-Options', 'nosniff');
    
    // Prevent clickjacking
    headers.set('X-Frame-Options', 'DENY');
    
    // XSS Protection (legacy but still useful)
    headers.set('X-XSS-Protection', '1; mode=block');
    
    // Referrer Policy
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions Policy (formerly Feature Policy)
    const permissions = [
      'accelerometer=()',
      'ambient-light-sensor=()',
      'autoplay=()',
      'battery=()',
      'camera=()',
      'cross-origin-isolated=()',
      'display-capture=()',
      'document-domain=()',
      'encrypted-media=()',
      'execution-while-not-rendered=()',
      'execution-while-out-of-viewport=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'keyboard-map=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'navigation-override=()',
      'payment=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'sync-xhr=()',
      'usb=()',
      'web-share=()',
      'xr-spatial-tracking=()',
      'interest-cohort=()' // Opt out of FLoC
    ].join(', ');
    
    headers.set('Permissions-Policy', permissions);
    
    // Additional security headers
    headers.set('X-Permitted-Cross-Domain-Policies', 'none');
    headers.set('X-Download-Options', 'noopen');
    headers.set('X-DNS-Prefetch-Control', 'off');
    
    // Recovery Compass branding
    headers.set('X-Powered-By', 'Recovery Compass');
    headers.set('X-Service', 'WFD-Compliance');
    
    // CORS headers for API endpoints
    if (url.pathname.startsWith('/api/')) {
      headers.set('Access-Control-Allow-Origin', 'https://wfd-compliance.org');
      headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      headers.set('Access-Control-Max-Age', '86400');
      headers.set('Access-Control-Allow-Credentials', 'true');
    }
    
    // Cache control
    if (url.pathname.match(/\.(js|css|woff2?|ttf|otf|eot|svg|ico)$/)) {
      // Static assets - cache for 1 year
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      // Images - cache for 30 days
      headers.set('Cache-Control', 'public, max-age=2592000');
    } else if (url.pathname === '/' || url.pathname.match(/\.html$/)) {
      // HTML - no cache
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    
    return modifiedResponse;
  }
};

/**
 * Deployment instructions:
 * 1. Log into Cloudflare Dashboard
 * 2. Go to Workers & Pages
 * 3. Create new Worker
 * 4. Paste this code
 * 5. Save and deploy
 * 6. Add route: wfd-compliance.org/* to this worker
 */
