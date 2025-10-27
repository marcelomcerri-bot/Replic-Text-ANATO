#!/usr/bin/env python3
"""
Download ALL figures from specific OpenStax anatomy pages for upper limb.
This will give us a complete collection to work with.
"""

import requests
from bs4 import BeautifulSoup
import os
import re
import json
from urllib.parse import urljoin
import time

OPENSTAX_PAGES = {
    'pectoral_girdle': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-1-the-pectoral-girdle',
    'upper_limb_bones': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/8-2-bones-of-the-upper-limb',
    'pectoral_muscles': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/11-5-muscles-of-the-pectoral-girdle-and-upper-limbs',
    'upper_limb_circulation': 'https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways',
}

def download_image(url, filepath):
    """Download an image from URL to filepath."""
    try:
        # Handle different URL formats
        if url.startswith('//'):
            url = 'https:' + url
        elif url.startswith('/'):
            url = 'https://openstax.org' + url
        
        print(f"  Downloading from: {url}")
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"  ✓ Saved to: {filepath}")
        return True
    except Exception as e:
        print(f"  ✗ Failed: {e}")
        return False

def fetch_all_figures_from_page(url, page_name):
    """Fetch all figure images from an OpenStax page."""
    try:
        print(f"\n{'='*80}")
        print(f"Fetching: {page_name}")
        print(f"URL: {url}")
        print(f"{'='*80}")
        
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all images in the page
        all_images = soup.find_all('img')
        print(f"\nFound {len(all_images)} total images on page")
        
        figures_data = []
        figure_count = 0
        
        # Look for images in different contexts
        for img in all_images:
            src = img.get('src', '')
            if not src or 'logo' in src.lower() or 'icon' in src.lower():
                continue
            
            # Get parent figure if exists
            parent_figure = img.find_parent('figure')
            
            # Get caption
            caption = ''
            if parent_figure:
                caption_elem = parent_figure.find('figcaption')
                if caption_elem:
                    caption = caption_elem.get_text(strip=True)
            
            alt_text = img.get('alt', '')
            
            # Skip if this looks like a lower limb image
            lower_limb_terms = ['lower limb', 'leg', 'thigh', 'femur', 'tibia', 'fibula', 'foot', 'ankle', 'femoral', 'popliteal', 'tibial artery', 'fibular']
            text_to_check = (caption + ' ' + alt_text).lower()
            
            if any(term in text_to_check for term in lower_limb_terms):
                print(f"  ✗ Skipping lower limb: {caption[:60] if caption else alt_text[:60]}")
                continue
            
            # This looks like a valid upper limb figure
            figure_count += 1
            figure_id = f"figure-{figure_count}"
            
            print(f"\n  Figure {figure_count}:")
            print(f"    Caption: {caption[:100] if caption else alt_text[:100]}")
            
            figures_data.append({
                'src': src,
                'caption': caption,
                'alt': alt_text,
                'figure_id': figure_id
            })
        
        return figures_data
    
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return []

def main():
    """Main function."""
    print("=" * 80)
    print("OpenStax Upper Limb Figure Downloader")
    print("Downloading ALL figures from upper limb anatomy pages")
    print("=" * 80)
    
    all_downloads = {}
    
    # Process each page
    for page_key, page_url in OPENSTAX_PAGES.items():
        figures = fetch_all_figures_from_page(page_url, page_key)
        
        print(f"\n{'='*80}")
        print(f"Downloading {len(figures)} figures from {page_key}")
        print(f"{'='*80}\n")
        
        # Determine output directory based on page type
        if 'bone' in page_key or 'girdle' in page_key:
            output_dir = 'public/anatomia-images/ossos-membro-superior'
            prefix = 'bone'
        elif 'muscle' in page_key:
            output_dir = 'public/anatomia-images/musculos-membro-superior'
            prefix = 'muscle'
        elif 'circulation' in page_key:
            output_dir = 'public/anatomia-images/arterias-veias-membro-superior'
            prefix = 'vessel'
        else:
            output_dir = 'public/anatomia-images/misc'
            prefix = 'misc'
        
        for idx, fig_data in enumerate(figures, 1):
            filename = f"{prefix}_{page_key}_{idx}.jpg"
            filepath = os.path.join(output_dir, filename)
            
            if download_image(fig_data['src'], filepath):
                all_downloads[filename] = {
                    'path': filepath,
                    'caption': fig_data['caption'],
                    'alt': fig_data['alt'],
                    'page': page_key
                }
            
            time.sleep(0.3)  # Be nice to the server
        
        time.sleep(1)  # Pause between pages
    
    # Save metadata
    with open('scripts/downloaded-figures-metadata.json', 'w', encoding='utf-8') as f:
        json.dump(all_downloads, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 80)
    print(f"COMPLETE! Downloaded {len(all_downloads)} figures")
    print("Metadata saved to: scripts/downloaded-figures-metadata.json")
    print("=" * 80)
    
    # Print summary
    print("\nSummary by category:")
    by_category = {}
    for filename, data in all_downloads.items():
        prefix = filename.split('_')[0]
        by_category[prefix] = by_category.get(prefix, 0) + 1
    
    for category, count in sorted(by_category.items()):
        print(f"  {category}: {count} images")

if __name__ == "__main__":
    main()
