# Guia de Uso: Sistema de Pares de Imagens Anatômicas

Este documento explica como usar o novo sistema de pares de imagens anatômicas implementado para o projeto AnatomiaViva.

## Visão Geral

O sistema permite exibir pares de imagens anatômicas (Gray's Anatomy + Diagrama Moderno) de forma responsiva e interativa, com funcionalidade de zoom.

## Componentes Criados

### 1. `AnatomicalImagePair`

Componente React que exibe um par de imagens lado a lado (desktop) ou empilhadas (mobile).

**Localização**: `components/anatomical-image-pair.tsx`

**Props**:
```typescript
interface ImagePairData {
  grayImage: {
    src: string
    alt: string
    legend: string
    credit: string
  }
  modernImage: {
    src: string
    alt: string
    legend: string
    credit: string
  }
  subtopic: string
}
```

**Uso Básico**:
```tsx
import { AnatomicalImagePair } from "@/components/anatomical-image-pair"

const imagePair = {
  subtopic: "Ventrículo Esquerdo",
  grayImage: {
    src: "/anatomia-images/coracao/camaras-internas/gray495-ventriculo-esquerdo.png",
    alt: "Gray's Anatomy - Ventrículo esquerdo - vista interna",
    legend: "Gray's Anatomy: Ventrículo esquerdo - vista interna, evidenciando trabéculas cárneas, músculos papilares e cordas tendíneas",
    credit: "Gray's Anatomy (1918) - Domínio Público | Wikimedia Commons"
  },
  modernImage: {
    src: "/anatomia-images/coracao/camaras-internas/diagrama-coracao-interno.svg",
    alt: "Diagrama moderno - Ventrículo esquerdo",
    legend: "Diagrama Moderno: Anatomia interna do coração - corte coronal mostrando as quatro câmaras e valvas",
    credit: "Wapcaplet, CC BY-SA 3.0 | Wikimedia Commons"
  }
}

<AnatomicalImagePair imagePair={imagePair} />
```

### 2. `AnatomicalImagePairs`

Componente que exibe múltiplos pares de imagens em sequência.

**Uso Básico**:
```tsx
import { AnatomicalImagePairs } from "@/components/anatomical-image-pair"

const imagePairs = [pair1, pair2, pair3]

<AnatomicalImagePairs 
  imagePairs={imagePairs}
  title="Câmaras Cardíacas"
/>
```

### 3. Funções Utilitárias

**Localização**: `lib/utils/image-pair-utils.ts`

#### `organizeImagePairs()`

Converte a estrutura de dados existente em pares de imagens:

```typescript
import { organizeImagePairs } from "@/lib/utils/image-pair-utils"

const section = {
  title: "Anatomia Interna",
  images: [
    {
      src: "/gray492.png",
      type: "historical",
      legend: "...",
      credit: "..."
    },
    {
      src: "/diagrama.svg",
      type: "modern",
      legend: "...",
      credit: "..."
    }
  ]
}

const pairs = organizeImagePairs(section.images, section.title)
```

#### `validateImagePair()`

Valida se um par de imagens está completo:

```typescript
import { validateImagePair } from "@/lib/utils/image-pair-utils"

const { valid, issues } = validateImagePair(imagePair)

if (!valid) {
  console.error("Problemas encontrados:", issues)
}
```

#### `createImagePair()`

Cria um par de imagens a partir de duas imagens individuais:

```typescript
import { createImagePair } from "@/lib/utils/image-pair-utils"

const pair = createImagePair(
  "Átrio Direito",
  grayAnatomyImage,
  modernDiagramImage
)
```

## Estrutura de Dados Atualizada

### AnatomicalImage Interface

```typescript
export interface AnatomicalImage {
  src: string
  legend?: string
  credit?: string
  alt?: string
  type?: 'historical' | 'modern'  // NOVO CAMPO
}
```

### Subsection Interface

```typescript
interface Subsection {
  title: string
  content: string[] | string
  subsections?: Subsection[]
  images?: (string | AnatomicalImage)[]  // NOVO CAMPO
}
```

## Como Adicionar Pares de Imagens a um Tópico

### Exemplo Prático - Coração

```typescript
// lib/pratica-topics/coracao.ts

export const coracao: PraticaTopicContent = {
  title: "Coração",
  content: {
    sections: [
      {
        title: "Anatomia Interna do Coração",
        content: ["..."],
        images: [
          {
            src: "/anatomia-images/coracao/camaras-internas/gray492-atrio-direito.png",
            legend: "Gray's Anatomy: Átrio direito - vista interna",
            credit: "Gray's Anatomy (1918) - Domínio Público",
            alt: "Átrio direito - anatomia interna - Gray's Anatomy",
            type: "historical"  // Marca como histórica
          },
          {
            src: "/anatomia-images/coracao/camaras-internas/diagrama-coracao-interno.svg",
            legend: "Diagrama Moderno: Anatomia interna do coração",
            credit: "Wapcaplet, CC BY-SA 3.0",
            alt: "Coração - anatomia interna - diagrama moderno",
            type: "modern"  // Marca como moderna
          }
        ],
        subsections: [
          {
            title: "Átrio Direito",
            content: ["..."],
            images: [  // SUBSEÇÕES AGORA PODEM TER IMAGENS
              {
                src: "/path/to/gray-image.png",
                type: "historical",
                // ...
              },
              {
                src: "/path/to/modern-image.png",
                type: "modern",
                // ...
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Recursos do Componente

### ✨ Funcionalidades

1. **Layout Responsivo**
   - Desktop: Imagens lado a lado
   - Mobile: Imagens empilhadas

2. **Zoom Interativo**
   - Click na imagem para abrir em tamanho grande
   - Modal com detalhes completos (legenda + créditos)

3. **Badges Identificadores**
   - "Gray's Anatomy" em fundo escuro
   - "Diagrama Moderno" em fundo primário

4. **Hover Effects**
   - Ícone de lupa ao passar o mouse
   - Escala suave da imagem (1.05x)

5. **Acessibilidade**
   - Textos alternativos (alt) para leitores de tela
   - Labels semânticos

6. **Performance**
   - Lazy loading de imagens
   - Next.js Image optimization

## Validação de Imagens

### Script de Validação

Execute para verificar todas as imagens do coração:

```bash
npx tsx scripts/validate-heart-images.ts
```

**Critérios de Validação**:
- ✅ Arquivo existe
- ✅ Tamanho > 50KB
- ✅ Formato válido (PNG, SVG, JPG)
- ✅ Pares completos (Gray + Moderno)

**Log de Saída**:
```json
{
  "timestamp": "2025-10-26T...",
  "summary": {
    "totalSubtopics": 11,
    "completePairs": 4,
    "incompletePairs": 7
  },
  "audits": [...]
}
```

Salvo em: `public/anatomia-images/coracao/validation-log.json`

## Padrões de Nomenclatura

### Diretórios

```
public/anatomia-images/
  └── coracao/
      ├── camaras-internas/
      ├── coronarias/
      ├── morfologia-externa/
      ├── pericardio/
      ├── sistema-conducao/
      └── valvas/
```

### Arquivos

Padrão: `[fonte]-[estrutura]-[vista].[ext]`

**Exemplos**:
- `gray492-atrio-direito.png`
- `diagrama-coracao-interno.svg`
- `gray490-coracao-anterior.png`

## Fontes Recomendadas para Imagens

### 1. Gray's Anatomy (Históricas)
- **URL**: https://commons.wikimedia.org/wiki/Category:Gray's_Anatomy_plates_of_cardiovascular_system
- **Licença**: Domínio Público (1918)
- **Formato**: PNG
- **Crédito**: "Gray's Anatomy (1918) - Domínio Público | Wikimedia Commons"

### 2. OpenStax Anatomy & Physiology (Modernas)
- **URL**: https://openstax.org/books/anatomy-and-physiology-2e/
- **Licença**: CC BY 4.0
- **Formato**: PNG/SVG
- **Crédito**: "OpenStax Anatomy & Physiology, CC BY 4.0"

### 3. Wikimedia Commons (Diagramas)
- **URL**: https://commons.wikimedia.org/wiki/Category:Anatomy_of_the_human_heart
- **Licença**: Variável (CC BY, CC BY-SA, Domínio Público)
- **Formato**: PNG/SVG
- **Crédito**: Verificar página individual

## Checklist para Adicionar Novo Par de Imagens

- [ ] Baixar imagem do Gray's Anatomy (>50KB, alta resolução)
- [ ] Baixar diagrama moderno correspondente (mesma vista/estrutura)
- [ ] Salvar na pasta correta com nomenclatura padronizada
- [ ] Adicionar campo `type: 'historical'` ou `type: 'modern'`
- [ ] Incluir `legend` descritiva e detalhada
- [ ] Incluir `credit` com fonte e licença
- [ ] Incluir `alt` text para acessibilidade
- [ ] Executar script de validação
- [ ] Verificar no navegador (desktop + mobile)
- [ ] Testar funcionalidade de zoom

## Integração no PraticaTopicClient

Para usar o componente de pares de imagens na página de tópicos práticos, você tem duas opções:

### Opção 1: Usar o novo componente diretamente (Recomendado para visualização de pares)

```tsx
// app/pratica/[id]/pratica-topic-client.tsx

import { AnatomicalImagePairs } from "@/components/anatomical-image-pair"
import { organizeImagePairs } from "@/lib/utils/image-pair-utils"

// Dentro do componente:
const imagePairs = organizeImagePairs(section.images, section.title)

<AnatomicalImagePairs 
  imagePairs={imagePairs}
  title={section.title}
/>
```

### Opção 2: Manter AnatomicalImageGrid (Backward compatibility)

O componente `AnatomicalImageGrid` existente continua funcionando para exibição em grid. Use-o quando não quiser a visualização em pares.

```tsx
<AnatomicalImageGrid 
  images={section.images || []} 
  sectionTitle={section.title}
  columns={2}
/>
```

## Melhorias Sugeridas

### 1. Fallback Aprimorado (Prioridade: Média)

Atualizar `organizeImagePairs` para emitir warnings quando reutilizar diagramas:

```typescript
// Adicionar em lib/utils/image-pair-utils.ts
if (!modern && modernImages.length > 0) {
  console.warn(`⚠️ Missing modern image for "${subtopic}", reusing first modern diagram`)
}
```

### 2. Validação de Dimensões SVG (Prioridade: Baixa)

Adicionar verificação de dimensões mínimas para SVGs:

```typescript
// Em scripts/validate-heart-images.ts
if (filePath.endsWith('.svg')) {
  // Parse SVG e verificar viewBox/width/height
  // Considerar inválido se < 500x500px
}
```

### 3. Testes de Renderização (Prioridade: Alta)

Adicionar testes para verificar que os pares são exibidos corretamente.

## Próximos Passos

1. **Substituir Imagens Corrompidas**
   - Ver `docs/HEART_IMAGES_REPLACEMENT_GUIDE.md` para lista completa
   - Executar comandos de download listados
   - Validar com `npx tsx scripts/validate-heart-images.ts`

2. **Integrar Componente na UI**
   - Decidir entre AnatomicalImagePairs ou manter AnatomicalImageGrid
   - Atualizar pratica-topic-client.tsx conforme escolha
   - Testar responsividade e zoom

3. **Expandir para Outros Sistemas**
   - Sistema Respiratório
   - Sistema Digestório
   - Sistema Nervoso
   - Criar scripts de validação específicos

4. **Melhorias Futuras**
   - Comparação lado a lado com slider interativo
   - Anotações interativas nas imagens
   - Quiz visual com imagens
   - Legendas multilíngues (PT/EN)

---

**Documentação criada em**: 26 de outubro de 2025
**Versão**: 1.0
**Autor**: Replit AI Agent
