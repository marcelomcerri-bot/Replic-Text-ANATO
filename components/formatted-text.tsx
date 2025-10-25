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
              <div key={lineIdx} className="flex gap-3 ml-2 py-1.5">
                <span className="text-accent font-bold text-lg mt-0.5 flex-shrink-0">•</span>
                <div className="flex-1 leading-7 text-base">
                  {formatInlineText(content)}
                </div>
              </div>
            )
          } else {
            // Parágrafo normal
            return (
              <p key={lineIdx} className="leading-7 text-base mb-3">
                {formatInlineText(trimmedLine)}
              </p>
            )
          }
        })}
      </div>
    )
  }

  // Para texto sem bullets, divide por "**Título:**" APENAS para destacar visualmente
  const segments = text.split(/(\*\*[^*]+:\*\*)/).filter(Boolean)
  
  if (segments.length > 1) {
    // Texto com seções em negrito - renderiza TODO o conteúdo
    return (
      <div className="space-y-4">
        {segments.map((segment, idx) => {
          if (segment.match(/^\*\*[^*]+:\*\*$/)) {
            // Título em negrito
            return (
              <div key={idx} className="font-bold text-foreground mt-5 first:mt-0 text-base bg-accent/10 px-4 py-2.5 rounded-md border-l-4 border-accent">
                {formatInlineText(segment)}
              </div>
            )
          } else {
            const trimmedSegment = segment.trim()
            if (!trimmedSegment) return null
            
            // Renderiza TODO o conteúdo sem dividir
            return (
              <div key={idx} className="ml-6 leading-7 text-base text-muted-foreground">
                {formatInlineText(trimmedSegment)}
              </div>
            )
          }
        })}
      </div>
    )
  }

  // Texto simples - renderiza TUDO sem modificar
  return <div className="leading-7 text-base mb-3">{formatInlineText(text)}</div>
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
