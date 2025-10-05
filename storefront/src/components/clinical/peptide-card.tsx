"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FlaskConical, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrustBadge } from "./trust-badge"
import { cn } from "@/lib/utils"

interface PeptideCardProps {
  peptide: {
    id: string
    name: string
    handle: string
    description?: string
    purity?: number
    thumbnail?: string
    price?: {
      calculated_amount: number
      currency_code: string
    }
    metadata?: {
      batch?: string
      tested?: boolean
      cgmp?: boolean
      coa_url?: string
    }
  }
  region: {
    currency_code: string
  }
  className?: string
}

export function PeptideCard({ peptide, region, className }: PeptideCardProps) {
  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount / 100)
  }

  const purity = peptide.purity || 99.4
  const price = peptide.price?.calculated_amount || 0
  const currencyCode = peptide.price?.currency_code || region.currency_code

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white border border-grey-20 rounded-lg overflow-hidden hover:shadow-xl hover:border-grey-30 transition-all group",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-grey-5">
        {peptide.thumbnail && (
          <Image
            src={peptide.thumbnail}
            alt={peptide.name}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute top-3 right-3">
          <TrustBadge type="purity" value={`${purity}% Pure`} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold tracking-wide uppercase text-grey-60 mb-1">
              Research Grade
            </p>
            <h3 className="text-xl font-bold text-grey-90">
              {peptide.name}
            </h3>
          </div>
          <FlaskConical className="h-5 w-5 text-grey-40 group-hover:text-grey-60 transition" />
        </div>

        {/* Description */}
        {peptide.description && (
          <p className="text-sm text-grey-70 leading-relaxed mb-4 line-clamp-2">
            {peptide.description}
          </p>
        )}

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {peptide.metadata?.tested && <TrustBadge type="tested" />}
          {peptide.metadata?.cgmp && <TrustBadge type="cgmp" />}
          <TrustBadge type="shipping" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-grey-10">
          <div>
            <span className="text-2xl font-bold text-grey-90">
              {formatPrice(price, currencyCode)}
            </span>
            <span className="text-sm text-grey-60 ml-2">
              per vial
            </span>
          </div>
          <Button size="sm" variant="primary">
            Add to Cart
          </Button>
        </div>

        {/* COA Link */}
        {peptide.metadata?.coa_url && (
          <a
            href={peptide.metadata.coa_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-4 text-sm font-semibold text-grey-60 hover:text-grey-90 transition group/coa"
          >
            <FileText className="h-4 w-4" />
            <span className="underline underline-offset-4 group-hover/coa:text-grey-90">
              View Certificate of Analysis
            </span>
          </a>
        )}
      </div>
    </motion.div>
  )
}
