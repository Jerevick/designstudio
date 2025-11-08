# Design Studio - Implementation Guide

## Project Overview

A Next.js web application that enables users to create professional graphic designs (invitations, flyers, souvenirs, etc.) through a simple interface. Users select a template, enter details, and the system automatically generates multiple design variants in various formats for download.

### Value Proposition

**Democratizes graphic design for non-designers** - Empowers anyone to create professional-quality designs without expensive software or design expertise. No Photoshop skills, no hiring designers, no learning curve.

### Target Market

The application serves multiple high-value segments:

1. **Event Organizers** (Primary)
   - Wedding planners and couples
   - Birthday party hosts
   - Corporate event managers
   - Community event coordinators
   - Estimated market: 2M+ events annually

2. **Small Businesses & Entrepreneurs**
   - Local shops and restaurants
   - Freelancers and consultants
   - Startups and SMBs
   - Market vendors and street businesses
   - Estimated market: 30M+ small businesses globally

3. **Social Media Creators**
   - Instagram/Facebook content creators
   - YouTubers and influencers
   - Personal brands
   - Community managers
   - Estimated market: 50M+ active creators

4. **Personal Use Cases**
   - Greeting cards and announcements
   - Thank you cards
   - Party invitations
   - Personal branding materials
   - Estimated market: General consumer base

### Monetization Strategy

#### 1. Freemium Model (Primary Revenue)
- **Free Tier**: 
  - 3 designs per month
  - Basic templates (20-30 templates)
  - Standard resolution export (72-150 DPI)
  - Watermarked downloads
  - Single format (PNG only)
  
- **Pro Plan** ($9.99/month or $99/year):
  - Unlimited designs
  - 200+ premium templates
  - High-resolution export (300-600 DPI)
  - No watermarks
  - All formats (PNG, JPEG, PDF, SVG)
  - Priority rendering queue
  - Custom branding/logo upload
  - Advanced editing tools
  
- **Business Plan** ($29.99/month or $299/year):
  - Everything in Pro
  - Team collaboration (up to 5 users)
  - Brand kit (colors, fonts, logos)
  - Bulk export capabilities
  - API access
  - Priority support
  - Usage analytics

#### 2. Premium Templates Marketplace
- Template creators can sell designs (70/30 revenue split)
- Premium template packs: $4.99-$19.99 per pack
- Seasonal collections and trending designs
- Licensed character/brand templates

#### 3. Print-on-Demand Services
- Partner with print services (VistaPrint, Moo, local printers)
- Users can order physical prints directly
- Commission on each print order (15-30%)
- Bundled packages (digital + print)

#### 4. White-Label/Enterprise Solutions
- Custom-branded version for businesses
- API access for integration
- On-premise deployment options
- Pricing: $499+/month per organization

#### 5. Additional Revenue Streams
- **Stock Assets**: Sell premium images, icons, fonts ($0.99-$4.99)
- **Add-ons**: AI background generation, premium effects ($2.99-$9.99/month)
- **Affiliate Partnerships**: Event management tools, printing services (10-20% commission)
- **Corporate Training**: Design workshops and tutorials ($99-$499 per course)

### Revenue Projections (Year 1-3)

**Conservative Estimates**:

**Year 1** (Launch + Growth):
- 10,000 free users
- 500 Pro subscribers ($9.99/mo) = $4,995/month = **$59,940/year**
- 50 Business subscribers ($29.99/mo) = $1,499/month = **$17,988/year**
- Template sales: **$5,000/year**
- Print commissions: **$3,000/year**
- **Total Year 1**: ~$85,000

**Year 2** (Scale):
- 50,000 free users
- 2,500 Pro subscribers = **$299,700/year**
- 200 Business subscribers = **$71,952/year**
- Template marketplace: **$30,000/year**
- Print services: **$25,000/year**
- **Total Year 2**: ~$427,000

**Year 3** (Maturity):
- 150,000 free users
- 7,500 Pro subscribers = **$899,100/year**
- 500 Business subscribers = **$179,880/year**
- Template marketplace: **$100,000/year**
- Print services: **$80,000/year**
- Enterprise licenses: **$50,000/year**
- **Total Year 3**: ~$1,309,000

### Competitive Advantages

