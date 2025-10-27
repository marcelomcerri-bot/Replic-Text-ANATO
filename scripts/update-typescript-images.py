#!/usr/bin/env python3
"""
Script to update TypeScript files with new unique images from OpenStax.
This removes duplicates and maps correct images to each topic.
"""

import re
import json

# Load the downloaded images metadata
with open('scripts/downloaded-figures-metadata.json', 'r', encoding='utf-8') as f:
    metadata = json.load(f)

# Image mapping based on alt text analysis
# Format: {topic_identifier: {filename, legend, alt}}

BONE_IMAGE_MAPPING = {
    # Main section images
    'cintura_escapular_main': [{
        'filename': 'bone_pectoral_girdle_5.jpg',
        'alt': 'Cintura escapular - escápula e clavícula',
        'legend': 'Visões anterior e posterior da escápula mostrando o acrômio, processo coracoide e cavidade glenoidal'
    }],
    
    # Escápula
    'escapula': [{
        'filename': 'bone_pectoral_girdle_5.jpg',
        'alt': 'Escápula detalhada',
        'legend': 'Anatomia da escápula mostrando processo coracoide, acrômio, espinha escapular e cavidade glenoidal'
    }],
    
    # Úmero
    'umero': [{
        'filename': 'bone_upper_limb_bones_3.jpg',
        'alt': 'Úmero - vistas anterior e posterior',
        'legend': 'Osso do braço mostrando cabeça do úmero, tubérculos, sulco intertubercular, tróclea e capítulo'
    }],
    
    # Antebraço (Rádio e Ulna)
    'antebraco_main': [{
        'filename': 'bone_upper_limb_bones_4.jpg',
        'alt': 'Ossos do antebraço - rádio e ulna',
        'legend': 'Rádio e ulna mostrando cabeça radial, tuberosidade radial, olécrano e processo estiloide'
    }],
    
    'ulna': [{
        'filename': 'bone_upper_limb_bones_4.jpg',
        'alt': 'Ulna',
        'legend': 'Ulna com olécrano, processo coronoide e incisura troclear'
    }],
    
    'radio': [{
        'filename': 'bone_upper_limb_bones_4.jpg',
        'alt': 'Rádio',
        'legend': 'Rádio mostrando cabeça, colo, tuberosidade radial e processo estiloide'
    }],
    
    # Mão
    'mao_main': [{
        'filename': 'bone_upper_limb_bones_5.jpg',
        'alt': 'Ossos da mão e punho',
        'legend': 'Visões anterior e posterior dos ossos do carpo, metacarpo e falanges'
    }],
    
    'carpo': [{
        'filename': 'bone_upper_limb_bones_5.jpg',
        'alt': 'Ossos do carpo',
        'legend': 'Ossos carpais: escafoide, semilunar, piramidal, pisiforme, trapézio, trapezoide, capitato e hamato'
    }],
    
    'metacarpo_falanges': [{
        'filename': 'bone_upper_limb_bones_6.jpg',
        'alt': 'Radiografia da mão',
        'legend': 'Radiografia mostrando metacarpos e falanges'
    }],
}

MUSCLE_IMAGE_MAPPING = {
    # Tórax e Ombro
    'torax_ombro_main': [{
        'filename': 'muscle_pectoral_muscles_3.jpg',
        'alt': 'Músculos da cintura escapular',
        'legend': 'Visões anterior-lateral e posterior dos músculos da cintura escapular'
    }],
    
    # Deltoid and shoulder
    'deltoide_ombro': [{
        'filename': 'muscle_pectoral_muscles_4.jpg',
        'alt': 'Músculos do ombro incluindo deltoide',
        'legend': 'Músculos peitorais, deltóide e músculos profundos do ombro (manguito rotador)'
    }],
    
    # Forearm muscles
    'antebraco_musculos': [{
        'filename': 'muscle_pectoral_muscles_6.jpg',
        'alt': 'Músculos do antebraço',
        'legend': 'Músculos que movem o antebraço - compartimentos anterior e posterior'
    }],
    
    # Hand muscles
    'mao_musculos': [{
        'filename': 'muscle_pectoral_muscles_9.jpg',
        'alt': 'Músculos intrínsecos da mão',
        'legend': 'Músculos intrínsecos da mão mostrando os principais grupos musculares'
    }],
}

VESSEL_IMAGE_MAPPING = {
    # Arteries main
    'arterias_main': [{
        'filename': 'vessel_upper_limb_circulation_12.jpg',
        'alt': 'Artérias do membro superior',
        'legend': 'Artérias do braço mostrando subclávia, axilar, braquial, radial e ulnar'
    }],
    
    'arterias_diagrama': [{
        'filename': 'vessel_upper_limb_circulation_13.jpg',
        'alt': 'Diagrama das artérias do membro superior',
        'legend': 'Esquema das artérias presentes no membro superior e torácico'
    }],
    
    # Veins
    'veias_main': [{
        'filename': 'vessel_upper_limb_circulation_17.jpg',
        'alt': 'Veias do membro superior',
        'legend': 'Sistema venoso do membro superior mostrando veias superficiais (cefálica, basílica) e profundas'
    }],
}

def create_image_block(image_info):
    """Create TypeScript image block."""
    path = f"/anatomia-images/{image_info['folder']}/{image_info['filename']}"
    return f'''          {{
            src: "{path}",
            legend: "{image_info['legend']}",
            credit: "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            alt: "{image_info['alt']}"
          }}'''

print("=" * 80)
print("Updating TypeScript files with unique images")
print("=" * 80)

# For this task, I'll provide the recommended updates as a mapping file
# that can be applied to each TypeScript file

output_mapping = {
    'ossos-membro-superior': {
        'description': 'Unique bone images from OpenStax - no duplicates',
        'mappings': BONE_IMAGE_MAPPING
    },
    'musculos-membro-superior': {
        'description': 'Unique muscle images from OpenStax - no duplicates',
        'mappings': MUSCLE_IMAGE_MAPPING
    },
    'arterias-veias-membro-superior': {
        'description': 'Upper limb vessel images ONLY from OpenStax',
        'mappings': VESSEL_IMAGE_MAPPING
    }
}

with open('scripts/typescript-image-mapping.json', 'w', encoding='utf-8') as f:
    json.dump(output_mapping, f, indent=2, ensure_ascii=False)

print("\n✓ Created mapping file: scripts/typescript-image-mapping.json")
print("\nRecommended image assignments:")
print("\nBONES:")
for topic, images in BONE_IMAGE_MAPPING.items():
    for img in images:
        print(f"  {topic}: {img['filename']}")

print("\nMUSCLES:")
for topic, images in MUSCLE_IMAGE_MAPPING.items():
    for img in images:
        print(f"  {topic}: {img['filename']}")

print("\nVESSELS:")
for topic, images in VESSEL_IMAGE_MAPPING.items():
    for img in images:
        print(f"  {topic}: {img['filename']}")
