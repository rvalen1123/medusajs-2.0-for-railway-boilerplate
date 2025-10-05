#!/usr/bin/env node

/**
 * WCAG Color Contrast Checker Script
 * Validates all color combinations in the design system
 */

import { generateContrastReport, colorCombinations, getContrastRating } from "../src/lib/util/color-contrast"

console.log("\n🎨 Premier Bio Labs - WCAG Color Contrast Report")
console.log("=" .repeat(60))

// Generate overall report
const report = generateContrastReport()

// Display summary
console.log("\n📊 Summary:")
console.log(`✅ Passing: ${report.passing.length} combinations`)
console.log(`⚠️  Warnings: ${report.warnings.length} combinations`)
console.log(`❌ Failing: ${report.failing.length} combinations`)

// Display detailed results
console.log("\n📋 Detailed Results:")
console.log("-".repeat(60))

// Group by status
if (report.passing.length > 0) {
  console.log("\n✅ PASSING (AA or better):")
  report.passing.forEach(result => console.log(`  ${result}`))
}

if (report.warnings.length > 0) {
  console.log("\n⚠️  WARNINGS (Large text only):")
  report.warnings.forEach(result => console.log(`  ${result}`))
}

if (report.failing.length > 0) {
  console.log("\n❌ FAILING (Below AA):")
  report.failing.forEach(result => console.log(`  ${result}`))
}

// Critical combinations to check
console.log("\n🔍 Critical Combinations:")
console.log("-".repeat(60))

const criticalCombos = [
  { name: "Primary Text on White", key: "textPrimaryOnWhite" },
  { name: "Secondary Text on White", key: "textSecondaryOnWhite" },
  { name: "White on Primary", key: "whiteOnPrimary" },
  { name: "Primary on Secondary", key: "primaryOnSecondary" },
  { name: "White on Accent", key: "whiteOnAccent" },
]

criticalCombos.forEach(({ name, key }) => {
  const combo = colorCombinations[key as keyof typeof colorCombinations]
  const rating = getContrastRating(combo.ratio)
  const status = rating.passes.normalAA ? "✅" : rating.passes.largeAA ? "⚠️" : "❌"

  console.log(
    `${status} ${name}: ${combo.ratio.toFixed(2)}:1 (${rating.level})`
  )
})

// Recommendations
console.log("\n💡 Recommendations:")
console.log("-".repeat(60))

const recommendations: string[] = []

// Check specific problematic combinations
if (colorCombinations.textSecondaryOnWhite.ratio < 4.5) {
  recommendations.push(
    "• Consider darkening secondary text (#666666) to at least #595959 for AA compliance"
  )
}

if (colorCombinations.secondaryOnWhite.ratio < 4.5) {
  recommendations.push(
    "• Secondary color (#c6dcdf) should only be used for decorative elements, not text"
  )
}

if (colorCombinations.whiteOnAccent.ratio < 4.5) {
  recommendations.push(
    "• Use darker text on accent backgrounds or darken the accent color"
  )
}

if (colorCombinations.accentOnWhite.ratio < 4.5) {
  recommendations.push(
    "• Accent color (#ecb157) needs adjustment for text use - consider #B88B3E"
  )
}

if (recommendations.length > 0) {
  recommendations.forEach(rec => console.log(rec))
} else {
  console.log("✨ All critical combinations meet WCAG AA standards!")
}

// Footer
console.log("\n" + "=".repeat(60))
console.log("📚 WCAG Standards:")
console.log("  • AA Normal Text: 4.5:1 minimum")
console.log("  • AA Large Text (18px+): 3:1 minimum")
console.log("  • AAA Normal Text: 7:1 minimum")
console.log("  • AAA Large Text: 4.5:1 minimum")
console.log("\n✨ Report generated successfully!\n")

// Exit with appropriate code
const hasFailures = report.failing.length > 0
process.exit(hasFailures ? 1 : 0)