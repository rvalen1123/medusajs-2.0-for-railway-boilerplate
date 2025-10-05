"use client"

import { useState } from "react"
import { AlertTriangle, X, Info } from "lucide-react"

export default function ResearchDisclaimer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className={`
        bg-gradient-to-br from-orange-50 to-yellow-50
        border border-orange-300
        rounded-lg shadow-xl
        transition-all duration-300
        ${isExpanded ? 'w-96' : 'w-auto'}
      `}>
        {/* Header */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-orange-600 rounded-full animate-pulse" />
            </div>
            <span className="font-semibold text-orange-900 text-sm">
              Important Notice
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsDismissed(true)
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-3 pb-3 space-y-3 border-t border-orange-200">
            <div className="pt-3 space-y-2">
              <h3 className="font-semibold text-orange-900 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Research Use Only
              </h3>
              <p className="text-xs text-orange-800 leading-relaxed">
                All peptides and compounds on this website are strictly for in vitro
                laboratory research purposes only. These products are NOT approved
                for human consumption, therapeutic use, or veterinary applications.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-orange-900 text-sm">
                Legal Requirements:
              </h4>
              <ul className="text-xs text-orange-700 space-y-1">
                <li className="flex items-start gap-1">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Must be 21+ years of age to purchase</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Valid research institution affiliation required</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Must comply with all local and federal regulations</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span>Not for use in humans, animals, or clinical diagnostics</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-orange-200">
              <button
                onClick={() => setIsExpanded(false)}
                className="w-full bg-orange-600 text-white text-sm font-medium py-2 px-3 rounded hover:bg-orange-700 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        )}

        {/* Collapsed State - Mini Badge */}
        {!isExpanded && (
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium text-orange-700">
                Research Use Only
              </span>
              <span className="text-orange-600">
                Click for details
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Persistent Banner Version (Alternative)
export function ResearchDisclaimerBanner() {
  const [isAccepted, setIsAccepted] = useState(false)

  if (isAccepted) return null

  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-semibold">Important:</span> All products are for
              laboratory research use only. Not for human consumption. Must be 21+ to purchase.
            </p>
          </div>
          <button
            onClick={() => setIsAccepted(true)}
            className="bg-white text-orange-600 text-sm font-medium px-4 py-1.5 rounded hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  )
}

// Trust Badges Component
export function TrustBadges() {
  const badges = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: ">98% Purity",
      subtitle: "Third-party tested"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "USA Based",
      subtitle: "Certified facilities"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "COA Available",
      subtitle: "Every batch"
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Fast Shipping",
      subtitle: "Same-day dispatch"
    }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
        >
          <div className="text-blue-600 flex justify-center mb-2">
            {badge.icon}
          </div>
          <div className="text-sm font-semibold text-gray-900">
            {badge.title}
          </div>
          <div className="text-xs text-gray-600 mt-0.5">
            {badge.subtitle}
          </div>
        </div>
      ))}
    </div>
  )
}

import { Shield, Award, FileText, Package } from "lucide-react"