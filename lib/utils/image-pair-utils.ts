import type { AnatomicalImage } from "../pratica-topics-data"
import type { ImagePairData } from "@/components/anatomical-image-pair"

/**
 * Organizes anatomical images into pairs (historical + modern)
 * Based on the type field in AnatomicalImage
 */
export function organizeImagePairs(
  images: (string | AnatomicalImage)[] | undefined,
  subtopic: string
): ImagePairData[] {
  if (!images || images.length === 0) {
    return []
  }

  const pairs: ImagePairData[] = []
  const historicalImages: AnatomicalImage[] = []
  const modernImages: AnatomicalImage[] = []

  // Separate images by type
  for (const img of images) {
    // Skip string images (old format)
    if (typeof img === "string") continue

    const anatomicalImg = img as AnatomicalImage

    // Determine type based on existing type field or credit/legend text
    const isHistorical =
      (anatomicalImg as any).type === "historical" ||
      anatomicalImg.credit?.toLowerCase().includes("gray") ||
      anatomicalImg.legend?.toLowerCase().includes("gray")

    if (isHistorical) {
      historicalImages.push(anatomicalImg)
    } else {
      modernImages.push(anatomicalImg)
    }
  }

  // Create pairs
  const maxPairs = Math.max(historicalImages.length, modernImages.length)

  for (let i = 0; i < maxPairs; i++) {
    const historical = historicalImages[i] || modernImages[0] // Fallback to modern if no historical
    const modern = modernImages[i] || modernImages[0] || historicalImages[0] // Fallback logic

    if (historical && modern) {
      pairs.push({
        subtopic,
        grayImage: {
          src: historical.src,
          alt: historical.alt || `Gray's Anatomy - ${subtopic}`,
          legend: historical.legend || `Ilustração histórica - ${subtopic}`,
          credit: historical.credit || "Gray's Anatomy (1918) - Domínio Público",
        },
        modernImage: {
          src: modern.src,
          alt: modern.alt || `Diagrama moderno - ${subtopic}`,
          legend: modern.legend || `Diagrama didático - ${subtopic}`,
          credit: modern.credit || "Diagrama anatômico moderno",
        },
      })
    }
  }

  return pairs
}

/**
 * Validates if an image pair is complete and valid
 */
export function validateImagePair(pair: ImagePairData): {
  valid: boolean
  issues: string[]
} {
  const issues: string[] = []

  if (!pair.grayImage.src || pair.grayImage.src.length === 0) {
    issues.push("Missing Gray's Anatomy image source")
  }

  if (!pair.modernImage.src || pair.modernImage.src.length === 0) {
    issues.push("Missing modern diagram image source")
  }

  if (!pair.grayImage.alt) {
    issues.push("Missing Gray's Anatomy image alt text")
  }

  if (!pair.modernImage.alt) {
    issues.push("Missing modern diagram alt text")
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}

/**
 * Gets placeholder image pair for missing/invalid images
 */
export function getPlaceholderImagePair(subtopic: string): ImagePairData {
  return {
    subtopic,
    grayImage: {
      src: "/placeholder.svg",
      alt: `Gray's Anatomy - ${subtopic} (placeholder)`,
      legend: `Imagem histórica indisponível - ${subtopic}`,
      credit: "Placeholder - Imagem em atualização",
    },
    modernImage: {
      src: "/placeholder.svg",
      alt: `Diagrama moderno - ${subtopic} (placeholder)`,
      legend: `Diagrama moderno indisponível - ${subtopic}`,
      credit: "Placeholder - Imagem em atualização",
    },
  }
}

/**
 * Creates an image pair from individual Gray and Modern images
 */
export function createImagePair(
  subtopic: string,
  grayImage: AnatomicalImage,
  modernImage: AnatomicalImage
): ImagePairData {
  return {
    subtopic,
    grayImage: {
      src: grayImage.src,
      alt: grayImage.alt || `Gray's Anatomy - ${subtopic}`,
      legend: grayImage.legend || "",
      credit: grayImage.credit || "Gray's Anatomy (1918) - Domínio Público",
    },
    modernImage: {
      src: modernImage.src,
      alt: modernImage.alt || `Diagrama moderno - ${subtopic}`,
      legend: modernImage.legend || "",
      credit: modernImage.credit || "Diagrama anatômico moderno",
    },
  }
}
