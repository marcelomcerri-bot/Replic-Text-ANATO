import { NextRequest, NextResponse } from "next/server";
import { askAnatomyQuestion } from "@/lib/gemini";
import { topicsData } from "@/lib/topics-data";
import { praticaTopicsData } from "@/lib/pratica-topics-data";
import { glossaryByCategory } from "@/lib/glossary-data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { question, history } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Pergunta inválida" },
        { status: 400 }
      );
    }

    const context = buildSiteContext();
    const messageHistory: Message[] = Array.isArray(history) ? history : [];
    const answer = await askAnatomyQuestion(question, context, messageHistory);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Erro na API de chat:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Erro ao processar a pergunta";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

function buildSiteContext(): string {
  let context = "=== CONTEÚDO DO SITE ANATOMIAVIVA ===\n\n";

  context += "## TÓPICOS DE ANATOMIA TEÓRICA:\n\n";
  Object.entries(topicsData).forEach(([key, topic]) => {
    context += `### ${topic.title}\n`;
    context += `${topic.description}\n\n`;
    
    topic.content.sections.forEach((section) => {
      context += `#### ${section.title}\n`;
      context += section.content.join("\n") + "\n\n";
      
      if (section.subsections) {
        section.subsections.forEach((subsection) => {
          context += `##### ${subsection.title}\n`;
          const content = Array.isArray(subsection.content) 
            ? subsection.content.join("\n") 
            : subsection.content;
          context += content + "\n\n";
        });
      }
    });

    if (topic.summary && topic.summary.length > 0) {
      context += "**Resumo:**\n";
      topic.summary.forEach((item) => {
        context += `- ${item.concept}: ${item.definition}\n`;
      });
      context += "\n";
    }
  });

  context += "\n## TÓPICOS DE ANATOMIA PRÁTICA:\n\n";
  Object.entries(praticaTopicsData).forEach(([key, topic]) => {
    context += `### ${topic.title}\n`;
    context += `${topic.description}\n\n`;
    
    topic.content.sections.forEach((section) => {
      context += `#### ${section.title}\n`;
      section.content.forEach((paragraph) => {
        context += paragraph + "\n";
      });
      context += "\n";
    });
  });

  context += "\n## GLOSSÁRIO DE TERMOS ANATÔMICOS:\n\n";
  glossaryByCategory.forEach((category) => {
    context += `### ${category.category}\n`;
    category.terms.forEach((term) => {
      context += `- **${term.term}**: ${term.definition}\n`;
    });
    context += "\n";
  });

  return context.substring(0, 100000);
}