1. **Speed**: Generate designs in seconds vs. hours in traditional tools
2. **Simplicity**: No design skills required vs. steep learning curve of Canva/Photoshop
3. **Affordability**: $9.99/month vs. $30+ for Adobe Creative Cloud
4. **Specialization**: Focused on specific use cases vs. general design tools
5. **Quality**: Professional templates vs. amateur DIY results
6. **Accessibility**: Web-based, works on any device
7. **Automation**: AI-assisted design generation and smart layouts

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [System Architecture](#system-architecture)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Core Features Implementation](#core-features-implementation)
6. [Template Engine Design](#template-engine-design)
7. [Rendering Pipeline](#rendering-pipeline)
8. [API Endpoints](#api-endpoints)
9. [Frontend Components](#frontend-components)
10. [Authentication & Authorization](#authentication--authorization)
11. [File Storage & CDN](#file-storage--cdn)
12. [Export Formats](#export-formats)
13. [Performance Optimization](#performance-optimization)
14. [Deployment Strategy](#deployment-strategy)
15. [Testing Strategy](#testing-strategy)
16. [Security Considerations](#security-considerations)
17. [Monitoring & Analytics](#monitoring--analytics)
18. [Development Phases](#development-phases)
19. [Scalability Considerations](#scalability-considerations)
20. [Future Enhancements](#future-enhancements)

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui or Radix UI
- **State Management**: Zustand or React Context
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Canvas Rendering**: Fabric.js or Konva.js
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Next.js API Routes / Server Actions
- **ORM**: Prisma
- **Database**: PostgreSQL 15+
- **Cache**: Redis (Upstash or self-hosted)
- **Queue**: BullMQ (for background jobs)
- **Payments**: Stripe (subscriptions, one-time purchases)
- **Email**: Resend or SendGrid

### Rendering & Export
- **Server Rendering**: Puppeteer or Playwright
- **Image Processing**: Sharp
- **PDF Generation**: jsPDF or Puppeteer
- **SVG Manipulation**: SVG.js

### Storage & Media
- **File Storage**: AWS S3 / Vercel Blob / Cloudinary
- **CDN**: Cloudfront / Vercel Edge Network

### Authentication
- **Auth Provider**: NextAuth.js v5 (Auth.js)
- **Social Login**: Google, Facebook (optional)
- **Session**: JWT or database sessions

### DevOps & Deployment
- **Hosting**: Vercel (primary) or Railway/Render
- **CI/CD**: GitHub Actions
- **Containerization**: Docker (optional for self-hosting)
- **Monitoring**: Sentry, Vercel Analytics
- **Logging**: Winston or Pino

### AI/ML (Optional - Phase 2+)
- **Image Generation**: Replicate API, Stability.ai, or OpenAI DALL·E
- **Background Removal**: remove.bg API
- **Text Enhancement**: OpenAI GPT API for copy suggestions

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Product    │  │   Template   │  │   Design     │      │
│  │   Selector   │  │   Gallery    │  │   Editor     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────────┐
│                    Next.js Application                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Server Components / Pages                │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   API Routes / Actions                │  │
│  │  /api/templates  /api/generate  /api/export          │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬─────────────────┬──────────────┬──────────────┘
             │                 │              │
    ┌────────▼────────┐ ┌─────▼──────┐ ┌────▼─────┐
    │   PostgreSQL    │ │   Redis    │ │  S3/Blob │
    │   (Metadata)    │ │  (Cache)   │ │ (Assets) │
    └─────────────────┘ └────────────┘ └──────────┘
             │
    ┌────────▼────────┐
    │  Rendering      │
    │  Workers        │
    │  (Puppeteer)    │
    └─────────────────┘
```

### Data Flow

1. **Template Selection**: User browses templates → Frontend fetches from API
2. **Content Input**: User fills form → Validation via Zod schema
3. **Preview Generation**: Client-side canvas renders preview in real-time
4. **Export Request**: User clicks download → API queues render job
5. **Server Rendering**: Background worker generates high-res output
6. **Storage**: Rendered file uploaded to S3/Blob
7. **Delivery**: Download URL returned to client

---

## Project Structure

```
designstudio/
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Migration files
├── public/
│   ├── templates/                 # Static template assets
│   ├── fonts/                     # Custom fonts
│   └── icons/                     # App icons
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── projects/
│   │   │   ├── templates/
│   │   │   └── settings/
│   │   ├── editor/
│   │   │   └── [designId]/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── templates/
│   │   │   ├── designs/
│   │   │   ├── generate/
│   │   │   ├── export/
│   │   │   ├── subscriptions/
│   │   │   └── webhooks/
│   │   │       └── stripe/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── editor/
│   │   │   ├── Canvas.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   ├── PropertyPanel.tsx
│   │   │   └── LayerPanel.tsx
│   │   ├── templates/
│   │   │   ├── TemplateCard.tsx
│   │   │   └── TemplateGrid.tsx
│   │   └── shared/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client
│   │   ├── redis.ts               # Redis client
│   │   ├── storage.ts             # S3/Blob client
│   │   ├── auth.ts                # Auth config
│   │   ├── stripe.ts              # Stripe client
│   │   └── utils.ts               # Utility functions
│   ├── services/
│   │   ├── template.service.ts
│   │   ├── design.service.ts
│   │   ├── render.service.ts
│   │   ├── export.service.ts
│   │   ├── subscription.service.ts
│   │   └── email.service.ts
│   ├── workers/
│   │   ├── render-worker.ts       # Background rendering
│   │   └── queue.ts               # Job queue setup
│   ├── types/
│   │   ├── template.ts
│   │   ├── design.ts
│   │   └── api.ts
│   ├── hooks/
│   │   ├── useTemplate.ts
│   │   ├── useDesign.ts
│   │   ├── useCanvas.ts
│   │   └── queries/              # TanStack Query hooks
│   │       ├── useTemplates.ts
│   │       ├── useDesigns.ts
│   │       └── useExport.ts
│   └── utils/
│       ├── validators.ts          # Zod schemas
│       ├── formatters.ts
│       └── constants.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── docker-compose.yml
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Database Schema

### Prisma Schema (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum SubscriptionTier {
  FREE
  PRO
  BUSINESS
  ENTERPRISE
}

enum SubscriptionStatus {
  ACTIVE
  CANCELED
  PAST_DUE
  TRIALING
}

model User {
  id                String              @id @default(cuid())
  email             String              @unique
  name              String?
  passwordHash      String?
  image             String?
  emailVerified     DateTime?
  subscriptionTier  SubscriptionTier    @default(FREE)
  subscriptionStatus SubscriptionStatus @default(ACTIVE)
  stripeCustomerId  String?             @unique
  stripeSubscriptionId String?          @unique
  designsThisMonth  Int                 @default(0)
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
  
  accounts          Account[]
  sessions          Session[]
  designs           Design[]
  subscription      Subscription?
  
  @@index([email])
  @@index([stripeCustomerId])
}

model Subscription {
  id                   String             @id @default(cuid())
  userId               String             @unique
  tier                 SubscriptionTier
  status               SubscriptionStatus
  stripeSubscriptionId String?            @unique
  stripePriceId        String?
  currentPeriodStart   DateTime?
  currentPeriodEnd     DateTime?
  cancelAtPeriodEnd    Boolean            @default(false)
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt
  
  user                 User               @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([stripeSubscriptionId])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}

enum TemplateCategory {
  INVITATION
  FLYER
  SOUVENIR
  POSTER
  CARD
  BANNER
  SOCIAL_MEDIA
  OTHER
}

model Template {
  id          String           @id @default(cuid())
  name        String
  description String?
  category    TemplateCategory
  thumbnail   String           // URL to preview image
  data        Json             // Template structure (layout, elements, styles)
  width       Int              // Design width in pixels
  height      Int              // Design height in pixels
  isPublic    Boolean          @default(true)
  isFeatured  Boolean          @default(false)
  isPremium   Boolean          @default(false)  // Requires Pro/Business plan
  price       Float?           // Price for one-time purchase (optional)
  tags        String[]
  creatorId   String?          // For marketplace templates
  sales       Int              @default(0)
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
  
  designs     Design[]
  purchases   TemplatePurchase[]
  
  @@index([category])
  @@index([isPublic, isFeatured])
  @@index([isPremium])
  @@index([creatorId])
}

model TemplatePurchase {
  id         String   @id @default(cuid())
  userId     String
  templateId String
  price      Float
  createdAt  DateTime @default(now())
  
  template   Template @relation(fields: [templateId], references: [id])
  
  @@unique([userId, templateId])
  @@index([userId])
}

enum DesignStatus {
  DRAFT
  RENDERING
  COMPLETED
  FAILED
}

model Design {
  id         String       @id @default(cuid())
  userId     String
  templateId String
  name       String
  data       Json         // User's design data (text, colors, images)
  status     DesignStatus @default(DRAFT)
  thumbnail  String?
  outputs    Output[]
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
  
  user       User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  template   Template     @relation(fields: [templateId], references: [id])
  
  @@index([userId])
  @@index([templateId])
  @@index([status])
}

enum OutputFormat {
  PNG
  JPEG
  PDF
  SVG
  WEBP
}

model Output {
  id        String       @id @default(cuid())
  designId  String
  format    OutputFormat
  width     Int
  height    Int
  dpi       Int          @default(300)
  fileUrl   String       // S3/Blob URL
  fileSize  Int          // Bytes
  createdAt DateTime     @default(now())
  
  design    Design       @relation(fields: [designId], references: [id], onDelete: Cascade)
  
  @@index([designId])
}

model Asset {
  id        String   @id @default(cuid())
  name      String
  type      String   // image, font, icon, etc.
  url       String
  fileSize  Int
  metadata  Json?
  createdAt DateTime @default(now())
  
  @@index([type])
}
```

---

## Core Features Implementation

### 1. Template Selection & Browsing

**Components**:
- `TemplateGallery.tsx`: Grid view with filters (category, tags, featured)
- `TemplateCard.tsx`: Preview card with hover effects
- `TemplateDetailModal.tsx`: Full preview and "Use Template" button

**API Routes**:
```typescript
// GET /api/templates
// Query params: category, tags, featured, page, limit
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  
  const templates = await prisma.template.findMany({
    where: {
      category: category as TemplateCategory,
      isPublic: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
  });
  
  return Response.json({ templates });
}
```

### 2. Design Editor

**Canvas Implementation** (using Fabric.js):

```typescript
// components/editor/Canvas.tsx
import { fabric } from 'fabric';
import { useEffect, useRef } from 'react';

export function Canvas({ template, data, onChange }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: template.width,
      height: template.height,
    });
    
    fabricRef.current = canvas;
    
    // Load template elements
    loadTemplateElements(canvas, template.data);
    
    // Apply user data
    applyUserData(canvas, data);
    
    // Listen for changes
    canvas.on('object:modified', () => {
      onChange(canvas.toJSON());
    });
    
    return () => {
      canvas.dispose();
    };
  }, [template, data]);
  
  return <canvas ref={canvasRef} />;
}
```

**Property Panel**:
```typescript
// components/editor/PropertyPanel.tsx
export function PropertyPanel({ selectedObject, onUpdate }) {
  if (!selectedObject) return <div>Select an element</div>;
  
  return (
    <div className="space-y-4">
      {selectedObject.type === 'text' && (
        <>
          <Input
            label="Text"
            value={selectedObject.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
          />
          <Select
            label="Font"
            value={selectedObject.fontFamily}
            onChange={(value) => onUpdate({ fontFamily: value })}
            options={FONTS}
          />
          <ColorPicker
            label="Color"
            value={selectedObject.fill}
            onChange={(color) => onUpdate({ fill: color })}
          />
        </>
      )}
      {selectedObject.type === 'image' && (
        <ImageUpload
          onUpload={(url) => onUpdate({ src: url })}
        />
      )}
    </div>
  );
}
```

### 3. Real-time Preview

```typescript
// hooks/useCanvasPreview.ts
export function useCanvasPreview(canvas: fabric.Canvas | null) {
  const [preview, setPreview] = useState<string>('');
  
  useEffect(() => {
    if (!canvas) return;
    
    const updatePreview = debounce(() => {
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 0.8,
        multiplier: 0.3, // Lower res for preview
      });
      setPreview(dataUrl);
    }, 300);
    
    canvas.on('object:modified', updatePreview);
    canvas.on('object:added', updatePreview);
    canvas.on('object:removed', updatePreview);
    
    return () => {
      canvas.off('object:modified', updatePreview);
      canvas.off('object:added', updatePreview);
      canvas.off('object:removed', updatePreview);
    };
  }, [canvas]);
  
  return preview;
}
```

---

## Template Engine Design

### Template Data Structure (JSON)

```json
{
  "version": "1.0",
  "width": 1080,
  "height": 1920,
  "background": {
    "type": "solid",
    "color": "#ffffff"
  },
  "elements": [
    {
      "id": "title",
      "type": "text",
      "content": "{{event_name}}",
      "x": 100,
      "y": 200,
      "width": 880,
      "fontSize": 72,
      "fontFamily": "Playfair Display",
      "fontWeight": "bold",
      "color": "#1a1a1a",
      "textAlign": "center",
      "editable": true
    },
    {
      "id": "date",
      "type": "text",
      "content": "{{event_date}}",
      "x": 100,
      "y": 320,
      "width": 880,
      "fontSize": 36,
      "fontFamily": "Inter",
      "color": "#666666",
      "textAlign": "center",
      "editable": true
    },
    {
      "id": "venue",
      "type": "text",
      "content": "{{venue}}",
      "x": 100,
      "y": 400,
      "fontSize": 28,
      "fontFamily": "Inter",
      "color": "#888888",
      "textAlign": "center",
      "editable": true
    },
    {
      "id": "background_shape",
      "type": "shape",
      "shape": "circle",
      "x": 540,
      "y": 960,
      "width": 600,
      "height": 600,
      "fill": "#f0f0f0",
      "opacity": 0.5,
      "editable": false
    },
    {
      "id": "decorative_image",
      "type": "image",
      "src": "/templates/assets/floral-border.svg",
      "x": 0,
      "y": 0,
      "width": 1080,
      "height": 300,
      "editable": false
    }
  ],
  "fonts": [
    {
      "family": "Playfair Display",
      "url": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700"
    },
    {
      "family": "Inter",
      "url": "https://fonts.googleapis.com/css2?family=Inter:wght@400;600"
    }
  ],
  "variables": [
    {
      "name": "event_name",
      "label": "Event Name",
      "type": "text",
      "required": true,
      "maxLength": 50
    },
    {
      "name": "event_date",
      "label": "Date",
      "type": "date",
      "required": true
    },
    {
      "name": "venue",
      "label": "Venue",
      "type": "text",
      "required": true
    }
  ],
  "colorSchemes": [
    {
      "name": "Classic",
      "primary": "#1a1a1a",
      "secondary": "#666666",
      "accent": "#f0f0f0"
    },
    {
      "name": "Elegant",
      "primary": "#2c3e50",
      "secondary": "#e74c3c",
      "accent": "#ecf0f1"
    }
  ]
}
```

### Template Renderer Service

```typescript
// services/render.service.ts
import { fabric } from 'fabric';
import { Template, DesignData } from '@/types';

export class RenderService {
  async renderToCanvas(
    template: Template,
    data: DesignData
  ): Promise<fabric.Canvas> {
    const canvas = new fabric.StaticCanvas(null, {
      width: template.width,
      height: template.height,
    });
    
    // Set background
    if (template.data.background.type === 'solid') {
      canvas.backgroundColor = template.data.background.color;
    } else if (template.data.background.type === 'gradient') {
      canvas.setBackgroundColor(
        new fabric.Gradient(template.data.background.gradient),
        () => {}
      );
    }
    
    // Add elements
    for (const element of template.data.elements) {
      const fabricObject = await this.createFabricObject(element, data);
      if (fabricObject) {
        canvas.add(fabricObject);
      }
    }
    
    canvas.renderAll();
    return canvas;
  }
  
  private async createFabricObject(
    element: any,
    data: DesignData
  ): Promise<fabric.Object | null> {
    switch (element.type) {
      case 'text':
        const text = this.interpolateVariables(element.content, data);
        return new fabric.Text(text, {
          left: element.x,
          top: element.y,
          fontSize: element.fontSize,
          fontFamily: element.fontFamily,
          fontWeight: element.fontWeight,
          fill: element.color,
          textAlign: element.textAlign,
        });
        
      case 'image':
        return new Promise((resolve) => {
          fabric.Image.fromURL(element.src, (img) => {
            img.set({
              left: element.x,
              top: element.y,
              scaleX: element.width / img.width!,
              scaleY: element.height / img.height!,
            });
            resolve(img);
          });
        });
        
      case 'shape':
        if (element.shape === 'circle') {
          return new fabric.Circle({
            left: element.x,
            top: element.y,
            radius: element.width / 2,
            fill: element.fill,
            opacity: element.opacity,
          });
        } else if (element.shape === 'rect') {
          return new fabric.Rect({
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            fill: element.fill,
            opacity: element.opacity,
          });
        }
        break;
        
      default:
        return null;
    }
  }
  
  private interpolateVariables(template: string, data: DesignData): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
      return data[key] || '';
    });
  }
}
```

---

## Rendering Pipeline

### Server-side High-Resolution Export

```typescript
// services/export.service.ts
import puppeteer from 'puppeteer';
import sharp from 'sharp';

export class ExportService {
  private browser: puppeteer.Browser | null = null;
  
  async initialize() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  
  async exportToPNG(
    template: Template,
    data: DesignData,
    options: ExportOptions
  ): Promise<Buffer> {
    if (!this.browser) await this.initialize();
    
    const page = await this.browser!.newPage();
    
    // Set viewport to design dimensions
    await page.setViewport({
      width: template.width,
      height: template.height,
      deviceScaleFactor: options.dpi / 96, // Scale for DPI
    });
    
    // Generate HTML from template
    const html = this.templateToHTML(template, data);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    
    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      omitBackground: options.transparent,
    });
    
    await page.close();
    
    // Post-process with Sharp if needed
    let image = sharp(screenshot);
    
    if (options.format === 'jpeg') {
      image = image.jpeg({ quality: options.quality || 90 });
    } else if (options.format === 'webp') {
      image = image.webp({ quality: options.quality || 90 });
    }
    
    return image.toBuffer();
  }
  
  async exportToPDF(
    template: Template,
    data: DesignData,
    options: ExportOptions
  ): Promise<Buffer> {
    if (!this.browser) await this.initialize();
    
    const page = await this.browser!.newPage();
    
    const html = this.templateToHTML(template, data);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    
    const pdf = await page.pdf({
      width: `${template.width}px`,
      height: `${template.height}px`,
      printBackground: true,
      preferCSSPageSize: true,
    });
    
    await page.close();
    return pdf;
  }
  
  private templateToHTML(template: Template, data: DesignData): string {
    // Convert template JSON to HTML/CSS
    const elements = template.data.elements.map((el) => {
      if (el.type === 'text') {
        const content = this.interpolateVariables(el.content, data);
        return `
          <div style="
            position: absolute;
            left: ${el.x}px;
            top: ${el.y}px;
            width: ${el.width}px;
            font-size: ${el.fontSize}px;
            font-family: '${el.fontFamily}';
            font-weight: ${el.fontWeight};
            color: ${el.color};
            text-align: ${el.textAlign};
          ">${content}</div>
        `;
      }
      // Handle other element types...
      return '';
    });
    
    const fontLinks = template.data.fonts
      .map((font) => `<link href="${font.url}" rel="stylesheet">`)
      .join('\n');
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        ${fontLinks}
        <style>
          body {
            margin: 0;
            padding: 0;
            width: ${template.width}px;
            height: ${template.height}px;
            background: ${template.data.background.color};
            position: relative;
          }
        </style>
      </head>
      <body>
        ${elements.join('\n')}
      </body>
      </html>
    `;
  }
  
  private interpolateVariables(template: string, data: DesignData): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] || '');
  }
  
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
```

### Background Job Queue

```typescript
// workers/queue.ts
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { ExportService } from '@/services/export.service';
import { uploadToS3 } from '@/lib/storage';
import { prisma } from '@/lib/prisma';

const connection = new Redis(process.env.REDIS_URL!);

export const renderQueue = new Queue('render', { connection });

// Worker process
const exportService = new ExportService();

export const renderWorker = new Worker(
  'render',
  async (job) => {
    const { designId, format, options } = job.data;
    
    // Fetch design and template
    const design = await prisma.design.findUnique({
      where: { id: designId },
      include: { template: true },
    });
    
    if (!design) throw new Error('Design not found');
    
    // Update status
    await prisma.design.update({
      where: { id: designId },
      data: { status: 'RENDERING' },
    });
    
    try {
      // Render
      const buffer = await exportService.exportToPNG(
        design.template,
        design.data as any,
        options
      );
      
      // Upload to storage
      const fileUrl = await uploadToS3(
        buffer,
        `designs/${designId}/${format}/${Date.now()}.${format}`
      );
      
      // Save output record
      await prisma.output.create({
        data: {
          designId,
          format,
          width: options.width,
          height: options.height,
          dpi: options.dpi || 300,
          fileUrl,
          fileSize: buffer.length,
        },
      });
      
      // Update design status
      await prisma.design.update({
        where: { id: designId },
        data: { status: 'COMPLETED' },
      });
      
      return { success: true, fileUrl };
    } catch (error) {
      await prisma.design.update({
        where: { id: designId },
        data: { status: 'FAILED' },
      });
      throw error;
    }
  },
  { connection }
);
```

---

## API Endpoints

### Core API Routes

```typescript
// app/api/designs/route.ts
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  const { templateId, name, data } = designSchema.parse(body);
  
  // Check subscription limits
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { 
      subscriptionTier: true, 
      designsThisMonth: true,
    },
  });
  
  // Free tier: 3 designs per month
  if (user.subscriptionTier === 'FREE' && user.designsThisMonth >= 3) {
    return Response.json(
      { error: 'Monthly design limit reached. Upgrade to Pro for unlimited designs.' },
      { status: 403 }
    );
  }
  
  // Check if template is premium
  const template = await prisma.template.findUnique({
    where: { id: templateId },
    select: { isPremium: true },
  });
  
  if (template.isPremium && user.subscriptionTier === 'FREE') {
    return Response.json(
      { error: 'This is a premium template. Upgrade to Pro to access.' },
      { status: 403 }
    );
  }
  
  const design = await prisma.design.create({
    data: {
      userId: session.user.id,
      templateId,
      name,
      data,
      status: 'DRAFT',
    },
  });
  
  // Increment monthly counter for free users
  if (user.subscriptionTier === 'FREE') {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { designsThisMonth: { increment: 1 } },
    });
  }
  
  return Response.json({ design });
}

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const designs = await prisma.design.findMany({
    where: { userId: session.user.id },
    include: { template: true },
    orderBy: { updatedAt: 'desc' },
  });
  
  return Response.json({ designs });
}
```

```typescript
// app/api/export/route.ts
import { renderQueue } from '@/workers/queue';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const body = await request.json();
  const { designId, format, width, height, dpi } = exportSchema.parse(body);
  
  // Verify ownership
  const design = await prisma.design.findFirst({
    where: {
      id: designId,
      userId: session.user.id,
    },
  });
  
  if (!design) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  
  // Queue render job
  const job = await renderQueue.add('export', {
    designId,
    format,
    options: { width, height, dpi },
  });
  
  return Response.json({ jobId: job.id });
}
```

```typescript
// app/api/export/[jobId]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { jobId: string } }
) {
  const job = await renderQueue.getJob(params.jobId);
  
  if (!job) {
    return Response.json({ error: 'Job not found' }, { status: 404 });
  }
  
  const state = await job.getState();
  
  if (state === 'completed') {
    const result = job.returnvalue;
    return Response.json({ status: 'completed', fileUrl: result.fileUrl });
  } else if (state === 'failed') {
    return Response.json({ status: 'failed', error: job.failedReason });
  } else {
    return Response.json({ status: state });
  }
}
```

---

## Frontend Components

### TanStack Query Setup

```typescript
// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

```typescript
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### TanStack Query Hooks

```typescript
// hooks/queries/useTemplates.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Template, TemplateCategory } from '@/types';

export function useTemplates(category?: TemplateCategory) {
  return useQuery({
    queryKey: ['templates', category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      
      const res = await fetch(`/api/templates?${params}`);
      if (!res.ok) throw new Error('Failed to fetch templates');
      return res.json();
    },
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: ['templates', id],
    queryFn: async () => {
      const res = await fetch(`/api/templates/${id}`);
      if (!res.ok) throw new Error('Failed to fetch template');
      return res.json();
    },
    enabled: !!id,
  });
}

export function useFeaturedTemplates() {
  return useQuery({
    queryKey: ['templates', 'featured'],
    queryFn: async () => {
      const res = await fetch('/api/templates?featured=true');
      if (!res.ok) throw new Error('Failed to fetch featured templates');
      return res.json();
    },
  });
}
```

```typescript
// hooks/queries/useDesigns.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Design } from '@/types';

export function useDesigns() {
  return useQuery({
    queryKey: ['designs'],
    queryFn: async () => {
      const res = await fetch('/api/designs');
      if (!res.ok) throw new Error('Failed to fetch designs');
      return res.json();
    },
  });
}

export function useDesign(id: string) {
  return useQuery({
    queryKey: ['designs', id],
    queryFn: async () => {
      const res = await fetch(`/api/designs/${id}`);
      if (!res.ok) throw new Error('Failed to fetch design');
      const data = await res.json();
      return data.design;
    },
    enabled: !!id,
  });
}

export function useCreateDesign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { templateId: string; name: string; data: any }) => {
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create design');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
  });
}

export function useUpdateDesign(id: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Design>) => {
      const res = await fetch(`/api/designs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update design');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
      queryClient.setQueryData(['designs', id], data.design);
    },
  });
}

export function useDeleteDesign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/designs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete design');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designs'] });
    },
  });
}
```

```typescript
// hooks/queries/useExport.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { ExportOptions } from '@/types';

