#!/usr/bin/env python3
"""
Script to download specific anatomical images from OpenStax for upper limb topics.
This script ensures each topic gets unique, relevant images without duplicates.
"""

import requests
from bs4 import BeautifulSoup
import os
import re
import json
from urllib.parse import urljoin
import time

# OpenStax pages for upper limb anatomy
OPENSTAX_PAGES = {
    'pectoral_girdle': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-1-the-pectoral-girdle',
    'upper_limb_bones': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-2-bones-of-the-upper-limb',
    'synovial_joints': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/9-4-synovial-joints',
    'pectoral_muscles': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs',
    'upper_limb_circulation': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways',
}

# Mapping of anatomical structures to search keywords
STRUCTURE_KEYWORDS = {
    # Bones
    'clavicula': ['clavicle', 'pectoral girdle'],
    'escapula': ['scapula', 'shoulder blade'],
    'umero': ['humerus', 'upper arm bone'],
    'radio': ['radius', 'forearm'],
    'ulna': ['ulna', 'forearm'],
    'carpo': ['carpal', 'wrist bones'],
    'metacarpo': ['metacarpal', 'hand bones'],
    'falanges': ['phalanges', 'finger bones'],
    
    # Muscles
    'peitoral_maior': ['pectoralis major', 'chest muscle'],
    'peitoral_menor': ['pectoralis minor'],
    'deltoide': ['deltoid', 'shoulder muscle'],
    'supraespinal': ['supraspinatus', 'rotator cuff'],
    'infraespinal': ['infraspinatus', 'rotator cuff'],
    'redondo_menor': ['teres minor', 'rotator cuff'],
    'subescapular': ['subscapularis', 'rotator cuff'],
    'biceps': ['biceps brachii', 'arm muscle'],
    'triceps': ['triceps brachii', 'arm muscle'],
    'braquial': ['brachialis'],
    'coracobraquial': ['coracobrachialis'],
    
    # Vessels
    'subclavia': ['subclavian artery', 'subclavian'],
    'axilar': ['axillary artery', 'axillary'],
    'braquial': ['brachial artery', 'brachial'],
    'radial_artery': ['radial artery', 'wrist pulse'],
    'ulnar_artery': ['ulnar artery'],
    'veias_superficiais': ['cephalic vein', 'basilic vein', 'superficial veins upper'],
    'veias_profundas': ['deep veins upper limb', 'venous drainage'],
}

def download_image(url, filepath):
    """Download an image from URL to filepath."""
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"✓ Downloaded: {filepath}")
        return True
    except Exception as e:
        print(f"✗ Failed to download {url}: {e}")
        return False

def fetch_images_from_openstax_page(url, keywords):
    """
    Fetch images from an OpenStax page that match specific keywords.
    Returns list of (image_url, caption, figure_id) tuples.
    """
    try:
        print(f"\nFetching page: {url}")
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        images_found = []
        
        # Find all figure elements
        figures = soup.find_all('figure', class_='splash')
        figures.extend(soup.find_all('figure', {'data-type': 'figure'}))
        
        for figure in figures:
            img_tag = figure.find('img')
            if not img_tag or not img_tag.get('src'):
                continue
            
            img_url = img_tag.get('src')
            if img_url.startswith('//'):
                img_url = 'https:' + img_url
            elif img_url.startswith('/'):
                img_url = urljoin(url, img_url)
            
            # Get caption text
            caption_elem = figure.find('figcaption')
            caption = caption_elem.get_text(strip=True) if caption_elem else ''
            
            # Get figure ID
            figure_id = figure.get('id', '')
            
            # Check if any keyword matches the caption or alt text
            alt_text = img_tag.get('alt', '').lower()
            caption_lower = caption.lower()
            
            # Skip lower limb images
            if any(term in caption_lower or term in alt_text for term in ['lower limb', 'leg', 'thigh', 'femur', 'tibia', 'fibula', 'foot', 'ankle']):
                print(f"  ✗ Skipping lower limb image: {caption[:60]}")
                continue
            
            for keyword in keywords:
                if keyword.lower() in caption_lower or keyword.lower() in alt_text:
                    images_found.append({
                        'url': img_url,
                        'caption': caption,
                        'figure_id': figure_id,
                        'matched_keyword': keyword
                    })
                    print(f"  ✓ Found match for '{keyword}': {caption[:60]}...")
                    break
        
        return images_found
    
    except Exception as e:
        print(f"Error fetching page {url}: {e}")
        return []

