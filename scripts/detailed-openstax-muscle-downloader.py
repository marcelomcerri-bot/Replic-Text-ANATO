#!/usr/bin/env python3
"""
Script extremamente detalhado para baixar imagens específicas do OpenStax
para cada músculo do membro superior SEM DUPLICAÇÃO.

Fonte: OpenStax Anatomy and Physiology 2e (CC BY 4.0)
https://openstax.org/books/anatomy-and-physiology-2e
"""

import requests
from bs4 import BeautifulSoup
import os
import json
import time
import re
from urllib.parse import urljoin, urlparse

class DetailedOpenStaxDownloader:
    def __init__(self):
        self.base_url = "https://openstax.org"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        self.downloaded_images = {}  # Track para evitar duplicações
        
    def search_specific_structure(self, chapter_url, search_terms, exclude_terms=None):
        """
        Busca imagens específicas em uma página do OpenStax baseado em termos de busca.
        
        Args:
            chapter_url: URL do capítulo do OpenStax
            search_terms: Lista de termos que DEVEM estar presentes
            exclude_terms: Lista de termos que NÃO devem estar presentes
        """
        try:
            print(f"\n  🔍 Buscando em: {chapter_url}")
            print(f"     Termos: {', '.join(search_terms)}")
            if exclude_terms:
                print(f"     Excluindo: {', '.join(exclude_terms)}")
            
            response = self.session.get(chapter_url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            found_images = []
            
            # Procura por figuras com legendas
            for figure in soup.find_all('figure'):
                img_tag = figure.find('img')
                if not img_tag or not img_tag.get('src'):
                    continue
                
                # Extrai textos relevantes
                caption = ""
                caption_tag = figure.find('figcaption')
                if caption_tag:
                    caption = caption_tag.get_text(strip=True).lower()
                
                alt_text = (img_tag.get('alt') or '').lower()
                
                # Texto combinado para busca
                combined_text = f"{caption} {alt_text}"
                
                # Verifica se TODOS os termos de busca estão presentes
                has_all_terms = all(term.lower() in combined_text for term in search_terms)
                
                # Verifica se NÃO tem termos excluídos
                has_excluded = False
                if exclude_terms:
                    has_excluded = any(term.lower() in combined_text for term in exclude_terms)
                
                if has_all_terms and not has_excluded:
                    img_url = urljoin(self.base_url, img_tag['src'])
                    
                    found_images.append({
                        'url': img_url,
                        'alt': img_tag.get('alt', ''),
                        'caption': caption_tag.get_text(strip=True) if caption_tag else '',
                        'score': len(search_terms)  # Score baseado no número de termos encontrados
                    })
            
            # Ordena por score (mais termos encontrados = melhor)
            found_images.sort(key=lambda x: x['score'], reverse=True)
            
            return found_images
            
        except Exception as e:
            print(f"  ✗ Erro ao buscar: {str(e)}")
            return []
    
    def download_image(self, img_url, save_path):
        """Download uma imagem da URL e salva no caminho especificado."""
        try:
            # Verifica se já baixamos esta imagem
            if img_url in self.downloaded_images:
                print(f"  ⚠ Imagem já baixada anteriormente: {self.downloaded_images[img_url]}")
                return False
            
            print(f"  📥 Baixando: {img_url}")
            response = self.session.get(img_url, timeout=30)
            response.raise_for_status()
            
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            
            with open(save_path, 'wb') as f:
                f.write(response.content)
            
            self.downloaded_images[img_url] = save_path
            print(f"  ✓ Salvo em: {save_path}")
            return True
            
        except Exception as e:
            print(f"  ✗ Erro ao baixar {img_url}: {str(e)}")
            return False
    
    def download_muscles_by_structure(self):
        """Baixa imagens específicas para cada músculo do membro superior."""
        print("\n" + "="*80)
        print("🦾 BAIXANDO IMAGENS ESPECÍFICAS DE MÚSCULOS DO MEMBRO SUPERIOR")
        print("="*80)
        
        # URL principal do capítulo de músculos do membro superior
        main_url = "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs"
        
        output_dir = "public/anatomia-images/musculos-membro-superior"
        downloaded = []
        
        # Estrutura: cada músculo com seus termos de busca específicos
        muscle_searches = [
            # Músculos do Tórax e Ombro
            {
                'name': 'pectoralis-major',
                'display_name': 'Peitoral Maior',
                'search_terms': ['pectoralis major'],
                'exclude_terms': ['minor'],
                'filename': 'pectoralis-major-specific.jpg'
            },
            {
                'name': 'pectoralis-minor',
                'display_name': 'Peitoral Menor',
                'search_terms': ['pectoralis minor'],
                'exclude_terms': None,
                'filename': 'pectoralis-minor-specific.jpg'
            },
            {
                'name': 'deltoid',
                'display_name': 'Deltoide',
                'search_terms': ['deltoid'],
                'exclude_terms': None,
                'filename': 'deltoid-specific.jpg'
            },
            # Manguito Rotador
            {
                'name': 'supraspinatus',
                'display_name': 'Supraespinal',
                'search_terms': ['supraspinatus'],
                'exclude_terms': None,
                'filename': 'supraspinatus-specific.jpg'
            },
            {
                'name': 'infraspinatus',
                'display_name': 'Infraespinal',
                'search_terms': ['infraspinatus'],
                'exclude_terms': None,
                'filename': 'infraspinatus-specific.jpg'
            },
            {
                'name': 'teres-minor',
                'display_name': 'Redondo Menor',
                'search_terms': ['teres minor'],
                'exclude_terms': ['major'],
                'filename': 'teres-minor-specific.jpg'
            },
            {
                'name': 'subscapularis',
                'display_name': 'Subescapular',
                'search_terms': ['subscapularis'],
                'exclude_terms': None,
                'filename': 'subscapularis-specific.jpg'
            },
            {
                'name': 'rotator-cuff',
                'display_name': 'Manguito Rotador Completo',
                'search_terms': ['rotator cuff', 'sits'],
                'exclude_terms': None,
                'filename': 'rotator-cuff-complete.jpg'
            },
            # Músculos do Braço - Anterior
            {
                'name': 'biceps-brachii',
                'display_name': 'Bíceps Braquial',
                'search_terms': ['biceps brachii'],
                'exclude_terms': None,
                'filename': 'biceps-brachii-specific.jpg'
            },
            {
                'name': 'coracobrachialis',
                'display_name': 'Coracobraquial',
                'search_terms': ['coracobrachialis'],
                'exclude_terms': None,
                'filename': 'coracobrachialis-specific.jpg'
            },
            {
                'name': 'brachialis',
                'display_name': 'Braquial',
                'search_terms': ['brachialis'],
                'exclude_terms': ['biceps', 'triceps'],
                'filename': 'brachialis-specific.jpg'
            },
            # Músculos do Braço - Posterior
            {
                'name': 'triceps-brachii',
                'display_name': 'Tríceps Braquial',
                'search_terms': ['triceps brachii'],
                'exclude_terms': None,
                'filename': 'triceps-brachii-specific.jpg'
            },
            # Músculos do Antebraço - Flexores
            {
                'name': 'forearm-flexors',
                'display_name': 'Flexores do Antebraço',
                'search_terms': ['forearm', 'flexor'],
                'exclude_terms': ['extensor'],
                'filename': 'forearm-flexors-anterior.jpg'
            },
            {
                'name': 'pronator-teres',
                'display_name': 'Pronador Redondo',
                'search_terms': ['pronator teres'],
                'exclude_terms': ['quadratus'],
                'filename': 'pronator-teres-specific.jpg'
            },
            {
                'name': 'flexor-carpi-radialis',
                'display_name': 'Flexor Radial do Carpo',
                'search_terms': ['flexor carpi radialis'],
                'exclude_terms': None,
                'filename': 'flexor-carpi-radialis-specific.jpg'
            },
            {
                'name': 'flexor-carpi-ulnaris',
                'display_name': 'Flexor Ulnar do Carpo',
                'search_terms': ['flexor carpi ulnaris'],
                'exclude_terms': None,
                'filename': 'flexor-carpi-ulnaris-specific.jpg'
            },
            # Músculos do Antebraço - Extensores
            {
                'name': 'forearm-extensors',
                'display_name': 'Extensores do Antebraço',
                'search_terms': ['forearm', 'extensor'],
                'exclude_terms': ['flexor'],
                'filename': 'forearm-extensors-posterior.jpg'
            },
            {
                'name': 'extensor-carpi-radialis',
                'display_name': 'Extensor Radial do Carpo',
                'search_terms': ['extensor carpi radialis'],
                'exclude_terms': None,
                'filename': 'extensor-carpi-radialis-specific.jpg'
            },
            {
                'name': 'extensor-digitorum',
                'display_name': 'Extensor dos Dedos',
                'search_terms': ['extensor digitorum'],
                'exclude_terms': ['indicis', 'minimi'],
                'filename': 'extensor-digitorum-specific.jpg'
            },
            # Músculos da Mão
            {
                'name': 'hand-intrinsic',
                'display_name': 'Músculos Intrínsecos da Mão',
                'search_terms': ['hand', 'intrinsic'],
                'exclude_terms': None,
                'filename': 'hand-intrinsic-muscles.jpg'
            },
            {
                'name': 'thenar',
                'display_name': 'Eminência Tenar',
                'search_terms': ['thenar'],
                'exclude_terms': ['hypothenar'],
                'filename': 'thenar-muscles-specific.jpg'
            },
            {
                'name': 'hypothenar',
                'display_name': 'Eminência Hipotenar',
                'search_terms': ['hypothenar'],
                'exclude_terms': None,
                'filename': 'hypothenar-muscles-specific.jpg'
            },
            {
                'name': 'lumbricals',
                'display_name': 'Lumbricais',
                'search_terms': ['lumbrical'],
                'exclude_terms': None,
                'filename': 'lumbricals-specific.jpg'
            },
            {
                'name': 'interossei',
                'display_name': 'Interósseos',
                'search_terms': ['interossei', 'interosseous'],
                'exclude_terms': None,
                'filename': 'interossei-specific.jpg'
            },
        ]
        
        for muscle_info in muscle_searches:
            print(f"\n{'='*80}")
            print(f"🔍 Buscando: {muscle_info['display_name']}")
            print(f"{'='*80}")
            
            images = self.search_specific_structure(
                main_url,
                muscle_info['search_terms'],
                muscle_info['exclude_terms']
            )
            
            if images:
                # Pega a melhor imagem (primeira do resultado ordenado)
                best_image = images[0]
                save_path = os.path.join(output_dir, muscle_info['filename'])
                
                if self.download_image(best_image['url'], save_path):
                    downloaded.append({
                        'muscle': muscle_info['name'],
                        'display_name': muscle_info['display_name'],
                        'file': muscle_info['filename'],
                        'path': f"/anatomia-images/musculos-membro-superior/{muscle_info['filename']}",
                        'alt': best_image['alt'],
                        'caption': best_image['caption'],
                        'credit': 'OpenStax Anatomy and Physiology 2e, CC BY 4.0'
                    })
                    time.sleep(2)  # Respeita o servidor
                else:
                    print(f"  ⚠ Imagem para {muscle_info['display_name']} já existe ou falhou")
            else:
                print(f"  ⚠ Nenhuma imagem encontrada para {muscle_info['display_name']}")
        
        # Salva metadata
        metadata_path = os.path.join(output_dir, 'detailed-muscles-metadata.json')
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(downloaded, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ {len(downloaded)} imagens específicas de músculos baixadas")
        return downloaded
    
    def download_cardiac_conduction_images(self):
        """Baixa imagens do sistema de condução cardíaca."""
        print("\n" + "="*80)
        print("❤️  BAIXANDO IMAGENS DO SISTEMA DE CONDUÇÃO CARDÍACA")
        print("="*80)
        
        cardiac_url = "https://openstax.org/books/anatomy-and-physiology-2e/pages/19-2-cardiac-muscle-and-electrical-activity"
        output_dir = "public/anatomia-images/coracao"
        
        downloaded = []
        
        cardiac_searches = [
            {
                'name': 'conduction-system',
                'display_name': 'Sistema de Condução Cardíaca Completo',
                'search_terms': ['conduction system', 'cardiac'],
                'exclude_terms': None,
                'filename': 'cardiac-conduction-system.jpg'
            },
            {
                'name': 'sa-node',
                'display_name': 'Nó Sinoatrial (SA)',
                'search_terms': ['sinoatrial', 'sa node'],
                'exclude_terms': None,
                'filename': 'sinoatrial-node.jpg'
            },
            {
                'name': 'av-node',
                'display_name': 'Nó Atrioventricular (AV)',
                'search_terms': ['atrioventricular', 'av node'],
                'exclude_terms': None,
                'filename': 'atrioventricular-node.jpg'
            },
            {
                'name': 'bundle-of-his',
                'display_name': 'Feixe de His',
                'search_terms': ['bundle of his', 'av bundle'],
                'exclude_terms': None,
                'filename': 'bundle-of-his.jpg'
            },
            {
                'name': 'purkinje-fibers',
                'display_name': 'Fibras de Purkinje',
                'search_terms': ['purkinje'],
                'exclude_terms': None,
                'filename': 'purkinje-fibers.jpg'
            },
        ]
        
        for cardiac_info in cardiac_searches:
            print(f"\n{'='*80}")
            print(f"🔍 Buscando: {cardiac_info['display_name']}")
            print(f"{'='*80}")
            
            images = self.search_specific_structure(
                cardiac_url,
                cardiac_info['search_terms'],
                cardiac_info['exclude_terms']
            )
            
            if images:
                best_image = images[0]
                save_path = os.path.join(output_dir, cardiac_info['filename'])
                
                if self.download_image(best_image['url'], save_path):
                    downloaded.append({
                        'structure': cardiac_info['name'],
                        'display_name': cardiac_info['display_name'],
                        'file': cardiac_info['filename'],
                        'path': f"/anatomia-images/coracao/{cardiac_info['filename']}",
                        'alt': best_image['alt'],
                        'caption': best_image['caption'],
                        'credit': 'OpenStax Anatomy and Physiology 2e, CC BY 4.0'
                    })
                    time.sleep(2)
            else:
                print(f"  ⚠ Nenhuma imagem encontrada para {cardiac_info['display_name']}")
        
        # Salva metadata
        metadata_path = os.path.join(output_dir, 'cardiac-conduction-metadata.json')
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(downloaded, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ {len(downloaded)} imagens de condução cardíaca baixadas")
        return downloaded
    
    def run(self):
        """Executa o download de todas as imagens específicas."""
        print("\n" + "="*80)
        print("📥 INICIANDO DOWNLOAD DETALHADO DE IMAGENS DO OPENSTAX")
        print("="*80)
        
        muscles = self.download_muscles_by_structure()
        cardiac = self.download_cardiac_conduction_images()
        
        print("\n" + "="*80)
        print("✓ DOWNLOAD CONCLUÍDO!")
        print("="*80)
        print(f"Total de imagens baixadas:")
        print(f"  - Músculos: {len(muscles)}")
        print(f"  - Sistema de Condução Cardíaca: {len(cardiac)}")
        print(f"  - TOTAL: {len(muscles) + len(cardiac)}")
        print("\nTodas as imagens são licenciadas sob CC BY 4.0 do OpenStax")
        print("Nenhuma imagem foi duplicada!")
        print("="*80)

if __name__ == "__main__":
    downloader = DetailedOpenStaxDownloader()
    downloader.run()
