import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askAnatomyQuestion(
  question: string,
  context: string
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY não está configurada");
  }

  try {
    const systemInstruction = `Você é um assistente educacional especializado em anatomia humana para estudantes de enfermagem brasileiros.

REGRAS IMPORTANTES:
1. PRIMEIRO, tente responder com base no contexto fornecido do site AnatomiaViva abaixo
2. Se o contexto do site não contiver informações suficientes ou completas, use seu conhecimento de anatomia baseado em fontes científicas confiáveis, especialmente da National Library of Medicine (NCBI), StatPearls, e literaturas de anatomia
3. Forneça respostas técnicas mas acessíveis para estudantes de enfermagem
4. Seja preciso, educativo e completo nas explicações
5. Cite conceitos anatômicos corretamente usando terminologia anatômica adequada
6. Estruture respostas de forma clara com explicações bem fundamentadas
7. Quando usar conhecimento além do site, formule explicações técnicas e bem elaboradas baseadas em evidências científicas
8. Inclua detalhes anatômicos relevantes como localização, função, relações anatômicas, vascularização e inervação quando apropriado

CONTEXTO DO SITE ANATOMIAVIVA:
${context}

Lembre-se: Você pode e deve complementar com seu conhecimento científico de anatomia quando o contexto acima for insuficiente.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
      },
      contents: question,
    });

    return response.text || "Desculpe, não consegui processar sua pergunta. Tente novamente.";
  } catch (error) {
    console.error("Erro ao processar pergunta:", error);
    throw new Error("Erro ao processar a pergunta. Tente novamente.");
  }
}
