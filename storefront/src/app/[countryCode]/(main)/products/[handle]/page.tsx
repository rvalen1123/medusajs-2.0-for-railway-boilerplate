import { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductTemplate from "@modules/products/templates"
import { getRegion, listRegions } from "@lib/data/regions-woo"
import { getProductByHandle, getProductsList } from "@lib/data/products-woo"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await getProductByHandle(handle, region.id)

  if (!product) {
    notFound()
  }

  // Check if product is in stock
  const inStock = product.variants?.some(v => {
    if (!v.manage_inventory) return true
    if (v.allow_backorder) return true
    return (v.inventory_quantity || 0) > 0
  }) || false

  // Get price
  const price = product.variants?.[0]?.prices?.[0]?.amount || 0
  const formattedPrice = typeof price === 'number' ? (price / 100).toFixed(2) : price

  // Structured data for rich results
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.images?.map(img => img.url) || [],
    "description": product.description || product.title,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Premier Bio Labs"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://premierbiolabs.com/products/${product.handle}`,
      "priceCurrency": "USD",
      "price": formattedPrice,
      "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Premier Bio Labs"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "117"
    }
  }

  return {
    title: `${product.title} | Premier Bio Labs`,
    description: product.description?.substring(0, 160) || product.title,
    openGraph: {
      title: product.title,
      description: product.description || product.title,
      images: product.images?.map(img => ({ url: img.url })) || [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description || product.title,
      images: product.images?.[0]?.url ? [product.images[0].url] : [],
    },
    other: {
      'script:ld+json': JSON.stringify(structuredData)
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getProductByHandle(params.handle, region.id)
  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
