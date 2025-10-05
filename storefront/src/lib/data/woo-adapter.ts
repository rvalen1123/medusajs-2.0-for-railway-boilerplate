/**
 * WooCommerce Adapter Layer
 * Maps WooCommerce API to existing MedusaJS component interfaces
 * This allows us to swap backends without changing UI components
 */

import {
  getProducts,
  getProduct,
  getCategories,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
  transformProductForUI
} from '@lib/woocommerce/products'

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  transformCartForUI
} from '@lib/woocommerce/cart'

import {
  getCurrentCustomer,
  loginCustomer,
  registerCustomer,
  registerB2BCustomer,
  logoutCustomer,
  transformCustomerForUI
} from '@lib/woocommerce/customers'

/**
 * Replace getCollectionsWithProducts from MedusaJS
 * Returns product collections/categories with their products
 */
export async function getCollectionsWithProducts(countryCode?: string) {
  try {
    // Get all categories
    const categories = await getCategories({
      hide_empty: true,
      per_page: 10
    })

    // For each category, get a few products
    const collectionsWithProducts = await Promise.all(
      categories.slice(0, 3).map(async (category) => {
        const products = await getProductsByCategory(category.slug, {
          per_page: 4
        })

        return {
          id: String(category.id),
          handle: category.slug,
          title: category.name,
          description: category.description,
          products: products.map(transformProductForUI)
        }
      })
    )

    return collectionsWithProducts
  } catch (error) {
    console.error('Error fetching collections:', error)
    return []
  }
}

/**
 * Replace getRegion from MedusaJS
 * Returns region/location data
 */
export async function getRegion(countryCode: string) {
  // WooCommerce doesn't have regions like MedusaJS
  // Return a mock region with necessary data
  return {
    id: 'us',
    name: 'United States',
    currency_code: 'USD',
    countries: [{ iso_2: 'US', name: 'United States' }],
    payment_providers: ['stripe', 'paypal'],
    fulfillment_providers: ['manual']
  }
}

/**
 * Get product by handle (slug)
 */
export async function getProductByHandle(handle: string) {
  const product = await getProduct(handle)
  return product ? transformProductForUI(product) : null
}

/**
 * Get products for store page
 */
export async function getStoreProducts(params?: {
  page?: number
  limit?: number
  category?: string
  sort?: string
}) {
  const products = await getProducts({
    per_page: params?.limit || 12,
    page: params?.page || 1,
    category: params?.category,
    orderby: params?.sort === 'price_asc' ? 'price' : params?.sort === 'price_desc' ? 'price' : 'date',
    order: params?.sort === 'price_asc' ? 'asc' : 'desc',
    status: 'publish',
    stock_status: 'instock'
  })

  return {
    products: products.map(transformProductForUI),
    count: products.length,
    nextPage: products.length === (params?.limit || 12) ? (params?.page || 1) + 1 : null
  }
}

/**
 * Cart adapter functions
 */
export const cartAdapter = {
  async get() {
    const cart = await getCart()
    return cart ? transformCartForUI(cart) : null
  },

  async addItem(productId: string, quantity: number = 1, variantId?: string) {
    const cart = await addToCart(productId, quantity, variantId)
    return cart ? transformCartForUI(cart) : null
  },

  async updateItem(itemId: string, quantity: number) {
    const cart = await updateCartItem(itemId, quantity)
    return cart ? transformCartForUI(cart) : null
  },

  async removeItem(itemId: string) {
    const cart = await removeFromCart(itemId)
    return cart ? transformCartForUI(cart) : null
  },

  async clear() {
    return await clearCart()
  }
}

/**
 * Customer adapter functions
 */
export const customerAdapter = {
  async getCurrent() {
    const customer = await getCurrentCustomer()
    return customer ? transformCustomerForUI(customer) : null
  },

  async login(email: string, password: string) {
    const result = await loginCustomer(email, password)
    return result ? transformCustomerForUI(result.user) : null
  },

  async register(data: any) {
    // Check if B2B registration
    if (data.company_name || data.business_type) {
      const customer = await registerB2BCustomer(data)
      return customer ? transformCustomerForUI(customer) : null
    }

    const customer = await registerCustomer(data)
    return customer ? transformCustomerForUI(customer) : null
  },

  logout() {
    logoutCustomer()
  }
}

/**
 * Search adapter
 */
export async function searchStoreProducts(query: string) {
  const products = await searchProducts(query, { per_page: 20 })
  return products.map(transformProductForUI)
}

/**
 * Get homepage data
 */
export async function getHomepageData() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(8),
    getCategories({ hide_empty: true, per_page: 6 })
  ])

  return {
    featuredProducts: featuredProducts.map(transformProductForUI),
    categories: categories.map(cat => ({
      id: String(cat.id),
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image?.src
    }))
  }
}

/**
 * Peptide-specific functions
 */
export async function getPeptideCollection() {
  const products = await getProductsByCategory('peptides', {
    per_page: 20,
    orderby: 'title',
    order: 'asc'
  })

  return {
    id: 'peptides',
    title: 'Research Peptides',
    description: 'Clinical-grade peptides for medical research',
    products: products.map(transformProductForUI)
  }
}

/**
 * Check if product is a peptide
 */
export function isPeptideProduct(product: any): boolean {
  return product.categories?.some((cat: any) =>
    cat.slug.includes('peptide') ||
    cat.slug.includes('research')
  ) || product.tags?.some((tag: string) =>
    tag.toLowerCase().includes('peptide')
  )
}

/**
 * Format price for display
 */
export function formatPrice(amount: string | number, currency = 'USD'): string {
  const price = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(price)
}

/**
 * Export all adapters as default
 */
export default {
  products: {
    getCollections: getCollectionsWithProducts,
    getByHandle: getProductByHandle,
    getStore: getStoreProducts,
    search: searchStoreProducts,
    getFeatured: async () => {
      const products = await getFeaturedProducts()
      return products.map(transformProductForUI)
    }
  },
  cart: cartAdapter,
  customer: customerAdapter,
  regions: {
    get: getRegion
  },
  homepage: {
    getData: getHomepageData
  },
  peptides: {
    getCollection: getPeptideCollection,
    isPeptide: isPeptideProduct
  },
  utils: {
    formatPrice
  }
}