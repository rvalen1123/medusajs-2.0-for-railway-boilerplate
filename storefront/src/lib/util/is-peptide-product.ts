import { HttpTypes } from "@medusajs/types"

/**
 * Determines if a product is a peptide/research compound
 * Checks categories, metadata, and product title
 */
export function isPeptideProduct(product: HttpTypes.StoreProduct): boolean {
  if (!product) return false

  // Check categories
  const peptideCategories = [
    "research-peptides",
    "growth-factors",
    "metabolic-compounds",
    "anti-aging-research",
    "starter-kits"
  ]

  if (product.categories?.some(cat =>
    peptideCategories.includes(cat.handle?.toLowerCase() || "")
  )) {
    return true
  }

  // Check metadata
  const metadata = product.metadata as Record<string, any>
  if (metadata?.research_use_only === true ||
      metadata?.coa_available === true ||
      metadata?.purity?.includes(">98%")) {
    return true
  }

  // Check product title/handle for peptide indicators
  const peptideKeywords = [
    "bpc", "ghk", "tb-500", "tesamorelin", "glp",
    "nad", "peptide", "research", "kit"
  ]

  const titleLower = product.title?.toLowerCase() || ""
  const handleLower = product.handle?.toLowerCase() || ""

  return peptideKeywords.some(keyword =>
    titleLower.includes(keyword) || handleLower.includes(keyword)
  )
}