# AnatomiaViva - Educational Anatomy Platform

## Overview
AnatomiaViva is a Next.js 15 educational platform designed for nursing students, providing detailed anatomy content, commented questions, an expanded glossary, and interactive resources. Its purpose is to enhance learning through comprehensive and scientifically accurate information, including interactive images and an AI assistant. The platform aims to be a leading resource for anatomy education, continually integrating modern pedagogical tools and scientific research.

## User Preferences
I prefer detailed explanations and a professional, academic tone in all communications. I want the agent to prioritize high-quality, scientifically accurate content. The agent should ask for confirmation before making any major architectural changes or significant content overhauls.

## System Architecture
The platform is built on Next.js 15 using the App Router for structured navigation (`/`, `/topicos`, `/topico/[id]`, `/pratica/[id]`, `/glossario`, `/referencias`). UI/UX relies on Radix UI components and Tailwind CSS for a modern, responsive design.

**Key Features and Implementations:**
- **Tab-based Navigation:** Separates "Anatomia Teórica" (systemic anatomy) and "Anatomia Prática" (detailed anatomy like muscles).
- **Interactive Anatomical Images:** Utilizes `react-medium-image-zoom` for zoom functionality, supporting images from Gray's Anatomy, OpenStax, and Bassett Collection with proper attribution and metadata.
- **AI Chat Assistant:** Integrated globally using Google Gemini AI (`gemini-2.5-flash`) via `lib/gemini.ts` to answer anatomy questions, prioritizing site content and supplementing with scientific sources like NCBI and StatPearls.
- **Scientific Research Section ("Pesquisa Científica em Anatomia"):** Displays recent PubMed articles (last 7 days) across 10 anatomy categories, with a custom `/api/contemporary` endpoint, file-based cache, and client-side filtering.
- **Content Organization:**
    - **Anatomia Teórica:** Systemic anatomy (nervous, cardiovascular, etc.).
    - **Anatomia Prática:** Detailed muscle anatomy (e.g., upper limb), with content exclusively from NCBI StatPearls and peer-reviewed sources, including origin, insertion, innervation, function, vascularization, and clinical relevance.
- **Content Quality:** Emphasis on comprehensive, academically formatted prose, reducing bullet points for fluid readability.
- **Development & Deployment:** Node.js 20 runtime, npm package manager. Configured for autoscale deployment on Replit, running on port 5000.

## External Dependencies
- **Google Gemini AI:** Used for the AI chat assistant (`@google/genai` SDK).
- **PubMed E-utilities API:** Integrated for fetching scientific articles in the "Pesquisa Científica" section (no API key required).
- **Wikimedia Commons:** Source for Public Domain images (e.g., Gray's Anatomy).
- **OpenStax Anatomy & Physiology:** Source for CC BY 4.0 licensed educational images.
- **Stanford Medicine Flickr (Bassett Collection):** Source for CC BY-NC-SA licensed anatomical images.
- **Radix UI:** UI component library.
- **Tailwind CSS:** Utility-first CSS framework.
- **react-medium-image-zoom:** Library for interactive image zooming.
- **React Hook Form with Zod:** For form validation.
- **Vercel Analytics:** For platform analytics.
- **NCBI (National Center for Biotechnology Information) / StatPearls:** Primary sources for scientific content and references.