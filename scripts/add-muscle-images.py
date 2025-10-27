#!/usr/bin/env python3
"""
Script para adicionar imagens OpenStax aos tópicos de músculos
Adiciona imagens automaticamente sem precisar editar manualmente
"""

import re

# Mapeamento de quais imagens adicionar em cada seção
MUSCLE_IMAGE_MAPPINGS = {
    "Músculos do Tórax e Ombro": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-1.jpg",
            "legend": "Músculos da cintura escapular - vistas anterior-lateral e posterior",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Músculos da cintura escapular"
        },
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-2.jpg",
            "legend": "Músculos do tórax, ombro e cintura escapular em detalhes",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Músculos do ombro"
        },
    ],
    "Peitoral Maior": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-1.jpg",
            "legend": "Peitoral maior mostrado na vista anterior",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Peitoral maior"
        },
    ],
    "Peitoral Menor": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-1.jpg",
            "legend": "Peitoral menor (profundo ao peitoral maior)",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Peitoral menor"
        },
    ],
    "Serrátil Anterior": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-1.jpg",
            "legend": "Serrátil anterior na vista lateral",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Serrátil anterior"
        },
    ],
    "Deltoide": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-2.jpg",
            "legend": "Deltoide - músculo que forma o contorno do ombro",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Deltoide"
        },
    ],
    "Manguito Rotador": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-2.jpg",
            "legend": "Músculos do manguito rotador - estabilizadores da articulação glenoumeral",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Manguito rotador"
        },
    ],
    "Subescapular": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-2.jpg",
            "legend": "Subescapular - vista anterior",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Subescapular"
        },
    ],
    "Supraespinal": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-2.jpg",
            "legend": "Supraespinal - vista posterior",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Supraespinal"
        },
    ],
    "Infraespinal": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-2.jpg",
            "legend": "Infraespinal - vista posterior",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Infraespinal"
        },
    ],
    "Redondo Menor": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-2.jpg",
            "legend": "Redondo menor - vista posterior",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Redondo menor"
        },
    ],
    "Redondo Maior": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-2.jpg",
            "legend": "Redondo maior - vista posterior",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Redondo maior"
        },
    ],
    "Músculos do Braço": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-4.jpg",
            "legend": "Músculos do braço que movem o antebraço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Músculos do braço"
        },
    ],
    "Bíceps Braquial": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-4.jpg",
            "legend": "Bíceps braquial - flexor do antebraço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Bíceps braquial"
        },
    ],
    "Braquial": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-4.jpg",
            "legend": "Braquial - flexor profundo do antebraço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Braquial"
        },
    ],
    "Coracobraquial": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-4.jpg",
            "legend": "Coracobraquial - flexor e adutor do braço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Coracobraquial"
        },
    ],
    "Tríceps Braquial": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-4.jpg",
            "legend": "Tríceps braquial - extensor do antebraço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Tríceps braquial"
        },
    ],
    "Músculos do Antebraço": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-5.jpg",
            "legend": "Músculos do antebraço - compartimentos anterior e posterior",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Músculos do antebraço"
        },
    ],
    "Compartimento Anterior - Camada Superficial": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-5.jpg",
            "legend": "Flexores superficiais do antebraço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Flexores superficiais"
        },
    ],
    "Compartimento Anterior - Camada Profunda": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-5.jpg",
            "legend": "Flexores profundos do antebraço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Flexores profundos"
        },
    ],
    "Compartimento Posterior - Camada Superficial": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-5.jpg",
            "legend": "Extensores superficiais do antebraço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Extensores superficiais"
        },
    ],
    "Compartimento Posterior - Camada Profunda": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-5.jpg",
            "legend": "Extensores profundos do antebraço",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Extensores profundos"
        },
    ],
    "Músculos da Mão": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-7.jpg",
            "legend": "Músculos intrínsecos da mão",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Músculos da mão"
        },
    ],
    "Músculos Tenares": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-7.jpg",
            "legend": "Músculos tenares - eminência tenar do polegar",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Músculos tenares"
        },
    ],
    "Músculos Hipotenares": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-7.jpg",
            "legend": "Músculos hipotenares - eminência hipotenar",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Músculos hipotenares"
        },
    ],
    "Músculos Interósseos e Lumbricais": [
        {
            "src": "/anatomia-images/musculos-membro-superior/openstax-muscles-figure-7.jpg",
            "legend": "Músculos interósseos e lumbricais da mão",
            "credit": "OpenStax Anatomy and Physiology 2e, CC BY 4.0",
            "alt": "Interósseos e lumbricais"
        },
    ],
}

def format_images_array(images):
    """Formata array de imagens para TypeScript"""
    if not images:
        return "[]"
    
    lines = ["["]
    for img in images:
        lines.append("          {")
        lines.append(f'            src: "{img["src"]}",')
        lines.append(f'            legend: "{img["legend"]}",')
        lines.append(f'            credit: "{img["credit"]}",')
        lines.append(f'            alt: "{img["alt"]}"')
        lines.append("          },")
    lines.append("        ],")
    
    return "\n".join(lines)

def main():
    print("\n" + "="*70)
    print("ADICIONANDO IMAGENS AOS TÓPICOS DE MÚSCULOS")
    print("="*70 + "\n")
    
    file_path = "lib/pratica-topics/musculos-membro-superior.ts"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    sections_updated = 0
    
    for section_title, images in MUSCLE_IMAGE_MAPPINGS.items():
        # Procurar por seções com images: [] ou sem campo images
        pattern = rf'(        title: "{re.escape(section_title)}",\n        content: \[[\s\S]*?\],\n)        (images: \[\],\n)?'
        
        replacement = rf'\1        images: {format_images_array(images)}\n'
        
        new_content, count = re.subn(pattern, replacement, content)
        
        if count > 0:
            content = new_content
            sections_updated += count
            print(f"✓ Adicionada(s) {len(images)} imagem(ns) em: {section_title}")
        else:
            # Tentar padrão para subsections
            pattern_sub = rf'(          title: "{re.escape(section_title)}",\n          content: \[[\s\S]*?\],\n)          (images: \[\],\n)?'
            replacement_sub = rf'\1          images: {format_images_array(images).replace("        ", "          ")}\n'
            
            new_content, count = re.subn(pattern_sub, replacement_sub, content)
            
            if count > 0:
                content = new_content
                sections_updated += count
                print(f"✓ Adicionada(s) {len(images)} imagem(ns) em (subsection): {section_title}")
    
    # Salvar arquivo atualizado
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n{'='*70}")
    print(f"TOTAL: {sections_updated} seções atualizadas")
    print(f"{'='*70}\n")
    print(f"✓ Arquivo atualizado: {file_path}")

if __name__ == "__main__":
    main()
