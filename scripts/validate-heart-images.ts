import fs from 'fs';
import path from 'path';

interface ImageValidation {
  subtopic: string;
  filePath: string;
  exists: boolean;
  sizeBytes: number;
  sizeKB: string;
  valid: boolean;
  reason?: string;
}

interface SubtopicAudit {
  subtopic: string;
  grayImage?: ImageValidation;
  diagramImage?: ImageValidation;
  hasCompletePair: boolean;
  missingImages: string[];
}

const MIN_SIZE_BYTES = 50 * 1024; // 50KB

function validateImage(filePath: string, subtopic: string): ImageValidation {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    return {
      subtopic,
      filePath,
      exists: false,
      sizeBytes: 0,
      sizeKB: '0 KB',
      valid: false,
      reason: 'Arquivo não encontrado'
    };
  }

  const stats = fs.statSync(fullPath);
  const sizeBytes = stats.size;
  const sizeKB = `${(sizeBytes / 1024).toFixed(2)} KB`;
  
  if (sizeBytes < MIN_SIZE_BYTES) {
    return {
      subtopic,
      filePath,
      exists: true,
      sizeBytes,
      sizeKB,
      valid: false,
      reason: `Tamanho muito pequeno (< 50KB): ${sizeKB}`
    };
  }

  return {
    subtopic,
    filePath,
    exists: true,
    sizeBytes,
    sizeKB,
    valid: true
  };
}

function getAllImagesInDirectory(dir: string): string[] {
  const fullPath = path.join(process.cwd(), dir);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  return files
    .filter(file => /\.(png|svg|jpg|jpeg)$/i.test(file))
    .map(file => path.join(dir, file));
}

// Definir todos os subtópicos que devem ter pares de imagens
const heartSubtopics = [
  {
    name: 'Morfologia Externa - Vista Anterior',
    directory: 'public/anatomia-images/coracao/morfologia-externa',
    grayPattern: 'gray490',
    diagramPattern: 'diagrama-coracao-externo'
  },
  {
    name: 'Morfologia Externa - Vista Posterior',
    directory: 'public/anatomia-images/coracao/morfologia-externa',
    grayPattern: 'gray491',
    diagramPattern: 'diagrama-coracao-externo' // pode reutilizar
  },
  {
    name: 'Pericárdio',
    directory: 'public/anatomia-images/coracao/pericardio',
    grayPattern: 'gray968',
    diagramPattern: 'diagrama-camadas-pericardio'
  },
  {
    name: 'Seios Pericárdicos',
    directory: 'public/anatomia-images/coracao/pericardio',
    grayPattern: 'gray489-seios',
    diagramPattern: 'diagrama-pericardio'
  },
  {
    name: 'Átrio Direito',
    directory: 'public/anatomia-images/coracao/camaras-internas',
    grayPattern: 'gray492',
    diagramPattern: 'diagrama-coracao-interno'
  },
  {
    name: 'Ventrículo Direito',
    directory: 'public/anatomia-images/coracao/camaras-internas',
    grayPattern: 'gray493',
    diagramPattern: 'diagrama-coracao-interno'
  },
  {
    name: 'Ventrículo Esquerdo',
    directory: 'public/anatomia-images/coracao/camaras-internas',
    grayPattern: 'gray495',
    diagramPattern: 'diagrama-coracao-interno'
  },
  {
    name: 'Valvas Cardíacas',
    directory: 'public/anatomia-images/coracao/valvas',
    grayPattern: 'gray494-valvas',
    diagramPattern: 'diagrama-valvas'
  },
  {
    name: 'Artérias Coronárias',
    directory: 'public/anatomia-images/coracao/coronarias',
    grayPattern: 'gray548',
    diagramPattern: 'diagrama-coronarias'
  },
  {
    name: 'Valva Aórtica e Origem das Coronárias',
    directory: 'public/anatomia-images/coracao/coronarias',
    grayPattern: 'gray497-valva-aortica',
    diagramPattern: 'diagrama-coronarias'
  },
  {
    name: 'Sistema de Condução',
    directory: 'public/anatomia-images/coracao/sistema-conducao',
    grayPattern: 'gray496',
    diagramPattern: 'diagrama-sistema-conducao'
  }
];

function findImageByPattern(directory: string, pattern: string): string | null {
  const images = getAllImagesInDirectory(directory);
  const found = images.find(img => img.includes(pattern));
  return found || null;
}

function auditHeartImages(): SubtopicAudit[] {
  const audits: SubtopicAudit[] = [];

  for (const subtopic of heartSubtopics) {
    const grayImagePath = findImageByPattern(subtopic.directory, subtopic.grayPattern);
    const diagramImagePath = findImageByPattern(subtopic.directory, subtopic.diagramPattern);

    const grayValidation = grayImagePath 
      ? validateImage(grayImagePath, subtopic.name)
      : undefined;

    const diagramValidation = diagramImagePath
      ? validateImage(diagramImagePath, subtopic.name)
      : undefined;

    const missingImages: string[] = [];
    
    if (!grayValidation || !grayValidation.valid) {
      missingImages.push('Gray\'s Anatomy');
    }
    
    if (!diagramValidation || !diagramValidation.valid) {
      missingImages.push('Diagrama Didático');
    }

    audits.push({
      subtopic: subtopic.name,
      grayImage: grayValidation,
      diagramImage: diagramValidation,
      hasCompletePair: missingImages.length === 0,
      missingImages
    });
  }

  return audits;
}

// Executar auditoria
console.log('🔍 Iniciando auditoria de imagens do coração...\n');

const audits = auditHeartImages();
const validationLog = {
  timestamp: new Date().toISOString(),
  summary: {
    totalSubtopics: audits.length,
    completePairs: audits.filter(a => a.hasCompletePair).length,
    incompletePairs: audits.filter(a => !a.hasCompletePair).length
  },
  audits
};

// Salvar log JSON
const logPath = path.join(process.cwd(), 'public/anatomia-images/coracao/validation-log.json');
fs.writeFileSync(logPath, JSON.stringify(validationLog, null, 2));

console.log('📊 RESUMO DA AUDITORIA:');
console.log(`   Total de subtópicos: ${validationLog.summary.totalSubtopics}`);
console.log(`   ✅ Pares completos: ${validationLog.summary.completePairs}`);
console.log(`   ⚠️  Pares incompletos: ${validationLog.summary.incompletePairs}\n`);

console.log('📋 DETALHES POR SUBTÓPICO:\n');

audits.forEach(audit => {
  const status = audit.hasCompletePair ? '✅' : '⚠️';
  console.log(`${status} ${audit.subtopic}`);
  
  if (audit.grayImage) {
    const validIcon = audit.grayImage.valid ? '✓' : '✗';
    console.log(`   ${validIcon} Gray's: ${audit.grayImage.sizeKB} ${audit.grayImage.reason || ''}`);
  } else {
    console.log(`   ✗ Gray's: AUSENTE`);
  }
  
  if (audit.diagramImage) {
    const validIcon = audit.diagramImage.valid ? '✓' : '✗';
    console.log(`   ${validIcon} Diagrama: ${audit.diagramImage.sizeKB} ${audit.diagramImage.reason || ''}`);
  } else {
    console.log(`   ✗ Diagrama: AUSENTE`);
  }
  
  if (audit.missingImages.length > 0) {
    console.log(`   📌 Faltando: ${audit.missingImages.join(', ')}`);
  }
  
  console.log('');
});

console.log(`\n✨ Log completo salvo em: ${logPath}\n`);

export { auditHeartImages, validateImage };
