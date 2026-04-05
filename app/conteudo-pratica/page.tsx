import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown, BookOpen } from "lucide-react"

const materiais = [
  {
    prova: "1ª Prova",
    titulo: "Ossos e Músculos dos Membros",
    descricao:
      "Ossos do membro superior e inferior, articulações, músculos dos membros, sistema vascular dos membros superiores e inferiores.",
    arquivo: "/pdfs/pratica-p1.pdf",
    nome: "pratica-p1.pdf",
  },
  {
    prova: "2ª Prova",
    titulo: "Coração, Pescoço, Sistema Respiratório, Face e Crânio",
    descricao:
      "Vasos da base do coração, cavidades cardíacas, vasos coronarianos, cavidade nasal, laringe, traqueia, pulmões, músculos da mímica facial, mastigação, e osteologia do crânio.",
    arquivo: "/pdfs/pratica-p2.pdf",
    nome: "pratica-p2.pdf",
  },
  {
    prova: "3ª Prova",
    titulo: "Parede Abdominal e Trato Gastrointestinal",
    descricao:
      "Língua e cavidade oral, faringe, parede anterolateral do abdome, estômago, intestinos, fígado, vias biliares, pâncreas e vascularização abdominal.",
    arquivo: "/pdfs/pratica-p3.pdf",
    nome: "pratica-p3.pdf",
  },
]

export default function ConteudoPraticaPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Conteúdo da Prática
            </h1>
          </div>
          <p className="text-lg text-muted-foreground text-justify">
            Materiais de estudo para as aulas práticas de anatomia. Faça o download do PDF correspondente
            a cada prova para acompanhar o conteúdo nas aulas práticas.
          </p>
        </div>

        <div className="space-y-6">
          {materiais.map((material, index) => (
            <Card
              key={index}
              className="border-2 hover:border-accent/40 hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-full mb-2">
                      {material.prova}
                    </span>
                    <CardTitle className="text-xl">{material.titulo}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base text-justify mt-1">
                  {material.descricao}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href={material.arquivo} download={material.nome}>
                  <Button className="gap-2 bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white">
                    <FileDown className="h-4 w-4" />
                    Baixar PDF — {material.prova}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
