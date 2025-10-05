/**
 * Color Contrast Checker for WCAG Compliance
 * Ensures text meets accessibility standards
 */

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

/**
 * Calculate relative luminance
 * Based on WCAG formula: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const { r, g, b } = rgb

  // Convert RGB values to sRGB
  const sRGB = [r, g, b].map((value) => {
    value = value / 255
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
  })

  // Calculate luminance
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(foreground: string, background: string): number {
  const fgRgb = hexToRgb(foreground)
  const bgRgb = hexToRgb(background)

  const fgLuminance = getRelativeLuminance(fgRgb)
  const bgLuminance = getRelativeLuminance(bgRgb)

  const lighter = Math.max(fgLuminance, bgLuminance)
  const darker = Math.min(fgLuminance, bgLuminance)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if contrast meets WCAG standards
 */
export function meetsWCAGStandards(
  foreground: string,
  background: string,
  level: "AA" | "AAA" = "AA",
  fontSize: "normal" | "large" = "normal"
): boolean {
  const ratio = getContrastRatio(foreground, background)

  if (level === "AA") {
    // WCAG AA: 4.5:1 for normal text, 3:1 for large text
    return fontSize === "large" ? ratio >= 3 : ratio >= 4.5
  } else {
    // WCAG AAA: 7:1 for normal text, 4.5:1 for large text
    return fontSize === "large" ? ratio >= 4.5 : ratio >= 7
  }
}

/**
 * Get contrast rating
 */
export function getContrastRating(ratio: number): {
  level: string
  passes: {
    normalAA: boolean
    normalAAA: boolean
    largeAA: boolean
    largeAAA: boolean
  }
} {
  return {
    level:
      ratio >= 7
        ? "AAA"
        : ratio >= 4.5
        ? "AA"
        : ratio >= 3
        ? "AA (large text only)"
        : "Fail",
    passes: {
      normalAA: ratio >= 4.5,
      normalAAA: ratio >= 7,
      largeAA: ratio >= 3,
      largeAAA: ratio >= 4.5,
    },
  }
}

/**
 * Premier Bio Labs Color Combinations
 * Pre-calculated for performance
 */
export const colorCombinations = {
  // Primary combinations
  primaryOnWhite: {
    foreground: "#00363d",
    background: "#FFFFFF",
    ratio: 0, // Will be calculated
  },
  whiteOnPrimary: {
    foreground: "#FFFFFF",
    background: "#00363d",
    ratio: 0,
  },

  // Secondary combinations
  secondaryOnWhite: {
    foreground: "#c6dcdf",
    background: "#FFFFFF",
    ratio: 0,
  },
  primaryOnSecondary: {
    foreground: "#00363d",
    background: "#c6dcdf",
    ratio: 0,
  },

  // Accent combinations
  accentOnWhite: {
    foreground: "#ecb157",
    background: "#FFFFFF",
    ratio: 0,
  },
  whiteOnAccent: {
    foreground: "#FFFFFF",
    background: "#ecb157",
    ratio: 0,
  },

  // Text combinations
  textPrimaryOnWhite: {
    foreground: "#1A1A1A",
    background: "#FFFFFF",
    ratio: 0,
  },
  textSecondaryOnWhite: {
    foreground: "#666666",
    background: "#FFFFFF",
    ratio: 0,
  },
  textTertiaryOnWhite: {
    foreground: "#999999",
    background: "#FFFFFF",
    ratio: 0,
  },

  // Grey combinations
  grey60OnWhite: {
    foreground: "#666666",
    background: "#FFFFFF",
    ratio: 0,
  },
  grey70OnWhite: {
    foreground: "#4D4D4D",
    background: "#FFFFFF",
    ratio: 0,
  },
  grey90OnWhite: {
    foreground: "#1A1A1A",
    background: "#FFFFFF",
    ratio: 0,
  },

  // Semantic colors
  successOnWhite: {
    foreground: "#10B981",
    background: "#FFFFFF",
    ratio: 0,
  },
  errorOnWhite: {
    foreground: "#EF4444",
    background: "#FFFFFF",
    ratio: 0,
  },
  warningOnWhite: {
    foreground: "#F59E0B",
    background: "#FFFFFF",
    ratio: 0,
  },
  infoOnWhite: {
    foreground: "#3B82F6",
    background: "#FFFFFF",
    ratio: 0,
  },
}

// Calculate all contrast ratios
Object.keys(colorCombinations).forEach((key) => {
  const combo = colorCombinations[key as keyof typeof colorCombinations]
  combo.ratio = getContrastRatio(combo.foreground, combo.background)
})

/**
 * Generate contrast report
 */
export function generateContrastReport(): {
  passing: string[]
  failing: string[]
  warnings: string[]
} {
  const passing: string[] = []
  const failing: string[] = []
  const warnings: string[] = []

  Object.entries(colorCombinations).forEach(([name, combo]) => {
    const rating = getContrastRating(combo.ratio)

    if (rating.passes.normalAA) {
      passing.push(
        `✅ ${name}: ${combo.ratio.toFixed(2)}:1 (Passes AA for all text)`
      )
    } else if (rating.passes.largeAA) {
      warnings.push(
        `⚠️ ${name}: ${combo.ratio.toFixed(2)}:1 (Only passes AA for large text)`
      )
    } else {
      failing.push(
        `❌ ${name}: ${combo.ratio.toFixed(2)}:1 (Fails WCAG standards)`
      )
    }
  })

  return { passing, failing, warnings }
}

/**
 * Suggest alternative color for better contrast
 */
export function suggestBetterContrast(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): string {
  const currentRatio = getContrastRatio(foreground, background)

  if (currentRatio >= targetRatio) {
    return foreground // Already meets target
  }

  const fgRgb = hexToRgb(foreground)
  const bgLuminance = getRelativeLuminance(hexToRgb(background))

  // Determine if we need to lighten or darken
  const needsDarker = bgLuminance > 0.5

  let adjustment = needsDarker ? -10 : 10
  let attempts = 0
  let bestColor = foreground
  let bestRatio = currentRatio

  // Try adjusting the color
  while (attempts < 20 && bestRatio < targetRatio) {
    const newRgb = {
      r: Math.max(0, Math.min(255, fgRgb.r + adjustment * attempts)),
      g: Math.max(0, Math.min(255, fgRgb.g + adjustment * attempts)),
      b: Math.max(0, Math.min(255, fgRgb.b + adjustment * attempts)),
    }

    const newHex = `#${[newRgb.r, newRgb.g, newRgb.b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")}`

    const newRatio = getContrastRatio(newHex, background)

    if (newRatio > bestRatio) {
      bestRatio = newRatio
      bestColor = newHex
    }

    attempts++
  }

  return bestColor
}