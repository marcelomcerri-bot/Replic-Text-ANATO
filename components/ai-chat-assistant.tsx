"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Sparkles, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou Vesalius, o assistente de anatomia do AnatomiaViva. Como posso ajudá-lo com seus estudos hoje?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue("")
    const newMessages = [...messages, { role: "user" as const, content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question: userMessage,
          history: messages
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao processar a pergunta")
      }

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-14 w-14 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-white z-50"
        aria-label="Abrir assistente de IA"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className={cn(
      "fixed z-50 shadow-2xl flex flex-col overflow-hidden p-0 transition-all duration-300 bg-background",
      isExpanded 
        ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(1400px,96vw)] h-[min(850px,92vh)]"
        : "left-1/2 bottom-4 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 w-[min(420px,calc(100vw-2rem))] h-[min(600px,calc(100vh-2rem))] sm:h-[550px]"
    )}>
      <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-accent to-accent/90 text-white shadow-md">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <h3 className="font-semibold text-base">Vesalius - Assistente de Anatomia IA</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex h-9 w-9 hover:bg-white/20 text-white transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? "Minimizar chat" : "Expandir chat"}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-white/20 text-white transition-colors"
            onClick={() => {
              setIsOpen(false)
              setIsExpanded(false)
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div 
        className={cn(
          "flex-1 overflow-y-auto bg-gradient-to-b from-muted/20 to-background",
          isExpanded ? "p-8" : "p-4"
        )} 
        ref={scrollRef}
      >
        <div className={cn(
          "mx-auto space-y-5",
          isExpanded ? "max-w-[90%]" : "w-full"
        )}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex w-full",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl shadow-md border transition-all",
                  isExpanded 
                    ? message.role === "user" ? "max-w-[65%] px-6 py-4" : "w-full px-8 py-6"
                    : "max-w-[88%] px-4 py-3.5",
                  message.role === "user"
                    ? "bg-gradient-to-br from-accent to-accent/90 text-white border-accent/50 shadow-accent/20"
                    : "bg-card text-card-foreground border-border/40 shadow-sm"
                )}
              >
                {message.role === "user" ? (
                  <p className={cn(
                    "whitespace-pre-wrap leading-relaxed text-justify",
                    isExpanded ? "text-base" : "text-sm"
                  )}>{message.content}</p>
                ) : (
                  <div className={cn(
                    "ai-chat-message overflow-hidden break-words prose max-w-none text-justify",
                    isExpanded ? "prose-lg" : "prose-sm",
                    "prose-headings:font-bold prose-headings:text-foreground",
                    "prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2",
                    "prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-3",
                    "prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4 prose-p:text-justify",
                    "prose-strong:text-accent prose-strong:font-bold",
                    "prose-ul:my-4 prose-ul:space-y-2 prose-ol:my-4 prose-ol:space-y-2",
                    "prose-li:my-1.5 prose-li:text-foreground prose-li:leading-relaxed prose-li:text-justify",
                    "prose-code:text-accent prose-code:bg-muted prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-semibold",
                    "prose-blockquote:border-accent prose-blockquote:bg-muted/50 prose-blockquote:italic",
                    "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
                    "[&_p]:text-justify [&_li]:text-justify"
                  )}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted/80 rounded-xl px-5 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2.5 h-2.5 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2.5 h-2.5 bg-accent/70 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={cn(
        "border-t bg-card/50",
        isExpanded ? "p-6" : "p-4"
      )}>
        <div className={cn(
          "mx-auto",
          isExpanded ? "max-w-4xl" : "w-full"
        )}>
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Faça uma pergunta detalhada sobre anatomia..."
              disabled={isLoading}
              className={cn(
                "flex-1 border-2 focus-visible:ring-accent transition-all",
                isExpanded && "text-base py-6"
              )}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              size="icon"
              className={cn(
                "bg-gradient-to-br from-accent to-accent/90 hover:from-accent/90 hover:to-accent shadow-md hover:shadow-lg transition-all",
                isExpanded ? "h-auto w-14" : "h-10 w-10"
              )}
            >
              <Send className={cn(isExpanded ? "h-5 w-5" : "h-4 w-4")} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center font-medium">
            🔬 Respostas baseadas em fontes científicas (NCBI, artigos) e conteúdo do site
          </p>
        </div>
      </div>
    </Card>
  )
}
