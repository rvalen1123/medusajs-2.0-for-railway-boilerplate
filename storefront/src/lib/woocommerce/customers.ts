/**
 * WooCommerce Customer & Authentication API Functions
 * Handles customer registration, login, and profile management
 */

import { getApiUrl, getAuthHeaders } from './config'
import { WooCustomer, WooOrder } from './types'

/**
 * Customer authentication
 * Note: WooCommerce doesn't have a standard JWT endpoint by default
 * This assumes you have JWT Authentication plugin installed
 */
export async function loginCustomer(
  username: string,
  password: string
): Promise<{ token: string; user: WooCustomer } | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WOO_URL}/wp-json/jwt-auth/v1/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    const data = await response.json()

    // Store token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('woo_token', data.token)
      localStorage.setItem('woo_user_email', data.user_email)
    }

    // Fetch full customer details
    const customer = await getCustomerByEmail(data.user_email)

    return {
      token: data.token,
      user: customer!
    }
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}

/**
 * Register new customer
 */
export async function registerCustomer(data: {
  email: string
  username?: string
  password: string
  first_name: string
  last_name: string
  billing?: any
  shipping?: any
  meta_data?: Array<{ key: string; value: any }>
}): Promise<WooCustomer | null> {
  try {
    // Add B2B King fields if registering as business
    const registrationData = {
      ...data,
      username: data.username || data.email,
      meta_data: [
        ...(data.meta_data || []),
        // B2B King integration
        { key: 'b2bking_approval_status', value: 'pending' },
        { key: 'b2bking_account_type', value: 'b2b' }
      ]
    }

    const response = await fetch(
      getApiUrl('/customers'),
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(registrationData)
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Registration failed')
    }

    const customer = await response.json()

    // Auto-login after registration
    await loginCustomer(data.email, data.password)

    return customer
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

/**
 * Register B2B customer with business details
 */
export async function registerB2BCustomer(data: {
  email: string
  password: string
  first_name: string
  last_name: string
  company_name: string
  tax_id?: string
  license_number?: string
  business_type: 'clinic' | 'research_lab' | 'university' | 'pharmacy'
  billing?: any
  shipping?: any
}): Promise<WooCustomer | null> {
  try {
    const b2bData = {
      ...data,
      username: data.email,
      meta_data: [
        { key: 'b2bking_approval_status', value: 'pending' },
        { key: 'b2bking_account_type', value: 'b2b' },
        { key: 'b2bking_company_name', value: data.company_name },
        { key: 'b2bking_business_type', value: data.business_type },
        { key: 'b2bking_tax_id', value: data.tax_id || '' },
        { key: 'b2bking_license_number', value: data.license_number || '' },
        { key: 'medical_license_verified', value: 'pending' }
      ]
    }

    return registerCustomer(b2bData)
  } catch (error) {
    console.error('B2B registration error:', error)
    throw error
  }
}

/**
 * Get current customer from token
 */
export async function getCurrentCustomer(): Promise<WooCustomer | null> {
  try {
    if (typeof window === 'undefined') return null

    const token = localStorage.getItem('woo_token')
    const userEmail = localStorage.getItem('woo_user_email')

    if (!token || !userEmail) return null

    // Validate token and get user
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WOO_URL}/wp-json/jwt-auth/v1/token/validate`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )

    if (!response.ok) {
      // Token invalid, clear storage
      localStorage.removeItem('woo_token')
      localStorage.removeItem('woo_user_email')
      return null
    }

    // Get customer details
    return getCustomerByEmail(userEmail)
  } catch (error) {
    console.error('Error getting current customer:', error)
    return null
  }
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email: string): Promise<WooCustomer | null> {
  try {
    const response = await fetch(
      getApiUrl(`/customers?email=${encodeURIComponent(email)}`),
      {
        headers: getAuthHeaders()
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch customer')
    }

    const customers = await response.json()
    return customers[0] || null
  } catch (error) {
    console.error('Error fetching customer:', error)
    return null
  }
}

/**
 * Get customer by ID
 */
export async function getCustomerById(id: number): Promise<WooCustomer | null> {
  try {
    const response = await fetch(
      getApiUrl(`/customers/${id}`),
      {
        headers: getAuthHeaders()
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch customer')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching customer:', error)
    return null
  }
}

/**
 * Update customer profile
 */
export async function updateCustomer(
  customerId: number,
  data: Partial<WooCustomer>
): Promise<WooCustomer | null> {
  try {
    const response = await fetch(
      getApiUrl(`/customers/${customerId}`),
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update customer')
    }

    return response.json()
  } catch (error) {
    console.error('Error updating customer:', error)
    return null
  }
}

/**
 * Get customer orders
 */
export async function getCustomerOrders(
  customerId: number,
  params?: {
    per_page?: number
    page?: number
    status?: string
  }
): Promise<WooOrder[]> {
  try {
    const queryParams = new URLSearchParams({
      customer: String(customerId),
      ...params
    })

    const response = await fetch(
      getApiUrl(`/orders?${queryParams.toString()}`),
      {
        headers: getAuthHeaders()
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

/**
 * Logout customer
 */
export function logoutCustomer(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('woo_token')
    localStorage.removeItem('woo_user_email')
    localStorage.removeItem('woo_cart_key')
  }
}

/**
 * Check if customer is logged in
 */
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('woo_token')
}

/**
 * Check B2B approval status
 */
export async function checkB2BApprovalStatus(customerId: number): Promise<string> {
  try {
    const customer = await getCustomerById(customerId)
    if (!customer) return 'unknown'

    const approvalStatus = customer.meta_data.find(
      meta => meta.key === 'b2bking_approval_status'
    )

    return approvalStatus?.value || 'pending'
  } catch (error) {
    console.error('Error checking B2B status:', error)
    return 'unknown'
  }
}

/**
 * Request quote (B2B feature)
 */
export async function requestQuote(data: {
  customer_id: number
  products: Array<{
    product_id: number
    quantity: number
    variation_id?: number
  }>
  message?: string
}): Promise<boolean> {
  try {
    // This would integrate with B2BKing's quote system
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WOO_URL}/wp-json/b2bking/v1/quotes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('woo_token')}`
        },
        body: JSON.stringify(data)
      }
    )

    return response.ok
  } catch (error) {
    console.error('Error requesting quote:', error)
    return false
  }
}

/**
 * Transform customer for UI compatibility
 */
export function transformCustomerForUI(customer: WooCustomer) {
  const isB2B = customer.meta_data.some(m => m.key === 'b2bking_account_type' && m.value === 'b2b')
  const approvalStatus = customer.meta_data.find(m => m.key === 'b2bking_approval_status')?.value

  return {
    id: String(customer.id),
    email: customer.email,
    firstName: customer.first_name,
    lastName: customer.last_name,
    fullName: `${customer.first_name} ${customer.last_name}`.trim(),
    company: customer.billing.company || customer.b2bking_company_name,
    isB2B,
    approvalStatus,
    billing: {
      ...customer.billing,
      fullAddress: `${customer.billing.address_1} ${customer.billing.address_2}`.trim(),
      location: `${customer.billing.city}, ${customer.billing.state} ${customer.billing.postcode}`
    },
    shipping: {
      ...customer.shipping,
      fullAddress: `${customer.shipping.address_1} ${customer.shipping.address_2}`.trim(),
      location: `${customer.shipping.city}, ${customer.shipping.state} ${customer.shipping.postcode}`
    },
    canCheckout: !isB2B || approvalStatus === 'approved',
    role: customer.role,
    avatar: customer.avatar_url
  }
}