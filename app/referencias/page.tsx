import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, ExternalLink } from "lucide-react"

const textbooks = [
  {
    title: "Anatomia Humana Sistêmica e Segmentar",
    authors: "Dangelo, J. G. & Fattini, C. A.",
    edition: "3ª Edição",
    publisher: "Atheneu",
    year: "2007",
    description:
      "Obra clássica da anatomia brasileira, amplamente utilizada em cursos de medicina e ciências da saúde. Apresenta uma abordagem didática e sistemática da anatomia humana.",
  },
  {
    title: "Anatomia e Fisiologia Humana",
    authors: "Marieb, E. N. & Hoehn, K.",
    edition: "9ª Edição",
    publisher: "Pearson",
    year: "2013",
    description:
      "Referência internacional que integra anatomia e fisiologia de forma clara e didática, com excelentes ilustrações e correlações clínicas.",
  },
]

const scientificArticles = [
  {
    title: "Anatomical and surgical considerations of the pectoralis muscle",
    authors: "Yasukawa K, et al.",
    journal: "Orthopedic Reviews",
    publisher: "National Library of Medicine (NCBI) - PMC11291263",
    year: "2024",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11291263/",
    description:
      "Revisão abrangente da anatomia e considerações cirúrgicas do músculo peitoral maior, incluindo suas duas cabeças (clavicular e esternocostal), inervação dupla pelos nervos peitorais medial e lateral, e aplicações clínicas em rupturas e transferências musculares.",
  },
  {
    title: "Anatomy, Shoulder and Upper Limb, Pectoral Muscles",
    authors: "Solari F, Burns B.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK545241",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK545241/",
    description:
      "Descrição detalhada dos músculos peitorais, suas origens, inserções, funções e vascularização. Inclui informações sobre peitoral maior e menor, suas relações anatômicas e relevância clínica.",
  },
  {
    title: "Anatomy, Shoulder and Upper Limb, Deltoid Muscle",
    authors: "Elzanie A, Borger J.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK537056",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK537056/",
    description:
      "Revisão anatômica completa do músculo deltoide, suas três partes (anterior, média e posterior), inervação pelo nervo axilar, e sua função na abdução do ombro entre 15° e 100°. Inclui variações anatômicas e inervação adicional pelo nervo peitoral lateral em 86,2% dos casos.",
  },
  {
    title: "Anatomy, Rotator Cuff",
    authors: "Rybalko D, Ribeiro DC, Lieberthal J.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK441844",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK441844/",
    description:
      "Revisão detalhada dos quatro músculos do manguito rotador (SITS: Supraespinal, Infraespinal, Redondo menor, Subescapular), suas origens, inserções, funções específicas e papel coletivo na estabilização glenoumeral através da compressão concavidade.",
  },
  {
    title: "Anatomy, Shoulder and Upper Limb, Biceps Muscle",
    authors: "Tiwana MS, Sinkler MA, Bordoni B.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK519538",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK519538/",
    description:
      "Descrição anatômica do músculo bíceps braquial com suas duas cabeças (longa e curta), inervação pelo nervo musculocutâneo (C5-C6), e funções primárias de flexão do cotovelo e supinação do antebraço. Inclui teste do reflexo bicipital para C6.",
  },
  {
    title: "Anatomy, Shoulder and Upper Limb, Triceps Muscle",
    authors: "Goulart AP, Vasconcelos DA.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK536996",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK536996/",
    description:
      "Revisão anatômica do músculo tríceps braquial com suas três cabeças (longa, lateral e medial), inervação pelo nervo radial (C6-C8, predominantemente C7), e função como principal extensor do cotovelo. Inclui variações na inervação e teste do reflexo tricipital.",
  },
  {
    title: "Anatomy, Shoulder and Upper Limb, Forearm Muscles",
    authors: "Mitchell B, Whited L.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK536975",
    year: "2023",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK536975/",
    description:
      "Descrição completa dos 20 músculos do antebraço organizados em compartimentos anterior (8 flexores) e posterior (12 extensores). Inclui inervação pelos nervos mediano, ulnar e radial, com suas respectivas funções na flexão e extensão do punho e dedos.",
  },
  {
    title: "Anatomy, Shoulder and Upper Limb, Forearm Compartments",
    authors: "Young M, Youdas J.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK539784",
    year: "2023",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK539784/",
    description:
      "Análise detalhada dos compartimentos fasciais do antebraço, separação por septos intermusculares, e relevância clínica incluindo síndrome compartimental e pontos de compressão nervosa.",
  },
  {
    title: "Anatomy, Shoulder and Upper Limb, Hand Intrinsic Muscles",
    authors: "Standring S.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK539810",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK539810/",
    description:
      "Revisão completa dos músculos intrínsecos da mão divididos em 4 grupos: tenares (inervação do nervo mediano), hipotenares (nervo ulnar), lumbricais (1º e 2º - mediano; 3º e 4º - ulnar), e interósseos (nervo ulnar). Inclui funções específicas e correlações clínicas.",
  },
  {
    title: "Anatomy, Thorax, Phrenic Nerves",
    authors: "Kaufman MR, Elkwood AI, Rose MI, et al.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI)",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK513325/",
    description:
      "Artigo de revisão sobre a anatomia do nervo frênico, incluindo sua origem nas raízes cervicais C3-C5, trajeto pelo pescoço e tórax, e função na inervação motora do diafragma.",
  },
  {
    title: "Anatomy, Head and Neck, External Jugular Veins",
    authors: "Patel K, Gupta N, Bansal N.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI)",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK539720/",
    description:
      "Revisão anatômica da veia jugular externa, descrevendo sua formação pela união das veias auricular posterior e retromandibular, trajeto superficial no pescoço e drenagem na veia subclávia.",
  },
  {
    title: "Anatomy, Head and Neck: Facial Muscles",
    authors: "Hwang K, Kim DJ, Hwang SH.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI)",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK493166/",
    description:
      "Descrição dos músculos da expressão facial, incluindo aproximadamente 30 músculos de cada lado da face, sua inervação pelo nervo facial (NC VII) e funções na comunicação não-verbal.",
  },
  {
    title: "Anatomy, Back, Vertebral Column",
    authors: "Jaumard NV, Welch WC, Winkelstein BA.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI)",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK441822/",
    description:
      "Revisão da estrutura da coluna vertebral, incluindo suas 33 vértebras, curvaturas fisiológicas (lordose cervical e lombar, cifose torácica), e função dos discos intervertebrais como amortecedores.",
  },
  {
    title: "Anatomy, Thorax, Wall Muscles",
    authors: "El-Dalati S, Souza RB, Barros MD.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI)",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK538321/",
    description:
      "Descrição dos músculos intercostais (externos, internos e íntimos) que conectam as costelas adjacentes e participam da mecânica respiratória através da expansão e contração da caixa torácica.",
  },
  {
    title: "Anatomy, Thorax, Heart",
    authors: "Rehman I, Rehman A.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI)",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK470256/",
    description:
      "Revisão da anatomia cardíaca, incluindo as quatro câmaras (átrios e ventrículos), valvas cardíacas, sistema de condução elétrica (nó sinoatrial, nó atrioventricular, feixe de His) e circulação coronária.",
  },
  {
    title: "Anatomy, Head and Neck: Tonsils",
    authors: "Masters KG, Lasrado S.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK539792",
    year: "2025",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK539792/",
    description:
      "Revisão anatômica abrangente das tonsilas do anel de Waldeyer, incluindo tonsilas linguais, palatinas, faríngea e tubárias. Detalha localização, histologia, vascularização, inervação, função imunológica e relevância clínica. Atualizado em julho de 2025.",
  },
  {
    title: "Anatomy and physiology of the palatine tonsils, adenoids, and lingual tonsils",
    authors: "Arambula A, Brown JR, Neff L.",
    journal: "World Journal of Otorhinolaryngology - Head and Neck Surgery",
    publisher: "National Library of Medicine (NCBI) - PMC8356106",
    year: "2021",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8356106/",
    description:
      "Artigo de revisão detalhado sobre a anatomia e fisiologia das estruturas tonsilares, com ênfase especial nas tonsilas linguais. Aborda microanatomia, papel imunológico, desenvolvimento ontogenético e implicações clínico-cirúrgicas.",
  },
  {
    title: "Anatomy, Abdomen and Pelvis, Stomach",
    authors: "Valizadeh N, Liem TJ.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK535425",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK535425/",
    description:
      "Revisão anatômica detalhada do estômago incluindo suas regiões (cárdia, fundo, corpo, antro e canal pilórico), estrutura histológica das camadas gástricas, vascularização pela artéria gástrica esquerda e direita, e inervação pelo nervo vago.",
  },
  {
    title: "Anatomy, Abdomen and Pelvis, Small Intestine",
    authors: "Chandra T, Dodds W.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK459209",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK459209/",
    description:
      "Descrição anatômica completa do intestino delgado (duodeno, jejuno e íleo), incluindo características histológicas das vilosidades intestinais, vascularização pela artéria mesentérica superior, e função na absorção de nutrientes.",
  },
  {
    title: "Anatomy, Abdomen and Pelvis, Large Intestine",
    authors: "Kulkarni S, Hines J.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK507857",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK507857/",
    description:
      "Revisão da anatomia do intestino grosso, incluindo ceco com apêndice vermiforme, cólons ascendente, transverso, descendente e sigmóide, e reto. Detalha a estrutura das tênias cólicas, haustros, e vascularização pelas artérias mesentéricas superior e inferior.",
  },
  {
    title: "Anatomy, Abdomen and Pelvis, Appendix",
    authors: "Karabulut R, Sonmez K, Turkyilmaz Z.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK459188",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK459188/",
    description:
      "Descrição anatômica do apêndice vermiforme, incluindo sua origem no ceco, posicionamento variável (retrocecal mais comum), vascularização pela artéria apendicular (ramo da ileocólica), e papel imunológico como tecido linfoide.",
  },
  {
    title: "Anatomy, Abdomen and Pelvis, Esophagus",
    authors: "Sternlieb JM, Sathe M.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK544251",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK544251/",
    description:
      "Revisão detalhada da anatomia do esôfago em suas porções cervical, torácica e abdominal. Inclui relações com estruturas mediastinais, vascularização segmentar, inervação pelo nervo vago e plexo esofágico, e zona de transição epithelial na junção esofagogástrica.",
  },
  {
    title: "Anatomy, Thorax, Diaphragm",
    authors: "Bordoni B, Zanier E.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK470172",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK470172/",
    description:
      "Descrição anatômica completa do músculo diafragma, suas inserções esternais, costais e lombares (pilares), centro tendinoso, três principais aberturas (hiato esofágico em T10, hiato aórtico em T12, forame da veia cava), inervação pelo nervo frênico (C3-C5), e função na mecânica respiratória.",
  },
  {
    title: "Anatomy, Abdomen and Pelvis, Abdominal Wall",
    authors: "Hernandez JD, Moreno CC.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK551649",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK551649/",
    description:
      "Revisão da anatomia da parede abdominal anterolateral, incluindo os três músculos largos (oblíquo externo, oblíquo interno e transverso do abdome) e o músculo reto do abdome. Detalha a bainha dos retos, linha arqueada, canal inguinal e inervação pelos nervos intercostais e iliohipogástrico.",
  },
  {
    title: "Anatomy, Head and Neck, Pharynx",
    authors: "Lalwani AK, Snow JB.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK526090",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK526090/",
    description:
      "Descrição anatômica da faringe dividida em nasofaringe, orofaringe e laringofaringe. Inclui os músculos constritores (superior, médio e inferior) e elevadores da faringe, vascularização pela artéria faríngea ascendente, e inervação pelo plexo faríngeo (nervos glossofaríngeo e vago).",
  },
  {
    title: "Anatomy, Abdomen and Pelvis: Kidneys",
    authors: "Garza FA, Leslie SW.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK482385",
    year: "2025",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK482385/",
    description:
      "Revisão anatômica completa dos rins como órgãos retroperitoneais pares posicionados entre T12-L3. Detalha morfologia externa (dimensões 10-12 cm, peso 135-162 g), estrutura interna (córtex, medula, pirâmides renais, sistema calicial com cálices menores e maiores formando pelve renal), néfrons como unidades funcionais (1-1.5 milhões por rim), vascularização (artérias e veias renais com anatomia de artéria terminal), fáscias de Gerota e Zuckerkandl, relações anatômicas específicas e funções renais essenciais. Atualizado em setembro de 2025.",
  },
  {
    title: "Anatomy, Abdomen and Pelvis Ureter",
    authors: "Lescay HA, Jiang J, Leslie SW, Tuma F.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK532980",
    year: "2024",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK532980/",
    description:
      "Descrição anatômica detalhada do ureter como estrutura tubular bilateral (3-4 mm diâmetro, 22-30 cm comprimento) conectando rins à bexiga. Aborda três segmentos anatômicos (proximal/abdominal, distal/pélvico, intramural), constrições fisiológicas na junção ureteropélvica (JUP) e ureterovesical (JUV), trajeto retroperitoneal em 'S', relações anatômicas com nervo obturatório (explicando irradiação da dor do cólico renal), psoas, vasos gonadais ('água sob a ponte'), estrutura histológica (mucosa com epitélio transicional, muscularis com três camadas, adventícia), suprimento sanguíneo segmentar, inervação (T10-L2, S2-S4), peristalse originada nos cálices menores, e mecanismo antirrefluxo na JUV.",
  },
  {
    title: "Anatomy, Abdomen and Pelvis, Retroperitoneum",
    authors: "Lambert G, Samra NS.",
    journal: "StatPearls [Internet]",
    publisher: "National Library of Medicine (NCBI) - NBK549857",
    year: "2023",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK549857/",
    description:
      "Revisão da anatomia do retroperitônio como espaço anatômico posterior à cavidade peritoneal. Descreve três espaços retroperitoneais principais: espaço pararrenal anterior (contendo pâncreas, cólons ascendente e descendente, duodeno exceto primeira porção), espaço perirrenal (glândulas suprarrenais, rins, ureteres, vasos renais), espaço pararrenal posterior (gordura, vasos, linfáticos), e espaço dos grandes vasos (aorta, veia cava inferior). Inclui embriologia de estruturas primariamente e secundariamente retroperitoneais, vascularização abundante, rede linfática extensa (linfonodos ilíacos, lombares, pré/para/retroaórticos e cavais), inervação (plexo lombar, sacro, simpático), musculatura (transverso abdominal, psoas, quadrado lombar, ilíaco, diafragma), e considerações cirúrgicas (manobra de Kocher, Cattell-Braasch).",
  },
  {
    title: "Anatomy, Head and Neck, Zygomaticus Major Muscle",
    authors: "Kim HS, Youn KH, Hwang K.",
    journal: "Surgical and Radiologic Anatomy",
    publisher: "National Library of Medicine (NCBI) - PMC",
    year: "2018",
    url: "https://pubmed.ncbi.nlm.nih.gov/29255938/",
    description:
      "Estudo anatômico detalhado do músculo zigomático maior incluindo localização precisa da origem (margem superior do processo temporal na superfície lateral do osso zigomático, ao nível ou próximo à sutura zigomaticotemporal), inserção no ângulo da boca (modíolo labial), variações anatômicas (bifurcação em aproximadamente 2% da população associada a formação de covinhas faciais), trajeto oblíquo inferomedial cruzando vasos faciais, relações com ducto parotídeo, ação como músculo primário do sorriso (tração superolateral do ângulo da boca), e relevância para procedimentos de reanimação facial e estética.",
  },
  {
    title: "Anatomy and Clinical Significance of Zygomaticus Minor Muscle",
    authors: "Pessa JE, Zadoo VP, Garza PA, et al.",
    journal: "Plastic and Reconstructive Surgery",
    publisher: "National Library of Medicine (NCBI)",
    year: "1998",
    url: "https://pubmed.ncbi.nlm.nih.gov/9810967/",
    description:
      "Descrição anatômica do músculo zigomático menor com origem na superfície lateral do osso zigomático imediatamente posterior à sutura zigomaticomaxilar (anterior e medial ao zigomático maior), inserção no lábio superior entrelaçando-se com elevador do lábio superior e orbicular da boca (medial à inserção do zigomático maior), com extensões para sulco nasolabial em 27,8% dos casos e ocasionalmente para região alar. Ação na elevação do lábio superior e aprofundamento do sulco nasolabial. Importância como marco anatômico para cirurgias faciais, ritidoplastia, procedimentos estéticos e reconstrução craniofacial forense.",
  },
]

