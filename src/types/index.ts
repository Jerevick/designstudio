import { Prisma } from '@prisma/client';

// User types
export type User = Prisma.UserGetPayload<{}>;
export type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true };
}>;

// Template types
export type Template = Prisma.TemplateGetPayload<{}>;
export type TemplateWithStats = Template & {
  _count?: {
    designs: number;
    purchases: number;
  };
};

// Design types
export type Design = Prisma.DesignGetPayload<{}>;
export type DesignWithRelations = Prisma.DesignGetPayload<{
  include: {
    template: true;
    user: true;
    outputs: true;
  };
}>;

// Subscription types
export type Subscription = Prisma.SubscriptionGetPayload<{}>;

// Template data structure
export interface TemplateElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  content?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: string;
  src?: string;
  shape?: 'circle' | 'rect' | 'ellipse';
  fill?: string;
  opacity?: number;
  editable?: boolean;
}

export interface TemplateData {
  version: string;
  width: number;
  height: number;
  background: {
    type: 'solid' | 'gradient' | 'image';
    color?: string;
    gradient?: any;
    imageUrl?: string;
  };
  elements: TemplateElement[];
  fonts?: Array<{
    family: string;
    url: string;
  }>;
  variables?: Array<{
    name: string;
    label: string;
    type: 'text' | 'date' | 'number';
    required?: boolean;
    maxLength?: number;
  }>;
  colorSchemes?: Array<{
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  }>;
}

// Design data
export type DesignData = Record<string, any>;

// Export options
export interface ExportOptions {
  format: 'PNG' | 'JPEG' | 'PDF' | 'SVG' | 'WEBP';
  width?: number;
  height?: number;
  dpi?: 72 | 150 | 300 | 600;
  quality?: number;
  transparent?: boolean;
  colorMode?: 'RGB' | 'CMYK';
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
