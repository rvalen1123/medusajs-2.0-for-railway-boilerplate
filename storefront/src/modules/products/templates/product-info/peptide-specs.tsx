"use client"

import { HttpTypes } from "@medusajs/types"
import { Badge } from "@/components/ui/badge"
import {
  Beaker,
  Shield,
  Award,
  FileText,
  AlertTriangle,
  Package,
  Thermometer,
  Clock,
  CheckCircle
} from "lucide-react"

type PeptideSpecsProps = {
  product: HttpTypes.StoreProduct
}

export default function PeptideSpecs({ product }: PeptideSpecsProps) {
  const metadata = product.metadata as Record<string, any> || {}

  const specifications = [
    {
      label: "Purity",
      value: metadata.purity || ">98%",
      icon: <Award className="h-4 w-4" />,
      highlight: true,
    },
    {
      label: "Molecular Weight",
      value: metadata.molecular_weight || "See COA",
      icon: <Beaker className="h-4 w-4" />,
    },
    {
      label: "CAS Number",
      value: metadata.cas_number || "Available upon request",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "Form",
      value: metadata.form || "Lyophilized Powder",
      icon: <Package className="h-4 w-4" />,
    },
    {
      label: "Storage",
      value: metadata.storage || "Store at -20°C",
      icon: <Thermometer className="h-4 w-4" />,
    },
    {
      label: "Stability",
      value: metadata.stability_lyophilized || "36 months at -20°C",
      icon: <Clock className="h-4 w-4" />,
    },
  ]

  const qualityFeatures = [
    {
      title: "Third-Party Tested",
      description: "Independent HPLC verification",
      enabled: metadata.third_party_tested !== false,
    },
    {
      title: "COA Available",
      description: "Certificate of Analysis for every batch",
      enabled: metadata.coa_available !== false,
    },
    {
      title: "USA-Based",
      description: "Manufactured in certified facilities",
      enabled: true,
    },
    {
      title: "Same-Day Shipping",
      description: "Orders before 2 PM EST",
      enabled: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Specifications Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-blue-600" />
            Product Specifications
          </h3>
        </div>
        <div className="divide-y">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {spec.icon}
                <span>{spec.label}</span>
              </div>
              <div className={`text-sm font-medium ${
                spec.highlight ? 'text-green-600' : 'text-gray-900'
              }`}>
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Features */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Quality Assurance
          </h3>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {qualityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              {feature.enabled ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-medium text-sm text-gray-900">
                  {feature.title}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COA Download Button */}
      {metadata.coa_available !== false && (
        <button className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <FileText className="h-5 w-5" />
          Download Certificate of Analysis (COA)
        </button>
      )}

      {/* Research Use Warning */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <div className="font-semibold text-orange-900">
              Research Use Only
            </div>
            <p className="text-sm text-orange-800">
              This product is intended strictly for in vitro laboratory research
              use only. Not approved for human consumption, therapeutic use, or
              veterinary applications. Researchers must comply with all applicable
              institutional guidelines and regulations.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                Not for Human Use
              </Badge>
              <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                Laboratory Use Only
              </Badge>
              <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                Age 21+ Required
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Handling Instructions</h4>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Use aseptic techniques when handling</li>
          <li>Reconstitute with bacteriostatic water or sterile water</li>
          <li>Avoid repeated freeze-thaw cycles</li>
          <li>Store reconstituted solution at 2-8°C</li>
          <li>Use within 4 weeks after reconstitution</li>
        </ul>
      </div>
    </div>
  )
}