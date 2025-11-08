import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createDesignSchema = z.object({
  templateId: z.string().cuid(),
  name: z.string().min(1).max(100),
  data: z.record(z.string(), z.any()),
});

export const updateDesignSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  data: z.record(z.string(), z.any()).optional(),
});

export const exportDesignSchema = z.object({
  designId: z.string(),
  format: z.enum(['png', 'jpg', 'pdf', 'svg']),
  dpi: z.union([z.literal(72), z.literal(150), z.literal(300), z.literal(600)]).optional(),
});

export const createTemplateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.enum([
    'INVITATION',
    'FLYER',
    'SOUVENIR',
    'POSTER',
    'CARD',
    'BANNER',
    'SOCIAL_MEDIA',
    'OTHER',
  ]),
  width: z.number().min(100).max(10000),
  height: z.number().min(100).max(10000),
  data: z.any(),
  isPremium: z.boolean().optional(),
  price: z.number().min(0).optional(),
  tags: z.array(z.string()).optional(),
});
