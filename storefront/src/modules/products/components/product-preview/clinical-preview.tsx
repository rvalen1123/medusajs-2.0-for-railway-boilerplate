/**
 * Clinical Product Preview - Enhanced Version
 * Professional medical-grade product card with advanced features
 */

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  FlaskConical,
  FileText,
  Shield,
  Award,
  Package,
  AlertCircle,
  Download,
  ShoppingCart,
  Eye,
  TrendingUp,
  CheckCircle
} from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"

interface ClinicalProductPreviewProps {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  price?: {
    calculated_amount: number
    currency_code: string
  }
  className?: string
}

export function ClinicalProductPreview({
  product,
  region,
  price,
  className,
}: ClinicalProductPreviewProps) {
  const [showQuickView, setShowQuickView] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount / 100)
  }

  // Extract metadata with enhanced defaults
  const purity = (product.metadata?.purity as number) || 99.4
  const dosage = (product.metadata?.dosage as string) || "5mg/vial"
  const storage = (product.metadata?.storage as string) || "2-8°C"
  const researchCount = (product.metadata?.research_count as number) || 0
  const bulkDiscount = (product.metadata?.bulk_discount as boolean) !== false
  const inStock = (product.metadata?.in_stock as boolean) !== false

  const priceAmount = price?.calculated_amount || 0
  const currencyCode = price?.currency_code || region.currency_code

  // Trust indicators
  const isTested = product.metadata?.third_party_tested !== false
  const isCGMP = product.metadata?.cgmp_compliant !== false
  const isUSP = product.metadata?.usp_compliant !== false
  const coaUrl = product.metadata?.coa_url as string | undefined

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)
    // Simulate add to cart
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowQuickView(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div className={`bg-white rounded-2xl border border-grey-20 overflow-hidden hover:border-brand-primary/30 hover:shadow-xl transition-all duration-300 ${className}`}>
          {/* Product Image Section */}
          <LocalizedClientLink href={`/products/${product.handle}`} className="block">
            <div className="relative aspect-square bg-gradient-to-br from-grey-5 to-white overflow-hidden">
              {/* Image Container */}
              {product.thumbnail ? (
                <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={product.thumbnail}
                    alt={product.title || 'Product'}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FlaskConical className="h-16 w-16 text-grey-20" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                {/* Purity Badge */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-sm"
                >
                  <FlaskConical className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-700">{purity}% Pure</span>
                </motion.div>

                {/* Category Badge */}
                {product.categories?.[0] && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-grey-20 shadow-sm"
                  >
                    <Shield className="h-3.5 w-3.5 text-brand-primary" />
                    <span className="text-xs font-semibold text-grey-90">Research Grade</span>
                  </motion.div>
                )}
              </div>

              {/* Top Right Badge */}
              {bulkDiscount && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                    Bulk Pricing
                  </div>
                </div>
              )}

              {/* Quick Actions - Visible on Hover */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <button
                  onClick={handleQuickView}
                  className="flex-1 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-lg border border-grey-20 hover:bg-white hover:border-brand-primary transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  <span className="text-xs font-semibold">Quick View</span>
                </button>
                <button
                  onClick={handleQuickAdd}
                  className="flex-1 px-3 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-hover transition-all duration-200 flex items-center justify-center gap-2"
                  disabled={isAddingToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-xs font-semibold">
                    {isAddingToCart ? "Adding..." : "Quick Add"}
                  </span>
                </button>
              </div>
            </div>
          </LocalizedClientLink>

          {/* Product Information */}
          <div className="p-5">
            <LocalizedClientLink href={`/products/${product.handle}`} className="block">
              {/* Title and Subtitle */}
              <div className="mb-3">
                <h3 className="text-lg font-bold text-grey-90 group-hover:text-brand-primary transition-colors duration-200 line-clamp-1">
                  {product.title}
                </h3>
                {product.subtitle && (
                  <p className="text-sm text-grey-60 mt-0.5">{product.subtitle}</p>
                )}
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Package className="h-3.5 w-3.5 text-grey-50" />
                  <span className="text-xs text-grey-70">
                    <span className="font-semibold">Dosage:</span> {dosage}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-3.5 w-3.5 text-grey-50" />
                  <span className="text-xs text-grey-70">
                    <span className="font-semibold">Storage:</span> {storage}
                  </span>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {isUSP && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-grey-10 rounded-md text-xs font-medium text-grey-70">
                    <Award className="h-3 w-3" />
                    USP
                  </span>
                )}
                {isCGMP && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-grey-10 rounded-md text-xs font-medium text-grey-70">
                    <Shield className="h-3 w-3" />
                    cGMP
                  </span>
                )}
                {isTested && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-grey-10 rounded-md text-xs font-medium text-grey-70">
                    <CheckCircle className="h-3 w-3" />
                    Tested
                  </span>
                )}
                {coaUrl && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-md text-xs font-medium text-blue-700">
                    <FileText className="h-3 w-3" />
                    COA
                  </span>
                )}
              </div>

              {/* Research Count */}
              {researchCount > 0 && (
                <div className="flex items-center gap-2 mb-4 p-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">
                    {researchCount} Published Studies
                  </span>
                </div>
              )}

              {/* Price and Stock */}
              <div className="flex items-end justify-between pt-3 border-t border-grey-15">
                <div>
                  {priceAmount > 0 ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-grey-90">
                          {formatPrice(priceAmount, currencyCode)}
                        </span>
                        <span className="text-sm text-grey-60">per vial</span>
                      </div>
                      {bulkDiscount && (
                        <p className="text-xs text-brand-accent font-semibold mt-1">
                          10+ units: Save 15%
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-sm text-grey-60">
                      Price on request
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1">
                  {inStock ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-semibold text-green-600">In Stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xs font-semibold text-amber-600">Pre-Order</span>
                    </div>
                  )}
                  <span className="text-xs text-grey-60">Ships same day</span>
                </div>
              </div>
            </LocalizedClientLink>

            {/* COA Download Link */}
            {coaUrl && (
              <div className="mt-3 pt-3 border-t border-grey-15">
                <a
                  href={coaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Certificate of Analysis
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-primary/20 transition-all duration-300 pointer-events-none" />
      </motion.div>

      {/* Quick View Modal would go here */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowQuickView(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
            <p className="text-grey-60">Quick view modal content would go here...</p>
            <button
              onClick={() => setShowQuickView(false)}
              className="mt-4 px-4 py-2 bg-grey-90 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
