#!/usr/bin/env python3
"""
Enhanced SEO Description Generator
Generates comprehensive, SEO-optimized descriptions for peptide products
"""

import json
from pathlib import Path
from typing import Dict, List
from datetime import datetime


class DescriptionGenerator:
    """Generate enhanced SEO descriptions for peptide products"""

    def __init__(self):
        self.enhanced_products = []

    def generate_description(self, product: Dict) -> str:
        """Generate enhanced description for a product"""
        name = product.get('title', 'Product')
        metadata = product.get('metadata', {})

        # Get peptide-specific content
        peptide_info = self.get_peptide_info(name)

        description = f"""
## {name} - Premium Research-Grade Peptide

### Overview
{name} is a {peptide_info['class']} supplied by Premier Bio Labs with verified {metadata.get('purity', '>98%')} purity through independent third-party HPLC testing. Our research-grade {name} is manufactured in ISO 9001:2015 certified facilities using advanced solid-phase peptide synthesis (SPPS) technology, ensuring consistent quality and structural integrity for demanding laboratory applications.

{peptide_info['overview']}

### Scientific Background
{peptide_info['scientific_background']}

### Research Applications
{name} is utilized in various research contexts including:

{peptide_info['research_applications']}

### Product Specifications
- **Purity**: {metadata.get('purity', '>98%')} (verified by HPLC)
- **Form**: {metadata.get('form', 'Lyophilized powder')}
- **Storage**: {metadata.get('storage', '-20°C (long-term), 2-8°C (short-term after reconstitution)')}
- **Molecular Formula**: {peptide_info.get('molecular_formula', metadata.get('molecular_formula', 'See COA'))}
- **Molecular Weight**: {peptide_info.get('molecular_weight', metadata.get('molecular_weight', 'See COA'))}
- **CAS Number**: {peptide_info.get('cas_number', metadata.get('cas_number', 'Available upon request'))}
- **Sequence**: {peptide_info.get('sequence', 'See Certificate of Analysis')}

### Quality Assurance
Every batch of {name} undergoes rigorous quality control:

✓ **Third-Party HPLC Analysis** - Independent verification of purity and composition
✓ **Mass Spectrometry** - Confirms exact molecular weight and structure
✓ **Certificate of Analysis (COA)** - Available for every batch, published openly
✓ **Endotoxin Testing** - Ensures research-grade cleanliness (<1.0 EU/mg)
✓ **Sterility Verification** - Tested for bacterial/fungal contamination

### Shipping & Handling
- **Same-Day Dispatch**: Orders placed before 2 PM EST ship same day
- **Cold Chain Logistics**: Temperature-controlled packaging with gel ice packs
- **Domestic Shipping**: 1-3 business days (USA)
- **International Shipping**: Available where permitted by local regulations
- **Tracking Provided**: Full tracking information for all shipments

### Reconstitution Guidelines
For optimal research results, {name} should be reconstituted following these guidelines:
1. Use bacteriostatic water (0.9% benzyl alcohol) or sterile water for injection
2. Recommended concentration: {peptide_info.get('reconstitution_concentration', '1-2 mg/mL')}
3. Add water slowly to the vial wall, not directly on the lyophilized powder
4. Gently swirl the vial - avoid vigorous shaking which may damage the peptide
5. Allow 5-10 minutes for complete dissolution
6. Once reconstituted, store at 2-8°C and use within {peptide_info.get('stability_reconstituted', '4 weeks')}

### Handling Precautions
- Use aseptic techniques when handling
- Avoid repeated freeze-thaw cycles
- Protect from light and moisture
- Use calibrated micropipettes for accurate dosing
- Document batch numbers for research reproducibility

### Research Compliance Notice
⚠️ **IMPORTANT**: {name} is strictly for *in vitro* laboratory research use only. This product is **NOT** approved by the FDA for human consumption, therapeutic use, or veterinary applications. Not for use in humans or animals. Researchers must comply with all applicable institutional guidelines and regulations. Age verification (21+) required for purchase.

### Why Choose Premier Bio Labs?
- 🔬 **Verified Purity**: Every batch tested with published COAs
- 🇺🇸 **USA-Based**: Domestic manufacturing and customer support
- ⚡ **Fast Shipping**: Same-day dispatch for qualifying orders
- 📊 **Transparent Testing**: No selective reporting or data gatekeeping
- 🏆 **Research Excellence**: Trusted by laboratories worldwide
- 💰 **Competitive Pricing**: Direct-to-researcher pricing model
- 🔒 **Secure Packaging**: Tamper-evident vials with lot tracking

### Available Sizes
{self.format_variants(product.get('variants', []))}

### Related Research Peptides
Researchers studying {name} often explore complementary compounds:
{peptide_info.get('related_peptides', '- Contact us for personalized recommendations')}

### Storage Stability
- **Lyophilized**: {peptide_info.get('stability_lyophilized', '36 months at -20°C')}
- **Reconstituted**: {peptide_info.get('stability_reconstituted', '4 weeks at 2-8°C')}
- **Working Solution**: {peptide_info.get('stability_working', '7 days at 2-8°C')}

### Research References
This product is intended for research use only. Researchers are encouraged to review current literature and conduct appropriate safety assessments before use.

---

**Keywords**: {name} research peptide, buy {name} online USA, {name} {metadata.get('purity', '>98%')} purity, {name} with COA, {name} third-party tested, research-grade {name}, {name} for laboratory use, {' '.join(peptide_info.get('keywords', []))}

**Product Page Last Updated**: {datetime.now().strftime('%B %Y')}
**Latest Batch Tested**: Within last 30 days
**Next Restock**: In stock - Ships immediately
        """.strip()

        return description

    def get_peptide_info(self, name: str) -> Dict:
        """Get peptide-specific information"""

        peptide_database = {
            'BPC-157': {
                'class': 'gastric pentadecapeptide',
                'overview': 'BPC-157 stands for Body Protection Compound-157, a synthetic peptide consisting of 15 amino acids derived from a protective protein found in human gastric juice.',
                'scientific_background': """BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide with the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val. Originally isolated from gastric juice, this stable gastric pentadecapeptide has demonstrated remarkable stability in human gastric juice and maintains its structure even in the harsh acidic environment of the stomach.

Research has shown that BPC-157 exhibits cytoprotective and anti-ulcer activity, with studies exploring its potential mechanisms involving the nitric oxide (NO) system, prostaglandin system, and growth factor modulation. The peptide has been studied for its effects on angiogenesis, with research indicating it may influence VEGF expression and blood vessel formation.""",
                'research_applications': """- Tissue repair and wound healing studies
- Angiogenesis and vascular research
- Gastrointestinal protection investigations
- Musculoskeletal injury models
- Tendon and ligament healing protocols
- Inflammatory response modulation
- Gut-brain axis research
- Cellular migration studies""",
                'molecular_formula': 'C₆₂H₉₈N₁₆O₂₂',
                'molecular_weight': '1419.53 g/mol',
                'cas_number': '137525-51-0',
                'sequence': 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
                'reconstitution_concentration': '1-2 mg/mL',
                'stability_lyophilized': '36 months at -20°C',
                'stability_reconstituted': '4-6 weeks at 2-8°C',
                'stability_working': '7 days at 2-8°C',
                'related_peptides': """- TB-500 (Thymosin Beta-4) - Complementary tissue repair research
- GHK-Cu (Copper Peptide) - Tissue remodeling studies
- Thymosin Alpha-1 - Immune modulation research""",
                'keywords': ['pentadecapeptide', 'gastric peptide', 'tissue repair', 'angiogenesis', 'wound healing research']
            },
            'GHK-Cu': {
                'class': 'copper-binding tripeptide complex',
                'overview': 'GHK-Cu is a naturally occurring copper complex of the tripeptide Gly-His-Lys, first isolated from human plasma and later found in saliva and urine.',
                'scientific_background': """GHK-Cu (Glycyl-L-Histidyl-L-Lysine-Copper(II)) is a naturally occurring copper complex that was first isolated from human plasma by Pickart and Thaler in 1973. The tripeptide has a strong affinity for copper(II), with a binding constant of 10^16 M^-1 at physiological pH.

The copper-peptide complex has been extensively studied for its role in tissue remodeling, with research showing it can modulate the expression of genes involved in the extracellular matrix remodeling process. Studies indicate GHK-Cu influences the activity of metalloproteinases and their inhibitors (TIMPs), as well as stimulating collagen synthesis.""",
                'research_applications': """- Collagen synthesis and skin aging research
- Wound healing acceleration studies
- Hair follicle research and growth studies
- Antioxidant enzyme expression
- Extracellular matrix remodeling
- Anti-inflammatory pathway investigation
- Stem cell differentiation research
- Neuroprotection studies""",
                'molecular_formula': 'C₁₄H₂₄N₆O₄·Cu',
                'molecular_weight': '403.93 g/mol',
                'cas_number': '49557-75-7',
                'sequence': 'Gly-His-Lys',
                'reconstitution_concentration': '1-5 mg/mL',
                'stability_lyophilized': '24 months at -20°C',
                'stability_reconstituted': '2-4 weeks at 2-8°C',
                'stability_working': '48-72 hours at 2-8°C',
                'related_peptides': """- Matrixyl (Palmitoyl Pentapeptide) - Collagen synthesis research
- Argireline (Acetyl Hexapeptide) - Neuromuscular research
- BPC-157 - Tissue repair studies""",
                'keywords': ['copper peptide', 'tripeptide', 'collagen', 'tissue remodeling', 'skin research']
            },
            'Tesamorelin': {
                'class': 'synthetic growth hormone-releasing hormone (GHRH) analog',
                'overview': 'Tesamorelin is a synthetic peptide consisting of 44 amino acids, designed as a stabilized analog of human growth hormone-releasing hormone.',
                'scientific_background': """Tesamorelin is a synthetic analog of human growth hormone-releasing hormone (GHRH), also known as growth hormone-releasing factor (GRF). It consists of the 44 amino acid sequence of human GHRH with a trans-3-hexenoic acid group modification at the N-terminus, which increases stability and half-life.

The peptide acts as a GHRH receptor agonist, stimulating the synthesis and pulsatile release of growth hormone from the anterior pituitary. Research has focused on its effects on growth hormone secretion patterns and subsequent IGF-1 production.""",
                'research_applications': """- Growth hormone secretion studies
- Pituitary function research
- Metabolic regulation investigations
- Body composition studies
- Lipodystrophy research
- Aging and hormone decline studies
- IGF-1 pathway research
- Hypothalamic-pituitary axis studies""",
                'molecular_formula': 'C₂₂₁H₃₆₆N₇₂O₆₇S',
                'molecular_weight': '5135.89 g/mol',
                'cas_number': '218949-48-5',
                'sequence': 'Modified 44-amino acid sequence',
                'reconstitution_concentration': '1-2 mg/mL',
                'stability_lyophilized': '24 months at -20°C',
                'stability_reconstituted': '14 days at 2-8°C',
                'stability_working': '24 hours at room temperature',
                'related_peptides': """- CJC-1295 - Extended GHRH analog research
- Sermorelin - GHRH fragment studies
- Ipamorelin - Growth hormone secretagogue research""",
                'keywords': ['GHRH analog', 'growth hormone', 'pituitary', 'IGF-1', 'metabolic research']
            },
            'GLP': {  # For GLP-2 and GLP-3
                'class': 'glucagon-like peptide analog',
                'overview': 'GLP peptides are incretin hormones derived from proglucagon, playing crucial roles in glucose homeostasis and intestinal function.',
                'scientific_background': """Glucagon-like peptides (GLPs) are a family of incretin hormones derived from the post-translational processing of proglucagon. These peptides play crucial roles in glucose homeostasis, insulin secretion, and gastrointestinal function.

GLP receptor agonists have been extensively studied for their effects on glucose-dependent insulin secretion, glucagon suppression, gastric emptying, and satiety signaling. Research has explored their potential in metabolic regulation and cellular proliferation pathways.""",
                'research_applications': """- Glucose metabolism research
- Insulin secretion studies
- Intestinal growth and repair
- Appetite regulation research
- Metabolic syndrome investigations
- Diabetes research models
- Gut hormone signaling
- Neuroprotection studies""",
                'molecular_formula': 'Variable by specific analog',
                'molecular_weight': 'See specific product COA',
                'cas_number': 'Compound-specific',
                'sequence': 'Modified GLP sequence',
                'reconstitution_concentration': '0.5-1 mg/mL',
                'stability_lyophilized': '24 months at -20°C',
                'stability_reconstituted': '7-14 days at 2-8°C',
                'stability_working': '24 hours at 2-8°C',
                'related_peptides': """- Exenatide - GLP-1 receptor agonist research
- Liraglutide - Long-acting GLP-1 analog
- GIP - Glucose-dependent insulinotropic peptide""",
                'keywords': ['incretin', 'glucose metabolism', 'insulin', 'diabetes research', 'gut hormone']
            },
            'NAD+': {
                'class': 'essential coenzyme',
                'overview': 'NAD+ (Nicotinamide Adenine Dinucleotide) is a critical coenzyme found in all living cells, essential for energy metabolism and cellular processes.',
                'scientific_background': """NAD+ (Nicotinamide Adenine Dinucleotide) is a fundamental coenzyme present in all living cells, playing crucial roles in metabolism, energy production, and cellular signaling. It exists in two forms: NAD+ (oxidized) and NADH (reduced), functioning as an electron carrier in redox reactions.

NAD+ serves as a substrate for several important enzymes including sirtuins (SIRT1-7), poly(ADP-ribose) polymerases (PARPs), and cyclic ADP-ribose synthases. Research has focused on NAD+ decline with age and its role in cellular senescence, DNA repair, and metabolic homeostasis.""",
                'research_applications': """- Cellular metabolism studies
- Aging and longevity research
- Sirtuin activation studies
- Mitochondrial function research
- DNA repair mechanisms
- Circadian rhythm studies
- Neuroprotection research
- Metabolic disease models""",
                'molecular_formula': 'C₂₁H₂₇N₇O₁₄P₂',
                'molecular_weight': '663.43 g/mol',
                'cas_number': '53-84-9',
                'sequence': 'Not applicable (coenzyme)',
                'reconstitution_concentration': '10-50 mg/mL',
                'stability_lyophilized': '24 months at -20°C',
                'stability_reconstituted': '7 days at 2-8°C',
                'stability_working': 'Use immediately after preparation',
                'related_peptides': """- NMN (Nicotinamide Mononucleotide) - NAD+ precursor
- NR (Nicotinamide Riboside) - NAD+ precursor
- Resveratrol - Sirtuin activation research""",
                'keywords': ['coenzyme', 'metabolism', 'aging', 'sirtuin', 'mitochondria', 'cellular energy']
            }
        }

        # Match peptide name
        for key, info in peptide_database.items():
            if key.lower() in name.lower():
                return info

        # Default info for unknown peptides
        return {
            'class': 'research-grade peptide',
            'overview': f'{name} is a high-purity research peptide provided for laboratory investigations.',
            'scientific_background': f'{name} is supplied as a lyophilized powder with >98% purity verified by HPLC analysis. This research-grade peptide is manufactured under strict quality control standards.',
            'research_applications': '- General peptide research\n- Biochemical assays\n- Cell culture studies\n- Protein interaction studies',
            'molecular_formula': 'See Certificate of Analysis',
            'molecular_weight': 'See Certificate of Analysis',
            'cas_number': 'Available upon request',
            'sequence': 'See product documentation',
            'reconstitution_concentration': '1 mg/mL',
            'stability_lyophilized': '24 months at -20°C',
            'stability_reconstituted': '4 weeks at 2-8°C',
            'stability_working': '7 days at 2-8°C',
            'related_peptides': '- Contact for recommendations based on your research needs',
            'keywords': ['research peptide', 'laboratory grade', 'high purity']
        }

    def format_variants(self, variants: List[Dict]) -> str:
        """Format variant information"""
        if not variants:
            return "- Standard size available"

        lines = []
        for variant in variants:
            size = variant.get('title', 'Standard')
            sku = variant.get('sku', 'N/A')
            price = variant.get('prices', [{}])[0].get('amount', 0) / 100
            stock = "In Stock" if variant.get('inventory_quantity', 0) > 0 else "Out of Stock"
            lines.append(f"- **{size}** (SKU: {sku}) - ${price:.2f} - {stock}")

        return '\n'.join(lines)

    def enhance_all_products(self, products: List[Dict]) -> List[Dict]:
        """Enhance all products with SEO descriptions"""
        enhanced = []

        for product in products:
            try:
                # Generate enhanced description
                enhanced_description = self.generate_description(product)
                product['description'] = enhanced_description

                # Also create a short description for previews
                product['short_description'] = self.generate_short_description(product)

                enhanced.append(product)
                print(f"✓ Enhanced description for: {product['title']}")

            except Exception as e:
                print(f"✗ Error enhancing {product.get('title', 'Unknown')}: {e}")
                enhanced.append(product)

        self.enhanced_products = enhanced
        return enhanced

    def generate_short_description(self, product: Dict) -> str:
        """Generate short description for product previews"""
        name = product.get('title', 'Product')
        metadata = product.get('metadata', {})
        purity = metadata.get('purity', '>98%')

        peptide_info = self.get_peptide_info(name)

        return f"""Premium research-grade {name} with {purity} purity verified by third-party testing. {peptide_info['overview']} Ships same-day from USA-based facility with Certificate of Analysis. For laboratory research use only."""

    def save_enhanced(self, filename: str) -> Path:
        """Save enhanced products to JSON"""
        output_path = Path(__file__).parent.parent / 'data' / filename
        output_path.parent.mkdir(exist_ok=True)

        with open(output_path, 'w') as f:
            json.dump(self.enhanced_products, f, indent=2)

        print(f"\n✅ Saved {len(self.enhanced_products)} enhanced products to {output_path}")
        return output_path


def main():
    """Main execution"""
    # Load transformed products
    transformed_path = Path(__file__).parent.parent / 'data' / 'transformed-products.json'

    if not transformed_path.exists():
        print("⚠️ Transformed products not found. Running transformation first...")
        import transform_data
        products = transform_data.main()
    else:
        with open(transformed_path, 'r') as f:
            products = json.load(f)

    print(f"📦 Loaded {len(products)} transformed products")

    # Generate enhanced descriptions
    generator = DescriptionGenerator()
    enhanced_products = generator.enhance_all_products(products)

    # Save enhanced products
    generator.save_enhanced('final-products.json')

    print("\n✨ Description enhancement complete!")
    print(f"Generated {len(enhanced_products)} enhanced product descriptions")

    return enhanced_products


if __name__ == "__main__":
    main()