#!/usr/bin/env python3
"""
Script para baixar imagens selecionadas do OpenStax baseado no mapeamento correto.
Sem duplicações!
"""

import requests
import os
import time
import json

def download_image(url, save_path):
    """Download uma imagem da URL."""
    try:
        print(f"  📥 Baixando: {os.path.basename(save_path)}")
        response = requests.get(url, timeout=30, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        
        print(f"  ✓ Salvo!")
        return True
    except Exception as e:
        print(f"  ✗ Erro: {str(e)}")
        return False

def main():
    print("\n" + "="*80)
    print("📥 BAIXANDO IMAGENS SELECIONADAS DO OPENSTAX (SEM DUPLICAÇÕES)")
    print("="*80)
    
    # Carrega a lista de todas as imagens
    with open('scripts/openstax-all-images-list.json', 'r', encoding='utf-8') as f:
        all_images = json.load(f)
    
    muscles_images = all_images["Músculos do Membro Superior"]
    cardiac_images = all_images["Sistema de Condução Cardíaca"]
    
    downloads = []
    
    # ===== MÚSCULOS DO MEMBRO SUPERIOR =====
    print("\n🦾 Músculos do Membro Superior:")
    print("="*80)
    
    # Figura 1: Pectoral girdle (vistas anterior e posterior)
    print("\n📌 Figura 1 - Pectoral Girdle")
    if download_image(
        muscles_images[0]['url'],
        'public/anatomia-images/musculos-membro-superior/os-pectoral-girdle-muscles.jpg'
    ):
        downloads.append({
            'category': 'muscles',
            'figure': 1,
            'filename': 'os-pectoral-girdle-muscles.jpg',
            'usage': 'Peitoral Maior e Peitoral Menor (imagem geral)',
            'alt': muscles_images[0]['alt']
        })
        time.sleep(2)
    
    # Figura 2: Deltoid e deep shoulder muscles
    print("\n📌 Figura 2 - Deltoid e Músculos Profundos do Ombro")
    if download_image(
        muscles_images[1]['url'],
        'public/anatomia-images/musculos-membro-superior/os-deltoid-shoulder-muscles.jpg'
    ):
        downloads.append({
            'category': 'muscles',
            'figure': 2,
            'filename': 'os-deltoid-shoulder-muscles.jpg',
            'usage': 'Deltoide (específico)',
            'alt': muscles_images[1]['alt']
        })
        time.sleep(2)
    
    # Figura 3: Tabela visual com manguito rotador
    print("\n📌 Figura 3 - Tabela Visual dos Músculos do Ombro (Manguito Rotador)")
    if download_image(
        muscles_images[2]['url'],
        'public/anatomia-images/musculos-membro-superior/os-rotator-cuff-table.jpg'
    ):
        downloads.append({
            'category': 'muscles',
            'figure': 3,
            'filename': 'os-rotator-cuff-table.jpg',
            'usage': 'Manguito Rotador completo (Supraespinal, Infraespinal, Redondo Menor, Subescapular)',
            'alt': muscles_images[2]['alt']
        })
        time.sleep(2)
    
    # Figura 4: Muscles that move the forearm (braço)
    print("\n📌 Figura 4 - Músculos do Braço")
    if download_image(
        muscles_images[3]['url'],
        'public/anatomia-images/musculos-membro-superior/os-arm-muscles-forearm.jpg'
    ):
        downloads.append({
            'category': 'muscles',
            'figure': 4,
            'filename': 'os-arm-muscles-forearm.jpg',
            'usage': 'Músculos do Braço (Bíceps, Tríceps, Compartimentos Anterior e Posterior)',
            'alt': muscles_images[3]['alt']
        })
        time.sleep(2)
    
    # Figura 7: Intrinsic hand muscles
    print("\n📌 Figura 7 - Músculos Intrínsecos da Mão")
    if download_image(
        muscles_images[6]['url'],
        'public/anatomia-images/musculos-membro-superior/os-hand-intrinsic-muscles.jpg'
    ):
        downloads.append({
            'category': 'muscles',
            'figure': 7,
            'filename': 'os-hand-intrinsic-muscles.jpg',
            'usage': 'Músculos da Mão (Tenar, Hipotenar, Lumbricais, Interósseos)',
            'alt': muscles_images[6]['alt']
        })
        time.sleep(2)
    
    # ===== SISTEMA DE CONDUÇÃO CARDÍACA =====
    print("\n\n❤️  Sistema de Condução Cardíaca:")
    print("="*80)
    
    # Figura 3: Conduction cycle of the heart
    print("\n📌 Figura 3 - Ciclo de Condução Cardíaca")
    if download_image(
        cardiac_images[2]['url'],
        'public/anatomia-images/coracao/os-cardiac-conduction-system.jpg'
    ):
        downloads.append({
            'category': 'cardiac',
            'figure': 3,
            'filename': 'os-cardiac-conduction-system.jpg',
            'usage': 'Sistema de Condução Cardíaca completo',
            'alt': cardiac_images[2]['alt']
        })
        time.sleep(2)
    
    # Salva relatório do download
    with open('scripts/download-report.json', 'w', encoding='utf-8') as f:
        json.dump(downloads, f, indent=2, ensure_ascii=False)
    
    print("\n\n" + "="*80)
    print("✓ DOWNLOAD CONCLUÍDO!")
    print("="*80)
    print(f"Total de imagens baixadas: {len(downloads)}")
    print("\nMapeamento:")
    for item in downloads:
        print(f"  • {item['filename']}")
        print(f"    Uso: {item['usage']}")
    print("\nTodas as imagens são CC BY 4.0 do OpenStax Anatomy and Physiology 2e")
    print("Relatório salvo em: scripts/download-report.json")
    print("="*80)

if __name__ == "__main__":
    main()
