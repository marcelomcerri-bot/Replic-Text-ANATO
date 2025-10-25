export interface TopicContent {
  title: string
  description: string
  content: {
    sections: Array<{
      title: string
      content: string[]
      subsections?: Array<{
        title: string
        content: string[] | string
      }>
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
  references?: Array<{
    title: string
    authors: string
    source: string
    year: string
    url: string
    type: string
  }>
}

import { allTopics } from "./topics/index"

export const topicsData: Record<string, TopicContent> = allTopics
