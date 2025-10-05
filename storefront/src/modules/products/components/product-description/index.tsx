import { HttpTypes } from "@medusajs/types"

type ProductDescriptionProps = {
  product: HttpTypes.StoreProduct
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  // Extract highlights from metadata or description
  const highlights = product.metadata?.highlights as string[] || [
    'Third-party tested for purity',
    'cGMP certified facilities',
    'Batch-verified authenticity',
    'Free shipping on orders over $100'
  ]
  
  return (
    <>
      {/* Description */}
      <div>
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6">
          <p className="text-base text-gray-900">{product.description}</p>
        </div>
      </div>
      
      {/* Highlights */}
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="text-gray-400">
                <span className="text-gray-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Details */}
      {product.metadata?.details && (
        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">Details</h2>
          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-600">{product.metadata.details as string}</p>
          </div>
        </div>
      )}
    </>
  )
}

