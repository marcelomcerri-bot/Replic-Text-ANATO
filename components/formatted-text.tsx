"use client"

export function FormattedText({ text }: { text: string }) {
  // Detecta se o texto contém bullet points (•)
  const hasBullets = text.includes("•")
  
  if (hasBullets) {
    // Processa texto com listas
    const lines = text.split("\n")
    return (
      <div className="space-y-3">
        {lines.map((line, lineIdx) => {
          const trimmedLine = line.trim()
          if (!trimmedLine) return null
          
          if (trimmedLine.startsWith("•")) {
            // Item de lista
            const content = trimmedLine.substring(1).trim()
            return (
              <div key={lineIdx} className="flex gap-3 ml-4 mb-2">
                <span className="text-accent font-bold mt-1 flex-shrink-0">•</span>
                <span className="flex-1 leading-7">
                  {formatInlineText(content)}
                </span>
              </div>
            )
          } else {
            // Parágrafo normal
            return (
              <p key={lineIdx} className="leading-7">
                {formatInlineText(trimmedLine)}
              </p>
            )
          }
        })}
      </div>
    )
  }

  // Para texto sem bullets, divide por "**Título:**" para melhor legibilidade
  const segments = text.split(/(\*\*[^*]+:\*\*)/).filter(Boolean)
  
  if (segments.length > 1) {
    // Texto com seções em negrito - renderiza com quebras
    return (
      <div className="space-y-4">
        {segments.map((segment, idx) => {
          if (segment.match(/^\*\*[^*]+:\*\*$/)) {
            // Título em negrito
            return (
              <div key={idx} className="font-bold text-foreground mt-5 first:mt-0 text-base">
                {formatInlineText(segment)}
              </div>
            )
          } else {
            const trimmedSegment = segment.trim()
            if (!trimmedSegment) return null
            
            // Conteúdo - divide em sentenças para melhor legibilidade
            const sentences = trimmedSegment.match(/[^.!?]+[.!?]+/g) || [trimmedSegment]
            
            return (
              <div key={idx} className="ml-4">
                {sentences.map((sentence, sIdx) => (
                  <p key={sIdx} className="leading-7 text-muted-foreground mb-3">
                    {formatInlineText(sentence.trim())}
                  </p>
                ))}
              </div>
            )
          }
        })}
      </div>
    )
  }

  // Texto simples - quebra em sentenças
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  if (sentences.length > 2) {
    return (
      <div className="space-y-3">
        {sentences.map((sentence, idx) => (
          <p key={idx} className="leading-7">
            {formatInlineText(sentence.trim())}
          </p>
        ))}
      </div>
    )
  }
  
  return <p className="leading-7">{formatInlineText(text)}</p>
}

// Função auxiliar para formatar texto inline (negrito)
function formatInlineText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/)

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const boldText = part.slice(2, -2)
          return (
            <strong key={idx} className="font-semibold text-foreground">
              {boldText}
            </strong>
          )
        }
        return <span key={idx}>{part}</span>
      })}
    </>
  )
}
