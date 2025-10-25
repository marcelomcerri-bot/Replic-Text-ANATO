"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import { FormattedText } from "@/components/formatted-text"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import type { PraticaTopicContent } from "@/lib/pratica-topics-data"

interface PraticaTopicClientProps {
  topic: PraticaTopicContent
}

export function PraticaTopicClient({ topic }: PraticaTopicClientProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({})

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }))
  }

  const handleCheckAnswer = (questionIndex: number) => {
    setShowExplanations((prev) => ({
      ...prev,
      [questionIndex]: true,
    }))
  }

  const isCorrect = (questionIndex: number) => {
    return selectedAnswers[questionIndex] === topic.questions[questionIndex].correctAnswer
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <Link href="/topicos">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Tópicos
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{topic.title}</h1>
          <p className="text-lg text-muted-foreground">{topic.description}</p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-accent">Conteúdo</h2>
            <div className="space-y-8">
              {topic.content.sections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-semibold text-accent">{section.title}</h3>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <FormattedText key={pIndex} text={paragraph} />
                    ))}
                  </div>

                  {section.subsections && (
                    <div className="ml-6 space-y-6 mt-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="space-y-3 pl-4 border-l-4 border-accent/30">
                          <h4 className="text-lg font-semibold text-foreground">{subsection.title}</h4>
                          <div className="space-y-3">
                            {Array.isArray(subsection.content) ? (
                              subsection.content.map((paragraph, pIndex) => (
                                <FormattedText key={pIndex} text={paragraph} />
                              ))
                            ) : (
                              <FormattedText text={subsection.content} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-accent">Resumo</h2>
            <div className="grid gap-4">
              {topic.summary.map((item, index) => (
                <Card key={index} className="bg-accent/5 border-l-4 border-l-accent">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{item.concept}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.definition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-accent">Questões Comentadas</h2>
            <div className="space-y-6">
              {topic.questions.map((question, questionIndex) => (
                <Card key={questionIndex} className="border-2">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Questão {questionIndex + 1}
                    </CardTitle>
                    <CardDescription className="text-base text-foreground mt-2">
                      {question.question}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={selectedAnswers[questionIndex]?.toString()}
                      onValueChange={(value) => handleAnswerSelect(questionIndex, parseInt(value))}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={optionIndex.toString()} id={`q${questionIndex}-${optionIndex}`} />
                          <Label
                            htmlFor={`q${questionIndex}-${optionIndex}`}
                            className="text-sm font-normal cursor-pointer flex-1"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {!showExplanations[questionIndex] ? (
                      <Button
                        onClick={() => handleCheckAnswer(questionIndex)}
                        disabled={selectedAnswers[questionIndex] === undefined}
                        className="mt-4"
                      >
                        Verificar Resposta
                      </Button>
                    ) : (
                      <div className="mt-4 space-y-3">
                        <div
                          className={`p-4 rounded-lg flex items-start gap-3 ${
                            isCorrect(questionIndex)
                              ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900"
                              : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
                          }`}
                        >
                          {isCorrect(questionIndex) ? (
                            <>
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-green-900 dark:text-green-100">Correto!</p>
                                <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                                  Resposta correta: {question.options[question.correctAnswer]}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-red-900 dark:text-red-100">Incorreto</p>
                                <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                                  Resposta correta: {question.options[question.correctAnswer]}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Explicação:</p>
                          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
