# AnatomiaViva - Educational Anatomy Platform

## Overview
AnatomiaViva is a Next.js 15 educational platform for anatomy designed for nursing students. The platform provides detailed content, commented questions, an expanded glossary, and interactive resources to enhance learning.

## Project Status
Successfully migrated from Vercel to Replit on October 24, 2025. GitHub import completed and running on October 25, 2025.

## Recent Changes
- **2025-10-25**: GitHub import setup completed
  - Extracted project from GitHub import zip file
  - Installed Node.js 20 runtime
  - Installed all npm dependencies
  - Configured Next.js to allow all dev origins for Replit proxy
  - Added cache-control headers to prevent caching issues
  - Set up workflow to run on port 5000
  - Configured autoscale deployment for production
  - Verified app is running correctly with screenshot
- **2025-10-24**: Implemented tab-based navigation and practical anatomy content
  - Added tab-based navigation separating "Anatomia Teórica" and "Anatomia Prática"
  - Created comprehensive upper limb muscle content based on NCBI scientific sources
  - Added detailed anatomy for: pectoralis major/minor, deltoid, rotator cuff (SITS), biceps, triceps, forearm compartments, and hand intrinsic muscles
  - Documented 10+ NCBI scientific references (StatPearls) in references page
  - All content includes origins, insertions, innervation, functions, and clinical relevance
- **2025-10-24**: Migrated project from Vercel to Replit
  - Updated Next.js dev and start scripts to bind to 0.0.0.0:5000 for Replit environment
  - Configured workflow to run development server on port 5000
  - Set up autoscale deployment configuration for production
  - Installed all dependencies with pnpm

## Technology Stack
- **Framework**: Next.js 15.2.4
- **Runtime**: Node.js 20
- **Package Manager**: pnpm
- **UI Libraries**: Radix UI components, Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Analytics**: Vercel Analytics

## Development
- Dev server runs on port 5000 bound to 0.0.0.0
- Start the development server: `pnpm run dev`
- Build for production: `pnpm run build`
- Run production server: `pnpm run start`

## Deployment
- **Target**: Autoscale (stateless web application)
- **Build command**: `pnpm run build`
- **Start command**: `pnpm run start`
- **Port**: 5000

## Project Architecture
- **app/**: Next.js App Router structure
  - `/`: Home page
  - `/topicos`: Topics listing page with tab navigation (Teórica/Prática)
  - `/topico/[id]`: Dynamic topic detail pages (theoretical anatomy)
  - `/pratica/[id]`: Dynamic practical anatomy pages (muscle content)
  - `/glossario`: Glossary page
  - `/referencias`: References page with NCBI scientific citations
- **components/**: Reusable React components
  - `ui/tabs.tsx`: Radix UI tab component for navigation
  - `formatted-text.tsx`: Renders formatted text with markdown-like styling
- **lib/**: Utility functions and shared code
  - `topics/`: Theoretical anatomy content organized by body system
  - `pratica-topics/`: Practical anatomy content (muscles, detailed anatomy)
  - `pratica-topics-data.ts`: Data structure for practical anatomy content
- **public/**: Static assets
- **styles/**: Global styles and CSS

## Content Organization
- **Anatomia Teórica**: Systemic anatomy organized by body systems (nervous, cardiovascular, respiratory, etc.)
- **Anatomia Prática**: Detailed muscle anatomy with scientific references from NCBI
  - Currently includes: Upper Limb Muscles (chest, shoulder, arm, forearm, hand)
  - All content based exclusively on NCBI StatPearls and peer-reviewed sources
  - Each muscle includes: anatomy, origin, insertion, innervation, function, vascularization, clinical relevance

## Security & Best Practices
- Client/server separation maintained through Next.js App Router
- No sensitive data or API keys in codebase
- TypeScript strict mode disabled during build (ignoreBuildErrors: true)
- ESLint disabled during builds (ignoreDuringBuilds: true)
- Images set to unoptimized mode for compatibility
