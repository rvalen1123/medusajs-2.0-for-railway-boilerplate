/**
 * WooCommerce Product API Functions
 * Handles all product-related API calls
 */

import { getApiUrl, getAuthHeaders } from './config'
import { WooProduct, WooProductVariation, WooCategory } from './types'

/**
 * Fetch all products with optional filters
 */
export async function getProducts(params?: {
  per_page?: number
  page?: number
  category?: string
  featured?: boolean
  on_sale?: boolean
  search?: string
  orderby?: 'date' | 'id' | 'title' | 'slug' | 'price' | 'popularity' | 'rating'
  order?: 'asc' | 'desc'
  status?: 'draft' | 'pending' | 'private' | 'publish'
  stock_status?: 'instock' | 'outofstock' | 'onbackorder'
  min_price?: string
  max_price?: string
}): Promise<WooProduct[]> {
  const queryParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value))
      }
    })
  }

  const url = `${getApiUrl('/products')}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

  try {
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 60 } // Cache for 1 minute
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

/**
 * Get a single product by ID or slug
 */
export async function getProduct(idOrSlug: string): Promise<WooProduct | null> {
  // Try to determine if it's an ID or slug
  const isId = /^\d+$/.test(idOrSlug)
  const endpoint = isId ? `/products/${idOrSlug}` : `/products?slug=${idOrSlug}`

  try {
    const response = await fetch(getApiUrl(endpoint), {
      headers: getAuthHeaders(),
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`)
    }

    const data = await response.json()

    // If fetching by slug, the API returns an array
    return isId ? data : data[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

/**
 * Get product variations
 */
export async function getProductVariations(productId: number): Promise<WooProductVariation[]> {
  try {
    const response = await fetch(
      getApiUrl(`/products/${productId}/variations`),
      {
        headers: getAuthHeaders(),
        next: { revalidate: 60 }
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch variations: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching variations:', error)
    return []
  }
}

/**
 * Get all product categories
 */
export async function getCategories(params?: {
  per_page?: number
  page?: number
  search?: string
  exclude?: number[]
  include?: number[]
  order?: 'asc' | 'desc'
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count'
  hide_empty?: boolean
  parent?: number
}): Promise<WooCategory[]> {
  const queryParams = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','))
        } else {
          queryParams.append(key, String(value))
        }
      }
    })
  }

  const url = `${getApiUrl('/products/categories')}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

  try {
    const response = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Get featured products for homepage
 */
export async function getFeaturedProducts(limit: number = 8): Promise<WooProduct[]> {
  return getProducts({
    featured: true,
    per_page: limit,
    status: 'publish',
    stock_status: 'instock'
  })
}

/**
 * Get products by category slug
 */
export async function getProductsByCategory(
  categorySlug: string,
  params?: {
    per_page?: number
    page?: number
    orderby?: 'date' | 'id' | 'title' | 'slug' | 'price' | 'popularity' | 'rating'
    order?: 'asc' | 'desc'
  }
): Promise<WooProduct[]> {
  // First, get the category ID from the slug
  const categories = await getCategories({ search: categorySlug })
  const category = categories.find(cat => cat.slug === categorySlug)

  if (!category) {
    console.warn(`Category not found: ${categorySlug}`)
    return []
  }

  return getProducts({
    ...params,
    category: String(category.id)
  })
}

/**
 * Search products by keyword
 */
export async function searchProducts(
  query: string,
  params?: {
    per_page?: number
    page?: number
  }
): Promise<WooProduct[]> {
  return getProducts({
    ...params,
    search: query,
    status: 'publish'
  })
}

/**
 * Get related products
 * Note: WooCommerce doesn't have a direct endpoint for related products,
 * so we'll get products from the same category
 */
export async function getRelatedProducts(
  productId: number,
  limit: number = 4
): Promise<WooProduct[]> {
  try {
    // Get the current product to find its categories
    const product = await getProduct(String(productId))
    if (!product || product.categories.length === 0) {
      return []
    }

    // Get products from the first category
    const categoryId = product.categories[0].id

    const relatedProducts = await getProducts({
      category: String(categoryId),
      per_page: limit + 1, // Get one extra to exclude current product
      status: 'publish',
      stock_status: 'instock'
    })

    // Filter out the current product
    return relatedProducts
      .filter(p => p.id !== productId)
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

/**
 * Transform WooCommerce product to match existing component props
 * This helps maintain compatibility with existing UI components
 */
export function transformProductForUI(product: WooProduct) {
  return {
    id: String(product.id),
    handle: product.slug,
    title: product.name,
    subtitle: product.short_description.replace(/<[^>]*>/g, ''), // Strip HTML
    description: product.description,
    thumbnail: product.images[0]?.src || '/placeholder-product.jpg',
    images: product.images.map(img => ({
      id: String(img.id),
      url: img.src,
      alt: img.alt || product.name
    })),
    variants: product.variations.map(id => ({ id: String(id) })),
    price: {
      amount: product.price,
      currency: 'USD',
      formatted: `$${product.price}`
    },
    metadata: {
      purity: product.acf?.purity || product.meta_data?.find(m => m.key === 'purity')?.value,
      molecular_weight: product.acf?.molecular_weight || product.meta_data?.find(m => m.key === 'molecular_weight')?.value,
      cas_number: product.acf?.cas_number || product.meta_data?.find(m => m.key === 'cas_number')?.value,
      coa_available: product.acf?.coa_available ?? true,
      third_party_tested: product.acf?.third_party_tested ?? true,
    },
    inStock: product.stock_status === 'instock',
    tags: product.tags.map(tag => tag.name),
    categories: product.categories.map(cat => ({
      id: String(cat.id),
      name: cat.name,
      slug: cat.slug
    }))
  }
}

/**
 * Get peptide-specific products
 * Filters for products in peptide-related categories
 */
export async function getPeptideProducts(params?: {
  per_page?: number
  page?: number
}): Promise<WooProduct[]> {
  // Get all products and filter for peptides
  // In production, you'd want to use specific category IDs
  const products = await getProducts({
    ...params,
    status: 'publish'
  })

  // Filter for peptide products based on category or tags
  return products.filter(product => {
    const isPeptide =
      product.categories.some(cat =>
        cat.slug.includes('peptide') ||
        cat.slug.includes('research')
      ) ||
      product.tags.some(tag =>
        tag.slug.includes('peptide') ||
        tag.slug.includes('research')
      )

    return isPeptide
  })
}