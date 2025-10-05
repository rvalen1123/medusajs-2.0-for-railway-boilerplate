import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[] | null
  region: HttpTypes.StoreRegion | null
}) {
  if (!collections || !region) {
    return (
      <li className="py-8 text-center text-ui-fg-muted">
        <p>Connect to your Medusa backend to see featured products</p>
        <p className="text-sm mt-2">Set NEXT_PUBLIC_MEDUSA_BACKEND_URL and NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY</p>
      </li>
    )
  }

  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} region={region} />
    </li>
  ))
}
