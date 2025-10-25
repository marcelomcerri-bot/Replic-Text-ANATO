"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { glossaryByCategory } from "@/lib/glossary-data"

export default function GlossarioPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = glossaryByCategory
    .map((category) => ({
      ...category,
      terms: category.terms.filter((item) => {
        const query = searchQuery.toLowerCase()
        return item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query)
      }),
    }))
    .filter((category) => category.terms.length > 0)

  const totalTerms = filteredCategories.reduce((sum, cat) => sum + cat.terms.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Glossário de Anatomia</h1>
          <p className="text-lg text-muted-foreground mb-6">Termos anatômicos essenciais organizados por categoria</p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar termo..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-12">
          {filteredCategories.map((categoryGroup, categoryIndex) => (
            <div key={categoryGroup.category} className="space-y-6">
              <div className="relative pb-3">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {categoryGroup.category}
                  <span className="text-sm font-normal text-muted-foreground ml-3">
                    ({categoryGroup.terms.length} {categoryGroup.terms.length === 1 ? "termo" : "termos"})
                  </span>
                </h2>
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryGroup.terms.map((item, termIndex) => (
                  <Card
                    key={`${item.term}-${termIndex}`}
                    className="hover:shadow-md transition-all duration-300 hover:border-accent/50 bg-card border-l-4 border-l-accent/30 animate-float"
                    style={{
                      animationDelay: `${(categoryIndex * 3 + termIndex) * 0.05}s`,
                    }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{item.term}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="leading-relaxed">{item.definition}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {totalTerms === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum termo encontrado para "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
