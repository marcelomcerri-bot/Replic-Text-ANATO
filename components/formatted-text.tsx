"use client"

export function FormattedText({ text }: { text: string }) {
  // Detecta se o texto contém bullet points (•)
  const hasBullets = text.includes("•")
  
  if (hasBullets) {
    // Processa texto com listas
    const lines = text.split("\n")
    return (
      <div className="space-y-2">
        {lines.map((line, lineIdx) => {
          const trimmedLine = line.trim()
          if (!trimmedLine) return null
          
          if (trimmedLine.startsWith("•")) {
            // Item de lista
            const content = trimmedLine.substring(1).trim()
            return (
              <div key={lineIdx} className="flex gap-3 ml-4">
                <span className="text-accent font-bold mt-1 flex-shrink-0">•</span>
                <span className="flex-1 leading-relaxed">
                  {formatInlineText(content)}
                </span>
              </div>
            )
          } else {
            // Parágrafo normal
            return (
              <p key={lineIdx} className="leading-relaxed">
                {formatInlineText(trimmedLine)}
              </p>
            )
          }
        })}
      </div>
    )
  }

  // Para texto sem bullets, divide por "**Título:**" para melhor legibilidade
  const segments = text.split(/(\*\*[^:]+:\*\*)/).filter(Boolean)
  
  if (segments.length > 3) {
    // Texto com múltiplas seções em negrito - renderiza com quebras
    return (
      <div className="space-y-3">
        {segments.map((segment, idx) => {
          if (segment.match(/^\*\*[^:]+:\*\*$/)) {
            // Título em negrito
            return (
              <div key={idx} className="font-semibold text-foreground mt-4 first:mt-0">
                {formatInlineText(segment)}
              </div>
            )
          } else {
            // Conteúdo
            return (
              <div key={idx} className="leading-relaxed ml-4 text-muted-foreground">
                {formatInlineText(segment.trim())}
              </div>
            )
          }
        })}
      </div>
    )
  }

  // Texto simples
  return <p className="leading-relaxed">{formatInlineText(text)}</p>
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
