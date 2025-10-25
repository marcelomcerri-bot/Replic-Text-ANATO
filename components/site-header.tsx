"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Menu } from "lucide-react"
import { useState } from "react"
import { SearchDialog } from "@/components/search-dialog"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-accent transition-colors">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-md">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              AnatomiaViva
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent/10 hover:text-accent transition-all"
            >
              Início
            </Link>
            <Link
              href="/topicos"
              className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent/10 hover:text-accent transition-all"
            >
              Tópicos
            </Link>
            <Link
              href="/glossario"
              className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent/10 hover:text-accent transition-all"
            >
              Glossário
            </Link>
            <Link
              href="/referencias"
              className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-accent/10 hover:text-accent transition-all"
            >
              Referências
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 ml-2 hover:bg-accent/10 hover:text-accent"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Buscar</span>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-accent/10 hover:text-accent"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-accent/10 hover:text-accent">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[320px] mobile-sidebar-gradient backdrop-blur-xl border-l border-accent/20"
              >
                <SheetHeader className="border-b border-accent/20 pb-4 mb-2">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-md">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-bold">
                      AnatomiaViva
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-6">
                  <Link
                    href="/"
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-lg border border-accent/20 bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Início
                  </Link>
                  <Link
                    href="/topicos"
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-lg border border-accent/20 bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tópicos
                  </Link>
                  <Link
                    href="/glossario"
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-lg border border-accent/20 bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Glossário
                  </Link>
                  <Link
                    href="/referencias"
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-lg border border-accent/20 bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Referências
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
