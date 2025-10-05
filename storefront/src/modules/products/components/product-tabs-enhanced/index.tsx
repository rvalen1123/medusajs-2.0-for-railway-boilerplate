"use client"

import * as Tabs from '@radix-ui/react-tabs'
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

export default function ProductTabsEnhanced({ product }: ProductTabsProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16 border-t border-gray-200">
      <Tabs.Root defaultValue="specifications" className="w-full">
        <Tabs.List className="flex border-b border-gray-200">
          <Tabs.Trigger
            value="specifications"
            className="border-b-2 border-transparent px-6 py-4 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
          >
            Specifications
          </Tabs.Trigger>
          <Tabs.Trigger value="usage" className="border-b-2 border-transparent px-6 py-4 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600">
            Usage & Dosage
          </Tabs.Trigger>
          {product.metadata?.coa_url && (
            <Tabs.Trigger value="coa" className="border-b-2 border-transparent px-6 py-4 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600">
              Certificate of Analysis
            </Tabs.Trigger>
          )}
          <Tabs.Trigger value="shipping" className="border-b-2 border-transparent px-6 py-4 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600">
            Shipping & Returns
          </Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content value="specifications" className="mt-8 py-6">
          <div className="prose prose-sm max-w-none">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {product.metadata?.purity && (
                  <tr>
                    <td className="py-3 text-sm font-medium text-gray-900">Purity</td>
                    <td className="py-3 text-sm text-gray-600">{product.metadata.purity}%</td>
                  </tr>
                )}
                {product.metadata?.molecular_formula && (
                  <tr>
                    <td className="py-3 text-sm font-medium text-gray-900">Molecular Formula</td>
                    <td className="py-3 text-sm text-gray-600">{product.metadata.molecular_formula as string}</td>
                  </tr>
                )}
                {product.metadata?.storage && (
                  <tr>
                    <td className="py-3 text-sm font-medium text-gray-900">Storage</td>
                    <td className="py-3 text-sm text-gray-600">{product.metadata.storage as string}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Tabs.Content>
        
        <Tabs.Content value="usage" className="mt-8 py-6">
          <div className="prose prose-sm max-w-none text-gray-600">
            <p>{product.metadata?.usage_instructions as string || 'Consult with a healthcare professional for proper dosage.'}</p>
          </div>
        </Tabs.Content>
        
        {product.metadata?.coa_url && (
          <Tabs.Content value="coa" className="mt-8 py-6">
            <div className="aspect-[4/3] w-full max-w-3xl">
              <img
                src={product.metadata.coa_url as string}
                alt="Certificate of Analysis"
                className="w-full h-full object-contain border border-gray-200 rounded-lg"
              />
            </div>
          </Tabs.Content>
        )}
        
        <Tabs.Content value="shipping" className="mt-8 py-6">
          <div className="prose prose-sm max-w-none text-gray-600">
            <h4>Shipping Information</h4>
            <p>Free shipping on orders over $100. Orders typically ship within 1-2 business days.</p>
            <h4 className="mt-6">Returns</h4>
            <p>30-day return policy. Products must be unopened and in original condition.</p>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

