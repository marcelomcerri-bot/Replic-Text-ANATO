import { notFound } from "next/navigation"
import { praticaTopicsData } from "@/lib/pratica-topics-data"
import { PraticaTopicClient } from "./pratica-topic-client"

export default async function PraticaTopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const topic = praticaTopicsData[id] || praticaTopicsData[id.replace(/-/g, "_")]

  if (!topic) {
    notFound()
  }

  return <PraticaTopicClient topic={topic} />
}
