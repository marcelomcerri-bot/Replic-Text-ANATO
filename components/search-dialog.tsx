"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search, FileText } from "lucide-react"
import Link from "next/link"
import { topicsData } from "@/lib/topics-data"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Array<{ id: string; title: string; match: string }>>([])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const matches: Array<{ id: string; title: string; match: string }> = []

    Object.entries(topicsData).forEach(([id, topic]) => {
      if (!topic) return

      // Search in title
      if (topic.title?.toLowerCase().includes(searchQuery)) {
        matches.push({
          id,
          title: topic.title,
          match: `Tópico: ${topic.title}`,
        })
      }

      // Search in content sections
      if (topic.content?.sections && Array.isArray(topic.content.sections)) {
        topic.content.sections.forEach((section) => {
          if (!section) return

          if (section.title?.toLowerCase().includes(searchQuery)) {
            matches.push({
              id,
              title: topic.title,
              match: `Seção: ${section.title}`,
            })
          }

          if (Array.isArray(section.content)) {
            section.content.forEach((text) => {
              if (typeof text === "string" && text.toLowerCase().includes(searchQuery)) {
                const index = text.toLowerCase().indexOf(searchQuery)
                const start = Math.max(0, index - 50)
                const end = Math.min(text.length, index + 100)
                const snippet = text.slice(start, end)
                matches.push({
                  id,
                  title: topic.title,
                  match: `...${snippet}...`,
                })
              }
            })
          }
        })
      }

      // Search in questions
      if (topic.questions && Array.isArray(topic.questions)) {
        topic.questions.forEach((q, idx) => {
          if (!q) return

          const questionMatch = q.question?.toLowerCase().includes(searchQuery)
          const explanationMatch = q.explanation?.toLowerCase().includes(searchQuery)

          if (questionMatch || explanationMatch) {
            matches.push({
              id,
              title: topic.title,
              match: `Questão ${idx + 1}: ${q.question?.slice(0, 80) || ""}...`,
            })
          }
        })
      }
    })

    setResults(matches.slice(0, 10))
  }, [query])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Buscar Conteúdo</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Digite para buscar em todos os tópicos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        <div className="flex-1 overflow-y-auto mt-4">
          {results.length === 0 && query && (
            <p className="text-sm text-muted-foreground text-center py-8">Nenhum resultado encontrado</p>
          )}
          {results.length === 0 && !query && (
            <p className="text-sm text-muted-foreground text-center py-8">Digite algo para buscar no conteúdo</p>
          )}
          <div className="space-y-2">
            {results.map((result, idx) => (
              <Link
                key={idx}
                href={`/topico/${result.id.replace(/_/g, "-")}`}
                onClick={() => onOpenChange(false)}
                className="block p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{result.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{result.match}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
