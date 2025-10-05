import { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows"
import * as fs from "fs"
import * as path from "path"

export default async function seedPeptideProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)

  try {
    logger.info("🧬 Starting Premier Bio Labs peptide product seeding...")

    // Get default sales channel
    const [defaultSalesChannel] = await salesChannelModuleService.listSalesChannels({
      name: "Default Sales Channel",
    })

    if (!defaultSalesChannel) {
      throw new Error("Default sales channel not found. Please run the main seed first.")
    }

    // Get default shipping profile
    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
      type: "default"
    })

    if (!shippingProfiles.length) {
      throw new Error("Default shipping profile not found. Please run the main seed first.")
    }

    const shippingProfile = shippingProfiles[0]

    // Load product data
    const dataPath = path.join(
      process.cwd(),
      "tasks/premier-bio-labs-integration/data/final-products.json"
    )

    // If final products don't exist, create fallback data
    let productData: any[]
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, "utf-8")
      productData = JSON.parse(rawData)
      logger.info(`✓ Loaded ${productData.length} products from data file`)
    } else {
      logger.info("⚠️ Product data file not found. Using fallback data...")
      productData = getFallbackProducts()
    }

    // Create product categories
    logger.info("Creating product categories...")
    const { result: categoryResult } = await createProductCategoriesWorkflow(
      container
    ).run({
      input: {
        product_categories: [
          {
            name: "Research Peptides",
            handle: "research-peptides",
            description: "High-purity peptides for laboratory research",
            is_active: true,
            metadata: {
              icon: "🧬",
              order: 1
            }
          },
          {
            name: "Growth Factors",
            handle: "growth-factors",
            description: "Growth hormone and related research compounds",
            is_active: true,
            metadata: {
              icon: "📈",
              order: 2
            }
          },
          {
            name: "Metabolic Compounds",
            handle: "metabolic-compounds",
            description: "Compounds for metabolic and diabetes research",
            is_active: true,
            metadata: {
              icon: "⚗️",
              order: 3
            }
          },
          {
            name: "Anti-Aging Research",
            handle: "anti-aging-research",
            description: "Compounds studied in longevity and aging research",
            is_active: true,
            metadata: {
              icon: "⏰",
              order: 4
            }
          },
          {
            name: "Starter Kits",
            handle: "starter-kits",
            description: "Complete research kits with multiple peptides",
            is_active: true,
            metadata: {
              icon: "📦",
              order: 5
            }
          },
        ],
      },
    })
    logger.info(`✓ Created ${categoryResult.length} categories`)

    // Map category names to IDs
    const categoryMap = categoryResult.reduce((acc, cat) => {
      acc[cat.name] = cat.id
      return acc
    }, {} as Record<string, string>)

    // Transform products for Medusa
    const medusaProducts = productData.map(product => {
      // Map categories
      const categoryIds = (product.categories || [])
        .map((catName: string) => categoryMap[catName])
        .filter(Boolean)

      // If no categories matched, add to Research Peptides by default
      if (!categoryIds.length && categoryMap["Research Peptides"]) {
        categoryIds.push(categoryMap["Research Peptides"])
      }

      return {
        title: product.title,
        subtitle: product.subtitle,
        description: product.description,
        handle: product.handle,
        is_giftcard: false,
        status: ProductStatus.PUBLISHED,
        thumbnail: product.thumbnail,
        images: product.images || [],
        weight: product.weight || 50,
        length: product.length || 5,
        height: product.height || 5,
        width: product.width || 2,
        hs_code: product.hs_code || "2937290090",
        origin_country: product.origin_country || "US",
        mid_code: product.mid_code || "peptide",
        material: product.material || "Lyophilized Powder",
        shipping_profile_id: shippingProfile.id,
        metadata: {
          ...product.metadata,
          imported_from: "premier-bio-labs",
          import_date: new Date().toISOString(),
        },
        tags: product.tags || [],
        category_ids: categoryIds,
        sales_channels: [
          {
            id: defaultSalesChannel.id,
          },
        ],
        options: product.options || [],
        variants: (product.variants || []).map((variant: any) => ({
          title: variant.title,
          sku: variant.sku,
          barcode: variant.barcode,
          ean: variant.ean,
          upc: variant.upc,
          inventory_quantity: variant.inventory_quantity || 100,
          allow_backorder: variant.allow_backorder || false,
          manage_inventory: variant.manage_inventory !== false,
          requires_shipping: variant.requires_shipping !== false,
          weight: variant.weight || 50,
          length: variant.length || 5,
          height: variant.height || 5,
          width: variant.width || 2,
          options: variant.options || {},
          prices: variant.prices || [
            {
              amount: 1999, // Default $19.99
              currency_code: "usd",
            },
          ],
          metadata: {
            size: variant.title,
            imported: true,
          }
        })),
      }
    })

    // Create products
    logger.info(`Creating ${medusaProducts.length} products...`)

    for (const product of medusaProducts) {
      try {
        const { result } = await createProductsWorkflow(container).run({
          input: {
            products: [product],
          },
        })
        logger.info(`✓ Created: ${product.title}`)
      } catch (error) {
        logger.error(`✗ Failed to create ${product.title}:`, error)
      }
    }

    logger.info("✅ Peptide product seeding complete!")
    logger.info("")
    logger.info("📊 Summary:")
    logger.info(`- Products created: ${medusaProducts.length}`)
    logger.info(`- Categories created: ${categoryResult.length}`)
    logger.info("")
    logger.info("🔍 Next steps:")
    logger.info("1. Visit admin panel to verify products")
    logger.info("2. Check storefront for product display")
    logger.info("3. Test variant selection and pricing")

  } catch (error) {
    logger.error("❌ Error seeding peptide products:", error)
    throw error
  }
}

