import type { PraticaTopicContent } from "../pratica-topics-data"

export const coracao: PraticaTopicContent = {
  title: "Coração",
  description: "Anatomia detalhada do coração e estruturas cardiovasculares",
  content: {
    sections: [
      {
        title: "Morfologia Externa do Coração",
        content: [
          "O coração constitui um órgão muscular oco, de formato aproximadamente cônico, responsável pela propulsão sanguínea através dos sistemas circulatórios pulmonar e sistêmico. Localiza-se no mediastino médio, envolvido pelo pericárdio.",
        ],
        images: [
          {
            src: "/anatomia-images/coracao/openstax-heart-location-thorax.jpg",
            legend: "Localização do coração no tórax - Vista demonstrando o posicionamento do coração na cavidade torácica entre os pulmões, no mediastino médio.",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Diagrama mostrando a localização do coração no tórax",
            type: "modern"
          },
          {
            src: "/anatomia-images/coracao/openstax-heart-anterior-posterior.jpg",
            legend: "Vista anterior e posterior do coração - Painel superior mostra a vista anterior (esternocostal) do coração. Painel inferior mostra a vista posterior (base) do coração com todas as estruturas externas rotuladas.",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Vista anterior e posterior do coração humano com estruturas anatômicas rotuladas",
            type: "modern"
          }
        ],
        subsections: [
          {
            title: "Configuração Externa e Orientação",
            content: [
              "**Formato e Dimensões:** O coração apresenta forma cônica com base superior posterior e ápice inferior anterior esquerdo. O eixo cardíaco está orientado obliquamente da direita superior para esquerda inferior e de posterior para anterior.",
              "**Faces Cardíacas:** Apresenta três faces principais: face esternocostal (anterior), face diafragmática (inferior) e face pulmonar (lateral esquerda). A base cardíaca (posterior) é formada principalmente pelo átrio esquerdo.",
              "**Sulcos Cardíacos:** Os sulcos externos demarcam os limites das câmaras: sulco coronário (ou atrioventricular) circunda o coração separando átrios de ventrículos; sulcos interventriculares anterior e posterior demarcam o septo interventricular.",
              "**Ápice Cardíaco:** Formado principalmente pelo ventrículo esquerdo, projeta-se anteriormente, inferiormente e à esquerda, geralmente ao nível do quinto espaço intercostal esquerdo, medialmente à linha hemiclavicular.",
            ],
          },
          {
            title: "Pericárdio",
            content: [
              "**Estrutura:** O pericárdio é composto por duas camadas: pericárdio fibroso (externo, resistente e inextensível) e pericárdio seroso (interno, formado por lâmina parietal e visceral).",
              "**Pericárdio Seroso:** A lâmina visceral do pericárdio seroso adere intimamente à superfície cardíaca, constituindo o epicárdio. A lâmina parietal reveste internamente o pericárdio fibroso. Entre as duas lâminas existe a cavidade pericárdica, contendo pequena quantidade de líquido seroso que permite o deslizamento cardíaco.",
              "**Seios Pericárdicos:** Reflexões do pericárdio seroso formam os seios pericárdicos: seio transverso (posterior à aorta e tronco pulmonar, anterior aos átrios) e seio oblíquo (posterior ao átrio esquerdo).",
            ],
            images: [
              {
                src: "/anatomia-images/coracao/openstax-heart-wall-layers.jpg",
                legend: "Camadas da parede cardíaca - Vista ampliada mostrando a estrutura da parede do coração, incluindo o pericárdio fibroso externo, pericárdio seroso (lâminas parietal e visceral/epicárdio), miocárdio e endocárdio.",
                credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
                alt: "Vista ampliada da estrutura da parede do coração mostrando todas as camadas",
                type: "modern"
              }
            ],
          },
        ],
      },
      {
        title: "Anatomia Interna do Coração",
        content: [
          "O coração apresenta quatro câmaras: dois átrios (câmaras receptoras) e dois ventrículos (câmaras propulsoras), separados por septos interatriais e interventriculares.",
        ],
        images: [
          {
            src: "/anatomia-images/coracao/openstax-heart-internal-chambers.jpg",
            legend: "Interior do coração com câmaras cardíacas - Fotografia mostrando o interior do coração com os principais músculos e estruturas das câmaras cardíacas rotuladas, incluindo átrios, ventrículos e septos.",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Fotografia mostrando o interior do coração com os principais músculos rotulados",
            type: "modern"
          },
          {
            src: "/anatomia-images/coracao/openstax-heart-musculature.jpg",
            legend: "Musculatura cardíaca detalhada - Painel superior mostra a imagem do coração com as principais partes rotuladas. Painel inferior esquerdo mostra uma fotografia do coração com a camada superficial removida. Imagens no painel inferior direito mostram a musculatura detalhada dentro do coração.",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Múltiplas vistas da musculatura cardíaca interna com detalhamento anatômico",
            type: "modern"
          }
        ],
        subsections: [
          {
            title: "Átrio Direito",
            content: [
              "**Estrutura Geral:** Câmara de paredes finas que recebe sangue venoso das veias cavas superior e inferior e do seio coronário.",
              "**Componentes Anatômicos:** Apresenta duas porções: seio venoso (parede posterior lisa) e átrio propriamente dito (com músculos pectíneos). A aurícula direita é uma expansão anterior do átrio.",
              "**Aberturas:** Óstio da veia cava superior (sem válvula), óstio da veia cava inferior (com válvula rudimentar de Eustáquio), óstio do seio coronário (com válvula de Thebesius) e óstio atrioventricular direito (tricúspide).",
              "**Septo Interatrial:** Apresenta depressão ovalar - a fossa oval - que marca o local do forame oval fetal.",
            ],
          },
          {
            title: "Ventrículo Direito",
            content: [
              "**Estrutura Geral:** Câmara de parede mais espessa que o átrio, responsável por impulsionar sangue para circulação pulmonar.",
              "**Componentes Anatômicos:** Apresenta trabéculas cárneas (projeções musculares irregulares), músculos papilares (anterior, posterior e septal) e crista supraventricular (separa porção de entrada da porção de saída).",
              "**Aparelho Valvar Tricúspide:** Formado por anel fibroso, três cúspides (anterior, posterior e septal), cordas tendíneas e músculos papilares.",
              "**Trato de Saída:** O cone arterial (infundíbulo) é a porção lisa de saída que se conecta ao tronco pulmonar através da valva pulmonar.",
            ],
          },
          {
            title: "Átrio Esquerdo",
            content: [
              "**Estrutura Geral:** Câmara de paredes lisas que recebe sangue oxigenado de quatro veias pulmonares (duas direitas e duas esquerdas).",
              "**Componentes Anatômicos:** Maior parte da parede é lisa. A aurícula esquerda apresenta músculos pectíneos apenas internamente.",
              "**Aberturas:** Quatro óstios das veias pulmonares (sem válvulas) e óstio atrioventricular esquerdo (mitral).",
              "**Localização:** Constitui a maior parte da base cardíaca (face posterior), relacionando-se posteriormente com esôfago e aorta descendente.",
            ],
          },
          {
            title: "Ventrículo Esquerdo",
            content: [
              "**Estrutura Geral:** Câmara de parede mais espessa do coração (2-3 vezes a espessura do ventrículo direito), responsável por impulsionar sangue para circulação sistêmica.",
              "**Componentes Anatômicos:** Apresenta trabéculas cárneas mais finas e numerosas que o ventrículo direito, e dois músculos papilares principais (anterior e posterior) mais desenvolvidos.",
              "**Aparelho Valvar Mitral:** Formado por anel fibroso, duas cúspides (anterior/aórtica e posterior/mural), cordas tendíneas e músculos papilares.",
              "**Trato de Saída:** Vestíbulo aórtico - região lisa inferior à valva aórtica. A cúspide anterior da mitral forma a parede posterior do vestíbulo aórtico.",
              "**Septo Interventricular:** Maior parte é muscular; pequena porção superior é membranosa (local de comunicação interventricular congênita).",
            ],
          },
        ],
      },
      {
        title: "Valvas Cardíacas",
        content: [
          "O coração possui quatro valvas que garantem fluxo unidirecional: duas valvas atrioventriculares (tricúspide e mitral) e duas valvas semilunares (pulmonar e aórtica).",
        ],
        images: [
          {
            src: "/anatomia-images/coracao/openstax-heart-valves.jpg",
            legend: "Valvas cardíacas - Vista anterior do coração mostrando as diferentes valvas cardíacas rotuladas: valvas atrioventriculares (tricúspide e mitral) e valvas semilunares (pulmonar e aórtica).",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Diagrama mostrando vista anterior do coração com as diferentes valvas cardíacas rotuladas",
            type: "modern"
          },
          {
            src: "/anatomia-images/coracao/openstax-mitral-valve-open.jpg",
            legend: "Valva mitral em posição aberta - Painel esquerdo mostra a vista anterior do coração com as diferentes valvas. Painel direito mostra a localização da valva mitral na posição aberta no coração, permitindo o fluxo sanguíneo do átrio esquerdo para o ventrículo esquerdo.",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Vista da valva mitral em posição aberta durante diástole ventricular",
            type: "modern"
          },
          {
            src: "/anatomia-images/coracao/openstax-mitral-valve-closed.jpg",
            legend: "Valva mitral em posição fechada - Painel esquerdo mostra a vista anterior do coração com as diferentes valvas. Painel direito mostra a localização da valva mitral na posição fechada no coração durante a sístole ventricular, impedindo o refluxo sanguíneo.",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Vista da valva mitral em posição fechada durante sístole ventricular",
            type: "modern"
          }
        ],
        subsections: [
          {
            title: "Valva Tricúspide",
            content: [
              "**Localização:** Óstio atrioventricular direito.",
              "**Componentes:** Três cúspides (anterior, posterior e septal) conectadas por cordas tendíneas aos músculos papilares.",
              "**Função:** Impede refluxo sanguíneo do ventrículo direito para átrio direito durante sístole ventricular.",
            ],
          },
          {
            title: "Valva Mitral (Bicúspide)",
            content: [
              "**Localização:** Óstio atrioventricular esquerdo.",
              "**Componentes:** Duas cúspides (anterior/aórtica - maior, e posterior/mural - menor) conectadas aos músculos papilares.",
              "**Função:** Impede refluxo sanguíneo do ventrículo esquerdo para átrio esquerdo durante sístole ventricular.",
              "**Característica:** A cúspide anterior é maior e tem posicionamento em continuidade com a valva aórtica.",
            ],
          },
          {
            title: "Valva Pulmonar",
            content: [
              "**Localização:** Junção entre ventrículo direito e tronco pulmonar.",
              "**Componentes:** Três valvas semilunares (anterior, direita e esquerda), sem cordas tendíneas ou músculos papilares.",
              "**Função:** Impede refluxo sanguíneo do tronco pulmonar para ventrículo direito durante diástole ventricular.",
            ],
          },
          {
            title: "Valva Aórtica",
            content: [
              "**Localização:** Junção entre ventrículo esquerdo e aorta ascendente.",
              "**Componentes:** Três valvas semilunares (direita, esquerda e posterior), sem cordas tendíneas.",
              "**Seios de Valsalva:** Dilatações da raiz aórtica posterior às cúspides, de onde originam-se as artérias coronárias (seio direito → coronária direita; seio esquerdo → coronária esquerda).",
              "**Função:** Impede refluxo sanguíneo da aorta para ventrículo esquerdo durante diástole ventricular.",
            ],
          },
        ],
      },
      {
        title: "Vascularização Coronariana",
        content: [
          "O miocárdio recebe suprimento sanguíneo através das artérias coronárias, que se originam dos seios aórticos e percorrem os sulcos cardíacos. As artérias coronárias direita e esquerda correm nos sulcos coronário e interventriculares, fornecendo irrigação essencial para o músculo cardíaco.",
        ],
        images: [
          {
            src: "/anatomia-images/coracao/openstax-coronary-circulation.jpg",
            legend: "Circulação coronariana - Painel superior mostra a vista anterior do coração com os vasos sanguíneos rotulados. Painel inferior mostra a vista posterior do coração com os diferentes vasos sanguíneos identificados, incluindo artérias coronárias e veias cardíacas.",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Vista anterior e posterior do coração mostrando os diferentes vasos sanguíneos rotulados",
            type: "modern"
          },
          {
            src: "/anatomia-images/coracao/openstax-heart-circulation-system.jpg",
            legend: "Sistema circulatório do coração - Painel superior mostra o coração humano com as artérias e veias rotuladas. Painel inferior mostra o sistema circulatório humano completo, demonstrando a circulação pulmonar e sistêmica.",
            credit: "OpenStax, Anatomy and Physiology 2e. OpenStax CNX. CC BY 4.0. https://openstax.org/books/anatomy-and-physiology-2e/",
            alt: "Coração humano com artérias e veias rotuladas e sistema circulatório completo",
            type: "modern"
          }
        ],
        subsections: [
          {
            title: "Artéria Coronária Direita",
            content: [
              "**Origem:** Seio aórtico direito (seio de Valsalva direito).",
              "**Trajeto:** Percorre o sulco coronário (atrioventricular) direito, contornando a margem direita do coração até alcançar o sulco interventricular posterior.",
              "**Ramos Principais:** Artéria do nó sinoatrial (60% dos casos), ramos atriais, ramos ventriculares anteriores, artéria marginal direita, artéria interventricular posterior (descendente posterior) e artéria do nó atrioventricular.",
              "**Território de Irrigação:** Átrio direito, ventrículo direito, parte do átrio esquerdo, porção inferior do ventrículo esquerdo, septo interventricular posterior.",
            ],
          },
          {
            title: "Artéria Coronária Esquerda",
            content: [
              "**Origem:** Seio aórtico esquerdo (seio de Valsalva esquerdo).",
              "**Tronco Principal:** Curto (1-2 cm), divide-se em ramos interventricular anterior e circunflexo.",
              "**Artéria Interventricular Anterior (Descendente Anterior):** Desce no sulco interventricular anterior até o ápice. Emite ramos septais (perfuram o septo) e ramos diagonais (para parede anterior do ventrículo esquerdo).",
              "**Artéria Circunflexa:** Percorre o sulco coronário esquerdo contornando a margem esquerda. Emite ramos marginais esquerdos e artéria do nó sinoatrial (40% dos casos).",
              "**Território de Irrigação:** Maior parte do ventrículo esquerdo, átrio esquerdo, septo interventricular anterior.",
            ],
          },
          {
            title: "Dominância Coronariana",
            content: [
              "**Conceito:** Determinada pela origem da artéria interventricular posterior (descendente posterior).",
              "**Dominância Direita (70%):** Artéria interventricular posterior origina-se da coronária direita.",
              "**Dominância Esquerda (10%):** Artéria interventricular posterior origina-se da circunflexa.",
              "**Codominância (20%):** Ambas as coronárias contribuem para irrigação posterior.",
            ],
          },
          {
            title: "Drenagem Venosa",
            content: [
              "**Seio Coronário:** Principal veia cardíaca, localizada no sulco coronário posterior. Desemboca no átrio direito.",
              "**Tributárias Principais:** Veia cardíaca magna (interventricular anterior), veia cardíaca média (interventricular posterior), veia cardíaca parva (marginal direita), veia posterior do ventrículo esquerdo.",
              "**Veias Cardíacas Anteriores:** Drenam diretamente para átrio direito.",
              "**Veias Mínimas de Thebesius:** Pequenas veias que drenam diretamente nas câmaras cardíacas.",
            ],
          },
        ],
      },
      {
        title: "Sistema de Condução Cardíaca",
        content: [
          "O sistema de condução elétrica do coração é formado por células musculares cardíacas especializadas que geram e conduzem impulsos elétricos de forma coordenada.",
        ],
        subsections: [
          {
            title: "Nó Sinoatrial (Nó SA)",
            content: [
              "**Localização:** Junção da veia cava superior com átrio direito, na porção superior do septo interatrial.",
              "**Função:** Marca-passo natural do coração, gera impulsos espontâneos (60-100 bpm em repouso).",
              "**Inervação:** Ricamente inervado pelo sistema autônomo (simpático acelera, parassimpático desacelera).",
            ],
          },
          {
            title: "Vias Internodais",
            content: [
              "**Função:** Conduzem impulso do nó SA ao nó AV através do miocárdio atrial.",
              "**Componentes:** Três vias preferenciais (anterior, média e posterior) embora anatomicamente não sejam feixes isolados.",
            ],
          },
          {
            title: "Nó Atrioventricular (Nó AV)",
            content: [
              "**Localização:** Septo interatrial inferior, próximo ao óstio do seio coronário e cúspide septal da tricúspide.",
              "**Função:** Atrasa condução do impulso (permitindo enchimento ventricular completo) e filtra impulsos atriais excessivos.",
              "**Velocidade de Condução:** Lenta, causando atraso de aproximadamente 0,1 segundo.",
            ],
          },
          {
            title: "Feixe de His (Feixe Atrioventricular)",
            content: [
              "**Trajeto:** Origina-se do nó AV, penetra no esqueleto fibroso cardíaco e desce pelo septo interventricular membranoso.",
              "**Divisão:** Divide-se em ramo direito e ramo esquerdo.",
            ],
          },
          {
            title: "Ramos do Feixe de His",
            content: [
              "**Ramo Direito:** Desce pelo septo interventricular direito até o ápice, distribuindo-se pelo ventrículo direito.",
              "**Ramo Esquerdo:** Divide-se em fascículo anterior (para parede anterior) e fascículo posterior (para parede posterior) do ventrículo esquerdo.",
            ],
          },
          {
            title: "Fibras de Purkinje",
            content: [
              "**Distribuição:** Ramificações terminais que se estendem por todo o miocárdio ventricular.",
              "**Função:** Conduzem rapidamente impulso para células miocárdicas contráteis, garantindo contração ventricular coordenada.",
            ],
          },
        ],
      },
    ],
  },
  summary: [
    {
      concept: "Morfologia Cardíaca",
      definition: "Órgão muscular cônico com base posterior e ápice anterior esquerdo. Apresenta quatro câmaras (dois átrios e dois ventrículos) separadas por septos. Orientação oblíqua da direita superior para esquerda inferior.",
    },
    {
      concept: "Pericárdio",
      definition: "Saco fibrosseroso que envolve o coração. Composto por pericárdio fibroso (externo) e seroso (parietal e visceral/epicárdio). Cavidade pericárdica contém líquido seroso para deslizamento.",
    },
    {
      concept: "Valvas Atrioventriculares",
      definition: "Tricúspide (direita, 3 cúspides) e Mitral (esquerda, 2 cúspides). Possuem cordas tendíneas e músculos papilares. Impedem refluxo durante sístole ventricular.",
    },
    {
      concept: "Valvas Semilunares",
      definition: "Pulmonar e Aórtica. Três valvas semilunares cada, sem cordas tendíneas. Impedem refluxo durante diástole ventricular. Artérias coronárias originam-se dos seios de Valsalva.",
    },
    {
      concept: "Artéria Coronária Direita",
      definition: "Origina-se do seio aórtico direito, percorre sulco coronário direito. Irriga VD, AD, parte do AE e parede inferior do VE. Emite descendente posterior em dominância direita (70%).",
    },
    {
      concept: "Artéria Coronária Esquerda",
      definition: "Origina-se do seio aórtico esquerdo, divide-se em descendente anterior (sulco interventricular anterior) e circunflexa (sulco coronário esquerdo). Irriga maior parte do VE e septo anterior.",
    },
    {
      concept: "Sistema de Condução",
      definition: "Nó SA (marca-passo) → Vias internodais → Nó AV (atraso) → Feixe de His → Ramos direito e esquerdo → Fibras de Purkinje. Garante contração coordenada dos ventrículos.",
    },
  ],
  questions: [
    {
      question: "Qual estrutura do coração é responsável por gerar impulsos elétricos espontâneos, atuando como marca-passo natural?",
      options: [
        "Nó atrioventricular",
        "Feixe de His",
        "Nó sinoatrial",
        "Fibras de Purkinje",
      ],
      correctAnswer: 2,
      explanation: "O nó sinoatrial (nó SA), localizado na junção da veia cava superior com o átrio direito, é o marca-passo natural do coração, gerando impulsos espontâneos a uma frequência de 60-100 batimentos por minuto em repouso. Estes impulsos são então conduzidos através do sistema de condução para coordenar a contração cardíaca.",
    },
    {
      question: "De onde se originam as artérias coronárias?",
      options: [
        "Arco aórtico",
        "Aorta descendente",
        "Seios de Valsalva (seios aórticos)",
        "Tronco pulmonar",
      ],
      correctAnswer: 2,
      explanation: "As artérias coronárias originam-se dos seios de Valsalva (seios aórticos), que são dilatações da raiz aórtica localizadas posteriormente às cúspides da valva aórtica. A artéria coronária direita origina-se do seio direito, e a artéria coronária esquerda origina-se do seio esquerdo.",
    },
    {
      question: "Qual valva cardíaca apresenta apenas duas cúspides?",
      options: [
        "Valva tricúspide",
        "Valva pulmonar",
        "Valva aórtica",
        "Valva mitral",
      ],
      correctAnswer: 3,
      explanation: "A valva mitral (também chamada bicúspide) é a única valva cardíaca com apenas duas cúspides: a cúspide anterior (ou aórtica), que é maior, e a cúspide posterior (ou mural), que é menor. As demais valvas possuem três cúspides/valvas.",
    },
    {
      question: "Qual câmara cardíaca possui a parede mais espessa?",
      options: [
        "Átrio direito",
        "Átrio esquerdo",
        "Ventrículo direito",
        "Ventrículo esquerdo",
      ],
      correctAnswer: 3,
      explanation: "O ventrículo esquerdo possui a parede mais espessa do coração (2-3 vezes mais espessa que o ventrículo direito) porque precisa gerar pressão suficiente para impulsionar o sangue através de toda a circulação sistêmica, que oferece maior resistência que a circulação pulmonar.",
    },
  ],
}
