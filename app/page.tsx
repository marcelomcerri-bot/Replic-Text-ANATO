import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { BookOpen, Brain, CheckCircle2, Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Brain className="h-4 w-4" />
              Plataforma Educacional de Anatomia
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">AnatomiaViva</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
              Plataforma educacional completa de anatomia humana para estudantes de enfermagem. Conteúdo detalhado,
              questões comentadas, glossário expandido e recursos interativos para potencializar seu aprendizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/topicos">
                <Button size="lg" className="gap-2 text-base">
                  <BookOpen className="h-5 w-5" />
                  Explorar Tópicos
                </Button>
              </Link>
              <Link href="/glossario">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
                >
                  <Search className="h-5 w-5" />
                  Ver Glossário
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conteúdo Completo</h3>
              <p className="text-muted-foreground leading-relaxed">
                Aulas detalhadas organizadas por tópicos e subtópicos, com explicações claras e objetivas sobre cada
                estrutura anatômica.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Questões Comentadas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Teste seus conhecimentos com questões de fixação e gabaritos comentados que explicam cada resposta em
                detalhes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Busca Inteligente</h3>
              <p className="text-muted-foreground leading-relaxed">
                Encontre rapidamente qualquer termo, conceito ou tópico através do sistema de busca integrado e do
                glossário completo.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Comece a Estudar Agora</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
              Ver todos os tópicos
            </p>
            <Link href="/topicos">
              <Button size="lg" variant="secondary" className="gap-2">
                Ver Todos os Tópicos
                <BookOpen className="h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Marcelo Marques Cerri. Material educacional para estudantes de enfermagem.
          </p>
        </div>
      </footer>
    </div>
  )
}
