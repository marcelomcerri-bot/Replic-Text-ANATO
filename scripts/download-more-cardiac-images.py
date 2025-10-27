#!/usr/bin/env python3
"""
Script para baixar mais imagens do sistema de condução cardíaca do OpenStax.
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
    print("❤️  BAIXANDO IMAGENS ADICIONAIS DO SISTEMA DE CONDUÇÃO CARDÍACA")
    print("="*80)
    
    # Carrega a lista de todas as imagens
    with open('scripts/openstax-all-images-list.json', 'r', encoding='utf-8') as f:
        all_images = json.load(f)
    
    cardiac_images = all_images["Sistema de Condução Cardíaca"]
    
    downloads = []
    output_dir = "public/anatomia-images/coracao"
    
    # Figura 1: Estrutura do músculo cardíaco (pode mostrar discos intercalados)
    print("\n📌 Figura 1 - Estrutura do Músculo Cardíaco")
    if download_image(
        cardiac_images[0]['url'],
        f'{output_dir}/os-cardiac-muscle-structure.jpg'
    ):
        downloads.append({
            'figure': 1,
            'filename': 'os-cardiac-muscle-structure.jpg',
            'usage': 'Estrutura do músculo cardíaco com discos intercalados',
            'alt': cardiac_images[0]['alt']
        })
        time.sleep(2)
    
    # Figura 2: Vista frontal do coração (pode mostrar sistema de condução)
    print("\n📌 Figura 2 - Vista Frontal do Coração")
    if download_image(
        cardiac_images[1]['url'],
        f'{output_dir}/os-heart-frontal-section.jpg'
    ):
        downloads.append({
            'figure': 2,
            'filename': 'os-heart-frontal-section.jpg',
            'usage': 'Vista frontal do coração com partes principais',
            'alt': cardiac_images[1]['alt']
        })
        time.sleep(2)
    
    # Figura 4: Gráfico de potencial de membrana (eletrofisiologia)
    print("\n📌 Figura 4 - Potencial de Ação Cardíaco")
    if download_image(
        cardiac_images[3]['url'],
        f'{output_dir}/os-cardiac-action-potential.jpg'
    ):
        downloads.append({
            'figure': 4,
            'filename': 'os-cardiac-action-potential.jpg',
            'usage': 'Potencial de ação cardíaco - mudança no potencial de membrana',
            'alt': cardiac_images[3]['alt']
        })
        time.sleep(2)
    
    print("\n\n" + "="*80)
    print("✓ DOWNLOAD CONCLUÍDO!")
    print("="*80)
    print(f"Total de imagens adicionais baixadas: {len(downloads)}")
    print("\nImagens baixadas:")
    for item in downloads:
        print(f"  • {item['filename']}")
        print(f"    Uso: {item['usage']}")
    print("\nTodas as imagens são CC BY 4.0 do OpenStax Anatomy and Physiology 2e")
    print("="*80)
    
    # Salva relatório
    with open('scripts/cardiac-additional-downloads.json', 'w', encoding='utf-8') as f:
        json.dump(downloads, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    main()
