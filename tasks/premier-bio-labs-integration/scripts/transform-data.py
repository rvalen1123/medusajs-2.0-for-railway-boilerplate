#!/usr/bin/env python3
"""
Data Transformation Script
Transforms raw scraped data into Medusa-compatible format
"""

import json
import re
from pathlib import Path
from typing import List, Dict, Any, Optional
from datetime import datetime


class ProductTransformer:
    """Transform raw product data to Medusa format"""

    def __init__(self):
        self.transformed_products = []

    def transform_product(self, raw_product: Dict) -> Dict:
        """Transform a single product to Medusa format"""

        name = raw_product.get('name', 'Unknown Product')
        handle = raw_product.get('handle', self.create_handle(name))

        # Base product structure
        product = {
            'title': name,
            'subtitle': self.generate_subtitle(name),
            'description': raw_product.get('full_description', ''),
            'handle': handle,
            'is_giftcard': False,
            'status': 'published',
            'thumbnail': raw_product.get('images', [''])[0] if raw_product.get('images') else None,
            'images': [{'url': img} for img in raw_product.get('images', [])],
            'weight': 50,  # grams (typical vial weight)
            'length': 5,   # cm
            'height': 5,   # cm
            'width': 2,    # cm
            'origin_country': 'US',
            'hs_code': '2937290090',  # Peptide hormones HS code
            'mid_code': 'peptide',
            'material': 'Lyophilized Powder',
            'metadata': self.generate_metadata(raw_product),
            'categories': self.map_categories(raw_product.get('categories', [])),
            'tags': self.generate_tags(raw_product),
            'type': 'Research Peptide'
        }

        # Process variants
        variants = []
        raw_variants = raw_product.get('variants', [])

        if not raw_variants:
            # Create default variant if none exist
            raw_variants = [{
                'size': 'Standard',
                'price': raw_product.get('price', 0),
                'sku': raw_product.get('sku', f"PBL-{handle.upper()}"),
                'in_stock': True
            }]

        # Generate options from variants
        sizes = list(set([v.get('size', 'Standard') for v in raw_variants]))
        if len(sizes) > 1:
            product['options'] = [{
                'title': 'Size',
                'values': sizes
            }]

        for i, raw_variant in enumerate(raw_variants):
            variant = self.transform_variant(raw_variant, product, i)
            variants.append(variant)

        product['variants'] = variants
        return product

    def transform_variant(self, raw_variant: Dict, product: Dict, index: int) -> Dict:
        """Transform a single variant"""
        size = raw_variant.get('size', 'Standard')
        price = raw_variant.get('price', 0)
        sku = raw_variant.get('sku', f"{product['handle']}-{index}")

        variant = {
            'title': size,
            'sku': sku.upper(),
            'barcode': None,
            'ean': None,
            'upc': None,
            'inventory_quantity': 100 if raw_variant.get('in_stock', True) else 0,
            'allow_backorder': False,
            'manage_inventory': True,
            'requires_shipping': True,
            'weight': 50,  # grams
            'length': 5,
            'height': 5,
            'width': 2,
            'prices': [
                {
                    'currency_code': 'usd',
                    'amount': int(price * 100)  # Convert to cents
                }
            ]
        }

        # Add options if product has them
        if product.get('options'):
            variant['options'] = [{'value': size}]

        return variant

    def create_handle(self, name: str) -> str:
        """Create URL-safe handle from name"""
        handle = name.lower()
        handle = re.sub(r'[^a-z0-9\s-]', '', handle)
        handle = re.sub(r'[-\s]+', '-', handle)
        return handle.strip('-')

    def generate_subtitle(self, name: str) -> str:
        """Generate product subtitle based on name"""
        subtitles = {
            'BPC-157': 'Body Protection Compound - Tissue Repair Research',
            'GHK-Cu': 'Copper Peptide - Skin & Tissue Research',
            'Tesamorelin': 'Growth Hormone-Releasing Hormone Analog',
            'GLP-2': 'Glucagon-Like Peptide-2 - Intestinal Research',
            'GLP-3': 'GLP-3 Receptor Agonist - Metabolic Research',
            'NAD+': 'Nicotinamide Adenine Dinucleotide - Cellular Research',
            'StaRter Kit R': 'Complete Research Peptide Starter Kit',
            'StarTer Kit T': 'Tissue Research Peptide Kit'
        }

        for key, subtitle in subtitles.items():
            if key.lower() in name.lower():
                return subtitle

        return 'Premium Research-Grade Peptide'

    def generate_metadata(self, raw_product: Dict) -> Dict:
        """Generate product metadata"""
        specs = raw_product.get('specifications', {})

        metadata = {
            'purity': specs.get('Purity', '>98%'),
            'molecular_weight': specs.get('Molecular Weight', 'See COA'),
            'molecular_formula': specs.get('Molecular Formula', 'See COA'),
            'cas_number': specs.get('CAS Number', 'Available upon request'),
            'storage': specs.get('Storage', 'Store at -20°C'),
            'form': specs.get('Form', 'Lyophilized Powder'),
            'solubility': specs.get('Solubility', 'Soluble in water'),
            'coa_available': True,
            'third_party_tested': True,
            'research_use_only': True,
            'original_url': raw_product.get('url', ''),
            'scraped_at': raw_product.get('scraped_at', datetime.now().isoformat())
        }

        # Add peptide-specific metadata
        name = raw_product.get('name', '').upper()
        if 'BPC' in name:
            metadata.update({
                'sequence': 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
                'amino_acids': 15,
                'class': 'Pentadecapeptide'
            })
        elif 'GHK' in name:
            metadata.update({
                'sequence': 'Gly-His-Lys',
                'amino_acids': 3,
                'class': 'Tripeptide',
                'copper_complex': True
            })

        return metadata

    def map_categories(self, raw_categories: List[str]) -> List[str]:
        """Map categories to standardized names"""
        category_map = {
            'Research Peptides': ['peptide', 'research', 'peptides'],
            'Growth Factors': ['growth', 'factor', 'gh'],
            'Metabolic Compounds': ['metabolic', 'glp', 'glucose', 'diabetes'],
            'Anti-Aging Research': ['anti-aging', 'nad', 'longevity'],
            'Tissue Research': ['tissue', 'repair', 'recovery', 'bpc'],
            'Starter Kits': ['kit', 'starter', 'bundle']
        }

        mapped_categories = set()

        for raw_cat in raw_categories:
            raw_lower = raw_cat.lower()
            for standard_cat, keywords in category_map.items():
                if any(keyword in raw_lower for keyword in keywords):
                    mapped_categories.add(standard_cat)

        # Default category if none matched
        if not mapped_categories:
            mapped_categories.add('Research Peptides')

        return list(mapped_categories)

    def generate_tags(self, raw_product: Dict) -> List[str]:
        """Generate product tags for search and filtering"""
        tags = [
            'Research Grade',
            '>98% Purity',
            'Third-Party Tested',
            'USA Based',
            'Same-Day Shipping',
            'COA Available'
        ]

        name = raw_product.get('name', '').upper()

        # Add specific tags based on product
        tag_mappings = {
            'BPC': ['Tissue Repair', 'Recovery', 'BPC-157', 'Pentadecapeptide'],
            'GHK': ['Copper Peptide', 'Skin Research', 'GHK-Cu', 'Tripeptide'],
            'TB-500': ['Thymosin', 'Athletic Recovery', 'TB-500'],
            'TESAMORELIN': ['Growth Hormone', 'GHRH', 'Tesamorelin'],
            'GLP': ['GLP Agonist', 'Metabolic Research', 'Diabetes Research'],
            'NAD': ['NAD+', 'Cellular Energy', 'Anti-Aging', 'Coenzyme'],
            'KIT': ['Starter Kit', 'Bundle', 'Value Pack']
        }

        for key, specific_tags in tag_mappings.items():
            if key in name:
                tags.extend(specific_tags)

        # Add size tags from variants
        for variant in raw_product.get('variants', []):
            size = variant.get('size', '')
            if 'mg' in size.lower():
                tags.append(size)

        return list(set(tags))  # Remove duplicates

    def transform_all(self, raw_products: List[Dict]) -> List[Dict]:
        """Transform all products"""
        transformed = []
        for raw_product in raw_products:
            try:
                transformed_product = self.transform_product(raw_product)
                transformed.append(transformed_product)
                print(f"✓ Transformed: {transformed_product['title']}")
            except Exception as e:
                print(f"✗ Error transforming {raw_product.get('name', 'Unknown')}: {e}")

        self.transformed_products = transformed
        return transformed

    def save_transformed(self, filename: str) -> Path:
        """Save transformed products to JSON"""
        output_path = Path(__file__).parent.parent / 'data' / filename
        output_path.parent.mkdir(exist_ok=True)

        with open(output_path, 'w') as f:
            json.dump(self.transformed_products, f, indent=2)

        print(f"\n✅ Saved {len(self.transformed_products)} transformed products to {output_path}")
        return output_path

    def generate_summary(self) -> str:
        """Generate summary of transformed products"""
        summary = []
        summary.append("\n📊 Transformation Summary:")
        summary.append("-" * 50)

        total_variants = 0
        for product in self.transformed_products:
            variants = product.get('variants', [])
            total_variants += len(variants)

            # Price range
            prices = [v['prices'][0]['amount'] / 100 for v in variants]
            price_str = f"${min(prices):.2f}" if len(prices) == 1 else f"${min(prices):.2f} - ${max(prices):.2f}"

            summary.append(f"  {product['title']}:")
            summary.append(f"    Handle: {product['handle']}")
            summary.append(f"    Variants: {len(variants)}")
            summary.append(f"    Price: {price_str}")
            summary.append(f"    Categories: {', '.join(product['categories'])}")
            summary.append("")

        summary.append(f"\nTotal Products: {len(self.transformed_products)}")
        summary.append(f"Total Variants: {total_variants}")

        return "\n".join(summary)


