import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import {
  Brain,
  Bone,
  Heart,
  User,
  Skull,
  Columns3,
  Wind,
  Blinds as Lungs,
  BookOpen,
  Zap,
  Activity,
  Droplet,
  Pill,
  Clover as Liver,
  Dumbbell,
  Users,
  Baby,
  ScaleIcon as Skeleton,
  Shield,
  Utensils,
  Stethoscope,
  Hand,
} from "lucide-react"

const topicsBySystemTeorica = [
  {
    system: "Fundamentos",
    topics: [
      {
        id: "introducao-anatomia",
        title: "Introdução à Anatomia",
        description: "Conceitos fundamentais, terminologia anatômica e planos de secção",
        icon: BookOpen,
        available: true,
      },
    ],
  },
  {
    system: "Sistemas Estruturais",
    topics: [
      {
        id: "sistema-esqueletico",
        title: "Sistema Esquelético",
        description: "Ossos, cartilagens e estrutura do esqueleto humano",
        icon: Skeleton,
        available: true,
      },
      {
        id: "sistema-articular",
        title: "Sistema Articular",
        description: "Classificação das articulações, movimentos e estruturas articulares",
        icon: Activity,
        available: true,
      },
      {
        id: "sistema-muscular",
        title: "Sistema Muscular",
        description: "Músculos esqueléticos, lisos e cardíacos",
        icon: Dumbbell,
        available: true,
      },
    ],
  },
  {
    system: "Cabeça e Pescoço",
    topics: [
      {
        id: "cranio",
        title: "Crânio",
        description: "Estrutura óssea da cabeça e suas características anatômicas",
        icon: Skull,
        available: true,
      },
      {
        id: "face",
        title: "Face",
        description: "Ossos faciais, músculos da expressão e inervação",
        icon: Brain,
        available: true,
      },
      {
        id: "pescoco",
        title: "Pescoço",
        description: "Músculos, vasos e estruturas cervicais importantes",
        icon: User,
        available: true,
      },
    ],
  },
  {
    system: "Coluna e Tronco",
    topics: [
      {
        id: "coluna",
        title: "Coluna Vertebral",
        description: "Medula espinal, cone medular, cauda equina e aplicações clínicas",
        icon: Columns3,
        available: true,
      },
      {
        id: "parede-toracica",
        title: "Parede Torácica",
        description: "Costelas, esterno, articulações e mecânica respiratória",
        icon: Bone,
        available: true,
      },
      {
        id: "parede-abdominal",
        title: "Parede Abdominal",
        description: "Camadas, músculos, peritônio e hérnias inguinais",
        icon: Shield,
        available: true,
      },
      {
        id: "canal-inguinal",
        title: "Canal Inguinal",
        description: "Anatomia do canal inguinal, conteúdo e hérnias inguinais",
        icon: Shield,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Cardiovascular",
    topics: [
      {
        id: "sistema-circulatorio",
        title: "Sistema Circulatório",
        description: "Coração, artérias, veias e circulação sanguínea",
        icon: Heart,
        available: true,
      },
      {
        id: "coracao",
        title: "Coração",
        description: "Anatomia cardíaca, câmaras, valvas e sistema de condução elétrica",
        icon: Heart,
        available: true,
      },
      {
        id: "vasos-base",
        title: "Vasos da Base",
        description: "Grandes vasos e circulação sistêmica",
        icon: Wind,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Respiratório",
    topics: [
      {
        id: "sistema-respiratorio",
        title: "Sistema Respiratório",
        description: "Vias aéreas, pulmões e estruturas relacionadas à respiração",
        icon: Lungs,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Digestório",
    topics: [
      {
        id: "sistema-digestorio",
        title: "Sistema Digestório",
        description: "Trato gastrointestinal, órgãos digestivos e processos de digestão",
        icon: Utensils,
        available: true,
      },
      {
        id: "glandulas-anexas",
        title: "Glândulas Anexas",
        description: "Glândulas salivares, pâncreas e glândulas digestivas acessórias",
        icon: Pill,
        available: true,
      },
      {
        id: "vias-biliares",
        title: "Vias Biliares",
        description: "Vesícula biliar, ductos biliares e sistema de drenagem da bile",
        icon: Liver,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Urinário",
    topics: [
      {
        id: "sistema-urinario",
        title: "Sistema Urinário",
        description: "Rins, ureteres, bexiga e uretra",
        icon: Droplet,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Genital",
    topics: [
      {
        id: "sistema-genital-masculino",
        title: "Sistema Genital Masculino",
        description: "Órgãos reprodutores masculinos e estruturas relacionadas",
        icon: Users,
        available: true,
      },
      {
        id: "sistema-genital-feminino",
        title: "Sistema Genital Feminino",
        description: "Órgãos reprodutores femininos e estruturas relacionadas",
        icon: Baby,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Nervoso",
    topics: [
      {
        id: "sistema-nervoso",
        title: "Sistema Nervoso",
        description: "Sistema nervoso central e periférico, nervos cranianos e espinhais",
        icon: Zap,
        available: true,
      },
    ],
  },
]

const topicsBySystemPratica = [
  {
    system: "Membro Superior",
    topics: [
      {
        id: "musculos-membro-superior",
        title: "Músculos do Membro Superior (Guia Descritivo)",
        description: "Anatomia detalhada dos músculos do tórax, ombro, braço, antebraço e mão - Latarjet",
        icon: Dumbbell,
        available: true,
      },
      {
        id: "ossos-membro-superior",
        title: "Ossos do Membro Superior",
        description: "Cintura escapular, braço, antebraço e mão - estrutura óssea completa - Latarjet",
        icon: Bone,
        available: true,
      },
      {
        id: "arterias-veias-membro-superior",
        title: "Artérias e Veias do Membro Superior",
        description: "Vascularização arterial e venosa completa do membro superior - Latarjet",
        icon: Activity,
        available: true,
      },
    ],
  },
  {
    system: "Membro Inferior",
    topics: [
      {
        id: "musculos-membro-inferior",
        title: "Músculos do Membro Inferior (Guia Descritivo)",
        description: "Anatomia detalhada dos músculos do quadril, coxa, perna e pé - Latarjet",
        icon: Dumbbell,
        available: true,
      },
      {
        id: "ossos-membro-inferior",
        title: "Ossos do Membro Inferior",
        description: "Quadril, coxa, perna e pé - estrutura óssea completa - Latarjet",
        icon: Bone,
        available: true,
      },
      {
        id: "arterias-veias-membro-inferior",
        title: "Artérias e Veias do Membro Inferior",
        description: "Vascularização arterial e venosa completa do membro inferior - Latarjet",
        icon: Activity,
        available: true,
      },
    ],
  },
  {
    system: "Inervação dos Membros",
    topics: [
      {
        id: "nervos-membros",
        title: "Nervos do Membro Inferior e do Membro Superior",
        description: "Plexos braquial e lombossacral, distribuição nervosa dos membros - Latarjet",
        icon: Zap,
        available: true,
      },
    ],
  },
  {
    system: "Cabeça e Pescoço",
    topics: [
      {
        id: "cranio",
        title: "Crânio",
        description: "Anatomia óssea do crânio, neurocrânio e viscerocrânio - Latarjet",
        icon: Skull,
        available: true,
      },
      {
        id: "musculos-vasos-nervos-facial",
        title: "Músculos, Vasos e Nervos da Região Facial",
        description: "Musculatura facial, vascularização e inervação da face - Latarjet",
        icon: User,
        available: true,
      },
    ],
  },
  {
    system: "Tórax, Abdome e Pelve",
    topics: [
      {
        id: "parede-toracica-tgi",
        title: "Parede Torácica e TGI",
        description: "Anatomia da parede torácica e trato gastrointestinal - Latarjet",
        icon: Utensils,
        available: true,
      },
      {
        id: "retroperitonio-sistema-urinario",
        title: "Retroperitônio e Sistema Urinário",
        description: "Espaço retroperitoneal, rins, ureteres, bexiga e uretra - Latarjet",
        icon: Droplet,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Cardiovascular",
    topics: [
      {
        id: "coracao",
        title: "Coração",
        description: "Anatomia cardíaca detalhada, câmaras, valvas e vascularização - Latarjet",
        icon: Heart,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Respiratório",
    topics: [
      {
        id: "sistema-respiratorio-regiao-cervical",
        title: "Sistema Respiratório e Região Cervical",
        description: "Vias aéreas, pulmões e anatomia cervical completa - Latarjet",
        icon: Lungs,
        available: true,
      },
    ],
  },
  {
    system: "Sistema Articular",
    topics: [
      {
        id: "articulacoes",
        title: "Articulações",
        description: "Anatomia detalhada das articulações do corpo humano - Latarjet",
        icon: Activity,
        available: true,
      },
    ],
  },
]

export default function TopicsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Tópicos de Anatomia</h1>
          <p className="text-lg text-muted-foreground">
            Selecione um tópico para acessar o conteúdo completo, resumos e questões comentadas
          </p>
        </div>

        <Tabs defaultValue="teorica" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="teorica" className="text-base">
                <BookOpen className="h-4 w-4 mr-2" />
                Anatomia Teórica
              </TabsTrigger>
              <TabsTrigger value="pratica" className="text-base">
                <Stethoscope className="h-4 w-4 mr-2" />
                Anatomia Prática
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="teorica" className="space-y-12">
            {topicsBySystemTeorica.map((systemGroup, systemIndex) => (
              <div key={systemGroup.system} className="space-y-6">
                <div className="relative pb-3">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{systemGroup.system}</h2>
                  <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {systemGroup.topics.map((topic, topicIndex) => {
                    const Icon = topic.icon
                    return (
                      <Card
                        key={topic.id}
                        className={`h-full transition-all duration-300 ${
                          topic.available
                            ? "hover:shadow-xl hover:border-accent/50 hover:-translate-y-1 cursor-pointer group animate-float bg-card border-l-4 border-l-accent"
                            : "opacity-60 cursor-not-allowed bg-card/60 border-l-4 border-l-muted"
                        }`}
                        style={{
                          animationDelay: `${(systemIndex * 3 + topicIndex) * 0.1}s`,
                        }}
                      >
                        {topic.available ? (
                          <Link href={`/topico/${topic.id}`} className="block h-full">
                            <CardHeader className="pb-4">
                              <CardTitle className="text-xl font-bold leading-tight mb-2">{topic.title}</CardTitle>
                              <CardDescription className="leading-relaxed text-sm">{topic.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button
                                variant="ghost"
                                className="w-full group-hover:bg-accent/10 group-hover:text-accent transition-all"
                              >
                                Estudar Tópico →
                              </Button>
                            </CardContent>
                          </Link>
                        ) : (
                          <>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-xl font-bold leading-tight mb-2">{topic.title}</CardTitle>
                              <CardDescription className="leading-relaxed text-sm">{topic.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button variant="ghost" className="w-full" disabled>
                                Em breve
                              </Button>
                            </CardContent>
                          </>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="pratica" className="space-y-12">
            {topicsBySystemPratica.map((systemGroup, systemIndex) => (
              <div key={systemGroup.system} className="space-y-6">
                <div className="relative pb-3">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{systemGroup.system}</h2>
                  <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {systemGroup.topics.map((topic, topicIndex) => {
                    const Icon = topic.icon
                    return (
                      <Card
                        key={topic.id}
                        className={`h-full transition-all duration-300 ${
                          topic.available
                            ? "hover:shadow-xl hover:border-accent/50 hover:-translate-y-1 cursor-pointer group animate-float bg-card border-l-4 border-l-accent"
                            : "opacity-60 cursor-not-allowed bg-card/60 border-l-4 border-l-muted"
                        }`}
                        style={{
                          animationDelay: `${(systemIndex * 3 + topicIndex) * 0.1}s`,
                        }}
                      >
                        {topic.available ? (
                          <Link href={`/pratica/${topic.id}`} className="block h-full">
                            <CardHeader className="pb-4">
                              <CardTitle className="text-xl font-bold leading-tight mb-2">{topic.title}</CardTitle>
                              <CardDescription className="leading-relaxed text-sm">{topic.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button
                                variant="ghost"
                                className="w-full group-hover:bg-accent/10 group-hover:text-accent transition-all"
                              >
                                Estudar Tópico →
                              </Button>
                            </CardContent>
                          </Link>
                        ) : (
                          <>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-xl font-bold leading-tight mb-2">{topic.title}</CardTitle>
                              <CardDescription className="leading-relaxed text-sm">{topic.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button variant="ghost" className="w-full" disabled>
                                Em breve
                              </Button>
                            </CardContent>
                          </>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
