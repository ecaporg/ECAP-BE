export const CANVAS_DOMAIN_REGEX = /[a-zA-Z0-9-]+\.instructure\.com/;

export const extractCanvasDomain = (
  source: string | string[],
): string | null => {
  const sources = Array.isArray(source) ? source : [source];
  for (const src of sources) {
    const canvasDomainMatch = src.match(CANVAS_DOMAIN_REGEX);
    if (canvasDomainMatch) {
      return canvasDomainMatch[0]; // Повертає повний домен, наприклад "eliteaa.instructure.com"
    }
  }
  return null;
};
