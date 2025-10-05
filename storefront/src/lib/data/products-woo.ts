/**
 * WooCommerce Products Implementation
 * Replaces MedusaJS product functions with WooCommerce
 */

import { cache } from "react"
import {
  getProducts as getWooProducts,
  getProduct as getWooProduct,
  searchProducts as searchWooProducts,
  transformProductForUI,
  getProductVariations,
  getFeaturedProducts as getWooFeatured
} from "@lib/woocommerce/products"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const USE_WOOCOMMERCE = process.env.NEXT_PUBLIC_USE_WOOCOMMERCE === 'true'

/**
 * Get product by handle (slug)
 */
export const getProductByHandle = cache(async function (
  handle: string,
  regionId?: string
) {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./products')
    return medusaModule.getProductByHandle(handle, regionId!)
  }

  const product = await getWooProduct(handle)
  if (!product) return null

  // Get variations if it's a variable product
  let variations = []
  if (product.type === 'variable' && product.variations.length > 0) {
    variations = await getProductVariations(product.id)
  }

  const transformed = transformProductForUI(product)

  // Add variation details
  if (variations.length > 0) {
    transformed.variants = variations.map(v => ({
      id: String(v.id),
      title: v.attributes.map(a => a.option).join(' / '),
      sku: v.sku,
      price: {
        amount: v.price,
        currency: 'USD',
        formatted: `$${v.price}`
      },
      inventory_quantity: v.stock_quantity || 0,
      in_stock: v.stock_status === 'instock',
      options: v.attributes.map(a => ({
        name: a.name,
        value: a.option
      }))
    }))
  } else {
    // Simple product - create a single variant
    transformed.variants = [{
      id: String(product.id),
      title: product.name,
      sku: product.sku,
      price: {
        amount: product.price,
        currency: 'USD',
        formatted: `$${product.price}`
      },
      inventory_quantity: product.stock_quantity || 0,
      in_stock: product.stock_status === 'instock',
      options: []
    }]
  }

  return transformed
})

/**
 * Get products list with pagination and filters
 */
export const getProductsList = cache(async function ({
  pageParam = 1,
  queryParams,
  countryCode,
}: {
  pageParam?: number
  queryParams?: any
  countryCode: string
}): Promise<{
  response: { products: any[]; count: number }
  nextPage: number | null
  queryParams?: any
}> {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./products')
    return medusaModule.getProductsList({ pageParam, queryParams, countryCode })
  }

  const limit = queryParams?.limit || 12
  const sortBy = queryParams?.order || 'created_at:desc'

  // Map MedusaJS sort to WooCommerce
  let orderby = 'date'
  let order = 'desc'

  if (sortBy.includes('price')) {
    orderby = 'price'
    order = sortBy.includes('asc') ? 'asc' : 'desc'
  } else if (sortBy.includes('title')) {
    orderby = 'title'
    order = sortBy.includes('asc') ? 'asc' : 'desc'
  }

  const products = await getWooProducts({
    per_page: limit,
    page: pageParam,
    orderby: orderby as any,
    order: order as 'asc' | 'desc',
    status: 'publish',
    stock_status: 'instock',
    category: queryParams?.category_id?.[0],
    search: queryParams?.q
  })

  const transformedProducts = products.map(transformProductForUI)

  return {
    response: {
      products: transformedProducts,
      count: products.length
    },
    nextPage: products.length === limit ? pageParam + 1 : null,
    queryParams
  }
})

/**
 * Get products by IDs
 */
export const getProductsById = cache(async function ({
  ids,
  regionId,
}: {
  ids: string[]
  regionId?: string
}) {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./products')
    return medusaModule.getProductsById({ ids, regionId: regionId! })
  }

  // WooCommerce doesn't have a direct "get by multiple IDs" in one call
  // So we'll fetch them individually
  const products = await Promise.all(
    ids.map(id => getWooProduct(id))
  )

  return products
    .filter(p => p !== null)
    .map(transformProductForUI)
})

/**
 * Get products by category
 */
export const getProductsByCollectionHandle = cache(async function (
  handle: string
): Promise<any[]> {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./products')
    const region = await import('./regions').then(m => m.getRegion('us'))
    const { response } = await medusaModule.getProductsList({
      queryParams: { collection_handle: [handle] },
      countryCode: 'us'
    })
    return response.products
  }

  const { getProductsByCategory } = await import('@lib/woocommerce/products')
  const products = await getProductsByCategory(handle, {
    per_page: 20,
    orderby: 'date',
    order: 'desc'
  })

  return products.map(transformProductForUI)
})

/**
 * Search products
 */
export const searchProducts = cache(async function (
  query: string,
  countryCode?: string
) {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./products')
    const { response } = await medusaModule.getProductsList({
      queryParams: { q: query },
      countryCode: countryCode || 'us'
    })
    return response.products
  }

  const products = await searchWooProducts(query, { per_page: 20 })
  return products.map(transformProductForUI)
})

/**
 * Get featured products
 */
export const getFeaturedProducts = cache(async function (limit = 8) {
  if (!USE_WOOCOMMERCE) {
    // For MedusaJS, just get latest products
    const medusaModule = await import('./products')
    const { response } = await medusaModule.getProductsList({
      queryParams: { limit },
      countryCode: 'us'
    })
    return response.products
  }

  const products = await getWooFeatured(limit)
  return products.map(transformProductForUI)
})