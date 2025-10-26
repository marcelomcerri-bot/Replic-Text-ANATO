# 📸 Guia de Imagens Anatômicas - AnatomiaViva

## 🎯 Visão Geral

O sistema de imagens anatômicas foi completamente renovado para incluir:

- ✅ **Zoom interativo** com `react-medium-image-zoom`
- ✅ **Legendas descritivas** para cada imagem
- ✅ **Créditos automáticos** com fonte e licença
- ✅ **Design responsivo** que se adapta a todas as telas
- ✅ **Hover effects** elegantes e profissionais

## 🧩 Como Usar

### Opção 1: Imagens Simples (URL apenas)

Para usar apenas URLs de imagens (com crédito padrão "Gray's Anatomy 1918"):

```typescript
{
  title: "Morfologia Externa do Coração",
  content: ["Descrição..."],
  images: [
    "https://commons.wikimedia.org/wiki/Special:FilePath/Gray490.png",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Gray491.png"
  ]
}
```

### Opção 2: Imagens com Metadados Completos

Para imagens com legendas e créditos personalizados:

```typescript
{
  title: "Vascularização Coronariana",
  content: ["Descrição..."],
  images: [
    {
      src: "https://openstax.org/apps/image-cdn/v1/f=webp/apps/archive/20240730.181555/resources/...",
      legend: "Vista anterior do coração mostrando as artérias coronárias direita e esquerda com suas principais ramificações",
      credit: "OpenStax Anatomy & Physiology 2e - CC BY 4.0",
      alt: "Artérias coronárias - vista anterior"
    },
    {
      src: "https://lane.stanford.edu/biomed-resources/bassett/heart/...",
      legend: "Corte transversal do miocárdio demonstrando a irrigação das três camadas cardíacas",
      credit: "Bassett Collection - Stanford Medicine - CC BY-SA 4.0"
    }
  ]
}
```

## 🗂️ Fontes Recomendadas de Imagens

