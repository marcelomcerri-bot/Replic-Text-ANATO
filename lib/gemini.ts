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
1. Responda APENAS com base no contexto fornecido do site AnatomiaViva
2. Se o contexto não contém informações suficientes, responda: "Não encontrei essa informação específica no conteúdo atual do site. Você pode reformular sua pergunta ou consultar as referências científicas disponíveis na página de referências."
3. Use linguagem técnica mas acessível para estudantes
4. Seja preciso e educativo
5. Cite conceitos anatômicos corretamente
6. Forneça respostas claras e bem estruturadas

CONTEXTO DO SITE:
${context}`;

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
