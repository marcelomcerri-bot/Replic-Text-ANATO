#!/usr/bin/env python3
"""
Script para listar TODAS as imagens disponíveis no OpenStax
para depois mapear manualmente.
"""

import requests
from bs4 import BeautifulSoup
import json
from urllib.parse import urljoin

class ImageLister:
    def __init__(self):
        self.headers = {'User-Agent': 'Mozilla/5.0'}
        self.session = requests.Session()
        self.session.headers.update(self.headers)
    
    def list_all_images_from_chapter(self, url, chapter_name):
        """Lista todas as imagens de um capítulo com suas informações."""
        print(f"\n{'='*80}")
        print(f"📖 Capítulo: {chapter_name}")
        print(f"🔗 URL: {url}")
        print(f"{'='*80}\n")
        
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            images = []
            
            # Busca todas as figuras
            figures = soup.find_all('figure')
            print(f"📊 Total de figuras encontradas: {len(figures)}\n")
            
            for idx, figure in enumerate(figures, 1):
                img_tag = figure.find('img')
                if not img_tag or not img_tag.get('src'):
                    continue
                
                img_url = urljoin('https://openstax.org', img_tag['src'])
                
                # Extrai caption
                caption = ""
                caption_tag = figure.find('figcaption')
                if caption_tag:
                    caption = caption_tag.get_text(strip=True)
                
                alt_text = img_tag.get('alt', '')
                
                image_info = {
                    'index': idx,
                    'url': img_url,
                    'alt': alt_text,
                    'caption': caption[:200] + '...' if len(caption) > 200 else caption
                }
                
                images.append(image_info)
                
                print(f"Figura {idx}:")
                print(f"  Alt: {alt_text}")
                print(f"  Caption: {caption[:150]}...")
                print(f"  URL: {img_url}\n")
            
            return images
            
        except Exception as e:
            print(f"✗ Erro: {str(e)}")
            return []
    
    def run(self):
        """Lista imagens de todos os capítulos relevantes."""
        chapters = [
            {
                'name': 'Músculos do Membro Superior',
                'url': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs'
            },
            {
                'name': 'Sistema de Condução Cardíaca',
                'url': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity'
            },
        ]
        
        all_results = {}
        
        for chapter in chapters:
            images = self.list_all_images_from_chapter(chapter['url'], chapter['name'])
            all_results[chapter['name']] = images
        
        # Salva resultado
        with open('scripts/openstax-all-images-list.json', 'w', encoding='utf-8') as f:
            json.dump(all_results, f, indent=2, ensure_ascii=False)
        
        print(f"\n{'='*80}")
        print("✓ Lista completa salva em: scripts/openstax-all-images-list.json")
        print(f"{'='*80}")

if __name__ == "__main__":
    lister = ImageLister()
    lister.run()
