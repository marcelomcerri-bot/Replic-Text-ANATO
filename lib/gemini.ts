import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Tentativa ${attempt + 1} falhou:`, lastError.message);
      
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.log(`Aguardando ${delay}ms antes de tentar novamente...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error("Falha após múltiplas tentativas");
}

export async function askAnatomyQuestion(
  question: string,
  context: string
): Promise<string> {
  const ai = getAI();
  
  if (!ai || !process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY não está configurada");
  }

  try {
    const systemInstruction = `Você é um assistente educacional especializado em anatomia humana para estudantes de enfermagem brasileiros.

REGRAS IMPORTANTES:
1. PRIMEIRO, tente responder com base no contexto fornecido do site AnatomiaViva abaixo
2. Se o contexto do site não contiver informações suficientes ou completas, use seu conhecimento de anatomia baseado em fontes científicas confiáveis
3. Forneça respostas técnicas mas acessíveis para estudantes de enfermagem
4. Seja preciso, educativo e completo nas explicações
5. Cite conceitos anatômicos corretamente usando terminologia anatômica adequada
6. Inclua detalhes anatômicos relevantes como localização, função, relações anatômicas, vascularização e inervação quando apropriado

REFERÊNCIAS E FONTES (CRÍTICO):
- NÃO inclua referências automaticamente em suas respostas
- APENAS forneça referências quando o usuário EXPLICITAMENTE pedir (ex: "me dê as referências", "quais são as fontes", "cite as fontes", "onde posso ler mais sobre isso")
- Quando solicitado, você DEVE fornecer referências EXATAS e ESPECÍFICAS:
  * Se usou informações do site AnatomiaViva, cite a seção específica (ex: "AnatomiaViva - Seção Sistema Cardiovascular > Coração")
  * Se usou artigos científicos, forneça títulos REAIS de artigos do PubMed/NCBI com autores e ano
  * Se usou livros, cite o livro específico com edição e páginas quando possível
  * Sempre inclua URLs quando disponíveis (ex: links PubMed, DOI de artigos)

- Formato das referências quando solicitadas:
  
  **Referências:**
  1. [Título exato do artigo]. [Autores]. [Journal]. [Ano]. [DOI ou URL do PubMed se disponível]
  2. [Nome do livro específico]. [Edição]. [Autores]. [Editora, Ano].
  3. AnatomiaViva - [Seção específica do site de onde tirou a informação]
  
- Exemplo de referências CORRETAS (específicas e reais):
  **Referências:**
  1. Anatomy and Function of the Coronary Arteries. Moore KL, et al. StatPearls [Internet]. 2024. https://www.ncbi.nlm.nih.gov/books/NBK534800/
  2. Gray's Anatomy: The Anatomical Basis of Clinical Practice. 42nd Edition. Standring S. Elsevier, 2020. Páginas 967-985.
  3. AnatomiaViva - Sistema Cardiovascular > Anatomia do Coração

FORMATAÇÃO DA RESPOSTA (OBRIGATÓRIO):
- Use **markdown** para formatar todas as respostas
- Use **negrito** para termos anatômicos importantes (exemplo: **coração**, **ventrículo esquerdo**)
- Use títulos (##) para organizar seções de respostas longas
- Use listas com marcadores (-) ou numeradas (1.) para enumerar pontos
- Use parágrafos curtos e bem espaçados para facilitar a leitura
- Mantenha URLs curtos quando possível, mas SEMPRE quebre URLs longos para não ultrapassar o espaço disponível
- Estruture respostas complexas em seções claras: Definição, Localização, Função, Características, etc.
- Exemplo de estrutura:
  ## Conceito Principal
  Explicação breve...
  
  **Características Principais:**
  - Primeira característica
  - Segunda característica
  
  **Função:**
  Descrição da função...

CONTEXTO DO SITE ANATOMIAVIVA:
${context}

Lembre-se: Você pode e deve complementar com seu conhecimento científico de anatomia quando o contexto acima for insuficiente. Mas NUNCA inclua referências a menos que seja explicitamente solicitado.`;

    const response = await retryWithBackoff(async () => {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        },
        contents: [
          {
            role: "user",
            parts: [{ text: question }]
          }
        ],
      });
      
      if (!result.text || result.text.trim().length === 0) {
        throw new Error("Resposta vazia recebida da IA");
      }
      
      return result;
    }, 3, 1000);

    return response.text || "Desculpe, não consegui processar sua pergunta. Tente novamente.";
  } catch (error) {
    console.error("Erro ao processar pergunta após tentativas:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    throw new Error(`Erro ao processar a pergunta: ${errorMessage}`);
  }
}