def main():
    """Main function to download and organize images."""
    
    print("=" * 80)
    print("UPPER LIMB IMAGE DOWNLOADER - OpenStax Only")
    print("This script downloads specific images for each anatomical structure")
    print("=" * 80)
    
    # Track downloaded images to avoid duplicates
    downloaded_images = {}
    image_mapping = {
        'musculos-membro-superior': {},
        'ossos-membro-superior': {},
        'arterias-veias-membro-superior': {}
    }
    
    # Download BONE images
    print("\n" + "=" * 80)
    print("DOWNLOADING BONE IMAGES")
    print("=" * 80)
    
    bone_structures = {
        'Clavícula': ['clavicula'],
        'Escápula': ['escapula'],
        'Úmero': ['umero'],
        'Ulna': ['ulna'],
        'Rádio': ['radio'],
        'Ossos do Carpo': ['carpo'],
        'Metacarpos': ['metacarpo'],
        'Falanges': ['falanges'],
    }
    
    for structure, keywords_keys in bone_structures.items():
        print(f"\n--- Searching for: {structure} ---")
        all_keywords = []
        for key in keywords_keys:
            all_keywords.extend(STRUCTURE_KEYWORDS.get(key, []))
        
        # Search in relevant OpenStax pages
        for page_name in ['pectoral_girdle', 'upper_limb_bones', 'synovial_joints']:
            images = fetch_images_from_openstax_page(OPENSTAX_PAGES[page_name], all_keywords)
            
            if images:
                # Download first unique image
                for img_data in images:
                    img_url = img_data['url']
                    if img_url not in downloaded_images:
                        filename = f"{structure.lower().replace(' ', '_').replace('ó', 'o').replace('í', 'i').replace('ú', 'u')}.jpg"
                        filepath = f"public/anatomia-images/ossos-membro-superior/{filename}"
                        
                        if download_image(img_url, filepath):
                            downloaded_images[img_url] = filepath
                            if structure not in image_mapping['ossos-membro-superior']:
                                image_mapping['ossos-membro-superior'][structure] = []
                            image_mapping['ossos-membro-superior'][structure].append({
                                'src': f"/anatomia-images/ossos-membro-superior/{filename}",
                                'legend': img_data['caption'][:100],
                                'alt': structure
                            })
                            break  # Only download one image per structure
                break
        
        time.sleep(0.5)  # Be nice to the server
    
    # Download MUSCLE images
    print("\n" + "=" * 80)
    print("DOWNLOADING MUSCLE IMAGES")
    print("=" * 80)
    
    muscle_structures = {
        'Músculo Peitoral Maior': ['peitoral_maior'],
        'Músculo Peitoral Menor': ['peitoral_menor'],
        'Músculo Deltoide': ['deltoide'],
        'Músculo Supraespinal': ['supraespinal'],
        'Músculo Infraespinal': ['infraespinal'],
        'Músculo Redondo Menor': ['redondo_menor'],
        'Músculo Subescapular': ['subescapular'],
        'Músculo Bíceps Braquial': ['biceps'],
        'Músculo Tríceps Braquial': ['triceps'],
        'Músculo Braquial': ['braquial'],
        'Músculo Coracobraquial': ['coracobraquial'],
    }
    
    for structure, keywords_keys in muscle_structures.items():
        print(f"\n--- Searching for: {structure} ---")
        all_keywords = []
        for key in keywords_keys:
            all_keywords.extend(STRUCTURE_KEYWORDS.get(key, []))
        
        images = fetch_images_from_openstax_page(OPENSTAX_PAGES['pectoral_muscles'], all_keywords)
        
        if images:
            for img_data in images:
                img_url = img_data['url']
                if img_url not in downloaded_images:
                    filename = f"{structure.lower().replace(' ', '_').replace('ú', 'u').replace('í', 'i').replace('ó', 'o')}.jpg"
                    filepath = f"public/anatomia-images/musculos-membro-superior/{filename}"
                    
                    if download_image(img_url, filepath):
                        downloaded_images[img_url] = filepath
                        if structure not in image_mapping['musculos-membro-superior']:
                            image_mapping['musculos-membro-superior'][structure] = []
                        image_mapping['musculos-membro-superior'][structure].append({
                            'src': f"/anatomia-images/musculos-membro-superior/{filename}",
                            'legend': img_data['caption'][:100],
                            'alt': structure
                        })
                        break
            break
        
        time.sleep(0.5)
    
    # Download VESSEL images
    print("\n" + "=" * 80)
    print("DOWNLOADING VESSEL IMAGES (UPPER LIMB ONLY)")
    print("=" * 80)
    
    vessel_structures = {
        'Artéria Subclávia': ['subclavia'],
        'Artéria Axilar': ['axilar'],
        'Artéria Braquial': ['braquial'],
        'Artéria Radial': ['radial_artery'],
        'Artéria Ulnar': ['ulnar_artery'],
        'Veias Superficiais': ['veias_superficiais'],
        'Veias Profundas': ['veias_profundas'],
    }
    
    for structure, keywords_keys in vessel_structures.items():
        print(f"\n--- Searching for: {structure} ---")
        all_keywords = []
        for key in keywords_keys:
            all_keywords.extend(STRUCTURE_KEYWORDS.get(key, []))
        
        images = fetch_images_from_openstax_page(OPENSTAX_PAGES['upper_limb_circulation'], all_keywords)
        
        if images:
            for img_data in images:
                img_url = img_data['url']
                if img_url not in downloaded_images:
                    filename = f"{structure.lower().replace(' ', '_').replace('é', 'e').replace('á', 'a').replace('í', 'i')}.jpg"
                    filepath = f"public/anatomia-images/arterias-veias-membro-superior/{filename}"
                    
                    if download_image(img_url, filepath):
                        downloaded_images[img_url] = filepath
                        if structure not in image_mapping['arterias-veias-membro-superior']:
                            image_mapping['arterias-veias-membro-superior'][structure] = []
                        image_mapping['arterias-veias-membro-superior'][structure].append({
                            'src': f"/anatomia-images/arterias-veias-membro-superior/{filename}",
                            'legend': img_data['caption'][:100],
                            'alt': structure
                        })
                        break
            break
        
        time.sleep(0.5)
    
    # Save mapping to JSON file
    with open('scripts/image-mapping-output.json', 'w', encoding='utf-8') as f:
        json.dump(image_mapping, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 80)
    print(f"COMPLETE! Downloaded {len(downloaded_images)} unique images")
    print("Mapping saved to: scripts/image-mapping-output.json")
    print("=" * 80)

if __name__ == "__main__":
    main()