export function useExportDesign() {
  return useMutation({
    mutationFn: async ({ 
      designId, 
      options 
    }: { 
      designId: string; 
      options: ExportOptions 
    }) => {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ designId, ...options }),
      });
      if (!res.ok) throw new Error('Failed to start export');
      return res.json();
    },
  });
}

export function useExportStatus(jobId: string | null) {
  return useQuery({
    queryKey: ['export', jobId],
    queryFn: async () => {
      const res = await fetch(`/api/export/${jobId}`);
      if (!res.ok) throw new Error('Failed to fetch export status');
      return res.json();
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Stop polling if completed or failed
      return status === 'completed' || status === 'failed' ? false : 2000;
    },
  });
}
```

### Main Editor Page

```typescript
// app/editor/[designId]/page.tsx
'use client';

import { useState } from 'react';
import { Canvas } from '@/components/editor/Canvas';
import { Toolbar } from '@/components/editor/Toolbar';
import { PropertyPanel } from '@/components/editor/PropertyPanel';
import { ExportDialog } from '@/components/editor/ExportDialog';
import { useDesign, useUpdateDesign } from '@/hooks/queries/useDesigns';

export default function EditorPage({ params }: { params: { designId: string } }) {
  const { data: design, isLoading, error } = useDesign(params.designId);
  const updateDesign = useUpdateDesign(params.designId);
  const [selectedObject, setSelectedObject] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);
  
  const handleSave = () => {
    if (design) {
      updateDesign.mutate({ data: design.data });
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading design</div>;
  if (!design) return <div>Design not found</div>;
  
  return (
    <div className="h-screen flex flex-col">
      <Toolbar 
        onSave={handleSave} 
        onExport={() => setExportOpen(true)}
        isSaving={updateDesign.isPending}
      />
      
      <div className="flex-1 flex">
        <div className="flex-1 p-4 bg-gray-100 flex items-center justify-center">
          <Canvas
            template={design.template}
            data={design.data}
            onSelect={setSelectedObject}
            onChange={(newData) => {
              // Optimistically update local state
              design.data = newData;
            }}
          />
        </div>
        
        <PropertyPanel
          selectedObject={selectedObject}
          onUpdate={(updates) => {
            // Update selected object in canvas
          }}
        />
      </div>
      
      <ExportDialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        designId={design.id}
      />
    </div>
  );
}
```

### Template Gallery with TanStack Query

```typescript
// app/templates/page.tsx
'use client';

import { useState } from 'react';
import { useTemplates } from '@/hooks/queries/useTemplates';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { TemplateCategory } from '@/types';

export default function TemplatesPage() {
  const [category, setCategory] = useState<TemplateCategory | undefined>();
  const { data, isLoading, error } = useTemplates(category);
  
  if (isLoading) return <div>Loading templates...</div>;
  if (error) return <div>Error loading templates</div>;
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Templates</h1>
      
      <div className="flex gap-2 mb-6">
        <button onClick={() => setCategory(undefined)}>All</button>
        <button onClick={() => setCategory('INVITATION')}>Invitations</button>
        <button onClick={() => setCategory('FLYER')}>Flyers</button>
        <button onClick={() => setCategory('POSTER')}>Posters</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
```

### Export Dialog

```typescript
// components/editor/ExportDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { Dialog, Select, Button } from '@/components/ui';
import { useExportDesign, useExportStatus } from '@/hooks/queries/useExport';

export function ExportDialog({ open, onClose, designId }) {
  const [format, setFormat] = useState('PNG');
  const [dpi, setDpi] = useState(300);
  const [jobId, setJobId] = useState<string | null>(null);
  
  const exportMutation = useExportDesign();
  const { data: statusData } = useExportStatus(jobId);
  
  useEffect(() => {
    if (statusData?.status === 'completed') {
      // Download file
      window.open(statusData.fileUrl, '_blank');
      onClose();
      setJobId(null);
    } else if (statusData?.status === 'failed') {
      alert('Export failed');
      setJobId(null);
    }
  }, [statusData, onClose]);
  
  const handleExport = async () => {
    const result = await exportMutation.mutateAsync({
      designId,
      options: { format, dpi },
    });
    setJobId(result.jobId);
  };
  
  const isExporting = exportMutation.isPending || (jobId && statusData?.status !== 'completed');
  
  return (
    <Dialog open={open} onClose={onClose}>
      <h2>Export Design</h2>
      
      <Select
        label="Format"
        value={format}
        onChange={setFormat}
        options={['PNG', 'JPEG', 'PDF', 'SVG']}
        disabled={isExporting}
      />
      
      <Select
        label="Quality (DPI)"
        value={dpi}
        onChange={setDpi}
        options={[72, 150, 300, 600]}
        disabled={isExporting}
      />
      
      {statusData && (
        <div className="mt-4">
          <p>Status: {statusData.status}</p>
          {statusData.status === 'active' && <p>Processing...</p>}
        </div>
      )}
      
      <Button onClick={handleExport} loading={isExporting}>
        Export
      </Button>
    </Dialog>
  );
}
```

### My Designs Page

```typescript
// app/dashboard/page.tsx
'use client';

import { useDesigns, useDeleteDesign } from '@/hooks/queries/useDesigns';
import { DesignCard } from '@/components/designs/DesignCard';

export default function DashboardPage() {
  const { data, isLoading, error } = useDesigns();
  const deleteDesign = useDeleteDesign();
  
  if (isLoading) return <div>Loading your designs...</div>;
  if (error) return <div>Error loading designs</div>;
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Designs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.designs.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onDelete={() => deleteDesign.mutate(design.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Authentication & Authorization

### NextAuth.js Configuration

```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        
        if (!user || !user.passwordHash) return null;
        
        const isValid = await compare(
          credentials.password as string,
          user.passwordHash
        );
        
        if (!isValid) return null;
        
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
});

export async function getServerSession() {
  return auth();
}
```

### Middleware for Protected Routes

```typescript
// middleware.ts
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/editor')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/editor/:path*', '/api/designs/:path*', '/api/export/:path*'],
};
```

---

## File Storage & CDN

### S3 Integration

```typescript
// lib/storage.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  buffer: Buffer,
  key: string,
  contentType = 'image/png'
): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read',
    })
  );
  
  return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
```

### Alternative: Vercel Blob

```typescript
// lib/storage.ts (Vercel Blob version)
import { put } from '@vercel/blob';

export async function uploadToBlob(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const blob = await put(filename, buffer, {
    access: 'public',
  });
  
  return blob.url;
}
```

---

## Export Formats

### Supported Formats & Specifications

| Format | Use Case | DPI Options | Color Mode | Max Size |
|--------|----------|-------------|------------|----------|
| PNG | Web, transparency | 72, 150, 300 | RGB | 10000x10000 |
| JPEG | Photos, web | 72, 150, 300 | RGB | 10000x10000 |
| PDF | Print, documents | 300, 600 | RGB/CMYK | Unlimited |
| SVG | Scalable graphics | Vector | RGB | N/A |
| WebP | Modern web | 72, 150 | RGB | 16383x16383 |

### Format-specific Export Options

```typescript
// types/export.ts
export interface ExportOptions {
  format: 'PNG' | 'JPEG' | 'PDF' | 'SVG' | 'WEBP';
  width?: number;
  height?: number;
  dpi?: 72 | 150 | 300 | 600;
  quality?: number; // 1-100 for JPEG/WebP
  transparent?: boolean; // PNG only
  colorMode?: 'RGB' | 'CMYK'; // PDF only
  bleed?: number; // Print bleed in mm
}
```

---

## Performance Optimization

### 1. Caching Strategy

```typescript
// lib/cache.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export async function getCachedTemplate(id: string) {
  const cached = await redis.get(`template:${id}`);
  if (cached) return JSON.parse(cached);
  
  const template = await prisma.template.findUnique({ where: { id } });
  await redis.set(`template:${id}`, JSON.stringify(template), 'EX', 3600);
  
  return template;
}
```

### 2. Image Optimization

- Use Next.js `<Image>` component for template thumbnails
- Generate multiple sizes for responsive images
- Lazy load template gallery
- Use WebP format with JPEG fallback

### 3. Database Indexing

```prisma
// Already included in schema:
@@index([userId])
@@index([category])
@@index([status])
```

### 4. CDN Configuration

- Cache template assets (fonts, images) for 1 year
- Cache generated exports for 7 days
- Use CloudFront or Vercel Edge Network

---

## Deployment Strategy

### Environment Variables

```bash
# .env.example
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/designstudio"

# Redis
REDIS_URL="redis://localhost:6379"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Storage (choose one)
# AWS S3
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
S3_BUCKET="designstudio-uploads"

# Or Vercel Blob
BLOB_READ_WRITE_TOKEN="your-blob-token"

# Optional: AI Services
OPENAI_API_KEY="sk-..."
REPLICATE_API_TOKEN="r8_..."
```

### Docker Setup (Optional)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/designstudio
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: designstudio
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add REDIS_URL
# ... add all env vars
```

---

## Testing Strategy

### Unit Tests

```typescript
// tests/unit/render.service.test.ts
import { RenderService } from '@/services/render.service';

describe('RenderService', () => {
  it('should interpolate template variables', () => {
    const service = new RenderService();
    const result = service['interpolateVariables'](
      'Hello {{name}}',
      { name: 'John' }
    );
    expect(result).toBe('Hello John');
  });
});
```

### Integration Tests

```typescript
// tests/integration/api.test.ts
import { POST } from '@/app/api/designs/route';

describe('/api/designs', () => {
  it('should create a new design', async () => {
    const req = new Request('http://localhost/api/designs', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'template-1',
        name: 'My Design',
        data: { event_name: 'Birthday Party' },
      }),
    });
    
    const res = await POST(req);
    const data = await res.json();
    
    expect(data.design).toBeDefined();
    expect(data.design.name).toBe('My Design');
  });
});
```

### E2E Tests (Playwright)

```typescript
// tests/e2e/editor.spec.ts
import { test, expect } from '@playwright/test';

test('should create and export a design', async ({ page }) => {
  await page.goto('/templates');
  await page.click('text=Birthday Invitation');
  
  await page.fill('[name="event_name"]', 'My Birthday');
  await page.fill('[name="event_date"]', '2025-12-25');
  await page.click('button:has-text("Create")');
  
  await expect(page).toHaveURL(/\/editor\/.+/);
  
  await page.click('button:has-text("Export")');
  await page.click('text=PNG');
  
  const downloadPromise = page.waitForEvent('download');
  await page.click('button:has-text("Download")');
  const download = await downloadPromise;
  
  expect(download.suggestedFilename()).toMatch(/\.png$/);
});
```

---

## Security Considerations

### 1. Input Validation

```typescript
// utils/validators.ts
import { z } from 'zod';

export const designSchema = z.object({
  templateId: z.string().cuid(),
  name: z.string().min(1).max(100),
  data: z.record(z.string(), z.any()),
});

export const exportSchema = z.object({
  designId: z.string().cuid(),
  format: z.enum(['PNG', 'JPEG', 'PDF', 'SVG', 'WEBP']),
  width: z.number().min(100).max(10000).optional(),
  height: z.number().min(100).max(10000).optional(),
  dpi: z.enum([72, 150, 300, 600]).optional(),
});
```

### 2. Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request: Request) {
  if (request.url.includes('/api/export')) {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return new Response('Rate limit exceeded', { status: 429 });
    }
  }
}
```

### 3. Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://api.designstudio.com;
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 4. File Upload Sanitization

```typescript
// lib/upload.ts
import sanitize from 'sanitize-filename';

export function sanitizeFilename(filename: string): string {
  return sanitize(filename).replace(/[^a-zA-Z0-9.-]/g, '_');
}

export function validateImageUpload(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
  
  return true;
}
```

---

## Monitoring & Analytics

### Error Tracking (Sentry)

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Analytics Events

```typescript
// lib/analytics.ts
export function trackDesignCreated(templateId: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'design_created', {
      template_id: templateId,
    });
  }
}

export function trackExport(format: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'design_exported', {
      format,
    });
  }
}
```

### Performance Monitoring

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Development Phases

### Phase 1: MVP (4-6 weeks)

**Week 1-2: Foundation**
- [ ] Set up Next.js project with TypeScript
- [ ] Configure Tailwind CSS and UI components
- [ ] Set up PostgreSQL database and Prisma
- [ ] Implement authentication (NextAuth.js)
- [ ] Create basic layouts and navigation
- [ ] Set up subscription system (Stripe integration)

**Week 3-4: Core Features**
- [ ] Build template gallery and browsing
- [ ] Implement design creation flow
- [ ] Create canvas editor with Fabric.js
- [ ] Build property panel for editing
- [ ] Implement save/load functionality

**Week 5-6: Export & Polish**
- [ ] Set up Puppeteer for server rendering
- [ ] Implement PNG/JPEG export
- [ ] Add PDF export
- [ ] Set up S3/Blob storage
- [ ] Testing and bug fixes
- [ ] Deploy to Vercel

**MVP Features**:
- 10-15 pre-built templates (invitations, flyers)
- Text editing (content, fonts, colors)
- Basic shape customization
- Export to PNG, JPEG, PDF
- User accounts and saved designs

### Phase 2: Enhanced Features (4-6 weeks)

- [ ] Advanced editor features (layers, alignment, grouping)
- [ ] Image upload and editing
- [ ] More templates (50+)
- [ ] Template search and filtering
- [ ] Design variants (color schemes)
- [ ] Social sharing
- [ ] Usage analytics dashboard
- [ ] Performance optimizations

### Phase 3: Advanced Features (6-8 weeks)

- [ ] AI background generation (Stability.ai integration)
- [ ] AI text suggestions (GPT integration)
- [ ] Background removal for uploaded images
- [ ] Custom template creation
- [ ] Team collaboration features
- [ ] Print shop integration
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations

### Phase 4: Scale & Monetization (Ongoing)

- [ ] Premium templates marketplace with creator payouts
- [ ] Print-on-demand integration (VistaPrint, Moo APIs)
- [ ] White-label solution for agencies
- [ ] Enterprise features (SSO, custom domains)
- [ ] Advanced analytics and usage metrics
- [ ] Multi-language support (i18n)
- [ ] Affiliate program dashboard
- [ ] Revenue analytics and reporting
- [ ] Marketing automation (email campaigns, drip sequences)
- [ ] Customer success tools (onboarding, retention)

---

## Scalability Considerations

### Database Scaling

1. **Read Replicas**: Use PostgreSQL read replicas for template browsing
2. **Partitioning**: Partition `designs` and `outputs` tables by date
3. **Archiving**: Move old designs to cold storage after 6 months

### Rendering Performance

1. **Worker Pools**: Run multiple Puppeteer instances in parallel
2. **Queue Prioritization**: Premium users get priority in render queue
3. **Pre-rendering**: Cache common template + data combinations
4. **Edge Functions**: Use Vercel Edge for client-side preview generation

### Storage Optimization

1. **Compression**: Compress PNG exports with pngquant
2. **CDN**: Serve all static assets and exports via CDN
3. **Cleanup**: Delete unused exports after 30 days
4. **Deduplication**: Hash-based deduplication for identical exports

### Cost Optimization

1. **Lazy Rendering**: Only render when user clicks download
2. **Preview Caching**: Cache low-res previews in Redis
3. **Batch Processing**: Process multiple export requests together
4. **Spot Instances**: Use AWS Spot for render workers (if self-hosting)

---

## Future Enhancements

### AI-Powered Features
- **Smart Auto-Layout**: AI suggests optimal text placement
- **Color Palette Generation**: AI generates harmonious color schemes
- **Content Suggestions**: GPT suggests event descriptions, taglines
- **Image Enhancement**: Auto-crop, upscale, color correction
- **Style Transfer**: Apply artistic styles to designs

### Advanced Editing
- **Animation**: Create animated invitations (GIF, MP4)
- **3D Elements**: Add 3D text and shapes
- **Advanced Typography**: Curved text, text on path
- **Filters & Effects**: Instagram-style filters, blur, shadows
- **Smart Objects**: Reusable design components

### Collaboration
- **Real-time Editing**: Multiple users edit simultaneously
- **Comments**: Add feedback on specific elements
- **Version History**: Track and restore previous versions
- **Template Sharing**: Users share custom templates

### Integration
- **Calendar Integration**: Google Calendar, Outlook for event dates
- **Email Marketing**: Send designs via Mailchimp, SendGrid
- **Social Media**: Auto-post to Instagram, Facebook
- **E-commerce**: Integrate with Shopify for product designs
- **Print-on-Demand**: Partner with printing services

### Mobile App
- **React Native App**: Full-featured mobile editor
- **Offline Mode**: Edit designs without internet
- **Camera Integration**: Capture and use photos directly
- **QR Code Generation**: Generate QR codes for events

---

## Conclusion

This implementation guide provides a comprehensive roadmap for building a professional design automation platform. Start with the MVP to validate the concept, then iterate based on user feedback.

**Key Success Factors**:
1. **Template Quality**: Invest in professional, diverse templates
2. **User Experience**: Make editing intuitive and fast
3. **Export Quality**: Ensure high-resolution, print-ready outputs
4. **Performance**: Keep preview and export times under 3 seconds
5. **Reliability**: 99.9% uptime for export services

**Getting Started**:
```bash
# Initialize project
npx create-next-app@latest designstudio --typescript --tailwind --app
cd designstudio

# Install dependencies
npm install prisma @prisma/client next-auth @auth/prisma-adapter
npm install fabric konva sharp puppeteer
npm install @aws-sdk/client-s3 bullmq ioredis
npm install zod react-hook-form @hookform/resolvers
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install stripe @stripe/stripe-js
npm install resend

# Set up database
npx prisma init
npx prisma migrate dev --name init

# Run development server
npm run dev
```

Good luck with your Design Studio project! 🚀
