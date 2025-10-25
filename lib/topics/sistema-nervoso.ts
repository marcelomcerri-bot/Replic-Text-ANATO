import type { TopicContent } from "../topics-data"

export const sistemaNervoso: TopicContent = {
  id: "sistema-nervoso",
  title: "Sistema Nervoso",
  description: "Sistema nervoso central e periférico, nervos cranianos e espinhais",
  content: {
    sections: [
      {
        title: "Conceito, Funções e Importância do Sistema Nervoso",
        content: [
          "O Sistema Nervoso (SN) é o principal sistema de controle e comunicação do corpo humano. Ele controla e coordena as funções de todos os sistemas do organismo.",
          "O SN é a base de toda a atividade do indivíduo: cada pensamento, ação, instinto e emoção reflete a sua atividade. Na espécie humana, o SN é responsável também por fenômenos psíquicos altamente elaborados.",
          "O sistema nervoso funciona por meio de sinais elétricos (impulsos nervosos) que são rápidos e específicos, produzindo, normalmente, respostas quase imediatas.",
        ],
        subsections: [
          {
            title: "Funções Essenciais do SN",
            content: [
              "O sistema nervoso tem três funções principais que se sobrepõem e trabalham em conjunto:",
              "1. Entrada (Aferência) Sensitiva: Utiliza milhões de receptores sensitivos para monitorar as mudanças (estímulos) que ocorrem dentro e fora do corpo. Essa informação reunida é a entrada sensitiva.",
              "2. Integração: Ocorre no Sistema Nervoso Central (SNC). É o processo de interpretar e processar a entrada sensitiva para tomar decisões sobre o que fazer.",
              "3. Saída (Eferência) Motora: É a resposta, que se dá pela ativação dos órgãos efetores (músculos ou glândulas).",
            ],
          },
        ],
      },
      {
        title: "Divisões Anatômicas e Funcionais do Sistema Nervoso",
        content: [
          "O sistema nervoso humano é altamente integrado. Ele é dividido em duas partes anatômicas para fins de conveniência e estudo:",
        ],
        subsections: [
          {
            title: "Sistema Nervoso Central (SNC)",
            content: [
              "O SNC (ou parte central do sistema nervoso) é formado pelo encéfalo e pela medula espinal. Estas estruturas ocupam o crânio e o canal vertebral (esqueleto axial).",
              "O SNC é o centro de integração e comando do sistema nervoso.",
              "Ele recebe sinais sensitivos, interpreta-os e determina as respostas motoras.",
            ],
          },
          {
            title: "Sistema Nervoso Periférico (SNP)",
            content: [
              "O SNP (ou parte periférica do sistema nervoso) é a porção do sistema nervoso localizada fora do SNC.",
              "É composto principalmente por nervos e gânglios.",
              "Os nervos periféricos (cranianos e espinais) servem como linhas de comunicação que ligam todas as regiões do corpo ao SNC.",
              "Os gânglios são agrupamentos de corpos celulares de neurônios fora do SNC.",
            ],
          },
          {
            title: "Subdivisões Funcionais do SNP",
            content: [
              "As entradas (aferências) sensitivas e as saídas (eferências) motoras são subdivididas com base nas regiões que atendem (somática ou visceral):",
              "• Sensitiva Somática (SS): Leva informações sensoriais (toque, dor, pressão, vibração, temperatura, propriocepção) do tubo externo (pele, músculos esqueléticos, articulações) ao SNC.",
              "• Sensitiva Visceral (SV): Leva informações sensoriais (estiramento, dor, temperatura, náusea, fome) das vísceras ao SNC.",
              "• Motora Somática (MS): Estimula a contração dos músculos esqueléticos. Controle voluntário (Sistema Nervoso Voluntário).",
              "• Motora Visceral (MV) ou SNA: Regula a contração do músculo liso, músculo cardíaco e a secreção das glândulas. Controle involuntário (Sistema Nervoso Involuntário).",
            ],
          },
        ],
      },
      {
        title: "O Tecido Nervoso: Neurônios e Neuróglia",
        content: [
          "O tecido nervoso é o componente principal dos órgãos nervosos (encéfalo, medula espinal e nervos). Ele é formado por células densamente empacotadas e entrelaçadas.",
          "O tecido nervoso contém dois tipos principais de células:",
        ],
        subsections: [
          {
            title: "Neurônios (Células Nervosas)",
            content: [
              "Os neurônios são as unidades estruturais e funcionais básicas do sistema nervoso.",
              "São células altamente especializadas e excitáveis que conduzem sinais elétricos (impulsos nervosos ou potenciais de ação) de uma parte do corpo para outra.",
              "São células longevas que não se dividem (com raras exceções).",
            ],
          },
          {
            title: "Neuróglia (Células da Glia ou Células de Suporte)",
            content: [
              "A neuróglia são células não excitáveis que circundam e envolvem os neurônios. Elas agem como o tecido conjuntivo do SN.",
              "Funções: Proporcionam sustentação (apoio), nutrem, protegem e isolam os delicados neurônios.",
              "Tipos no SNC: Astrócitos, Células da Micróglia (fagocitárias), Células Ependimárias (revestem a cavidade central) e Oligodendrócitos (formam mielina no SNC).",
              "Tipos no SNP: Células de Schwann (formam mielina no SNP) e Células-satélite.",
            ],
          },
        ],
      },
      {
        title: "Estrutura Básica e Classificação dos Neurônios",
        content: [
          "A maioria dos neurônios possui três regiões estruturais responsáveis por funções especializadas:",
          "1. Corpo Celular (Pericário ou Soma): É o centro metabólico do neurônio. É responsável pela síntese de todas as proteínas e pela renovação dos constituintes celulares.",
          "2. Dendritos: São regiões receptoras no neurônio. Eles recebem estímulos e conduzem impulsos em direção ao corpo celular.",
          "3. Axônio: É um processo celular longo e único. É a região condutora que inicia e transmite impulsos nervosos para longe do corpo celular.",
        ],
        subsections: [
          {
            title: "Bainha de Mielina",
            content: [
              "A bainha de mielina é um envoltório principal do axônio, que funciona como isolamento e acelera a transmissão do impulso nervoso.",
              "É formada por Oligodendrócitos no SNC e por Células de Schwann no SNP.",
              "A perda da mielina no SNC (como na Esclerose Múltipla) perturba os sinais neuronais e leva a transtornos sensitivos e enfraquecimento muscular.",
            ],
          },
          {
            title: "Classificação Estrutural dos Neurônios",
            content: [
              "Os neurônios são classificados anatomicamente pela quantidade de processos que se estendem do corpo celular:",
              "• Neurônio Multipolar: Possui mais de dois processos (vários dendritos e um axônio). É o tipo mais abundante no corpo e o principal tipo no SNC.",
              "• Neurônio Pseudounipolar (ou Unipolar): Possui apenas um processo curto que se divide em dois ramos (como um T). É o tipo comum nos gânglios sensitivos do SNP.",
              "• Neurônio Bipolar: Possui apenas dois processos que se estendem de lados opostos. É raro e está restrito a alguns órgãos sensitivos especiais (retina, orelha interna, mucosa olfatória).",
            ],
          },
          {
            title: "Classificação Funcional dos Neurônios",
            content: [
              "Os neurônios são agrupados funcionalmente pela direção percorrida pelo impulso nervoso em relação ao SNC:",
              "• Neurônios Sensitivos (Aferentes): Transmitem impulsos para o SNC.",
              "• Neurônios Motores (Eferentes): Conduzem impulsos para longe do SNC até os órgãos efetores (músculos ou glândulas).",
              "• Interneurônios (de Associação): Situam-se inteiramente confinados no SNC. Eles ligam-se em cadeias que formam vias neurais complexas.",
            ],
          },
        ],
      },
      {
        title: "Comunicação Neural: Sinapses e Impulsos",
        content: [
          "Os neurônios se comunicam através de junções especializadas chamadas sinapses.",
          "Sinapses Interneuronais: Ocorrem entre dois neurônios, transmitindo a mensagem do neurônio pré-sináptico para o pós-sináptico.",
          "Tipos de Sinapse: A grande maioria das sinapses interneuronais são químicas.",
          "Mecanismo Químico: Nas sinapses químicas, as vesículas sinápticas no neurônio pré-sináptico liberam neurotransmissores na fenda sináptica. O neurotransmissor (substância química) se liga à membrana pós-sináptica, influenciando a capacidade do neurônio receptor de gerar um novo impulso nervoso.",
          "Sinapses Comuns: As sinapses mais comuns são as axodendríticas (axônio de um neurônio para dendrito de outro) e axossomáticas (axônio para o corpo celular).",
        ],
      },
      {
        title: "Anatomia Macroscópica: Substâncias Cinzenta e Branca",
        content: ["O SNC é organizado em regiões distintas de substância cinzenta e substância branca."],
        subsections: [
          {
            title: "Substância Cinzenta (Grey Matter)",
            content: [
              "Composição: Consiste principalmente em corpos celulares neuronais, dendritos, axônios não mielinizados e neuróglia.",
              "Sinapses: As sinapses ocorrem na substância cinzenta.",
              "Localização no SNC: Na medula espinal, a substância cinzenta tem a forma de borboleta (H). No encéfalo e cerebelo, a substância cinzenta superficial forma o córtex. Agrupamentos de corpos celulares no SNC (como no tronco encefálico) são chamados núcleos.",
            ],
          },
          {
            title: "Substância Branca (White Matter)",
            content: [
              "Composição: Consiste em axônios mielinizados e não mielinizados. Sua cor clara (branca) é devida às bainhas de mielina.",
              "Função: Atua como via de comunicação (condução) de mão dupla.",
              "Tratos: Os axônios que seguem para destinos similares formam feixes de axônio chamados tratos (ou fascículos).",
            ],
          },
          {
            title: "Nervos",
            content: [
              "Um nervo é um órgão similar a um cabo no SNP.",
              "Composição: É uma coleção de axônios (fibras nervosas) organizados em feixes paralelos, envolvidos por tecido conjuntivo.",
              "Nervos Mistos: A maioria dos nervos cranianos e todos os nervos espinais contêm fibras sensitivas e motoras.",
              "Envoltórios: Possuem três camadas de tecido conjuntivo: Epineuro (envolve o nervo inteiro), Perineuro (envolve os fascículos) e Endoneuro (envolve cada axônio/fibra nervosa).",
            ],
          },
        ],
      },
      {
        title: "O Sistema Nervoso Autônomo (SNA)",
        content: [
          "O Sistema Nervoso Autônomo (SNA) (também chamado Divisão Motora Visceral) é um sistema de neurônios motores que inervam a musculatura lisa, o músculo cardíaco e as glândulas.",
          "Função: Regula as funções viscerais (frequência cardíaca, digestão, pressão arterial, micção) essenciais para manter a homeostase (estabilidade do meio interno).",
          "Controle: O SNA opera em grande parte abaixo do nível de consciência (involuntário), embora possa ser influenciado por centros cerebrais superiores como o hipotálamo e o corpo amigdaloide.",
        ],
        subsections: [
          {
            title: "Diferença Crucial (SNA vs. SN Somático Motor)",
            content: [
              "A principal diferença anatômica reside no número de neurônios que ligam o SNC ao órgão efetuador:",
              "• SN Motor Somático (Voluntário): Utiliza uma cadeia de um único neurônio motor que sai do SNC (coluna anterior da medula) e se estende até o músculo esquelético (efetor).",
              "• SN Autônomo (Involuntário): Utiliza uma cadeia de dois neurônios: Neurônio Pré-ganglionar (corpo celular no SNC) e Neurônio Pós-ganglionar (corpo celular em um gânglio periférico).",
            ],
          },
        ],
      },
      {
        title: "Organização do SNA (Simpático e Parassimpático)",
        content: [
          "O SNA é dividido em duas partes que geralmente inervam os mesmos órgãos, mas provocam efeitos opostos.",
        ],
        subsections: [
          {
            title: "Parte Simpática (Toracolombar)",
            content: [
              "Função: Mobiliza o corpo para a atividade ou situações extremas ('lutar ou fugir').",
              "Origem Anatômica: Seus neurônios pré-ganglionares localizam-se na medula espinal torácica e lombar superior (segmentos T1 a L2). Por isso é chamada divisão toracolombar.",
              "Cadeia Neuronal: Caracteriza-se por axônios pré-ganglionares curtos e axônios pós-ganglionares longos.",
              "Gânglios: Os corpos celulares pós-ganglionares localizam-se nos gânglios do tronco simpático (perto da coluna vertebral) ou nos gânglios pré-vertebrais.",
            ],
          },
          {
            title: "Parte Parassimpática (Craniossacral)",
            content: [
              "Função: Habilita o corpo a relaxar e trabalha para conservar a energia ('repousar e digerir'). Controla as funções de manutenção de rotina.",
              "Origem Anatômica: Seus neurônios pré-ganglionares localizam-se no tronco encefálico (efluência craniana, NC III, VII, IX, X) e na medula espinal sacral (segmentos S2, S3, S4). Por isso é chamada divisão craniossacral.",
              "Cadeia Neuronal: Caracteriza-se por axônios pré-ganglionares longos e axônios pós-ganglionares curtos.",
              "Gânglios: A maioria dos corpos celulares pós-ganglionares está localizada dentro das paredes dos órgãos inervados (gânglios intramurais) ou muito perto deles. O nervo vago (NC X) é essencial, pois suas fibras inervam órgãos do pescoço, tórax e maior parte do abdome.",
            ],
          },
        ],
      },
      {
        title: "Origem Embrionária do Tecido Nervoso",
        content: [
          "O sistema nervoso se desenvolve a partir do ectoderma dorsal.",
          "Origem do SNC: O encéfalo e a medula espinal (SNC) desenvolvem-se a partir do tubo neural embrionário. Os neurônios motores somáticos e os neurônios autônomos pré-ganglionares formam-se a partir do tubo neural.",
          "Origem do SNP: Os neurônios sensitivos e os neurônios pós-ganglionares (neurônios autônomos periféricos) derivam da crista neural. Isso explica por que os corpos celulares dos neurônios sensitivos estão situados fora do SNC.",
        ],
      },
    ],
  },
  summary: [
    {
      concept: "Sistema Nervoso (SN)",
      definition:
        "Principal sistema de controle, comunicação e integração do corpo, atuando através de sinais elétricos.",
    },
    {
      concept: "Três Funções",
      definition:
        "Aferência Sensitiva (monitoramento), Integração (processamento no SNC) e Eferência Motora (resposta).",
    },
    {
      concept: "SNC",
      definition: "Encéfalo e Medula Espinal. Centro de integração e comando.",
    },
    {
      concept: "SNP",
      definition: "Nervos e Gânglios. Linhas de comunicação externas ao SNC.",
    },
    {
      concept: "Neurônio",
      definition: "Unidade estrutural e funcional básica. Célula altamente especializada na condução de impulsos.",
    },
    {
      concept: "Neuróglia",
      definition: "Células de sustentação e proteção que isolam os neurônios.",
    },
    {
      concept: "Mielina no SNC/SNP",
      definition: "Formada por Oligodendrócitos (SNC) e Células de Schwann (SNP). Aumenta a velocidade de condução.",
    },
    {
      concept: "Substância Cinzenta",
      definition:
        "Contém corpos celulares e é o local onde ocorrem as sinapses. No encéfalo, a camada superficial é o córtex.",
    },
    {
      concept: "Substância Branca",
      definition: "Consiste em axônios mielinizados (tratos/fascículos).",
    },
    {
      concept: "Nervos Espinais",
      definition:
        "Nervos mistos que contêm fibras sensitivas e motoras. São revestidos por Epineuro, Perineuro e Endoneuro.",
    },
    {
      concept: "SNA (Motora Visceral)",
      definition:
        "Sistema involuntário que inerva músculo liso, cardíaco e glândulas. Utiliza uma cadeia de dois neurônios (pré- e pós-ganglionar).",
    },
    {
      concept: "Simpático",
      definition: "Divisão Toracolombar (T1-L2). Resposta de 'lutar ou fugir'.",
    },
    {
      concept: "Parassimpático",
      definition: "Divisão Craniossacral (NC e S2-S4). Resposta de 'repousar e digerir'.",
    },
    {
      concept: "Origem Embrionária",
      definition:
        "Tubo Neural → SNC e neurônios motores/pré-ganglionares. Crista Neural → Neurônios sensitivos e pós-ganglionares.",
    },
  ],
  questions: [
    {
      question:
        "Explique a relação funcional entre a substância cinzenta e a substância branca na medula espinal, em termos de onde a integração e a comunicação ocorrem.",
      options: [
        "A substância branca é onde ocorrem as sinapses e a substância cinzenta conduz os impulsos",
        "A substância cinzenta (corpos celulares e dendritos) é o local onde ocorrem as sinapses e integração, enquanto a substância branca (axônios mielinizados) atua como via de condução",
        "Ambas as substâncias têm a mesma função de integração",
        "A substância cinzenta apenas armazena informações, não processa",
      ],
      correctAnswer: 1,
      explanation:
        "Na medula espinal, a substância cinzenta (composta principalmente por corpos celulares e dendritos) é o local onde ocorrem as sinapses e, portanto, é o centro de integração da informação sensitiva e motora. A substância branca (composta por axônios mielinizados em tratos) atua como a via de condução de mão dupla, permitindo a comunicação entre diferentes partes da medula espinal e entre a medula e o encéfalo.",
    },
    {
      question:
        "Descreva a principal diferença anatômica e funcional entre o Sistema Nervoso Autônomo (SNA) e o Sistema Nervoso Somático Motor (MS).",
      options: [
        "Ambos usam uma cadeia de dois neurônios e são voluntários",
        "O MS utiliza uma cadeia de um único neurônio do SNC ao músculo esquelético e é voluntário, enquanto o SNA utiliza uma cadeia de dois neurônios (pré e pós-ganglionar) e é involuntário",
        "O SNA controla apenas o coração e o MS controla todos os outros músculos",
        "Não há diferença anatômica entre eles",
      ],
      correctAnswer: 1,
      explanation:
        "A diferença anatômica crucial é que o SN Somático Motor (MS) utiliza uma cadeia de um único neurônio do SNC ao músculo esquelético. O SNA utiliza uma cadeia de dois neurônios (pré-ganglionar no SNC e pós-ganglionar em um gânglio periférico). Funcionalmente, o MS estimula os músculos esqueléticos e é voluntário, enquanto o SNA regula o músculo liso, cardíaco e glândulas, sendo considerado involuntário.",
    },
    {
      question:
        "A Esclerose Múltipla (EM) é uma doença que destrói a mielina no SNC. Explique por que a perda da mielinização causa transtornos sensitivos e enfraquecimento muscular.",
      options: [
        "A mielina não tem função importante na condução nervosa",
        "A mielina acelera a condução dos impulsos; sua perda perturba os sinais neuronais, comprometendo a transmissão de informações sensitivas e motoras",
        "A EM afeta apenas os músculos, não o sistema nervoso",
        "A perda de mielina aumenta a velocidade de condução",
      ],
      correctAnswer: 1,
      explanation:
        "A mielina é uma bainha isolante que acelera a condução dos impulsos. A substância branca do SNC consiste em tratos fibrosos (axônios mielinizados) que transmitem informações entre as diferentes partes do SNC. A perda da mielina na EM perturba os sinais neuronais no SNC. Isso compromete a velocidade e a eficiência da comunicação neural através da substância branca, resultando na disfunção na transmissão de informações sensitivas e motoras (fraqueza muscular).",
    },
    {
      question:
        "O neurônio pseudounipolar é o tipo estrutural mais comum nos gânglios sensitivos do SNP. Descreva sua estrutura e qual tipo de neuróglia forma a bainha de mielina em torno do processo periférico.",
      options: [
        "Possui vários processos; Oligodendrócitos formam a mielina",
        "Possui apenas um único processo curto que se divide em dois ramos (como um T); Células de Schwann formam a mielina no SNP",
        "Possui dois processos opostos; Astrócitos formam a mielina",
        "Não possui processos; Células ependimárias formam a mielina",
      ],
      correctAnswer: 1,
      explanation:
        "O neurônio pseudounipolar possui apenas um único processo curto que sai do corpo celular e logo se divide em dois ramos (como um T). Um ramo (central) vai para o SNC e o outro (periférico) se estende até o receptor sensitivo. O processo periférico está no SNP. A neuróglia responsável pela mielinização no SNP é a Célula de Schwann.",
    },
    {
      question:
        "Um indivíduo em repouso está ativando a divisão parassimpática do SNA. Cite os segmentos do SNC dos quais essa divisão se origina e qual nervo craniano é essencial.",
      options: [
        "Segmentos torácicos T1-L2; Nervo Trigêmeo",
        "Tronco encefálico (efluência craniana) e segmentos sacrais da medula espinal (S2, S3, S4); Nervo Vago (NC X)",
        "Apenas segmentos cervicais; Nervo Facial",
        "Toda a medula espinal; Nervo Glossofaríngeo",
      ],
      correctAnswer: 1,
      explanation:
        "A parte parassimpática (Craniossacral) origina-se do tronco encefálico (efluência craniana) e dos segmentos sacrais da medula espinal (S2, S3, S4). O nervo craniano essencial que se estende por grande parte do corpo, emitindo ramificações para os órgãos torácicos e a maior parte dos órgãos abdominais, é o Nervo Vago (NC X).",
    },
  ],
}
