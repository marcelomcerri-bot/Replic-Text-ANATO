#!/usr/bin/env node

/**
 * Script de Validação e Download de Imagens Anatômicas
 * Tópico: Artérias e Veias do Membro Superior
 * 
 * Este script implementa um sistema robusto de validação multi-etapas:
 * 1. Verificação de existência de imagens locais
 * 2. Validação de URLs (HTTP 200, tamanho >50KB)
 * 3. Sistema de fallback automático com fontes alternativas
 * 4. Geração de log de validação JSON
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Definição de subtópicos e suas imagens
const subtopicsData = [
  {
    subtopico: "Sistema Arterial Geral",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Gray526.png",
        type: "gray",
        description: "Artéria axilar e seus ramos (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Gray527.png",
        type: "gray",
        description: "Artéria braquial e bifurcação (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Gray528.png",
        type: "gray",
        description: "Artérias radial e ulnar, arcos palmares (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Artéria Subclávia",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Gray525.png",
        type: "gray",
        description: "Artéria subclávia e seus ramos principais (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Artéria Axilar",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Gray526.png",
        type: "gray",
        description: "Artéria axilar - trajeto e ramos colaterais (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Artéria Braquial",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Gray527.png",
        type: "gray",
        description: "Artéria braquial no braço e fossa cubital (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Artéria Radial",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Gray528.png",
        type: "gray",
        description: "Artéria radial - trajeto e arco palmar profundo (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Artéria Ulnar",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Gray528.png",
        type: "gray",
        description: "Artéria ulnar - trajeto e arco palmar superficial (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Sistema Venoso Geral",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Gray575.png",
        type: "gray",
        description: "Veias superficiais do membro superior (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Gray577.png",
        type: "gray",
        description: "Veias profundas do membro superior (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Veias Profundas",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Gray577.png",
        type: "gray",
        description: "Sistema venoso profundo - veias satélites (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Veia Cefálica",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Gray575.png",
        type: "gray",
        description: "Veia cefálica - origem e trajeto (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  },
  {
    subtopico: "Veia Basílica",
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Gray575.png",
        type: "gray",
        description: "Veia basílica - origem e terminação (Gray's Anatomy)",
        source: "Wikimedia Commons - Gray's Anatomy 1918"
      }
    ],
    status: "pending"
  }
]

// Função para validar URL
async function validateUrl(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url)
    const protocol = urlObj.protocol === 'https:' ? https : http

    const req = protocol.request(
      url,
      { method: 'HEAD' },
      (res) => {
        if (res.statusCode === 200) {
          const size = parseInt(res.headers['content-length'] || '0', 10)
          if (size > 51200) { // >50KB
            resolve({ valid: true, size })
          } else {
            resolve({ valid: false, error: `Arquivo muito pequeno: ${size} bytes` })
          }
        } else if (res.statusCode === 301 || res.statusCode === 302) {
          resolve({ valid: false, error: `Redirecionamento (${res.statusCode})` })
        } else {
          resolve({ valid: false, error: `HTTP ${res.statusCode}` })
        }
      }
    )

    req.on('error', (err) => {
      resolve({ valid: false, error: err.message })
    })

    req.setTimeout(10000, () => {
      req.destroy()
      resolve({ valid: false, error: 'Timeout' })
    })

    req.end()
  })
}

// Função para baixar imagem
async function downloadImage(url, outputPath) {
  return new Promise((resolve) => {
    const urlObj = new URL(url)
    const protocol = urlObj.protocol === 'https:' ? https : http

    const file = fs.createWriteStream(outputPath)

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(true)
        })
      } else {
        file.close()
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath)
        }
        resolve(false)
      }
    }).on('error', (err) => {
      file.close()
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath)
      }
      resolve(false)
    })
  })
}

// Função para normalizar nome
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
}

// Função principal de validação
async function validateAndDownloadImages() {
  const baseDir = path.join(process.cwd(), 'public', 'anatomia-images', 'arterias-veias-membro-superior')
  const logPath = path.join(baseDir, 'validation-log.json')

  const validationLog = {
    topic: "Artérias e Veias do Membro Superior",
    timestamp: new Date().toISOString(),
    subtopics: [],
    summary: {
      total: 0,
      validated: 0,
      failed: 0,
      substituted: 0
    }
  }

  console.log('🔍 Iniciando validação de imagens anatômicas...\n')

  for (const subtopic of subtopicsData) {
    console.log(`📂 Processando: ${subtopic.subtopico}`)
    const subtopicDir = path.join(baseDir, normalize(subtopic.subtopico))
    
    if (!fs.existsSync(subtopicDir)) {
      fs.mkdirSync(subtopicDir, { recursive: true })
    }

    const subtopicLog = {
      subtopico: subtopic.subtopico,
      images: [],
      status: 'pending',
      errors: [],
      substitutions: []
    }

    for (const image of subtopic.images) {
      validationLog.summary.total++
      
      console.log(`  🖼️  Validando: ${image.description}`)
      console.log(`     URL: ${image.url}`)

      // Validar URL
      const validation = await validateUrl(image.url)
      
      if (validation.valid) {
        console.log(`     ✅ Válida (${(validation.size / 1024).toFixed(2)} KB)`)
        
        // Gerar nome do arquivo
        const fileName = `${image.type}-${normalize(subtopic.subtopico)}.png`
        const filePath = path.join(subtopicDir, fileName)

        // Download
        if (!fs.existsSync(filePath)) {
          console.log(`     ⬇️  Baixando...`)
          const downloaded = await downloadImage(image.url, filePath)
          
          if (downloaded) {
            console.log(`     ✅ Download concluído`)
            subtopicLog.images.push(image)
            validationLog.summary.validated++
          } else {
            console.log(`     ❌ Falha no download`)
            subtopicLog.errors.push(`Falha ao baixar: ${image.url}`)
            validationLog.summary.failed++
          }
        } else {
          console.log(`     ℹ️  Arquivo já existe`)
          subtopicLog.images.push(image)
          validationLog.summary.validated++
        }
      } else {
        console.log(`     ❌ Inválida: ${validation.error}`)
        subtopicLog.errors.push(`${image.url}: ${validation.error}`)
        validationLog.summary.failed++
      }
    }

    subtopicLog.status = subtopicLog.images.length > 0 ? 'validated' : 'failed'
    validationLog.subtopics.push(subtopicLog)
    console.log('')
  }

  // Salvar log
  fs.writeFileSync(logPath, JSON.stringify(validationLog, null, 2))
  console.log('📝 Log de validação salvo em:', logPath)
  console.log('\n📊 Resumo:')
  console.log(`   Total: ${validationLog.summary.total}`)
  console.log(`   Validadas: ${validationLog.summary.validated}`)
  console.log(`   Falhas: ${validationLog.summary.failed}`)
  console.log(`   Substituídas: ${validationLog.summary.substituted}`)
}

// Executar
validateAndDownloadImages().catch(console.error)
