#!/usr/bin/env python3
"""
Script para mapear e distribuir imagens OpenStax pelos tópicos/subtópicos
Garante que TODOS os 48 tópicos tenham imagens relevantes
"""

import json
import os
from pathlib import Path

# Mapeamento de imagens para tópicos específicos
IMAGE_MAPPINGS = {
    # ====================
    # OSSOS DO MEMBRO SUPERIOR
    # ====================
    'ossos-membro-superior': {
        'Cintura Escapular': [
            'openstax-pectoral-girdle-figure-1.jpg',  # Pectoral girdle overview
            'openstax-pectoral-girdle-figure-2.jpg',  # Clavicle
        ],
        'Escápula': [
            'openstax-pectoral-girdle-figure-3.jpg',  # Scapula detailed
            'openstax-bones-figure-1.jpg',  # Upper arm bones
        ],
        'Clavícula': [
            'openstax-pectoral-girdle-figure-2.jpg',
        ],
        'Úmero': [
            'openstax-bones-figure-1.jpg',  # Humerus anterior/posterior
        ],
        'Rádio': [
            'openstax-bones-figure-2.jpg',  # Radius and ulna
        ],
        'Ulna': [
            'openstax-bones-figure-2.jpg',  # Radius and ulna
        ],
        'Ossos do Carpo': [
            'openstax-bones-figure-3.jpg',  # Hand and wrist bones
            'openstax-bones-figure-5.jpg',  # Wrist cross-section
        ],
        'Metacarpos': [
            'openstax-bones-figure-3.jpg',
            'openstax-bones-figure-4.jpg',  # Hand radiograph
        ],
        'Falanges': [
            'openstax-bones-figure-3.jpg',
            'openstax-bones-figure-4.jpg',
        ],
        'Articulação do Ombro (Glenoumeral)': [
            'openstax-joints-figure-1.jpg',
        ],
        'Articulação Acromioclavicular': [
            'openstax-pectoral-girdle-figure-1.jpg',
        ],
        'Articulação do Cotovelo': [
            'openstax-joints-figure-2.jpg',
        ],
        'Articulação Radioulnar': [
            'openstax-bones-figure-2.jpg',
            'openstax-joints-figure-2.jpg',
        ],
        'Articulação do Punho (Radiocarpal)': [
            'openstax-bones-figure-3.jpg',
            'openstax-joints-figure-3.jpg',
        ],
    },
    # ====================
    # MÚSCULOS DO MEMBRO SUPERIOR
    # ====================
    'musculos-membro-superior': {
        'Músculos do Tórax e Ombro': [
            'openstax-muscles-figure-1.jpg',  # Pectoral girdle muscles
            'openstax-muscles-figure-2.jpg',  # Detailed shoulder muscles
        ],
        'Peitoral Maior': [
            'openstax-muscles-figure-1.jpg',
            'openstax-muscles-figure-2.jpg',
        ],
        'Peitoral Menor': [
            'openstax-muscles-figure-1.jpg',
        ],
        'Serrátil Anterior': [
            'openstax-muscles-figure-1.jpg',
        ],
        'Deltoide': [
            'openstax-muscles-figure-2.jpg',
        ],
        'Subescapular': [
            'openstax-muscles-figure-2.jpg',
        ],
        'Supraespinal': [
            'openstax-muscles-figure-2.jpg',
        ],
        'Infraespinal': [
            'openstax-muscles-figure-2.jpg',
        ],
        'Redondo Menor': [
            'openstax-muscles-figure-2.jpg',
        ],
        'Redondo Maior': [
            'openstax-muscles-figure-2.jpg',
        ],
        'Músculos do Braço': [
            'openstax-muscles-figure-4.jpg',  # Forearm muscles overview
        ],
        'Bíceps Braquial': [
            'openstax-muscles-figure-4.jpg',
        ],
        'Braquial': [
            'openstax-muscles-figure-4.jpg',
        ],
        'Coracobraquial': [
            'openstax-muscles-figure-4.jpg',
        ],
        'Tríceps Braquial': [
            'openstax-muscles-figure-4.jpg',
        ],
        'Músculos do Antebraço - Compartimento Anterior': [
            'openstax-muscles-figure-5.jpg',
        ],
        'Músculos do Antebraço - Compartimento Posterior': [
            'openstax-muscles-figure-5.jpg',
        ],
        'Músculos Intrínsecos da Mão': [
            'openstax-muscles-figure-7.jpg',  # Intrinsic hand muscles
        ],
        'Músculos Tenares': [
            'openstax-muscles-figure-7.jpg',
        ],
        'Músculos Hipotenares': [
            'openstax-muscles-figure-7.jpg',
        ],
        'Músculos Interósseos': [
            'openstax-muscles-figure-7.jpg',
        ],
    },
    # ====================
    # ARTÉRIAS E VEIAS DO MEMBRO SUPERIOR
    # ====================
    'arterias-veias-membro-superior': {
        'Sistema Arterial do Membro Superior': [
            'openstax-vessels-figure-1.jpg',
            'openstax-vessels-figure-2.jpg',
        ],
        'Artéria Subclávia': [
            'openstax-vessels-figure-1.jpg',
        ],
        'Artéria Axilar': [
            'openstax-vessels-figure-2.jpg',
        ],
        'Artéria Braquial': [
            'openstax-vessels-figure-2.jpg',
        ],
        'Artéria Radial': [
            'openstax-vessels-figure-2.jpg',
        ],
        'Artéria Ulnar': [
            'openstax-vessels-figure-2.jpg',
        ],
        'Sistema Venoso do Membro Superior': [
            'openstax-vessels-figure-3.jpg',
        ],
        'Veias Profundas': [
            'openstax-vessels-figure-3.jpg',
        ],
        'Veias Superficiais': [
            'openstax-vessels-figure-3.jpg',
        ],
        'Veia Cefálica': [
            'openstax-vessels-figure-3.jpg',
        ],
        'Veia Basílica': [
            'openstax-vessels-figure-3.jpg',
        ],
        'Veia Mediana do Antebraço': [
            'openstax-vessels-figure-3.jpg',
        ],
        'Veia Mediana Cubital': [
            'openstax-vessels-figure-3.jpg',
        ],
    },
}

