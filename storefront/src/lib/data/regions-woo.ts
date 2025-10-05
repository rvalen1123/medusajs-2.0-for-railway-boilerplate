/**
 * WooCommerce Regions Implementation
 * Provides region/country data for WooCommerce
 */

import { cache } from "react"

const USE_WOOCOMMERCE = process.env.NEXT_PUBLIC_USE_WOOCOMMERCE === 'true'

// WooCommerce doesn't have regions like MedusaJS, so we'll provide a default
const DEFAULT_REGION = {
  id: 'us-region',
  name: 'United States',
  currency_code: 'USD',
  currency: {
    symbol: '$',
    code: 'USD',
    symbol_native: '$',
    includes_tax: false
  },
  countries: [
    {
      id: 'us',
      iso_2: 'US',
      iso_3: 'USA',
      name: 'United States',
      display_name: 'United States',
      region_id: 'us-region'
    }
  ],
  payment_providers: ['stripe', 'paypal'],
  fulfillment_providers: ['manual', 'usps', 'fedex', 'ups']
}

export const getRegion = cache(async function (countryCode: string) {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./regions')
    return medusaModule.getRegion(countryCode)
  }

  // For WooCommerce, return our default region
  // In production, you might want to fetch this from WooCommerce settings
  return DEFAULT_REGION
})

export const listRegions = cache(async function () {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./regions')
    return medusaModule.listRegions()
  }

  // Return array with default region
  return [DEFAULT_REGION]
})