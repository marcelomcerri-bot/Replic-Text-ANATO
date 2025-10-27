#!/usr/bin/env python3
"""
Script para baixar imagens de articulações específicas do OpenStax
Articulações do Ombro, Cotovelo e Punho
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

# Página com articulações específicas (ombro, cotovelo, punho)
JOINTS_URL = 'https://openstax.org/books/anatomy-and-physiology-2e/pages/9-6-anatomy-of-selected-synovial-joints'
OUTPUT_DIR = 'public/anatomia-images/ossos-membro-superior'
PREFIX = 'openstax-specific-joints'

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

def extract_joint_images():
    print(f"\n{'='*60}")
    print(f"Processando: {JOINTS_URL}")
    print(f"Buscando imagens de Articulações Específicas")
    print(f"{'='*60}\n")
    
    try:
        response = requests.get(JOINTS_URL, headers=HEADERS, timeout=30)
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
            
            # Identificar articulações específicas do membro superior
            is_upper_limb = any(keyword in caption_text.lower() for keyword in 
                              ['shoulder', 'glenohumeral', 'elbow', 'wrist', 
                               'radiocarpal', 'humerus', 'radius', 'ulna'])
            
            if not is_upper_limb:
                print(f"⊘ Pulando (não é membro superior): {caption_text[:50]}...")
                continue
            
            figure_num = re.search(r'Figure\s+(\d+\.?[\d]*)', caption_text)
            if figure_num:
                filename = f"{PREFIX}-figure-{figure_num.group(1).replace('.', '-')}"
            else:
                filename = f"{PREFIX}-image-{idx:02d}"
            
            img_ext = os.path.splitext(urlparse(img_url).path)[1] or '.jpg'
            save_path = os.path.join(OUTPUT_DIR, f"{filename}{img_ext}")
            
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
                    'source_url': JOINTS_URL,
                    'credit': 'OpenStax Anatomy and Physiology 2e, CC BY 4.0'
                })
            
            time.sleep(0.5)
        
        if images_data:
            metadata_file = os.path.join(OUTPUT_DIR, f'{PREFIX}-metadata.json')
            with open(metadata_file, 'w', encoding='utf-8') as f:
                json.dump(images_data, f, indent=2, ensure_ascii=False)
            
            print(f"\n✓ Metadados salvos em: {metadata_file}")
        
        print(f"✓ Total de imagens NOVAS baixadas: {len(images_data)}\n")
        
        return images_data
        
    except Exception as e:
        print(f"✗ Erro ao processar página: {str(e)}")
        return []

def main():
    print("\n" + "="*60)
    print("DOWNLOAD DE IMAGENS DE ARTICULAÇÕES ESPECÍFICAS")
    print("Ombro, Cotovelo e Punho - OpenStax")
    print("Licença: CC BY 4.0")
    print("="*60)
    
    results = extract_joint_images()
    
    print("\n" + "="*60)
    print(f"TOTAL: {len(results)} novas imagens de articulações")
    print("="*60 + "\n")
    
    print("✓ Download concluído!")

if __name__ == "__main__":
    main()
