"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { ArrowLeft, BookOpen, CheckCircle2, XCircle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FormattedText } from "@/components/formatted-text"
import type { TopicContent } from "@/lib/topics-data"

export function TopicClient({ topic }: { topic: TopicContent }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState<Record<number, boolean>>({})

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const handleCheckAnswer = (questionIndex: number) => {
    setShowResults((prev) => ({
      ...prev,
      [questionIndex]: true,
    }))
  }

  const handleResetQuestion = (questionIndex: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev }
      delete newAnswers[questionIndex]
      return newAnswers
    })
    setShowResults((prev) => {
      const newResults = { ...prev }
      delete newResults[questionIndex]
      return newResults
    })
  }

  const sections = topic?.content?.sections || []
  const summary = topic?.summary || []
  const questions = topic?.questions || []

  return (
    <div className="min-h-screen topic-page-bg">
      <SiteHeader />

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-4xl">
        <Link href="/topicos">
          <Button variant="ghost" className="mb-4 gap-2 hover:gap-3 smooth-transition text-sm">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Tópicos
          </Button>
        </Link>

        <article className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Hero Section */}
          <header className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-semibold tracking-wide">
              <BookOpen className="h-3.5 w-3.5" />
              Conteúdo Educacional
            </div>
            <h1 className="text-foreground">{topic.title}</h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{topic.description}</p>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </header>

          {/* Main Content Sections */}
          {sections.length > 0 && (
            <div className="space-y-6 sm:space-y-8">
              {sections.map((section, idx) => (
                <section key={idx} className="space-y-4 sm:space-y-5">
                  <Card className="border-2 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl smooth-transition">
                    <CardHeader className="space-y-2 pb-4 sm:pb-5">
                      <h2 className="text-foreground">{section.title}</h2>
                      <div className="h-1 w-16 bg-gradient-to-r from-accent to-primary rounded-full" />
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-5">
                      {section.content?.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-foreground/90 leading-relaxed">
                          <FormattedText text={paragraph} />
                        </p>
                      ))}
                      {section.subsections?.map((subsection, sIdx) => (
                        <div
                          key={sIdx}
                          className="mt-5 sm:mt-6 pl-4 sm:pl-5 border-l-4 border-accent/30 space-y-3 sm:space-y-4"
                        >
                          <h3 className="text-accent font-bold">{subsection.title}</h3>
                          <div className="space-y-3 sm:space-y-4">
                            {Array.isArray(subsection.content) ? (
                              subsection.content.map((subParagraph, spIdx) => (
                                <p key={spIdx} className="text-foreground/90 leading-relaxed">
                                  <FormattedText text={subParagraph} />
                                </p>
                              ))
                            ) : (
                              <p className="text-foreground/90 leading-relaxed">
                                <FormattedText text={subsection.content} />
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </section>
              ))}
            </div>
          )}

          {/* Summary Section */}
          {summary.length > 0 && (
            <section className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <h2 className="text-foreground">Resumo e Conceitos-Chave</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-accent to-primary rounded-full" />
              </div>
              <Card className="border-2 border-accent/30 bg-card/50 backdrop-blur-sm shadow-lg">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-border bg-muted/30">
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-bold text-xs sm:text-sm tracking-wide text-foreground">
                            Conceito
                          </th>
                          <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-bold text-xs sm:text-sm tracking-wide text-foreground">
                            Definição
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {summary.map((item, idx) => {
                          if (typeof item === "string") {
                            return (
                              <tr
                                key={idx}
                                className="border-b border-border/50 last:border-0 hover:bg-accent/5 smooth-transition"
                              >
                                <td
                                  className="py-3 sm:py-4 px-3 sm:px-4 leading-relaxed align-top text-sm sm:text-base"
                                  colSpan={2}
                                >
                                  {item}
                                </td>
                              </tr>
                            )
                          }
                          return (
                            <tr
                              key={idx}
                              className="border-b border-border/50 last:border-0 hover:bg-accent/5 smooth-transition"
                            >
                              <td className="py-3 sm:py-4 px-3 sm:px-4 font-semibold align-top text-foreground text-sm sm:text-base">
                                {item.concept}
                              </td>
                              <td className="py-3 sm:py-4 px-3 sm:px-4 leading-relaxed text-foreground/90 text-sm sm:text-base">
                                {item.definition}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Questions Section */}
          {questions.length > 0 && (
            <section className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <h2 className="text-foreground">Questões de Fixação</h2>
                <div className="h-1 w-16 bg-gradient-to-r from-accent to-primary rounded-full" />
              </div>
              <div className="space-y-5 sm:space-y-6">
                {questions.map((q, idx) => {
                  if (!q.options || !Array.isArray(q.options)) {
                    return null
                  }

                  const isAnswered = showResults[idx]
                  const selectedAnswer = selectedAnswers[idx]
                  const isCorrect = selectedAnswer === q.correctAnswer

                  return (
                    <Card key={idx} className="border-2 bg-card/50 backdrop-blur-sm shadow-lg">
                      <CardHeader className="space-y-2 pb-4">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold tracking-wide w-fit">
                          Questão {idx + 1}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 sm:space-y-5">
                        <p className="text-base sm:text-lg leading-relaxed font-semibold text-foreground">
                          {q.question}
                        </p>

                        <RadioGroup
                          value={selectedAnswer?.toString()}
                          onValueChange={(value) => handleAnswerSelect(idx, Number.parseInt(value))}
                          disabled={isAnswered}
                        >
                          <div className="space-y-2.5 sm:space-y-3">
                            {q.options.map((option, optIdx) => {
                              const isThisCorrect = optIdx === q.correctAnswer
                              const isThisSelected = selectedAnswer === optIdx

                              return (
                                <div
                                  key={optIdx}
                                  className={`flex items-start gap-3 p-3 sm:p-4 rounded-lg border-2 smooth-transition ${
                                    isAnswered
                                      ? isThisCorrect
                                        ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                                        : isThisSelected
                                          ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                                          : "border-border/50"
                                      : isThisSelected
                                        ? "border-accent bg-accent/10 shadow-md"
                                        : "border-border hover:border-accent/50 hover:bg-accent/5 cursor-pointer"
                                  }`}
                                >
                                  <RadioGroupItem
                                    value={optIdx.toString()}
                                    id={`q${idx}-opt${optIdx}`}
                                    className="mt-0.5 flex-shrink-0"
                                  />
                                  <Label
                                    htmlFor={`q${idx}-opt${optIdx}`}
                                    className="flex-1 cursor-pointer leading-relaxed text-foreground/90 text-sm sm:text-base"
                                  >
                                    {option}
                                  </Label>
                                  {isAnswered && isThisCorrect && (
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  )}
                                  {isAnswered && isThisSelected && !isThisCorrect && (
                                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </RadioGroup>

                        {!isAnswered && selectedAnswer !== undefined && (
                          <Button
                            onClick={() => handleCheckAnswer(idx)}
                            size="lg"
                            className="w-full text-sm sm:text-base py-5"
                          >
                            Verificar Resposta
                          </Button>
                        )}

                        {isAnswered && (
                          <div className="space-y-3 sm:space-y-4">
                            <div
                              className={`rounded-lg p-4 border-l-4 ${
                                isCorrect
                                  ? "bg-green-50 dark:bg-green-950/30 border-green-500"
                                  : "bg-red-50 dark:bg-red-950/30 border-red-500"
                              }`}
                            >
                              <p className="font-bold text-sm sm:text-base flex items-center gap-2.5">
                                {isCorrect ? (
                                  <>
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    <span className="text-green-700 dark:text-green-400">Resposta Correta!</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                                    <span className="text-red-700 dark:text-red-400">Resposta Incorreta</span>
                                  </>
                                )}
                              </p>
                            </div>

                            {q.explanation && (
                              <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-accent space-y-2">
                                <p className="font-bold text-accent tracking-wide text-xs sm:text-sm">EXPLICAÇÃO:</p>
                                <p className="leading-relaxed text-foreground/90 text-sm sm:text-base">
                                  {q.explanation}
                                </p>
                              </div>
                            )}

                            <Button
                              onClick={() => handleResetQuestion(idx)}
                              variant="outline"
                              size="lg"
                              className="w-full text-sm sm:text-base py-5"
                            >
                              Tentar Novamente
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          )}

          {/* Navigation Footer */}
          <div className="flex justify-center pt-6 sm:pt-8">
            <Link href="/topicos">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 hover:gap-3 bg-card/80 backdrop-blur-sm px-6 py-5 text-sm sm:text-base smooth-transition shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para Todos os Tópicos
              </Button>
            </Link>
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 backdrop-blur-sm mt-10 sm:mt-12">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
            © 2025 Marcelo Marques Cerri. Material educacional para estudantes de enfermagem.
          </p>
        </div>
      </footer>
    </div>
  )
}
