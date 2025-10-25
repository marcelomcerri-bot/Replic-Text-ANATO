import type { TopicContent } from "../topics-data"

export const sistemaCirculatorio: TopicContent = {
  id: "sistema-circulatorio",
  title: "Sistema Circulatório",
  description: "Coração, artérias, veias e circulação sanguínea",
  content: {
    sections: [
      {
        title: "Conceito e Definição: Sistema Circulatório e suas Subdivisões",
        content: [
          "O sistema circulatório é um sistema fechado (hermeticamente). Ele é tradicionalmente subdividido em duas partes principais:",
          "1. Sistema Cardiovascular: Composto pelo coração, pelos vasos sanguíneos e pelo sangue.",
          "2. Sistema Linfático: Constituído pelos vasos que transportam a linfa e a devolvem ao sistema vascular sanguíneo.",
          "O sistema circulatório é essencial para a nutrição celular e para a manutenção da vitalidade do organismo. Ele é constituído por tubos (vasos) e humores (sangue e linfa) que circulam em seu interior.",
        ],
      },
      {
        title: "Funções Essenciais do Sistema Circulatório",
        content: [
          "O sangue circulante, que é o veículo utilizado pelo sistema, desempenha diversas funções cruciais:",
          "• Transporte Nutritivo e Gasoso: Levar material nutritivo e oxigênio (O₂) às células de todas as partes do organismo. O sangue é um condutor de gases entre as células do organismo e o meio.",
          "• Remoção de Resíduos: Transportar os produtos residuais do metabolismo celular (incluindo CO₂) desde os locais de produção até os órgãos encarregados de os eliminar (como os rins).",
          "• Transporte de Moléculas de Sinalização: Conduzir hormônios das glândulas endócrinas para seus órgãos-alvo.",
          "• Defesa Orgânica: Possuir células especializadas na defesa orgânica contra substâncias estranhas e microrganismos.",
          "• Termorregulação: Ajudar a regular a temperatura corporal, desviando o sangue de/para a pele para controlar a quantidade de calor perdida.",
        ],
      },
      {
        title: "O Coração: O Órgão Central (Bomba Contratíl-Propulsora)",
        content: [
          "O coração é o órgão central do sistema circulatório. Ele é um vaso de paredes espessadas e muito modificado.",
        ],
        subsections: [
          {
            title: "Função Cardíaca",
            content: [
              "O coração funciona como uma bomba contrátil-propulsora para impulsionar o sangue através dos vasos. Ele é subdividido em quatro câmaras:",
              "• Dois átrios (câmaras de recepção) que recebem o sangue que retorna.",
              "• Dois ventrículos (câmaras de bombeamento principais) que bombeiam o sangue para as circulações.",
            ],
          },
          {
            title: "Revestimento (Pericárdio)",
            content: [
              "O coração é envolvido por um saco fibro-seroso denominado pericárdio ('em volta do coração'). O pericárdio o separa dos outros órgãos no mediastino e limita sua expansão durante a diástole ventricular.",
              "O pericárdio possui três camadas:",
              "1. Pericárdio Fibroso: Camada externa, forte e de tecido conjuntivo denso, que age como uma cobertura rígida.",
              "2. Pericárdio Seroso: Camada interna, que se divide em duas lâminas: Lâmina Parietal (aderente ao pericárdio fibroso) e Lâmina Visceral ou Epicárdio (aderente ao miocárdio).",
              "3. Cavidade do Pericárdio: O espaço virtual entre as lâminas serosas, contendo uma camada líquida que permite o deslizamento durante as mudanças de volume do coração.",
            ],
          },
          {
            title: "Dispositivos Valvares",
            content: [
              "Entre os átrios e os ventrículos (óstios atrioventriculares) e na saída das grandes artérias, existem valvas (válvulas) que funcionam como dispositivos orientadores da corrente sanguínea.",
              "Elas garantem o escoamento unidirecional e impedem o refluxo. As valvas são presas por cordas tendíneas aos músculos papilares (projeções do miocárdio), o que impede a eversão da valva para o átrio.",
            ],
          },
        ],
      },
      {
        title: "A Rede Fechada de Vasos: Artérias, Veias e Capilares",
        content: [
          "Os vasos sanguíneos constituem uma rede fechada de tubos ou canais. A parede dos vasos, com exceção dos capilares, é triestratificada, formada pelas túnicas íntima, média e adventícia (ou externa).",
        ],
        subsections: [
          {
            title: "Artérias",
            content: [
              "As artérias são os vasos que levam o sangue centrifugamente, ou seja, para fora do coração.",
              "Tipos e Estrutura: São tubos cilindróides e elásticos. A túnica média é geralmente mais espessa nas artérias do que nas veias, o que é importante para o reforço da parede e a alteração do diâmetro (vasoconstrição/vasodilatação).",
              "Situação: A quase totalidade das artérias são profundas, o que é uma característica funcional, pois as protege.",
              "Fluxo: A elastina nas paredes das artérias ajuda a amortecer os pulsos de pressão e a manter o fluxo pulsátil.",
            ],
          },
          {
            title: "Veias",
            content: [
              "As veias são os vasos que levam o sangue centripetamente, ou seja, das células para o coração.",
              "Estrutura: As veias são estruturalmente diferentes das artérias, pois têm uma luz mais ampla, uma túnica média mais fina e uma túnica adventícia mais espessa.",
              "Válvulas: A presença de válvulas é uma das principais características das veias (mas não em todas, como as do cérebro). As válvulas são pregas membranosas da túnica íntima, em forma de bolso, com a borda livre voltada para a direção do coração.",
              "Função da Válvula: As válvulas impedem o refluxo do sangue e dividem a coluna sanguínea venosa, permitindo a progressão do sangue de segmento em segmento.",
              "Retorno Venoso: Devido à baixa pressão do sangue venoso, o retorno ao coração é auxiliado pela contração muscular (bomba muscular esquelética).",
            ],
          },
          {
            title: "Capilares",
            content: [
              "Os capilares sanguíneos são vasos microscópicos interpostos entre artérias e veias.",
              "Função: É neles que se processam as trocas (permeabilidade seletiva) entre o sangue e os tecidos, permitindo a passagem de nutrientes e O₂ para os tecidos, e de resíduos metabólicos (CO₂) para o interior dos capilares.",
              "Estrutura: São compostos por apenas uma única camada de células endoteliais e circundados por uma membrana basal.",
            ],
          },
        ],
      },
      {
        title: "Tipos de Circulação (Circuitos Sanguíneos)",
        content: ["O sistema vascular possui dois circuitos básicos e um tipo de circulação especializada:"],
        subsections: [
          {
            title: "Circulação Pulmonar (Pequena Circulação)",
            content: [
              "Função: Levar o sangue para os pulmões para a hematose (oxigenação) e remover o dióxido de carbono.",
              "Percurso: Tem início no ventrículo direito, de onde o sangue é bombeado para a rede capilar dos pulmões. Após a oxigenação, o sangue retorna ao átrio esquerdo. É uma circulação coração-pulmão-coração.",
              "Vasos: A artéria pulmonar é ilustrada na cor azul porque transporta sangue desoxigenado (embora transporte sangue para fora do coração).",
            ],
          },
          {
            title: "Circulação Sistêmica (Grande Circulação)",
            content: [
              "Função: Transportar sangue oxigenado (iniciado pela aorta) pelo corpo e captar o CO₂ dos tecidos.",
              "Percurso: Tem início no ventrículo esquerdo, de onde o sangue é bombeado para a rede capilar de todo o organismo. Após as trocas, o sangue retorna pelas veias tributárias das veias cavas superior e inferior, que desembocam no átrio direito.",
            ],
          },
          {
            title: "Circulação Portal",
            content: [
              "Definição: É um tipo de circulação particularíssimo no qual uma veia interpõe-se entre duas redes de capilares, sem passar por um órgão intermediário.",
              "Sistema Porta Hepático: Um exemplo é a circulação portal-hepática, onde a veia porta está interposta entre a rede capilar do intestino (onde ocorre a absorção dos alimentos) e a rede de capilares sinusoides no fígado (onde ocorrem processos metabólicos).",
              "Função: Este sistema é um mecanismo para transportar substâncias (nutrientes e toxinas absorvidas) de um local para outro (intestino para fígado) sem que elas tenham que passar pela circulação sistêmica geral. Existe também um sistema portal na hipófise.",
            ],
          },
        ],
      },
      {
        title: "O Sistema Linfático: Drenagem Auxiliar e Órgãos Linfóides",
        content: ["O sistema linfático é um sistema auxiliar de drenagem do sistema venoso."],
        subsections: [
          {
            title: "Linfa e Vasos",
            content: [
              "A linfa é o excesso de líquido tecidual que é absorvido pelos capilares linfáticos. Esse líquido (linfa) é o excesso que se origina porque mais líquido sai dos capilares sanguíneos do que retorna para eles.",
              "Capilares Linfáticos: São tubos de fundo cego, mais calibrosos e irregulares que os capilares sanguíneos. Suas células endoteliais se sobrepõem, formando miniválvulas que permitem a entrada do líquido (linfa), mas impedem o refluxo.",
              "Fluxo: A linfa flui apenas na direção do coração (sistema de mão única). Os vasos linfáticos possuem válvulas em forma de bolso que asseguram esse fluxo.",
              "Confluência: Os vasos linfáticos (coletores) drenam em troncos linfáticos e, finalmente, em ductos linfáticos, que desembocam em veias de médio ou grande calibre na raiz do pescoço.",
            ],
          },
          {
            title: "Órgãos Linfáticos",
            content: [
              "O sistema linfático também engloba órgãos linfáticos:",
              "• Linfonodos: São órgãos ovóides situados no trajeto dos vasos linfáticos. Atuam como filtros contra a penetração de microrganismos e toxinas na circulação, sendo elementos de defesa.",
              "• Baço: Grande órgão linfóide que filtra o sangue, destrói células sanguíneas gastas e participa da hematopoese.",
              "• Timo e Medula Óssea: São classificados como órgãos linfáticos primários.",
            ],
          },
        ],
      },
      {
        title: "Integração e Aparelho Locomotor",
        content: [
          "O sistema vascular (circulatório), que inclui o coração e os vasos, é essencial para nutrir os tecidos.",
          "O aparelho locomotor é uma união de sistemas que cumprem funções complexas, incluindo o sistema esquelético (suporte), sistema articular (movimento) e sistema muscular (movimento ativo). O sistema vascular (circulatório) e o sistema nervoso são também necessários para a nutrição e o controle, mantendo o corpo em equilíbrio ou em movimento.",
          "O sistema circulatório também está intimamente ligado à função de hematopoese (formação de células sanguíneas), que ocorre principalmente na medula óssea e no baço (no feto).",
        ],
      },
    ],
  },
  summary: [
    {
      concept: "Sistema Circulatório",
      definition: "Sistema fechado que inclui o Sistema Cardiovascular (coração, sangue, vasos) e o Sistema Linfático.",
    },
    {
      concept: "Função Primordial",
      definition: "Levar nutrientes e O₂ às células e remover resíduos metabólicos.",
    },
    {
      concept: "Coração",
      definition: "Órgão central (vaso modificado) que funciona como bomba contrátil-propulsora.",
    },
    {
      concept: "Pericárdio",
      definition: "Saco fibro-seroso que envolve o coração e impede sua expansão excessiva.",
    },
    {
      concept: "Artérias",
      definition: "Levam sangue para fora do coração (centrifugamente). Têm a túnica média mais espessa.",
    },
    {
      concept: "Veias",
      definition:
        "Levam sangue para o coração (centripetamente). Possuem válvulas para evitar o refluxo e dependem da bomba muscular.",
    },
    {
      concept: "Capilares",
      definition: "Vasos microscópicos onde ocorrem as trocas seletivas (O₂/nutrientes/resíduos) com os tecidos.",
    },
    {
      concept: "Circulação Pulmonar",
      definition:
        "Circuito Ventrículo Direito → Pulmões → Átrio Esquerdo. Artérias pulmonares transportam sangue desoxigenado.",
    },
    {
      concept: "Circulação Sistêmica",
      definition: "Circuito Ventrículo Esquerdo → Tecidos → Átrio Direito.",
    },
    {
      concept: "Circulação Portal",
      definition: "Veia interposta entre duas redes de capilares (ex: veia porta entre intestino e fígado).",
    },
    {
      concept: "Sistema Linfático",
      definition: "Sistema auxiliar de drenagem. Coleta o excesso de líquido tecidual (linfa) e o devolve ao sangue.",
    },
    {
      concept: "Capilares Linfáticos",
      definition: "Vasos de fundo cego.",
    },
    {
      concept: "Linfonodos",
      definition: "Órgãos linfáticos que atuam como filtros contra microrganismos e toxinas.",
    },
    {
      concept: "Hematopoese",
      definition: "Processo de formação de células sanguíneas, realizado por órgãos como medula óssea e timo.",
    },
  ],
  questions: [
    {
      question:
        "Descreva as duas funções primordiais do sistema circulatório em relação à nutrição celular e ao metabolismo, e explique como a natureza de 'sistema fechado' contribui para o processo de trocas.",
      options: [
        "Apenas transportar oxigênio; o sistema aberto permite trocas em qualquer lugar",
        "Levar material nutritivo e O₂ às células, e transportar produtos residuais do metabolismo para eliminação; por ser fechado, as trocas só ocorrem em locais especializados (capilares) com permeabilidade seletiva",
        "Apenas remover resíduos; o sistema fechado não permite trocas",
        "Transportar hormônios exclusivamente; o sistema fechado impede qualquer troca",
      ],
      correctAnswer: 1,
      explanation:
        "As funções primordiais são: levar material nutritivo e O₂ às células, e transportar os produtos residuais do metabolismo (incluindo CO₂) para os órgãos de eliminação. Por ser um sistema fechado (hermeticamente), as trocas entre o sangue e os tecidos só podem ocorrer em locais especializados (os capilares), onde as paredes são finas e permitem a permeabilidade seletiva de substâncias.",
    },
    {
      question:
        "Diferencie as artérias das veias em termos de direção do fluxo sanguíneo em relação ao coração e cite uma diferença estrutural importante. Explique o papel das válvulas venosas.",
      options: [
        "Artérias levam sangue ao coração e veias para fora; artérias têm túnica adventícia mais espessa",
        "Artérias conduzem sangue centrifugamente (para fora do coração) e veias centripetamente (para o coração); artérias têm túnica média mais espessa; válvulas venosas impedem refluxo e auxiliam o retorno venoso",
        "Não há diferença estrutural entre artérias e veias",
        "Veias não possuem válvulas",
      ],
      correctAnswer: 1,
      explanation:
        "As artérias conduzem o sangue centrifugamente (para fora do coração). As veias conduzem o sangue centripetamente (para o coração). Estruturalmente, as artérias têm a túnica média mais espessa do que a túnica adventícia, enquanto a túnica adventícia é a mais espessa nas veias. As válvulas venosas são pregas da túnica íntima que impedem o refluxo do sangue e dividem a coluna sanguínea, auxiliando o retorno venoso devido à baixa pressão sanguínea nas veias.",
    },
    {
      question:
        "O que define um sistema porta? Descreva o percurso do Sistema Porta Hepático e a função única que ele desempenha.",
      options: [
        "Sistema porta é qualquer veia; não tem função específica",
        "Sistema porta é definido pela interposição de uma veia entre duas redes de capilares; no Sistema Porta Hepático, a veia porta leva sangue do intestino para o fígado, permitindo processamento de nutrientes e toxinas antes de reentrar na circulação sistêmica",
        "Sistema porta conecta apenas artérias",
        "Sistema porta só existe no coração",
      ],
      correctAnswer: 1,
      explanation:
        "Um sistema porta é definido pela interposição de uma veia entre duas redes de capilares. No Sistema Porta Hepático, o percurso envolve a drenagem da rede capilar do intestino (onde há absorção de alimentos) para a veia porta, que leva o sangue rico em nutrientes para uma segunda rede, os sinusoides hepáticos no fígado. A função é permitir que o fígado processe e armazene os nutrientes e quebre as toxinas antes que o sangue reentre na circulação sistêmica geral.",
    },
    {
      question:
        "Defina o pericárdio e mencione os seus dois folhetos serosos. Qual função é realizada pela cavidade do pericárdio?",
      options: [
        "Pericárdio é um músculo cardíaco; não possui folhetos",
        "Pericárdio é um saco fibro-seroso que envolve o coração; possui lâmina parietal e lâmina visceral (epicárdio); a cavidade do pericárdio permite o deslizamento durante mudanças de volume do coração",
        "Pericárdio é apenas uma camada de gordura",
        "Pericárdio não tem função específica",
      ],
      correctAnswer: 1,
      explanation:
        "O pericárdio é um saco fibro-seroso que envolve e protege o coração. O pericárdio seroso possui a lâmina parietal (aderente ao pericárdio fibroso) e a lâmina visceral (ou epicárdio). A cavidade do pericárdio é um espaço virtual, ocupado por uma fina camada líquida, cuja função é permitir o deslizamento de uma lâmina serosa contra a outra durante as mudanças de volume do coração.",
    },
    {
      question:
        "O sistema circulatório engloba os órgãos hemopoiéticos e o sistema linfático. Mencione quais são os órgãos linfáticos primários e qual é a função essencial do sistema linfático.",
      options: [
        "Coração e pulmões; transportar sangue",
        "Medula óssea e timo; coletar o excesso de líquido tecidual (linfa) e devolvê-lo para a corrente sanguínea",
        "Fígado e baço; produzir bile",
        "Rins e bexiga; filtrar urina",
      ],
      correctAnswer: 1,
      explanation:
        "Os órgãos linfáticos primários são a medula óssea e o timo. O sistema linfático é um sistema auxiliar de drenagem e sua função essencial é coletar o excesso de líquido tecidual (chamado linfa) que vaza dos capilares sanguíneos e devolvê-lo para a corrente sanguínea. Ele recolhe moléculas grandes que não podem passar pelos capilares sanguíneos.",
    },
  ],
}
