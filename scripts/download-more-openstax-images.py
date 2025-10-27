#!/usr/bin/env python3
"""
Script para baixar MAIS imagens do OpenStax sobre o membro superior
Inclui cintura escapular, articulações, e detalhes anatômicos
"""

import requests
from bs4 import BeautifulSoup
import os
import re
from urllib.parse import urljoin, urlparse
import time
import json

BASE_URL = "https://openstax.org"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

ADDITIONAL_CHAPTERS = {
    'pectoral_girdle': {
        'url': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-1-the-pectoral-girdle',
        'output_dir': 'public/anatomia-images/ossos-membro-superior',
        'prefix': 'openstax-pectoral-girdle'
    },
    'joints': {
        'url': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/9-4-synovial-joints',
        'output_dir': 'public/anatomia-images/ossos-membro-superior',
        'prefix': 'openstax-joints'
    },
}

def sanitize_filename(text):
    text = re.sub(r'[^\w\s-]', '', text.lower())
    text = re.sub(r'[-\s]+', '-', text)
    return text[:50]

def download_image(img_url, save_path):
    try:
        response = requests.get(img_url, headers=HEADERS, timeout=30)
        response.raise_for_status()
        
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✓ Baixada: {os.path.basename(save_path)}")
        return True
    except Exception as e:
        print(f"✗ Erro ao baixar {img_url}: {str(e)}")
        return False

def extract_images_from_page(url, output_dir, prefix):
    print(f"\n{'='*60}")
    print(f"Processando: {url}")
    print(f"{'='*60}\n")
    
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        images_data = []
        
        figures = soup.find_all('figure')
        print(f"Encontradas {len(figures)} figuras na página\n")
        
        for idx, figure in enumerate(figures, 1):
            img = figure.find('img')
            if not img or not img.get('src'):
                continue
            
            img_url = urljoin(BASE_URL, img['src'])
            
            if 'cnx.org' not in img_url and 'openstax.org' not in img_url:
                continue
            
            figcaption = figure.find('figcaption')
            caption_text = figcaption.get_text(strip=True) if figcaption else f"Figure {idx}"
            
            figure_num = re.search(r'Figure\s+(\d+\.?[\d]*)', caption_text)
            if figure_num:
                filename = f"{prefix}-figure-{figure_num.group(1).replace('.', '-')}"
            else:
                filename = f"{prefix}-image-{idx:02d}"
            
            img_ext = os.path.splitext(urlparse(img_url).path)[1] or '.jpg'
            save_path = os.path.join(output_dir, f"{filename}{img_ext}")
            
            if os.path.exists(save_path):
                print(f"⊘ Já existe: {filename}{img_ext}")
                continue
            
            alt_text = img.get('alt', caption_text)
            
            if download_image(img_url, save_path):
                images_data.append({
                    'filename': f"{filename}{img_ext}",
                    'path': save_path,
                    'caption': caption_text[:200],
                    'alt': alt_text,
                    'source_url': url,
                    'credit': 'OpenStax Anatomy and Physiology 2e, CC BY 4.0'
                })
            
            time.sleep(0.5)
        
        if images_data:
            metadata_file = os.path.join(output_dir, f'{prefix}-metadata.json')
            with open(metadata_file, 'w', encoding='utf-8') as f:
                json.dump(images_data, f, indent=2, ensure_ascii=False)
            
            print(f"\n✓ Metadados salvos em: {metadata_file}")
        
        print(f"✓ Total de imagens NOVAS baixadas: {len(images_data)}\n")
        
        return images_data
        
    except Exception as e:
        print(f"✗ Erro ao processar página {url}: {str(e)}")
        return []

def main():
    print("\n" + "="*60)
    print("DOWNLOAD DE IMAGENS ADICIONAIS DO OPENSTAX")
    print("Cintura Escapular e Articulações")
    print("Licença: CC BY 4.0")
    print("="*60)
    
    all_results = {}
    
    for chapter_name, chapter_info in ADDITIONAL_CHAPTERS.items():
        results = extract_images_from_page(
            chapter_info['url'],
            chapter_info['output_dir'],
            chapter_info['prefix']
        )
        all_results[chapter_name] = results
    
    print("\n" + "="*60)
    print("RESUMO DO DOWNLOAD")
    print("="*60)
    total = 0
    for chapter_name, results in all_results.items():
        print(f"{chapter_name.upper()}: {len(results)} novas imagens")
        total += len(results)
    print(f"TOTAL: {total} novas imagens")
    print("="*60 + "\n")
    
    print("✓ Download concluído!")
    print("\nLembre-se de adicionar os créditos apropriados:")
    print("'Fonte: OpenStax Anatomy and Physiology 2e, CC BY 4.0'")
    print("'https://openstax.org/books/anatomy-and-physiology-2e'\n")

if __name__ == "__main__":
    main()
