import { notFound } from "next/navigation"
import { topicsData } from "@/lib/topics-data"
import { TopicClient } from "./topic-client"

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // First try the exact ID from URL, then try with underscores
  const topic = topicsData[id] || topicsData[id.replace(/-/g, "_")]

  if (!topic) {
    notFound()
  }

  return <TopicClient topic={topic} />
}
