"use client"

export function FormattedText({ text }: { text: string }) {
  // Convert **text** to <strong>text</strong>
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
