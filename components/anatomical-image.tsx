"use client"

import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

interface AnatomicalImageProps {
  src: string
  alt?: string
  legend?: string
  credit?: string
  className?: string
}

export function AnatomicalImage({ 
  src, 
  alt = "Ilustração anatômica", 
  legend,
  credit = "Gray's Anatomy (1918) - Domínio Público",
  className = ""
}: AnatomicalImageProps) {
  return (
    <div className={`bg-white dark:bg-card p-4 rounded-xl shadow-md border border-accent/20 hover:shadow-xl transition-all duration-300 ${className}`}>
      <Zoom>
        <img
          src={src}
          alt={alt}
          className="w-full h-auto rounded-lg object-cover cursor-zoom-in transition-transform hover:scale-[1.02]"
          loading="lazy"
        />
      </Zoom>
      
      {legend && (
        <p className="text-sm text-muted-foreground mt-3 italic leading-relaxed">
          {legend}
        </p>
      )}
      
      <div className="mt-2 pt-2 border-t border-accent/10">
        <p className="text-xs text-muted-foreground">
          <strong className="text-accent">Fonte:</strong> {credit}
        </p>
      </div>
    </div>
  )
}

interface AnatomicalImageGridProps {
  images: (string | { src: string; legend?: string; credit?: string; alt?: string })[]
  sectionTitle?: string
  columns?: 1 | 2 | 3
}

export function AnatomicalImageGrid({ 
  images, 
  sectionTitle,
  columns = 2
}: AnatomicalImageGridProps) {
  if (!images || images.length === 0) return null

  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  }[columns]

  return (
    <div className="my-8 space-y-4">
      {sectionTitle && (
        <h5 className="text-lg font-semibold text-accent/90 mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-accent rounded-full"></span>
          Imagens Anatômicas
        </h5>
      )}
      
      <div className={`grid ${gridClass} gap-6`}>
        {images.map((image, index) => {
          if (typeof image === 'string') {
            return (
              <AnatomicalImage
                key={index}
                src={image}
                alt={sectionTitle ? `${sectionTitle} - Imagem ${index + 1}` : undefined}
              />
            )
          } else {
            return (
              <AnatomicalImage
                key={index}
                src={image.src}
                legend={image.legend}
                credit={image.credit}
                alt={image.alt || (sectionTitle ? `${sectionTitle} - Imagem ${index + 1}` : undefined)}
              />
            )
          }
        })}
      </div>
    </div>
  )
}
