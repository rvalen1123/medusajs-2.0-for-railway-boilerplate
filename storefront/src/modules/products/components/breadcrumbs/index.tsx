import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type BreadcrumbsProps = {
  product: HttpTypes.StoreProduct
}

export default function Breadcrumbs({ product }: BreadcrumbsProps) {
  const breadcrumbs = []
  
  if (product.collection) {
    breadcrumbs.push({
      id: product.collection.id,
      name: product.collection.title,
      href: `/collections/${product.collection.handle}`
    })
  }
  
  if (product.categories && product.categories.length > 0) {
    breadcrumbs.push({
      id: product.categories[0].id,
      name: product.categories[0].name,
      href: `/categories/${product.categories[0].handle}`
    })
  }
  
  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div className="flex items-center">
            <LocalizedClientLink href="/" className="mr-2 text-sm font-medium text-gray-900">
              Home
            </LocalizedClientLink>
            <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" aria-hidden="true" className="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
        
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.id}>
            <div className="flex items-center">
              <LocalizedClientLink href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                {breadcrumb.name}
              </LocalizedClientLink>
              <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" aria-hidden="true" className="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
        ))}
        
        <li className="text-sm">
          <span className="font-medium text-gray-500">{product.title}</span>
        </li>
      </ol>
    </nav>
  )
}

