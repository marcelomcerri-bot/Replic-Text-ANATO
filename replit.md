# AnatomiaViva - Educational Anatomy Platform

## Overview
AnatomiaViva is a Next.js 15 educational platform for anatomy designed for nursing students. The platform provides detailed content, commented questions, an expanded glossary, and interactive resources to enhance learning.

## Project Status
Successfully migrated from Vercel to Replit on October 24, 2025. GitHub import completed and running on October 25, 2025.

## Recent Changes
- **2025-10-26**: Implemented interactive anatomical image system with zoom functionality
  - Installed `react-medium-image-zoom` package for interactive image zooming
  - Created `AnatomicalImage` and `AnatomicalImageGrid` components in `components/anatomical-image.tsx`
  - Updated `app/pratica/[id]/pratica-topic-client.tsx` to use new image components
  - Added zoom CSS imports to `app/globals.css`
  - **Features**: Click-to-zoom on all anatomical images, automatic credits display, descriptive captions support, responsive grid layout (2-3 columns)
  - **Supports two formats**: Simple string URLs (default Gray's Anatomy credit) OR detailed objects with `src`, `legend`, `credit`, and `alt` fields
  - **Recommended sources**: Gray's Anatomy (1918), Bassett Collection (Stanford), OpenStax Anatomy & Physiology, AnatomyTool.org, Visible Human Project, Radiopaedia
  - Created comprehensive documentation in `docs/ANATOMICAL_IMAGES_GUIDE.md` with examples and best practices
  - Tested successfully on `/pratica/coracao` - images display beautifully with zoom functionality
- **2025-10-26**: Added Gray's Anatomy illustrations to practice anatomy cards
  - Integrated high-quality anatomical illustrations from Gray's Anatomy (1918 edition, public domain) via Wikimedia Commons
  - Added images to 8 major practice anatomy cards: Ossos do Membro Superior/Inferior, Artérias e Veias do Membro Superior/Inferior, Músculos do Membro Inferior, Nervos dos Membros, Crânio, Coração
  - Used stable Wikimedia Commons Special:FilePath URLs for reliable image delivery
  - Each section includes 2-3 relevant Gray's Anatomy plates (e.g., Gray202-220 for upper limb bones, Gray430-434 for lower limb muscles, Gray490-495 for heart anatomy)
  - All images properly attributed with "Fonte: Gray's Anatomy (1918) - Domínio Público" caption
  - Enhanced visual learning experience for nursing students with classical anatomical illustrations
- **2025-10-25**: Major expansion of Heart (Coração) topic with NCBI scientific sources
  - Completely expanded heart topic from 262 to 557 lines (~112% increase) with comprehensive anatomical detail
  - Added detailed anatomy of all 4 cardiac chambers (right/left atria and ventricles) with structural and functional descriptions
  - Complete valve system coverage: tricuspid, mitral (bicuspid), pulmonary, and aortic valves with structural components (chordae tendineae, papillary muscles, fibrous skeleton)
  - Full cardiac conduction system: SA node, AV node, Bundle of His, left/right bundle branches, Purkinje fibers with anatomical locations and functions
  - Comprehensive coronary circulation: arterial anatomy (right and left coronary arteries, branches, dominance patterns), venous drainage, physiological characteristics
  - Cardiac development and congenital defects (foramen ovale, ductus arteriosus, septal defects)
  - Cardiac cycle, heart sounds, auscultation details
  - Detailed autonomic innervation (parasympathetic/vagal and sympathetic systems)
  - Aging-related cardiac changes
  - **Scientific references**: Added 9 NCBI sources (StatPearls, PubMed, PMC) including Anderson et al., James TN, Lincoln & Yutzey
  - Added `references` field to TopicContent interface to support bibliographic citations
  - Applied academic formatting: technical-scientific language, articulated paragraphs, reduced bullet points, professional medical terminology
- **2025-10-25**: Comprehensive content reformatting for maximum academic quality
  - Reformatted 4 flagship theoretical topics (Introduction to Anatomy, Skeletal System, Articular System, Muscular System) with enhanced academic prose
  - Reduced excessive bullet points, created fluid well-articulated paragraphs suitable for nursing students
  - Improved visual hierarchy and professional styling throughout reformatted content
  - Fixed all LSP/TypeScript errors across 37 content files (22 theoretical + 15 practical topics)
  - Removed obsolete 'id' fields from all topic definitions to comply with TopicContent interface
  - Fixed duplicate property errors in topic structure
  - **Quality Assurance**: Architect review confirmed zero data loss, enhanced prose quality aligns with professional academic standards
  - Platform tested and verified: navigation functional, all topics rendering correctly, server running successfully
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
- **Package Manager**: npm
- **UI Libraries**: Radix UI components, Tailwind CSS
- **Image Zoom**: react-medium-image-zoom
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
  - `anatomical-image.tsx`: Interactive image components with zoom, captions, and credits
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
