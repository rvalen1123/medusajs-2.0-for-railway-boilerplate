"use client"

import { StarIcon } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { useParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import OptionSelect from "./option-select"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductActions({ product, region, disabled }: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  
  const reviews = { href: '#', average: 4.5, totalCount: 117 }
  
  // Pre-select if only 1 variant
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = product.variants[0].options?.reduce((acc, opt) => {
        if (opt.option?.title && opt.value) {
          acc[opt.option.title] = opt.value
        }
        return acc
      }, {} as Record<string, string>)
      setOptions(variantOptions || {})
    }
  }, [product.variants])
  
  const selectedVariant = useMemo(() => {
    return product.variants?.find(v => {
      const variantOptions = v.options?.reduce((acc, opt) => {
        if (opt.option?.title && opt.value) acc[opt.option.title] = opt.value
        return acc
      }, {} as Record<string, string>)
      return JSON.stringify(variantOptions) === JSON.stringify(options)
    })
  }, [product.variants, options])
  
  const inStock = useMemo(() => {
    if (!selectedVariant) return false
    if (!selectedVariant.manage_inventory) return true
    if (selectedVariant.allow_backorder) return true
    return (selectedVariant.inventory_quantity || 0) > 0
  }, [selectedVariant])
  
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return
    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode
    })
    setIsAdding(false)
  }
  
  // Format price from variant
  const formatPrice = (amount: number | string | undefined) => {
    if (!amount) return '0.00'
    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    return (num / 100).toFixed(2)
  }
  
  const price = selectedVariant?.prices?.[0]?.amount || product.variants?.[0]?.prices?.[0]?.amount
  
  return (
    <>
      <h2 className="sr-only">Product information</h2>
      <p className="text-3xl tracking-tight text-gray-900">${formatPrice(price)}</p>
      
      {/* Reviews */}
      <div className="mt-6">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  reviews.average > rating ? 'fill-gray-900 text-gray-900' : 'fill-gray-200 text-gray-200',
                  'size-5 shrink-0'
                )}
              />
            ))}
          </div>
          <p className="sr-only">{reviews.average} out of 5 stars</p>
          <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            {reviews.totalCount} reviews
          </a>
        </div>
      </div>
      
      <form className="mt-10" onSubmit={(e) => { e.preventDefault(); handleAddToCart(); }}>
        {/* Variant options */}
        {(product.options || []).length > 0 && (
          <div className="space-y-6">
            {product.options.map((option) => (
              <OptionSelect
                key={option.id}
                option={option}
                current={options[option.title || '']}
                updateOption={(title, value) => setOptions(prev => ({ ...prev, [title]: value }))}
                title={option.title || ''}
                disabled={!!disabled || isAdding}
              />
            ))}
          </div>
        )}
        
        {/* Quantity Selector */}
        <div className="mt-6">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-900">
            Quantity
          </label>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={disabled || isAdding}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 hover:bg-gray-50 disabled:opacity-50"
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              disabled={disabled || isAdding}
              className="w-20 rounded-md border border-gray-300 px-3 py-2 text-center focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              disabled={disabled || isAdding}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 hover:bg-gray-50 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Add to cart button */}
        <button
          type="submit"
          disabled={!inStock || !selectedVariant || disabled || isAdding}
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isAdding ? 'Adding...' : !selectedVariant ? 'Select options' : !inStock ? 'Out of stock' : 'Add to bag'}
        </button>
      </form>
      
      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={(title, value) => setOptions(prev => ({ ...prev, [title]: value }))}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={false}
        optionsDisabled={!!disabled || isAdding}
      />
    </>
  )
}
