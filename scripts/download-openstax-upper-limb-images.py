#!/usr/bin/env python3
"""
Script para baixar imagens do OpenStax Anatomy and Physiology 2e
para Músculos, Ossos e Artérias/Veias do Membro Superior.

Fonte: OpenStax Anatomy and Physiology 2e (CC BY 4.0)
https://openstax.org/details/books/anatomy-and-physiology-2e
"""

import requests
from bs4 import BeautifulSoup
import os
import json
import time
import re
from urllib.parse import urljoin, urlparse

class OpenStaxImageDownloader:
    def __init__(self):
        self.base_url = "https://openstax.org"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        
    def download_image(self, img_url, save_path):
        """Download uma imagem da URL e salva no caminho especificado."""
        try:
            print(f"  Baixando: {img_url}")
            response = self.session.get(img_url, timeout=30)
            response.raise_for_status()
            
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            
            with open(save_path, 'wb') as f:
                f.write(response.content)
            print(f"  ✓ Salvo em: {save_path}")
            return True
        except Exception as e:
            print(f"  ✗ Erro ao baixar {img_url}: {str(e)}")
            return False
    
    def extract_images_from_page(self, url, keyword_filter=None):
        """Extrai todas as imagens de uma página do OpenStax."""
        try:
            print(f"\n📖 Acessando: {url}")
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            images = []
            
            for figure in soup.find_all(['figure', 'img']):
                img_tag = figure.find('img') if figure.name == 'figure' else figure
                if not img_tag or not img_tag.get('src'):
                    continue
                
                img_url = urljoin(self.base_url, img_tag['src'])
                
                if keyword_filter:
                    img_alt = (img_tag.get('alt') or '').lower()
                    if not any(kw.lower() in img_alt for kw in keyword_filter):
                        continue
                
                caption = ""
                if figure.name == 'figure':
                    caption_tag = figure.find('figcaption')
                    if caption_tag:
                        caption = caption_tag.get_text(strip=True)
                
                alt_text = img_tag.get('alt', '')
                
                images.append({
                    'url': img_url,
                    'alt': alt_text,
                    'caption': caption
                })
            
            return images
        except Exception as e:
            print(f"✗ Erro ao acessar página: {str(e)}")
            return []
    
    def download_muscle_images(self):
        """Baixa imagens de músculos do membro superior."""
        print("\n" + "="*60)
        print("🦾 BAIXANDO IMAGENS DE MÚSCULOS DO MEMBRO SUPERIOR")
        print("="*60)
        
        url = "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs"
        
        keywords = [
            'muscle', 'pectoral', 'shoulder', 'arm', 'forearm', 'hand',
            'rotator cuff', 'biceps', 'triceps', 'deltoid', 'upper limb'
        ]
        
        images = self.extract_images_from_page(url, keywords)
        output_dir = "public/anatomia-images/musculos-membro-superior"
        
        downloaded = []
        for idx, img_data in enumerate(images, 1):
            filename = f"openstax-upper-limb-muscles-{idx}.jpg"
            save_path = os.path.join(output_dir, filename)
            
            if self.download_image(img_data['url'], save_path):
                downloaded.append({
                    'file': filename,
                    'path': f"/anatomia-images/musculos-membro-superior/{filename}",
                    'alt': img_data['alt'],
                    'caption': img_data['caption'],
                    'credit': 'OpenStax Anatomy and Physiology 2e, CC BY 4.0'
                })
                time.sleep(1)
        
        metadata_path = os.path.join(output_dir, 'openstax-muscles-metadata.json')
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(downloaded, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ {len(downloaded)} imagens de músculos baixadas")
        return downloaded
    
    def download_bone_images(self):
        """Baixa imagens de ossos do membro superior."""
        print("\n" + "="*60)
        print("🦴 BAIXANDO IMAGENS DE OSSOS DO MEMBRO SUPERIOR")
        print("="*60)
        
        url = "https://openstax.org/books/anatomy-and-physiology-2e/pages/8-2-bones-of-the-upper-limb"
        
        keywords = [
            'bone', 'humerus', 'radius', 'ulna', 'carpal', 'metacarpal',
            'phalanges', 'clavicle', 'scapula', 'upper limb', 'arm', 'forearm', 'hand'
        ]
        
        images = self.extract_images_from_page(url, keywords)
        output_dir = "public/anatomia-images/ossos-membro-superior"
        
        downloaded = []
        for idx, img_data in enumerate(images, 1):
            filename = f"openstax-upper-limb-bones-{idx}.jpg"
            save_path = os.path.join(output_dir, filename)
            
            if self.download_image(img_data['url'], save_path):
                downloaded.append({
                    'file': filename,
                    'path': f"/anatomia-images/ossos-membro-superior/{filename}",
                    'alt': img_data['alt'],
                    'caption': img_data['caption'],
                    'credit': 'OpenStax Anatomy and Physiology 2e, CC BY 4.0'
                })
                time.sleep(1)
        
        metadata_path = os.path.join(output_dir, 'openstax-bones-new-metadata.json')
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(downloaded, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ {len(downloaded)} imagens de ossos baixadas")
        return downloaded
    
    def download_vessel_images(self):
        """Baixa imagens de artérias e veias do membro superior."""
        print("\n" + "="*60)
        print("🩸 BAIXANDO IMAGENS DE ARTÉRIAS E VEIAS DO MEMBRO SUPERIOR")
        print("="*60)
        
        url = "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways"
        
        keywords = [
            'artery', 'vein', 'vessel', 'upper limb', 'arm', 'brachial',
            'radial', 'ulnar', 'subclavian', 'axillary', 'cephalic', 'basilic'
        ]
        
        images = self.extract_images_from_page(url, keywords)
        output_dir = "public/anatomia-images/arterias-veias-membro-superior"
        
        downloaded = []
        for idx, img_data in enumerate(images, 1):
            filename = f"openstax-upper-limb-vessels-new-{idx}.jpg"
            save_path = os.path.join(output_dir, filename)
            
            if self.download_image(img_data['url'], save_path):
                downloaded.append({
                    'file': filename,
                    'path': f"/anatomia-images/arterias-veias-membro-superior/{filename}",
                    'alt': img_data['alt'],
                    'caption': img_data['caption'],
                    'credit': 'OpenStax Anatomy and Physiology 2e, CC BY 4.0'
                })
                time.sleep(1)
        
        metadata_path = os.path.join(output_dir, 'openstax-vessels-new-metadata.json')
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(downloaded, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ {len(downloaded)} imagens de vasos baixadas")
        return downloaded
    
    def run(self):
        """Executa o download de todas as imagens."""
        print("\n" + "="*60)
        print("📥 INICIANDO DOWNLOAD DE IMAGENS DO OPENSTAX")
        print("="*60)
        
        muscles = self.download_muscle_images()
        bones = self.download_bone_images()
        vessels = self.download_vessel_images()
        
        print("\n" + "="*60)
        print("✓ DOWNLOAD CONCLUÍDO!")
        print("="*60)
        print(f"Total de imagens baixadas:")
        print(f"  - Músculos: {len(muscles)}")
        print(f"  - Ossos: {len(bones)}")
        print(f"  - Artérias/Veias: {len(vessels)}")
        print(f"  - TOTAL: {len(muscles) + len(bones) + len(vessels)}")
        print("\nTodas as imagens são licenciadas sob CC BY 4.0 do OpenStax")
        print("="*60)

if __name__ == "__main__":
    downloader = OpenStaxImageDownloader()
    downloader.run()
