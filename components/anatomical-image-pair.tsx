"use client"

import Image from "next/image"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ZoomIn } from "lucide-react"

export interface ImagePairData {
  grayImage: {
    src: string
    alt: string
    legend: string
    credit: string
  }
  modernImage: {
    src: string
    alt: string
    legend: string
    credit: string
  }
  subtopic: string
}

interface AnatomicalImagePairProps {
  imagePair: ImagePairData
  className?: string
}

export function AnatomicalImagePair({ imagePair, className = "" }: AnatomicalImagePairProps) {
  const [zoomedImage, setZoomedImage] = useState<{
    src: string
    alt: string
    legend: string
    credit: string
  } | null>(null)

  const handleImageClick = (imageData: { src: string; alt: string; legend: string; credit: string }) => {
    setZoomedImage(imageData)
  }

  return (
    <>
      <figure className={`anatomia-image-pair my-8 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gray's Anatomy Image */}
          <div className="anatomia-image-container group relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-muted bg-muted/20 hover:border-primary/50 transition-all cursor-pointer">
              <Image
                src={imagePair.grayImage.src}
                alt={imagePair.grayImage.alt}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onClick={() => handleImageClick(imagePair.grayImage)}
              />
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                Gray's Anatomy
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div className="bg-white/90 p-2 rounded-full">
                  <ZoomIn className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                {imagePair.grayImage.legend}
              </p>
              <p className="text-xs italic">{imagePair.grayImage.credit}</p>
            </figcaption>
          </div>

          {/* Modern Diagram Image */}
          <div className="anatomia-image-container group relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-muted bg-muted/20 hover:border-primary/50 transition-all cursor-pointer">
              <Image
                src={imagePair.modernImage.src}
                alt={imagePair.modernImage.alt}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onClick={() => handleImageClick(imagePair.modernImage)}
              />
              <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                Diagrama Moderno
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <div className="bg-white/90 p-2 rounded-full">
                  <ZoomIn className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                {imagePair.modernImage.legend}
              </p>
              <p className="text-xs italic">{imagePair.modernImage.credit}</p>
            </figcaption>
          </div>
        </div>

        {imagePair.subtopic && (
          <>
            <hr className="my-4 border-t border-muted" />
            <div className="text-center">
              <p className="text-sm font-semibold text-primary">
                {imagePair.subtopic}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Comparação entre ilustração histórica (Gray's Anatomy, 1918) e diagrama didático moderno
              </p>
            </div>
          </>
        )}
      </figure>

      {/* Zoom Dialog */}
      <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {zoomedImage && (
            <div className="space-y-4">
              <div className="relative w-full" style={{ minHeight: "400px" }}>
                <Image
                  src={zoomedImage.src}
                  alt={zoomedImage.alt}
                  width={1200}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">{zoomedImage.legend}</p>
                <p className="text-sm text-muted-foreground italic">{zoomedImage.credit}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

// Component for rendering multiple image pairs in sequence
interface AnatomicalImagePairsProps {
  imagePairs: ImagePairData[]
  title?: string
  className?: string
}

export function AnatomicalImagePairs({ imagePairs, title, className = "" }: AnatomicalImagePairsProps) {
  return (
    <div className={`anatomia-image-pairs-container ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-6 text-primary border-l-4 border-primary pl-4">
          {title}
        </h3>
      )}
      <div className="space-y-12">
        {imagePairs.map((pair, index) => (
          <AnatomicalImagePair key={index} imagePair={pair} />
        ))}
      </div>
    </div>
  )
}
