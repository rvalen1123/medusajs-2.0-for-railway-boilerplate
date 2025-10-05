import { HttpTypes } from "@medusajs/types"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {product.title}
      </h1>
    </div>
  )
}

export default ProductInfo