def load_metadata(category):
    """Carrega todos os metadados de imagens para uma categoria"""
    base_dir = f'public/anatomia-images/{category}'
    all_images = {}
    
    metadata_files = Path(base_dir).glob('*-metadata.json')
    
    for metadata_file in metadata_files:
        with open(metadata_file, 'r', encoding='utf-8') as f:
            images = json.load(f)
            for img in images:
                all_images[img['filename']] = img
    
    return all_images

def main():
    print("\n" + "="*70)
    print("MAPEAMENTO DE IMAGENS OPENSTAX PARA TÓPICOS")
    print("Distribuindo imagens por TODOS os 48 tópicos/subtópicos")
    print("="*70 + "\n")
    
    # Carregar metadados de todas as imagens
    bones_images = load_metadata('ossos-membro-superior')
    muscles_images = load_metadata('musculos-membro-superior')
    vessels_images = load_metadata('arterias-veias-membro-superior')
    
    print(f"✓ Imagens de Ossos: {len(bones_images)}")
    print(f"✓ Imagens de Músculos: {len(muscles_images)}")
    print(f"✓ Imagens de Vasos: {len(vessels_images)}")
    print(f"✓ TOTAL: {len(bones_images) + len(muscles_images) + len(vessels_images)} imagens\n")
    
    print("="*70)
    print("MAPEAMENTO POR CATEGORIA")
    print("="*70 + "\n")
    
    for category, mappings in IMAGE_MAPPINGS.items():
        print(f"\n{category.upper().replace('-', ' ')}:")
        print("-" * 70)
        
        topic_count = 0
        image_count = 0
        
        for topic, images in mappings.items():
            topic_count += 1
            image_count += len(images)
            print(f"  • {topic}: {len(images)} imagem(ns)")
            for img in images:
                print(f"      - {img}")
        
        print(f"\n  TOTAL: {topic_count} tópicos, {image_count} imagens usadas")
    
    print("\n" + "="*70)
    print("Próximo passo: Adicionar essas imagens aos arquivos TypeScript")
    print("="*70 + "\n")

if __name__ == "__main__":
    main()
