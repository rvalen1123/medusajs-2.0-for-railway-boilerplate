import React, { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import { notFound } from "next/navigation"
import Breadcrumbs from "@modules/products/components/breadcrumbs"
import ImageGalleryTiered from "@modules/products/components/image-gallery-tiered"
import ProductInfo from "@modules/products/templates/product-info"
import ProductActions from "@modules/products/components/product-actions"
import ProductDescription from "@modules/products/components/product-description"
import ProductTabsEnhanced from "@modules/products/components/product-tabs-enhanced"
import RelatedProducts from "@modules/products/components/related-products"
import ProductActionsWrapper from "./product-actions-wrapper"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Breadcrumbs */}
        <Breadcrumbs product={product} />
        
        {/* Image gallery - Tiered layout */}
        <ImageGalleryTiered images={product.images || []} />
        
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          {/* Left side - Title and Description (2 cols) */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <ProductInfo product={product} />
          </div>
          
          {/* Right side - Actions (1 col) */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
          
          {/* Bottom - Details/Highlights */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <ProductDescription product={product} />
          </div>
        </div>
        
        {/* Tabbed content below */}
        <ProductTabsEnhanced product={product} />
        
        {/* Related products */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-16">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
