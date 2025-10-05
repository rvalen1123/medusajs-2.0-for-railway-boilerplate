import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Award, Shield, Beaker } from "lucide-react"

type PeptideCardProps = {
  product: HttpTypes.StoreProduct
  price: React.ReactNode
  thumbnail: React.ReactNode
}

export default function PeptideCard({
  product,
  price,
  thumbnail,
}: PeptideCardProps) {
  const metadata = product.metadata as Record<string, any> || {}
  const purity = metadata.purity || ">98%"
  const coaAvailable = metadata.coa_available !== false
  const thirdPartyTested = metadata.third_party_tested !== false

  // Extract size from first variant
  const firstVariant = product.variants?.[0]
  const size = firstVariant?.title || "Standard"

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-blue-300">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {thumbnail}

          {/* Badges Overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {purity && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-0.5">
                {purity} Pure
              </Badge>
            )}
            {coaAvailable && (
              <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5">
                COA
              </Badge>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-sm font-medium">
                View Details
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {product.title}
            </h3>
            {product.subtitle && (
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {thirdPartyTested && (
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>3rd Party</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Beaker className="h-3 w-3" />
              <span>{size}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              <span>USA</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="space-y-1">
              <div className="text-xs text-gray-500">Starting at</div>
              <div className="font-bold text-lg text-gray-900">
                {price}
              </div>
            </div>
            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              View
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* Research Use Only Badge */}
          <div className="pt-2">
            <Badge
              variant="outline"
              className="w-full justify-center text-xs py-1 border-orange-300 text-orange-700 bg-orange-50"
            >
              🔬 RESEARCH USE ONLY
            </Badge>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}