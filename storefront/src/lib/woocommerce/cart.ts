/**
 * WooCommerce Cart API Functions
 * Uses CoCart for headless cart management
 */

import { getApiUrl, getCartHeaders } from './config'
import { WooCart, WooCartItem } from './types'

/**
 * Get or create cart session
 * Returns cart key for session management
 */
export async function getCartSession(): Promise<string> {
  // Check if we have a cart key in localStorage
  if (typeof window !== 'undefined') {
    const existingKey = localStorage.getItem('woo_cart_key')
    if (existingKey) {
      return existingKey
    }
  }

  // Generate a new cart key
  const cartKey = generateCartKey()

  if (typeof window !== 'undefined') {
    localStorage.setItem('woo_cart_key', cartKey)
  }

  return cartKey
}

/**
 * Generate a unique cart key
 */
function generateCartKey(): string {
  return `ck_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get current cart contents
 */
export async function getCart(): Promise<WooCart | null> {
  try {
    const cartKey = await getCartSession()
    const response = await fetch(
      getApiUrl('/cart', 'cocart'),
      {
        headers: getCartHeaders(cartKey),
        credentials: 'include'
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        // Cart doesn't exist yet, return empty cart structure
        return createEmptyCart()
      }
      throw new Error(`Failed to fetch cart: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching cart:', error)
    return createEmptyCart()
  }
}

/**
 * Add item to cart
 */
export async function addToCart(
  productId: number | string,
  quantity: number = 1,
  variationId?: number | string,
  variationData?: Record<string, string>
): Promise<WooCart | null> {
  try {
    const cartKey = await getCartSession()
    const body: any = {
      id: String(productId),
      quantity: String(quantity)
    }

    if (variationId) {
      body.variation_id = String(variationId)
    }

    if (variationData) {
      body.variation = variationData
    }

    const response = await fetch(
      getApiUrl('/cart/add-item', 'cocart'),
      {
        method: 'POST',
        headers: getCartHeaders(cartKey),
        credentials: 'include',
        body: JSON.stringify(body)
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to add to cart: ${error}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(
  itemKey: string,
  quantity: number
): Promise<WooCart | null> {
  try {
    const cartKey = await getCartSession()
    const endpoint = `/cart/item/${itemKey}`

    const response = await fetch(
      getApiUrl(endpoint, 'cocart'),
      {
        method: 'POST',
        headers: getCartHeaders(cartKey),
        credentials: 'include',
        body: JSON.stringify({
          quantity: String(quantity)
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to update cart item: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error updating cart item:', error)
    throw error
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(itemKey: string): Promise<WooCart | null> {
  try {
    const cartKey = await getCartSession()
    const endpoint = `/cart/item/${itemKey}`

    const response = await fetch(
      getApiUrl(endpoint, 'cocart'),
      {
        method: 'DELETE',
        headers: getCartHeaders(cartKey),
        credentials: 'include'
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to remove from cart: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error removing from cart:', error)
    throw error
  }
}

/**
 * Clear entire cart
 */
export async function clearCart(): Promise<boolean> {
  try {
    const cartKey = await getCartSession()

    const response = await fetch(
      getApiUrl('/cart/clear', 'cocart'),
      {
        method: 'POST',
        headers: getCartHeaders(cartKey),
        credentials: 'include'
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to clear cart: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error('Error clearing cart:', error)
    return false
  }
}

/**
 * Apply coupon to cart
 */
export async function applyCoupon(couponCode: string): Promise<WooCart | null> {
  try {
    const cartKey = await getCartSession()

    const response = await fetch(
      getApiUrl('/cart/apply-coupon', 'cocart'),
      {
        method: 'POST',
        headers: getCartHeaders(cartKey),
        credentials: 'include',
        body: JSON.stringify({
          coupon_code: couponCode
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to apply coupon: ${error}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error applying coupon:', error)
    throw error
  }
}

/**
 * Remove coupon from cart
 */
export async function removeCoupon(couponCode: string): Promise<WooCart | null> {
  try {
    const cartKey = await getCartSession()

    const response = await fetch(
      getApiUrl('/cart/remove-coupon', 'cocart'),
      {
        method: 'DELETE',
        headers: getCartHeaders(cartKey),
        credentials: 'include',
        body: JSON.stringify({
          coupon_code: couponCode
        })
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to remove coupon: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error removing coupon:', error)
    throw error
  }
}

/**
 * Calculate cart totals
 */
export async function calculateTotals(): Promise<WooCart | null> {
  try {
    const cartKey = await getCartSession()

    const response = await fetch(
      getApiUrl('/cart/calculate', 'cocart'),
      {
        method: 'POST',
        headers: getCartHeaders(cartKey),
        credentials: 'include'
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to calculate totals: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error calculating totals:', error)
    return null
  }
}

/**
 * Create empty cart structure
 */
function createEmptyCart(): WooCart {
  return {
    cart_hash: '',
    cart_key: '',
    currency: {
      currency_code: 'USD',
      currency_symbol: '$',
      currency_minor_unit: 2,
      currency_decimal_separator: '.',
      currency_thousand_separator: ',',
      currency_prefix: '$',
      currency_suffix: ''
    },
    items: [],
    item_count: 0,
    items_weight: 0,
    totals: {
      subtotal: '0',
      subtotal_tax: '0',
      shipping_total: '0',
      shipping_tax: '0',
      shipping_taxes: [],
      discount_total: '0',
      discount_tax: '0',
      cart_contents_total: '0',
      cart_contents_tax: '0',
      fee_total: '0',
      fee_tax: '0',
      total: '0',
      total_tax: '0'
    },
    needs_payment: false,
    needs_shipping: false,
    shipping: {
      packages: []
    },
    fees: [],
    taxes: [],
    coupons: [],
    notices: []
  }
}

/**
 * Transform WooCommerce cart for UI compatibility
 */
export function transformCartForUI(cart: WooCart) {
  return {
    id: cart.cart_key,
    items: cart.items.map(transformCartItemForUI),
    total: parseFloat(cart.totals.total),
    subtotal: parseFloat(cart.totals.subtotal),
    tax: parseFloat(cart.totals.total_tax),
    shipping: parseFloat(cart.totals.shipping_total),
    discount: parseFloat(cart.totals.discount_total),
    itemCount: cart.item_count,
    isEmpty: cart.item_count === 0,
    coupons: cart.coupons.map(coupon => ({
      code: coupon.coupon,
      amount: parseFloat(coupon.totals.total_discount)
    }))
  }
}

/**
 * Transform cart item for UI
 */
function transformCartItemForUI(item: WooCartItem) {
  return {
    id: item.item_key,
    productId: String(item.id),
    name: item.name,
    title: item.title,
    slug: item.slug,
    quantity: item.quantity.value,
    price: parseFloat(item.price),
    total: parseFloat(item.totals.total),
    subtotal: parseFloat(item.totals.subtotal),
    image: item.featured_image,
    sku: item.meta.sku,
    variation: item.meta.variation.map(v => ({
      name: v.name,
      value: v.option
    })),
    minQuantity: item.quantity.min_purchase,
    maxQuantity: item.quantity.max_purchase
  }
}