def get_fallback_products() -> List[Dict]:
    """Get fallback product data"""
    return [
        {
            'name': 'BPC-157',
            'handle': 'bpc-157',
            'sku': 'PBL-BPC-157',
            'price': 17.99,
            'short_description': 'Body Protection Compound for tissue repair research',
            'full_description': 'BPC-157 is a pentadecapeptide used in research for tissue repair and recovery studies.',
            'categories': ['Research Peptides'],
            'variants': [{'size': '5mg', 'price': 17.99, 'sku': 'PBL-BPC-5MG', 'in_stock': True}],
            'specifications': {
                'Purity': '>98%',
                'Molecular Formula': 'C62H98N16O22',
                'Molecular Weight': '1419.53 g/mol',
                'Storage': 'Store at -20°C'
            },
            'images': []
        },
        {
            'name': 'GHK-Cu',
            'handle': 'ghk-cu',
            'sku': 'PBL-GHK-CU',
            'price': 22.99,
            'short_description': 'Copper peptide for skin and tissue research',
            'full_description': 'GHK-Cu is a copper-binding tripeptide studied for tissue remodeling and skin research.',
            'categories': ['Research Peptides'],
            'variants': [{'size': '50mg', 'price': 22.99, 'sku': 'PBL-GHK-50MG', 'in_stock': True}],
            'specifications': {
                'Purity': '>98%',
                'Molecular Formula': 'C14H24N6O4Cu',
                'Molecular Weight': '403.93 g/mol',
                'Storage': 'Store at -20°C'
            },
            'images': []
        },
        {
            'name': 'Tesamorelin',
            'handle': 'tesamorelin',
            'sku': 'PBL-TESA',
            'price': 39.99,
            'short_description': 'Growth hormone-releasing hormone analog for research',
            'full_description': 'Tesamorelin is a synthetic peptide analog of growth hormone-releasing hormone.',
            'categories': ['Research Peptides'],
            'variants': [{'size': '10mg', 'price': 39.99, 'sku': 'PBL-TESA-10MG', 'in_stock': True}],
            'specifications': {
                'Purity': '>98%',
                'Storage': 'Store at -20°C'
            },
            'images': []
        },
        {
            'name': 'GLP-2 (T*)',
            'handle': 'glp-2-t',
            'sku': 'PBL-GLP2T',
            'price': 99.99,
            'short_description': 'Glucagon-like peptide-2 for metabolic research',
            'full_description': 'GLP-2 is studied for intestinal growth and nutrient absorption research.',
            'categories': ['Research Peptides', 'Metabolic Research'],
            'variants': [{'size': '30mg', 'price': 99.99, 'sku': 'PBL-GLP2T-30MG', 'in_stock': True}],
            'specifications': {
                'Purity': '>98%',
                'Storage': 'Store at -20°C'
            },
            'images': []
        },
        {
            'name': 'GLP-3 (R*)',
            'handle': 'glp-3-r',
            'sku': 'PBL-GLP3R',
            'price': 89.99,
            'short_description': 'Research-grade GLP-3 agonist',
            'full_description': 'GLP-3 (R*) is used in metabolic and diabetes research studies.',
            'categories': ['Research Peptides', 'Metabolic Research'],
            'variants': [
                {'size': '10mg', 'price': 89.99, 'sku': 'PBL-GLP3R-10MG', 'in_stock': True},
                {'size': '20mg', 'price': 134.99, 'sku': 'PBL-GLP3R-20MG', 'in_stock': True}
            ],
            'specifications': {
                'Purity': '>98%',
                'Storage': 'Store at -20°C'
            },
            'images': []
        },
        {
            'name': 'NAD+',
            'handle': 'nad-plus',
            'sku': 'PBL-NAD',
            'price': 149.99,
            'short_description': 'Nicotinamide adenine dinucleotide for cellular research',
            'full_description': 'NAD+ is a coenzyme studied for cellular metabolism and aging research.',
            'categories': ['Research Compounds', 'Anti-Aging Research'],
            'variants': [{'size': '100mg', 'price': 149.99, 'sku': 'PBL-NAD-100MG', 'in_stock': True}],
            'specifications': {
                'Purity': '>99%',
                'Molecular Formula': 'C21H27N7O14P2',
                'Molecular Weight': '663.43 g/mol',
                'Storage': 'Store at -20°C'
            },
            'images': []
        },
        {
            'name': 'StaRter Kit R',
            'handle': 'starter-kit-r',
            'sku': 'PBL-KIT-R',
            'price': 159.99,
            'short_description': 'Research peptide starter kit',
            'full_description': 'Complete starter kit with essential research peptides and supplies.',
            'categories': ['Starter Kits'],
            'variants': [{'size': 'Kit', 'price': 159.99, 'sku': 'PBL-KIT-R', 'in_stock': True}],
            'specifications': {
                'Contents': 'Multiple research peptides',
                'Storage': 'Store at -20°C'
            },
            'images': []
        },
        {
            'name': 'StarTer Kit T',
            'handle': 'starter-kit-t',
            'sku': 'PBL-KIT-T',
            'price': 154.99,
            'short_description': 'Tissue research peptide starter kit',
            'full_description': 'Specialized kit for tissue repair and recovery research.',
            'categories': ['Starter Kits'],
            'variants': [{'size': 'Kit', 'price': 154.99, 'sku': 'PBL-KIT-T', 'in_stock': True}],
            'specifications': {
                'Contents': 'Tissue-focused research peptides',
                'Storage': 'Store at -20°C'
            },
            'images': []
        }
    ]

def main():
    """Main execution"""
    # Load raw products
    raw_data_path = Path(__file__).parent.parent / 'data' / 'raw-products.json'

    # If raw data doesn't exist, use fallback
    if not raw_data_path.exists():
        print("⚠️ Raw products file not found. Creating with fallback data...")
        raw_products = get_fallback_products()
        raw_data_path.parent.mkdir(exist_ok=True)
        with open(raw_data_path, 'w') as f:
            json.dump(raw_products, f, indent=2)
    else:
        with open(raw_data_path, 'r') as f:
            raw_products = json.load(f)

    print(f"📦 Loaded {len(raw_products)} raw products")

    # Transform products
    transformer = ProductTransformer()
    transformed_products = transformer.transform_all(raw_products)

    # Save transformed products
    transformer.save_transformed('transformed-products.json')

    # Print summary
    print(transformer.generate_summary())

    return transformed_products


if __name__ == "__main__":
    main()