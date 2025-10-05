/**
 * Modern Product Card - Client Component
 * Handles animations and interactions
 */

"use client"

import { motion } from "framer-motion"
import { Shield, Award } from "lucide-react"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface ModernProductCardProps {
  href: string
  thumbnail: React.ReactNode
  title: string
  price: React.ReactNode
  isFeatured?: boolean
}

export default function ModernProductCard({
  href,
  thumbnail,
  title,
  price,
  isFeatured,
}: ModernProductCardProps) {
  return (
    <LocalizedClientLink href={href} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
        data-testid="product-wrapper"
      >
        {/* Product Image with Hover Effect */}
        <div className="relative mb-4 overflow-hidden rounded-2xl bg-grey-5">
          <div className="relative aspect-square overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <div className="transform transition-transform duration-500 group-hover:scale-110">
              {thumbnail}
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
            {/* Quality Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-grey-20 shadow-sm">
              <Shield className="h-3 w-3 text-brand-primary" />
              <span className="text-xs font-semibold text-grey-90">USP</span>
            </div>

            {/* Third-Party Tested Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-grey-20 shadow-sm">
              <Award className="h-3 w-3 text-brand-accent" />
              <span className="text-xs font-semibold text-grey-90">Tested</span>
            </div>
          </div>

          {/* Featured Badge */}
          {isFeatured && (
            <div className="absolute top-3 right-3 z-20">
              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-accent to-brand-accent-hover text-white text-xs font-semibold shadow-glow">
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Product Title */}
          <Text
            className="text-base font-semibold text-grey-90 group-hover:text-brand-primary transition-colors duration-200 line-clamp-2"
            data-testid="product-title"
          >
            {title}
          </Text>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">{price}</div>

            {/* Quick View Indicator */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-xs font-medium text-brand-primary">
                View Details →
              </span>
            </div>
          </div>

          {/* Product Metadata */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-grey-60">In Stock</span>
            </div>
            <span className="text-grey-30">•</span>
            <span className="text-xs text-grey-60">Same-day shipping</span>
          </div>
        </div>

        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-accent/20 transition-all duration-300 pointer-events-none" />
      </motion.div>
    </LocalizedClientLink>
  )
}
