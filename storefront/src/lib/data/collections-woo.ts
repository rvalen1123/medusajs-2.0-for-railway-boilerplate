/**
 * WooCommerce Collections Implementation
 * Replaces MedusaJS collections with WooCommerce categories
 */

import { cache } from "react"
import { getCategories, getProductsByCategory, transformProductForUI } from "@lib/woocommerce/products"
import { HttpTypes } from "@medusajs/types"

// Use WooCommerce if configured, otherwise fall back to MedusaJS
const USE_WOOCOMMERCE = process.env.NEXT_PUBLIC_USE_WOOCOMMERCE === 'true'

export const getCollectionsWithProducts = cache(
  async (countryCode: string): Promise<any[] | null> => {
    try {
      // If WooCommerce is not enabled, use the original MedusaJS implementation
      if (!USE_WOOCOMMERCE) {
        const medusaModule = await import('./collections')
        return medusaModule.getCollectionsWithProducts(countryCode)
      }

      // Get categories from WooCommerce
      const categories = await getCategories({
        hide_empty: true,
        per_page: 3,
        orderby: 'count',
        order: 'desc'
      })

      if (!categories || categories.length === 0) {
        return null
      }

      // For each category, get products
      const collectionsWithProducts = await Promise.all(
        categories.map(async (category) => {
          const products = await getProductsByCategory(category.slug, {
            per_page: 4,
            orderby: 'date',
            order: 'desc'
          })

          return {
            id: String(category.id),
            handle: category.slug,
            title: category.name,
            description: category.description || '',
            metadata: {},
            products: products.map(transformProductForUI)
          }
        })
      )

      return collectionsWithProducts
    } catch (error) {
      console.error('Error fetching collections:', error)
      // If WooCommerce fails, try falling back to MedusaJS
      if (USE_WOOCOMMERCE) {
        console.log('Falling back to MedusaJS collections...')
        const medusaModule = await import('./collections')
        return medusaModule.getCollectionsWithProducts(countryCode)
      }
      return null
    }
  }
)

export const getCollectionsList = cache(async function (
  offset: number = 0,
  limit: number = 100
): Promise<{ collections: any[]; count: number }> {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./collections')
    return medusaModule.getCollectionsList(offset, limit)
  }

  const categories = await getCategories({
    per_page: limit,
    page: Math.floor(offset / limit) + 1,
    hide_empty: true
  })

  const collections = categories.map(cat => ({
    id: String(cat.id),
    handle: cat.slug,
    title: cat.name,
    description: cat.description,
    metadata: {}
  }))

  return { collections, count: collections.length }
})

export const getCollectionByHandle = cache(async function (
  handle: string
): Promise<any> {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./collections')
    return medusaModule.getCollectionByHandle(handle)
  }

  const categories = await getCategories({ search: handle })
  const category = categories.find(cat => cat.slug === handle)

  if (!category) {
    throw new Error(`Collection not found: ${handle}`)
  }

  return {
    id: String(category.id),
    handle: category.slug,
    title: category.name,
    description: category.description,
    metadata: {}
  }
})

export const retrieveCollection = cache(async function (id: string) {
  if (!USE_WOOCOMMERCE) {
    const medusaModule = await import('./collections')
    return medusaModule.retrieveCollection(id)
  }

  const categories = await getCategories({ include: [parseInt(id)] })
  const category = categories[0]

  if (!category) {
    throw new Error(`Collection not found: ${id}`)
  }

  return {
    id: String(category.id),
    handle: category.slug,
    title: category.name,
    description: category.description,
    metadata: {}
  }
})