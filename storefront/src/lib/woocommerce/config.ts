/**
 * WooCommerce API Configuration
 * Handles connection to WooCommerce REST API and CoCart
 */

export const wooConfig = {
  // Base URL for WooCommerce site
  baseUrl: process.env.NEXT_PUBLIC_WOO_URL || 'https://premierbiolabs.com',

  // WooCommerce REST API credentials
  consumerKey: process.env.WOO_CONSUMER_KEY || '',
  consumerSecret: process.env.WOO_CONSUMER_SECRET || '',

  // API versions
  wcApiVersion: 'wc/v3',
  coCartApiVersion: 'cocart/v2',

  // API endpoints
  endpoints: {
    // Products
    products: '/products',
    productCategories: '/products/categories',
    productVariations: '/products/{id}/variations',

    // Cart (CoCart)
    cart: '/cart',
    addToCart: '/cart/add-item',
    updateCart: '/cart/item/{key}',
    removeFromCart: '/cart/item/{key}',
    clearCart: '/cart/clear',
    cartTotals: '/cart/totals',

    // Customers
    customers: '/customers',
    customerOrders: '/customers/{id}/orders',

    // Orders
    orders: '/orders',
    orderNotes: '/orders/{id}/notes',

    // Auth
    auth: '/customers/authenticate',
    register: '/customers/register',

    // B2B (B2BKing endpoints)
    b2bApproval: '/b2bking/v1/approval',
    b2bTiers: '/b2bking/v1/tiers',
    b2bQuotes: '/b2bking/v1/quotes',
  },

  // Headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

/**
 * Get WooCommerce API URL
 */
export function getApiUrl(endpoint: string, version: 'wc' | 'cocart' = 'wc'): string {
  const apiVersion = version === 'cocart' ? wooConfig.coCartApiVersion : wooConfig.wcApiVersion
  return `${wooConfig.baseUrl}/wp-json/${apiVersion}${endpoint}`
}

/**
 * Get authenticated headers for WooCommerce API
 */
export function getAuthHeaders(): HeadersInit {
  const credentials = Buffer.from(
    `${wooConfig.consumerKey}:${wooConfig.consumerSecret}`
  ).toString('base64')

  return {
    ...wooConfig.headers,
    'Authorization': `Basic ${credentials}`
  }
}

/**
 * Get CoCart session headers
 */
export function getCartHeaders(cartKey?: string): HeadersInit {
  const headers: HeadersInit = {
    ...wooConfig.headers,
  }

  if (cartKey) {
    headers['X-CoCart-Session-Key'] = cartKey
  }

  return headers
}