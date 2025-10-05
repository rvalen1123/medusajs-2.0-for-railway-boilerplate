/**
 * WooCommerce TypeScript Types
 * Defines types for WooCommerce REST API responses
 */

// Product Types
export interface WooProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modified: string
  type: 'simple' | 'grouped' | 'external' | 'variable'
  status: 'draft' | 'pending' | 'private' | 'publish'
  featured: boolean
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden'
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  price_html: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  backorders: 'no' | 'notify' | 'yes'
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  categories: WooCategory[]
  tags: WooTag[]
  images: WooImage[]
  attributes: WooAttribute[]
  variations: number[]
  meta_data: WooMetaData[]

  // Peptide-specific custom fields
  acf?: {
    purity?: string
    molecular_weight?: string
    cas_number?: string
    storage_conditions?: string
    coa_available?: boolean
    third_party_tested?: boolean
    research_applications?: string[]
  }
}

export interface WooProductVariation {
  id: number
  date_created: string
  date_modified: string
  description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  status: 'publish' | 'private' | 'draft'
  purchasable: boolean
  virtual: boolean
  downloadable: boolean
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  image: WooImage
  attributes: WooVariationAttribute[]
  meta_data: WooMetaData[]
}

export interface WooCategory {
  id: number
  name: string
  slug: string
  description?: string
  parent?: number
  count?: number
  image?: WooImage
}

export interface WooTag {
  id: number
  name: string
  slug: string
}

export interface WooImage {
  id: number
  src: string
  name: string
  alt: string
  date_created?: string
  date_modified?: string
}

export interface WooAttribute {
  id: number
  name: string
  position: number
  visible: boolean
  variation: boolean
  options: string[]
}

export interface WooVariationAttribute {
  id: number
  name: string
  option: string
}

export interface WooMetaData {
  id: number
  key: string
  value: any
}

// Cart Types
export interface WooCart {
  cart_hash: string
  cart_key: string
  currency: {
    currency_code: string
    currency_symbol: string
    currency_minor_unit: number
    currency_decimal_separator: string
    currency_thousand_separator: string
    currency_prefix: string
    currency_suffix: string
  }
  items: WooCartItem[]
  item_count: number
  items_weight: number
  totals: WooCartTotals
  needs_payment: boolean
  needs_shipping: boolean
  shipping: WooShipping
  fees: WooFee[]
  taxes: WooTax[]
  coupons: WooCoupon[]
  notices?: any[]
}

export interface WooCartItem {
  item_key: string
  id: number
  name: string
  title: string
  price: string
  quantity: {
    value: number
    min_purchase: number
    max_purchase: number
  }
  totals: {
    subtotal: string
    subtotal_tax: string
    total: string
    tax: string
  }
  slug: string
  meta: {
    product_type: string
    sku: string
    dimensions: any
    weight: number
    variation: WooVariationAttribute[]
  }
  cart_item_data: any[]
  featured_image: string
}

export interface WooCartTotals {
  subtotal: string
  subtotal_tax: string
  shipping_total: string
  shipping_tax: string
  shipping_taxes: any[]
  discount_total: string
  discount_tax: string
  cart_contents_total: string
  cart_contents_tax: string
  fee_total: string
  fee_tax: string
  total: string
  total_tax: string
}

// Customer Types
export interface WooCustomer {
  id: number
  date_created: string
  date_modified: string
  email: string
  first_name: string
  last_name: string
  role: string
  username: string
  billing: WooAddress
  shipping: WooAddress
  is_paying_customer: boolean
  avatar_url: string
  meta_data: WooMetaData[]

  // B2B King specific fields
  b2bking_group?: string
  b2bking_approval_status?: 'pending' | 'approved' | 'rejected'
  b2bking_company_name?: string
  b2bking_tax_id?: string
  b2bking_license_number?: string
}

export interface WooAddress {
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  state: string
  postcode: string
  country: string
  email?: string
  phone?: string
}

// Order Types
export interface WooOrder {
  id: number
  parent_id: number
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed'
  currency: string
  version: string
  prices_include_tax: boolean
  date_created: string
  date_modified: string
  discount_total: string
  discount_tax: string
  shipping_total: string
  shipping_tax: string
  cart_tax: string
  total: string
  total_tax: string
  customer_id: number
  order_key: string
  billing: WooAddress
  shipping: WooAddress
  payment_method: string
  payment_method_title: string
  transaction_id: string
  customer_ip_address: string
  customer_user_agent: string
  created_via: string
  customer_note: string
  date_completed: string | null
  date_paid: string | null
  number: string
  meta_data: WooMetaData[]
  line_items: WooLineItem[]
  tax_lines: WooTaxLine[]
  shipping_lines: WooShippingLine[]
  fee_lines: WooFeeLine[]
  coupon_lines: WooCouponLine[]
  refunds: any[]
}

export interface WooLineItem {
  id: number
  name: string
  product_id: number
  variation_id: number
  quantity: number
  tax_class: string
  subtotal: string
  subtotal_tax: string
  total: string
  total_tax: string
  taxes: any[]
  meta_data: WooMetaData[]
  sku: string
  price: number
  parent_name?: string
}

// Additional Types
export interface WooShipping {
  packages: any[]
}

export interface WooFee {
  name: string
  amount: string
}

export interface WooTax {
  name: string
  rate: string
  price: string
}

export interface WooCoupon {
  coupon: string
  discount_type: string
  totals: {
    total_discount: string
    total_discount_tax: string
  }
}

export interface WooTaxLine {
  id: number
  rate_code: string
  rate_id: number
  label: string
  compound: boolean
  tax_total: string
  shipping_tax_total: string
  rate_percent: number
  meta_data: WooMetaData[]
}

export interface WooShippingLine {
  id: number
  method_title: string
  method_id: string
  instance_id: string
  total: string
  total_tax: string
  taxes: any[]
  meta_data: WooMetaData[]
}

export interface WooFeeLine {
  id: number
  name: string
  tax_class: string
  tax_status: string
  amount: string
  total: string
  total_tax: string
  taxes: any[]
  meta_data: WooMetaData[]
}

export interface WooCouponLine {
  id: number
  code: string
  discount: string
  discount_tax: string
  meta_data: WooMetaData[]
}

// B2B King Types
export interface B2BGroup {
  id: string
  name: string
  discount_percentage?: number
  payment_terms?: string
  minimum_order?: number
  tax_exempt?: boolean
}

export interface B2BQuoteRequest {
  id: number
  customer_id: number
  status: 'pending' | 'approved' | 'rejected'
  items: any[]
  message: string
  created_date: string
  modified_date: string
}