interface Subsection {
  title: string
  content: string[] | string
  subsections?: Subsection[]
}

export interface PraticaTopicContent {
  title: string
  description: string
  content: {
    sections: Array<{
      title: string
      content: string[]
      subsections?: Subsection[]
      images?: string[]
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
