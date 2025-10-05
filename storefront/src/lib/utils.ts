import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and twMerge for proper Tailwind precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency for medical pricing
 */
export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

/**
 * Format purity percentage
 */
export function formatPurity(decimal: number): string {
  return `${(decimal * 100).toFixed(2)}%`
}

/**
 * Format batch/lot number for display
 */
export function formatBatchNumber(batch: string): string {
  return batch.toUpperCase().replace(/[^A-Z0-9]/g, '-')
}
