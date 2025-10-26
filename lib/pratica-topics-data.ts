interface Subsection {
  title: string
  content: string[] | string
  subsections?: Subsection[]
  images?: (string | AnatomicalImage)[]
}

export interface AnatomicalImage {
  src: string
  legend?: string
  credit?: string
  alt?: string
  type?: 'historical' | 'modern'
}

export interface PraticaTopicContent {
  title: string
  description: string
  content: {
    sections: Array<{
      title: string
      content: string[]
      subsections?: Subsection[]
      images?: (string | AnatomicalImage)[]
    }>
  }
  summary: Array<{
    concept: string
    definition: string
  }>
  questions: Array<{
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }>
}

import { allPraticaTopics } from "./pratica-topics/index"

export const praticaTopicsData: Record<string, PraticaTopicContent> = allPraticaTopics
