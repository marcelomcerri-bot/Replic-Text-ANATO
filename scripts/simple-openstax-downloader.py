#!/usr/bin/env python3
"""
Script simplificado para baixar imagens específicas do OpenStax
Usa apenas bibliotecas padrão do Python
"""

import urllib.request
import urllib.parse
import os
import json

class SimpleImageDownloader:
    def __init__(self):
        self.headers = {'User-Agent': 'Mozilla/5.0'}
        
    def download_image(self, url, save_path):
        """Download uma imagem da URL."""
        try:
            print(f"  Baixando: {url}")
            req = urllib.request.Request(url, headers=self.headers)
            
            with urllib.request.urlopen(req, timeout=30) as response:
                data = response.read()
                
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            
            with open(save_path, 'wb') as f:
                f.write(data)
                
            print(f"  ✓ Salvo: {save_path}")
            return True
        except Exception as e:
            print(f"  ✗ Erro: {str(e)}")
            return False
    
    def download_specific_images(self):
        """Baixa imagens específicas conhecidas do OpenStax."""
        print("\n" + "="*60)
        print("📥 BAIXANDO IMAGENS ESPECÍFICAS DO OPENSTAX")
        print("="*60)
        
        images_to_download = [
            {
                'category': 'musculos-membro-superior',
                'images': [
                    {
                        'url': 'https://openstax.org/apps/archive/20230828.173347/resources/0e0a1dddaa1cf5b5fe6f72f10a0e14c3df45fc0f',
                        'filename': 'openstax-shoulder-muscles-anterior.jpg',
                        'alt': 'Músculos do ombro - vista anterior',
                        'caption': 'Músculos que movem o úmero - vista anterior'
                    },
                    {
                        'url': 'https://openstax.org/apps/archive/20230828.173347/resources/d21a8c2e5c8d66f67fd2c47fef0d28e95cab3e6b',
                        'filename': 'openstax-shoulder-muscles-posterior.jpg',
                        'alt': 'Músculos do ombro - vista posterior',
                        'caption': 'Músculos que movem o úmero - vista posterior'
                    },
                ],
            },
            {
                'category': 'ossos-membro-superior',
                'images': [
                    {
                        'url': 'https://openstax.org/apps/archive/20230828.173347/resources/8b4c2d0c33a0f5c8d5db1a0b2e5a3f1c0d9e8f7a',
                        'filename': 'openstax-upper-limb-bones-complete.jpg',
                        'alt': 'Ossos do membro superior completo',
                        'caption': '30 ossos do membro superior'
                    },
                ],
            },
            {
                'category': 'arterias-veias-membro-superior',
                'images': [
                    {
                        'url': 'https://openstax.org/apps/archive/20230828.173347/resources/2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e',
                        'filename': 'openstax-upper-limb-arteries.jpg',
                        'alt': 'Artérias do membro superior',
                        'caption': 'Vascularização arterial do membro superior'
                    },
                ],
            },
        ]
        
        results = {}
        
        for category_data in images_to_download:
            category = category_data['category']
            output_dir = f"public/anatomia-images/{category}"
            results[category] = []
            
            print(f"\n📁 Categoria: {category}")
            
            for img_data in category_data['images']:
                save_path = os.path.join(output_dir, img_data['filename'])
                
                if self.download_image(img_data['url'], save_path):
                    results[category].append({
                        'file': img_data['filename'],
                        'path': f"/anatomia-images/{category}/{img_data['filename']}",
                        'alt': img_data['alt'],
                        'caption': img_data['caption'],
                        'credit': 'OpenStax Anatomy and Physiology 2e, CC BY 4.0'
                    })
        
        return results

if __name__ == "__main__":
    downloader = SimpleImageDownloader()
    results = downloader.download_specific_images()
    
    print("\n" + "="*60)
    print("✓ PROCESSO CONCLUÍDO")
    print("="*60)
    for category, images in results.items():
        print(f"  {category}: {len(images)} imagens")
    print("="*60)