export default function ReferencesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Referências Bibliográficas</h1>
          <p className="text-lg text-muted-foreground">
            Fontes científicas e acadêmicas utilizadas na elaboração do conteúdo deste site
          </p>
        </div>

        <div className="space-y-12">
          {/* Livros-Texto */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 relative">
              <BookOpen className="h-7 w-7 text-accent" />
              <h2 className="text-2xl font-bold">Livros-Texto de Anatomia</h2>
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {textbooks.map((book, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-all hover:border-accent/50 border-2">
                  <CardHeader>
                    <CardTitle className="text-xl leading-tight">{book.title}</CardTitle>
                    <CardDescription className="space-y-1 mt-2">
                      <p className="font-semibold text-foreground">{book.authors}</p>
                      <p>
                        {book.edition} • {book.publisher}
                      </p>
                      <p className="text-sm">{book.year}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{book.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Artigos Científicos */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 relative">
              <GraduationCap className="h-7 w-7 text-accent" />
              <h2 className="text-2xl font-bold">Artigos Científicos e Revisões</h2>
              <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-accent to-accent/30 rounded-full" />
            </div>

            <div className="space-y-4">
              {scientificArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover:border-accent/50 border-2 group">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-2 group-hover:text-accent transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <p className="font-medium text-foreground">{article.authors}</p>
                          <p className="text-sm">
                            {article.journal} • {article.publisher} • {article.year}
                          </p>
                        </CardDescription>
                      </div>
                      {article.url && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent/80 transition-colors flex-shrink-0 p-2 hover:bg-accent/10 rounded-lg"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{article.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Nota sobre Uso Acadêmico */}
          <section className="mt-12">
            <Card className="bg-accent/5 border-accent/20 border-2">
              <CardHeader>
                <CardTitle className="text-lg">Nota sobre Uso Acadêmico</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Todo o conteúdo apresentado neste site foi elaborado com base em fontes científicas confiáveis e
                  livros-texto reconhecidos na área de anatomia humana. As informações são destinadas exclusivamente
                  para fins educacionais e de estudo.
                </p>
                <p>
                  Os artigos científicos citados são provenientes de bases de dados respeitadas como a National Library
                  of Medicine (NCBI) e periódicos revisados por pares. Recomendamos a consulta direta às fontes
                  originais para aprofundamento e verificação das informações.
                </p>
                <p className="font-medium text-foreground">
                  Este material não substitui a orientação de professores, livros-texto completos ou a prática clínica
                  supervisionada.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