/**
 * Fallback product data if no data file exists
 */
function getFallbackProducts() {
  return [
    {
      title: "BPC-157",
      subtitle: "Body Protection Compound - Tissue Repair Research",
      handle: "bpc-157",
      description: "Premium research-grade BPC-157 peptide with >98% purity.",
      categories: ["Research Peptides"],
      metadata: {
        purity: ">98%",
        molecular_weight: "1419.53 g/mol",
        cas_number: "137525-51-0",
        storage: "Store at -20°C",
        coa_available: true,
        third_party_tested: true,
        research_use_only: true,
      },
      tags: ["Research Grade", ">98% Purity", "COA Available", "Tissue Repair", "BPC-157"],
      options: [
        {
          title: "Size",
          values: ["5mg", "10mg"],
        },
      ],
      variants: [
        {
          title: "5mg",
          sku: "PBL-BPC-5MG",
          inventory_quantity: 100,
          options: { Size: "5mg" },
          prices: [{ amount: 1799, currency_code: "usd" }],
        },
        {
          title: "10mg",
          sku: "PBL-BPC-10MG",
          inventory_quantity: 50,
          options: { Size: "10mg" },
          prices: [{ amount: 2999, currency_code: "usd" }],
        },
      ],
    },
    {
      title: "GHK-Cu",
      subtitle: "Copper Peptide - Skin & Tissue Research",
      handle: "ghk-cu",
      description: "Premium research-grade GHK-Cu copper peptide complex.",
      categories: ["Research Peptides"],
      metadata: {
        purity: ">98%",
        molecular_weight: "403.93 g/mol",
        cas_number: "49557-75-7",
        storage: "Store at -20°C",
        coa_available: true,
        third_party_tested: true,
        research_use_only: true,
      },
      tags: ["Research Grade", ">98% Purity", "COA Available", "Copper Peptide", "GHK-Cu"],
      options: [
        {
          title: "Size",
          values: ["50mg", "100mg"],
        },
      ],
      variants: [
        {
          title: "50mg",
          sku: "PBL-GHK-50MG",
          inventory_quantity: 75,
          options: { Size: "50mg" },
          prices: [{ amount: 2299, currency_code: "usd" }],
        },
        {
          title: "100mg",
          sku: "PBL-GHK-100MG",
          inventory_quantity: 30,
          options: { Size: "100mg" },
          prices: [{ amount: 3999, currency_code: "usd" }],
        },
      ],
    },
    {
      title: "Tesamorelin",
      subtitle: "Growth Hormone-Releasing Hormone Analog",
      handle: "tesamorelin",
      description: "Research-grade Tesamorelin GHRH analog peptide.",
      categories: ["Research Peptides", "Growth Factors"],
      metadata: {
        purity: ">98%",
        molecular_weight: "5135.89 g/mol",
        cas_number: "218949-48-5",
        storage: "Store at -20°C",
        coa_available: true,
        third_party_tested: true,
        research_use_only: true,
      },
      tags: ["Research Grade", ">98% Purity", "COA Available", "GHRH", "Tesamorelin"],
      variants: [
        {
          title: "10mg",
          sku: "PBL-TESA-10MG",
          inventory_quantity: 50,
          prices: [{ amount: 3999, currency_code: "usd" }],
        },
      ],
    },
    {
      title: "GLP-2 (T*)",
      subtitle: "Glucagon-Like Peptide-2 - Intestinal Research",
      handle: "glp-2-t",
      description: "Research-grade GLP-2 peptide for metabolic studies.",
      categories: ["Research Peptides", "Metabolic Compounds"],
      metadata: {
        purity: ">98%",
        storage: "Store at -20°C",
        coa_available: true,
        third_party_tested: true,
        research_use_only: true,
      },
      tags: ["Research Grade", ">98% Purity", "COA Available", "GLP-2", "Metabolic Research"],
      variants: [
        {
          title: "30mg",
          sku: "PBL-GLP2T-30MG",
          inventory_quantity: 25,
          prices: [{ amount: 9999, currency_code: "usd" }],
        },
      ],
    },
    {
      title: "GLP-3 (R*)",
      subtitle: "GLP-3 Receptor Agonist - Metabolic Research",
      handle: "glp-3-r",
      description: "Premium GLP-3 receptor agonist for research use.",
      categories: ["Research Peptides", "Metabolic Compounds"],
      metadata: {
        purity: ">98%",
        storage: "Store at -20°C",
        coa_available: true,
        third_party_tested: true,
        research_use_only: true,
      },
      tags: ["Research Grade", ">98% Purity", "COA Available", "GLP-3", "Metabolic Research"],
      options: [
        {
          title: "Size",
          values: ["10mg", "20mg"],
        },
      ],
      variants: [
        {
          title: "10mg",
          sku: "PBL-GLP3R-10MG",
          inventory_quantity: 40,
          options: { Size: "10mg" },
          prices: [{ amount: 8999, currency_code: "usd" }],
        },
        {
          title: "20mg",
          sku: "PBL-GLP3R-20MG",
          inventory_quantity: 20,
          options: { Size: "20mg" },
          prices: [{ amount: 13499, currency_code: "usd" }],
        },
      ],
    },
    {
      title: "NAD+",
      subtitle: "Nicotinamide Adenine Dinucleotide - Cellular Research",
      handle: "nad-plus",
      description: "High-purity NAD+ coenzyme for cellular research.",
      categories: ["Anti-Aging Research", "Metabolic Compounds"],
      metadata: {
        purity: ">99%",
        molecular_weight: "663.43 g/mol",
        cas_number: "53-84-9",
        storage: "Store at -20°C",
        coa_available: true,
        third_party_tested: true,
        research_use_only: true,
      },
      tags: ["Research Grade", ">99% Purity", "COA Available", "NAD+", "Cellular Energy"],
      variants: [
        {
          title: "100mg",
          sku: "PBL-NAD-100MG",
          inventory_quantity: 35,
          prices: [{ amount: 14999, currency_code: "usd" }],
        },
      ],
    },
    {
      title: "StaRter Kit R",
      subtitle: "Complete Research Peptide Starter Kit",
      handle: "starter-kit-r",
      description: "Comprehensive kit with essential research peptides.",
      categories: ["Starter Kits"],
      metadata: {
        contents: "Multiple research peptides",
        storage: "Store at -20°C",
        coa_available: true,
        research_use_only: true,
      },
      tags: ["Starter Kit", "Bundle", "Value Pack", "Research Grade"],
      variants: [
        {
          title: "Kit",
          sku: "PBL-KIT-R",
          inventory_quantity: 15,
          prices: [{ amount: 15999, currency_code: "usd" }],
        },
      ],
    },
    {
      title: "StarTer Kit T",
      subtitle: "Tissue Research Peptide Kit",
      handle: "starter-kit-t",
      description: "Specialized kit for tissue repair research.",
      categories: ["Starter Kits"],
      metadata: {
        contents: "Tissue-focused research peptides",
        storage: "Store at -20°C",
        coa_available: true,
        research_use_only: true,
      },
      tags: ["Starter Kit", "Bundle", "Tissue Research", "Value Pack"],
      variants: [
        {
          title: "Kit",
          sku: "PBL-KIT-T",
          inventory_quantity: 15,
          prices: [{ amount: 15499, currency_code: "usd" }],
        },
      ],
    },
  ]
}