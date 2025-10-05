import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products-woo"
import ModernProductCard from "./modern-card"
import PeptideCard from "./peptide-card"
import { isPeptideProduct } from "@lib/util/is-peptide-product"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  const thumbnail = (
    <Thumbnail
      thumbnail={product.thumbnail}
      images={product.images}
      size="full"
      isFeatured={isFeatured}
    />
  )

  const price = cheapestPrice ? <PreviewPrice price={cheapestPrice} /> : null

  // Use PeptideCard for peptide products
  if (isPeptideProduct(product)) {
    return (
      <PeptideCard
        product={product}
        price={price}
        thumbnail={thumbnail}
      />
    )
  }

  // Use ModernProductCard for regular products
  return (
    <ModernProductCard
      href={`/products/${product.handle}`}
      thumbnail={thumbnail}
      title={product.title}
      price={price}
      isFeatured={isFeatured}
    />
  )
}