### 1. **Gray's Anatomy (1918)** - Domínio Público
- 🔗 [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Gray%27s_Anatomy_plates)
- 🔗 [Wellcome Collection](https://wellcomecollection.org/images)
- **Licença:** Domínio Público
- **Crédito sugerido:** `"Gray's Anatomy (1918) - Domínio Público"`

### 2. **Bassett Collection** - CC BY-SA 4.0
- 🔗 [Stanford Medicine](https://lane.stanford.edu/biomed-resources/bassett)
- **Licença:** CC BY-SA 4.0
- **Crédito sugerido:** `"Bassett Collection - Stanford Medicine - CC BY-SA 4.0"`

### 3. **OpenStax Anatomy & Physiology** - CC BY 4.0
- 🔗 [OpenStax](https://openstax.org/books/anatomy-and-physiology-2e/pages/preface)
- **Licença:** CC BY 4.0
- **Crédito sugerido:** `"OpenStax Anatomy & Physiology 2e - CC BY 4.0"`

### 4. **AnatomyTool.org** - CC BY-NC-SA 4.0
- 🔗 [AnatomyTool](https://anatomytool.org)
- **Licença:** CC BY-NC-SA 4.0 (uso educacional)
- **Crédito sugerido:** `"AnatomyTool.org - CC BY-NC-SA 4.0"`

### 5. **Visible Human Project** - NLM
- 🔗 [U.S. National Library of Medicine](https://lhncbc.nlm.nih.gov/project/visible-human-project)
- **Licença:** Domínio Público (governo dos EUA)
- **Crédito sugerido:** `"Visible Human Project - U.S. National Library of Medicine"`

### 6. **Radiopaedia** - CC BY-NC-SA 3.0
- 🔗 [Radiopaedia.org](https://radiopaedia.org)
- **Licença:** CC BY-NC-SA 3.0 (anatomia clínica)
- **Crédito sugerido:** `"Radiopaedia.org - CC BY-NC-SA 3.0"`

### 7. **Wellcome Collection** - Várias licenças
- 🔗 [Wellcome Collection](https://wellcomecollection.org/images)
- **Licença:** Verificar individualmente
- **Crédito sugerido:** `"Wellcome Collection - [verificar licença]"`

## 📋 Estrutura dos Dados

### Tipo: String (simples)
```typescript
images: string[]
```

### Tipo: Objeto (completo)
```typescript
images: Array<{
  src: string          // URL da imagem (obrigatório)
  legend?: string      // Legenda descritiva (opcional)
  credit?: string      // Fonte e licença (opcional)
  alt?: string         // Texto alternativo (opcional)
}>
```

## 🎨 Componentes Criados

### `AnatomicalImage`
Componente individual para uma imagem anatômica:

```tsx
<AnatomicalImage 
  src="https://..."
  alt="Descrição da imagem"
  legend="Vista anterior do coração..."
  credit="Gray's Anatomy (1918) - Domínio Público"
/>
```

### `AnatomicalImageGrid`
Grade de imagens com layout responsivo:

```tsx
<AnatomicalImageGrid 
  images={[...]}
  sectionTitle="Morfologia Externa"
  columns={2}  // 1, 2 ou 3 colunas
/>
```

## 💡 Boas Práticas

### ✅ FAZER:

1. **Sempre incluir créditos corretos**
   ```typescript
   credit: "Bassett Collection - Stanford Medicine - CC BY-SA 4.0"
   ```

2. **Usar legendas descritivas**
   ```typescript
   legend: "Vista anterior mostrando aurículas e ventrículos"
   ```

3. **Manter imagens em alta resolução**
   - Mínimo: 1200px de largura
   - Formato: PNG ou JPG

4. **Usar no mínimo 3 fontes diferentes** por tópico

5. **Verificar licenças** antes de usar

### ❌ EVITAR:

1. ❌ Imagens sem crédito ou fonte
2. ❌ Imagens de baixa qualidade (< 800px)
3. ❌ Duplicação de imagens entre cards
4. ❌ Imagens genéricas ou não científicas
5. ❌ Uso de imagens com copyright restritivo

## 🔍 Exemplo Completo

```typescript
export const coracao: PraticaTopicContent = {
  title: "Coração",
  description: "Anatomia detalhada do coração",
  content: {
    sections: [
      {
        title: "Morfologia Externa do Coração",
        content: [
          "O coração constitui um órgão muscular oco..."
        ],
        images: [
          {
            src: "https://commons.wikimedia.org/wiki/Special:FilePath/Gray490.png",
            legend: "Vista anterior do coração mostrando a posição das aurículas e ventrículos, bem como os grandes vasos",
            credit: "Gray's Anatomy (1918) - Domínio Público",
            alt: "Anatomia externa do coração - vista anterior"
          },
          {
            src: "https://openstax.org/apps/image-cdn/v1/f=webp/.../heart.jpg",
            legend: "Estruturas externas do coração em vista anterolateral, destacando o sulco coronário e sulcos interventriculares",
            credit: "OpenStax Anatomy & Physiology 2e - CC BY 4.0",
            alt: "Coração - estruturas externas"
          }
        ],
        subsections: [...]
      }
    ]
  }
}
```

## 🚀 Funcionalidades Implementadas

### Zoom Interativo
- Clique na imagem para ampliar
- Clique fora ou ESC para fechar
- Transição suave e elegante
- Funciona em mobile e desktop

### Design Responsivo
- **Mobile:** 1 coluna
- **Tablet:** 2 colunas
- **Desktop:** 2-3 colunas (configurável)

### Efeitos Visuais
- Hover com escala sutil (1.02x)
- Sombra elevada ao passar o mouse
- Bordas arredondadas
- Transições suaves

## 📁 Arquivos Modificados

1. **`components/anatomical-image.tsx`** - Novo componente
2. **`app/pratica/[id]/pratica-topic-client.tsx`** - Atualizado para usar novo componente
3. **`app/globals.css`** - Importação dos estilos do zoom
4. **`package.json`** - Dependência `react-medium-image-zoom`

## 🎓 Próximos Passos Sugeridos

1. **Adicionar imagens a todos os tópicos de Anatomia Prática**
2. **Criar legendas descritivas para cada imagem**
3. **Variar as fontes** (Gray's, Bassett, OpenStax, etc.)
4. **Considerar adicionar diagramas 3D** (screenshots de AnatomyTool)
5. **Implementar galeria de imagens** para comparação lado a lado

## 📞 Suporte

Se tiver dúvidas sobre como usar o sistema de imagens:
- Consulte os exemplos em `lib/pratica-topics/coracao.ts`
- Veja a implementação em `components/anatomical-image.tsx`
- Teste em `/pratica/coracao` para ver o resultado final

---

**Desenvolvido para AnatomiaViva** 🧠💙
Plataforma educacional de anatomia humana para estudantes de enfermagem
