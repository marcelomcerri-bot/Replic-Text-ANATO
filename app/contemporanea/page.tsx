"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Calendar, Users, BookOpen, ExternalLink, RefreshCw } from "lucide-react"

interface Article {
  pmid: string
  title: string
  authors: string
  journal: string
  pubdate: string
  abstract: string
  doi?: string
  link: string
  category?: string
}

interface ApiResponse {
  articles: Article[]
  categories: string[]
  cachedAt: string
  nextUpdate: string
  error?: string
}

export default function ContemporaneaPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cachedAt, setCachedAt] = useState<string>("")
  const [nextUpdate, setNextUpdate] = useState<string>("")

  const fetchArticles = async (forceRefresh = false) => {
    setLoading(true)
    setError(null)
    try {
      const url = forceRefresh 
        ? "/api/contemporary?refresh=true" 
        : "/api/contemporary"
      
      const response = await fetch(url)
      const data: ApiResponse = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar artigos")
      }
      
      setArticles(data.articles)
      setFilteredArticles(data.articles)
      setCategories(["Todas", ...data.categories])
      setCachedAt(data.cachedAt)
      setNextUpdate(data.nextUpdate)
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Erro desconhecido ao buscar artigos científicos"
      
      console.error("Erro ao buscar artigos:", err)
      setError(errorMessage)
      setArticles([])
      setFilteredArticles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    let filtered = articles

    if (selectedCategory !== "Todas") {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.authors.toLowerCase().includes(query) ||
        article.journal.toLowerCase().includes(query)
      )
    }

    setFilteredArticles(filtered)
  }, [selectedCategory, searchQuery, articles])

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('pt-BR', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-8 w-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Pesquisa Científica em Anatomia
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Artigos científicos e descobertas recentes em anatomia humana dos últimos 7 dias
          </p>

          {cachedAt && (
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>
                Última atualização: {formatDate(cachedAt)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchArticles(true)}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar agora
              </Button>
            </div>
          )}
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, autor ou revista..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            {loading ? (
              <span>Carregando artigos...</span>
            ) : (
              <span>
                {filteredArticles.length} {filteredArticles.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/3 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </Card>
              ))}
            </>
          ) : error ? (
            <Card className="p-12 text-center border-destructive/50 bg-destructive/5">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-destructive">Erro ao carregar artigos</h3>
              <p className="text-muted-foreground mb-4">
                {error}
              </p>
              <Button
                onClick={() => fetchArticles(true)}
                variant="default"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
            </Card>
          ) : filteredArticles.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhum artigo encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou volte mais tarde para ver novos artigos
              </p>
            </Card>
          ) : (
            filteredArticles.map((article) => (
              <Card
                key={article.pmid}
                className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent/30 hover:border-l-accent"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {article.category && (
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                      )}
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.pubdate)}
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-3 leading-tight text-foreground">
                      {article.title}
                    </h2>

                    <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{article.authors}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="italic">{article.journal}</span>
                      </div>
                    </div>

                    {article.abstract && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {article.abstract}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      asChild
                    >
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Ver no PubMed
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>

                    {article.doi && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a
                          href={`https://doi.org/${article.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          DOI
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
