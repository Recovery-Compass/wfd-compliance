export type SourceTag = 'app' | 'msforms' | 'direct';

/**
 * Build the Qualtrics URL with preserved query params and a source tag.
 * - Base URL comes from VITE_QUALTRICS_URL, with a safe fallback
 * - Preserves inbound query params
 * - Ensures `source` (defaults to provided defaultSource or 'app')
 * - Adds `program=wfd` for attribution
 */
export function buildQualtricsUrl(defaultSource: SourceTag = 'app'): string {
  const fallback = 'https://qualtricsxmhlzvhcc33.qualtrics.com/jfe/form/SV_85QMmicoa3u3ZzM';
  const baseUrl = (import.meta as any).env?.VITE_QUALTRICS_URL || fallback;

  try {
    const url = new URL(baseUrl, window.location.origin);

    // Start with existing params already on the base (if any)
    const params = new URLSearchParams(url.search);

    // Merge in current page params (preserve campaign/others)
    const incoming = new URLSearchParams(window.location.search);
    incoming.forEach((value, key) => {
      if (!params.has(key)) params.set(key, value);
    });

    // Enforce required params
    const source = incoming.get('source') || params.get('source') || defaultSource;
    params.set('source', source);
    params.set('program', 'wfd');

    url.search = params.toString();
    return url.toString();
  } catch {
    // Fallback to simple concatenation
    const search = new URLSearchParams(window.location.search);
    const source = search.get('source') || defaultSource;
    search.set('source', source);
    search.set('program', 'wfd');
    return `${baseUrl}?${search.toString()}`;
  }
}
