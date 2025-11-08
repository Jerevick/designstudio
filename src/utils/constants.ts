export const APP_NAME = 'Design Studio';
export const APP_DESCRIPTION = 'Create professional designs in seconds';

// Subscription limits
export const SUBSCRIPTION_LIMITS = {
  FREE: {
    designs_per_month: 3,
    max_exports: 5,
    max_dpi: 150,
    formats: ['PNG'],
    watermark: true,
  },
  PRO: {
    designs_per_month: -1, // unlimited
    max_exports: -1,
    max_dpi: 600,
    formats: ['PNG', 'JPEG', 'PDF', 'SVG', 'WEBP'],
    watermark: false,
  },
  BUSINESS: {
    designs_per_month: -1,
    max_exports: -1,
    max_dpi: 600,
    formats: ['PNG', 'JPEG', 'PDF', 'SVG', 'WEBP'],
    watermark: false,
  },
} as const;

// Template categories
export const TEMPLATE_CATEGORIES = [
  'INVITATION',
  'FLYER',
  'SOUVENIR',
  'POSTER',
  'CARD',
  'BANNER',
  'SOCIAL_MEDIA',
  'OTHER',
] as const;

// Export formats
export const EXPORT_FORMATS = ['PNG', 'JPEG', 'PDF', 'SVG', 'WEBP'] as const;

// DPI options
export const DPI_OPTIONS = [72, 150, 300, 600] as const;

// Default template dimensions
export const DEFAULT_DIMENSIONS = {
  INVITATION: { width: 1080, height: 1920 },
  FLYER: { width: 1080, height: 1350 },
  POSTER: { width: 1080, height: 1920 },
  CARD: { width: 1080, height: 1080 },
  BANNER: { width: 1920, height: 1080 },
  SOCIAL_MEDIA: { width: 1080, height: 1080 },
} as const;
