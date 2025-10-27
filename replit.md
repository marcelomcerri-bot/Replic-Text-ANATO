# AnatomiaViva - Educational Anatomy Platform

## Overview
AnatomiaViva is a Next.js 15 educational platform for anatomy designed for nursing students. The platform provides detailed content, commented questions, an expanded glossary, and interactive resources to enhance learning.

## Project Status
Successfully migrated from Vercel to Replit on October 24, 2025. GitHub import completed and running on October 25, 2025.

## Recent Changes
- **2025-10-27**: Implemented "Anatomia Contemporânea" section with PubMed scientific articles
  - **Feature**: New section displaying recent scientific articles (last 7 days) from PubMed across 10 anatomy categories
  - **Implementation**:
    - Created `/api/contemporary` endpoint with PubMed E-utilities API integration
    - Built persistent file-based cache system (.next/cache/pubmed-articles.json) with 24-hour duration
    - Developed `/contemporanea` page with article cards, search filters, and category filters
    - Added navigation link in site header
  - **Categories**: Neuroanatomia, Anatomia Cardiovascular, Anatomia Músculo-Esquelética, Anatomia do Sistema Digestivo, Anatomia do Sistema Respiratório, Anatomia do Sistema Urinário, Anatomia do Sistema Endócrino, Anatomia do Sistema Reprodutor, Anatomia Óssea, Anatomia Geral
  - **Features**:
    - Real-time article fetching from PubMed (free API, no key required)
    - Persistent cache survives server restarts (max 1-2 API calls/day)
    - Stale cache fallback when PubMed is unavailable
    - Client-side search by title/author/journal
    - Category filtering with article count badges
    - Direct links to PubMed and DOI for each article
    - Error handling distinguishes network failures from empty results
  - **Performance**: Cache reduces API load from 978ms to 6ms on subsequent requests
  - **Quality Assurance**: Architect review confirmed robust error handling, proper cache persistence, and production-ready implementation
- **2025-10-26**: Integrated Google Gemini AI assistant for student support
  - **Feature**: AI-powered chat assistant to answer anatomy questions using scientific knowledge
  - **Implementation**: 
    - Created `/api/chat` endpoint that processes questions with full site context
    - Built `lib/gemini.ts` using @google/genai SDK with gemini-2.5-flash model
    - Developed `AIChatAssistant` component with floating UI (close only, no minimize)
    - Integrated assistant globally in app layout
  - **Knowledge sources**: 
    - Prioritizes site content (theoretical topics, practical topics, glossary)
    - Supplements with scientific sources from National Library of Medicine (NCBI), StatPearls, and anatomy literature when needed
    - Provides technical but accessible explanations for nursing students
  - **Language**: Responds in Portuguese with complete anatomical details (origin, insertion, function, innervation, vascularization)
  - **UX**: Floating button in bottom-right corner, expandable chat window, close button only
  - **Security**: API key managed via Replit Secrets (GEMINI_API_KEY)
  - **Validation**: Tested extensively - confirmed comprehensive, scientifically accurate responses
  - **Quality Assurance**: Architect review confirmed all requirements met, functional implementation, no security issues
- **2025-10-26**: Fixed critical bug in upper limb arteries/veins images - all Gray's Anatomy URLs restored
  - **Problem**: All 5 Gray's Anatomy image URLs in arterias-veias-membro-superior.ts were broken (HTTP 404) since project inception
  - **Root cause**: Incorrect Wikimedia Commons hash paths in URLs (used 0/00/, 5/5e/, d/d1/, c/cd/, a/ae/, f/f6/ instead of correct hashes)
  - **Solution**: Manually searched Wikimedia Commons and retrieved correct URLs with proper hash paths
  - **Fixed images**:
    - Gray525 (subclavian artery): `7/7d/Gray525.png` - 117 KB ✅
    - Gray526 (axillary artery): `9/92/Gray526.png` - 65 KB ✅
    - Gray527 (radial/ulnar arteries): `f/f2/Gray527.png` - 87 KB ✅
    - Gray575 (superficial veins): `8/80/Gray575.png` - 44 KB ✅
    - Gray577 (deep veins/vena cava): `4/4d/Gray577.png` - 63 KB ✅
  - **Validation**: All URLs tested (HTTP 200, proper file sizes), server restarted, visual confirmation via screenshot
  - **Status**: All Gray's Anatomy historical plates now loading correctly throughout arterial and venous sections
  - **Remaining**: Modern educational diagram companions still pending (originally planned as paired-diagram system)
- **2025-10-26**: Completed anatomical image system with comprehensive coverage of major topics
  - **Phase 1**: Implemented interactive anatomical image system with zoom functionality
    - Installed `react-medium-image-zoom` package for interactive image zooming
    - Created `AnatomicalImage` and `AnatomicalImageGrid` components in `components/anatomical-image.tsx`
    - Updated `app/pratica/[id]/pratica-topic-client.tsx` to use new image components
    - Added zoom CSS imports to `app/globals.css`
    - Created comprehensive documentation in `docs/ANATOMICAL_IMAGES_GUIDE.md`
  - **Phase 2**: Added licensed anatomical images to 9+ major Anatomia Prática topics
    - **Completed topics**: Ossos do Membro Superior, Ossos do Membro Inferior, Músculos do Membro Inferior, Artérias e Veias do Membro Superior, Artérias e Veias do Membro Inferior, Nervos dos Membros, Crânio, Articulações, Coração
    - Each topic includes 2-5 high-resolution images (≥1000px) from authorized sources
    - **Image sources**: Gray's Anatomy 1918 (Wikimedia Commons - Public Domain), OpenStax Anatomy & Physiology (CC BY 4.0), Bassett Collection via Stanford Medicine Flickr (CC BY-NC-SA)
    - All images include complete metadata: descriptive legends in Portuguese, proper attribution credits, accessibility alt text
    - **Interface**: Backward compatible - supports both legacy string[] format and new rich object format {src, legend, credit, alt}
    - **Features**: Click-to-zoom on all anatomical images, automatic credits display, responsive grid layout (2-3 columns), accessible with proper alt text
  - **Quality Assurance**: Architect review confirmed correct implementation, proper licensing, accessibility compliance, and excellent UX
  - **Testing**: Screenshots verified images display correctly with zoom functionality on multiple topics
  - **Remaining work**: 5 topics pending images (Músculos do Membro Superior, Músculos Vasos e Nervos da Face, Parede Torácica e TGI, Retroperitônio e Sistema Urinário, Sistema Respiratório e Região Cervical)
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
