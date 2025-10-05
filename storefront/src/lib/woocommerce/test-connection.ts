/**
 * WooCommerce API Connection Test
 * Run this to verify your WooCommerce API is properly configured
 *
 * Usage: npm run test:woo
 */

import { getProducts, getCategories } from './products'
import { getCart } from './cart'
import { wooConfig } from './config'

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
}

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

function logSection(title: string) {
  console.log('\n' + '='.repeat(50))
  log(title, colors.blue)
  console.log('='.repeat(50))
}

async function testConnection() {
  logSection('WooCommerce API Connection Test')

  log(`\nTesting connection to: ${wooConfig.baseUrl}`, colors.magenta)

  // Test 1: Check if we can fetch products
  logSection('Test 1: Fetching Products')
  try {
    const products = await getProducts({ per_page: 3 })

    if (products && products.length > 0) {
      log('✅ Successfully fetched products!', colors.green)
      log(`   Found ${products.length} products:`, colors.yellow)

      products.forEach(product => {
        log(`   - ${product.name} (${product.sku || 'No SKU'})`)
        log(`     Price: $${product.price}`)
        log(`     Stock: ${product.stock_status}`)
      })
    } else {
      log('⚠️  No products found. Make sure you have products in WooCommerce.', colors.yellow)
    }
  } catch (error) {
    log('❌ Failed to fetch products:', colors.red)
    console.error(error)
  }

  // Test 2: Check categories
  logSection('Test 2: Fetching Categories')
  try {
    const categories = await getCategories({ per_page: 5 })

    if (categories && categories.length > 0) {
      log('✅ Successfully fetched categories!', colors.green)
      log(`   Found ${categories.length} categories:`, colors.yellow)

      categories.forEach(category => {
        log(`   - ${category.name} (${category.slug})`)
      })
    } else {
      log('⚠️  No categories found.', colors.yellow)
    }
  } catch (error) {
    log('❌ Failed to fetch categories:', colors.red)
    console.error(error)
  }

  // Test 3: Check CoCart (cart functionality)
  logSection('Test 3: Testing Cart API (CoCart)')
  try {
    const cart = await getCart()

    if (cart) {
      log('✅ CoCart API is accessible!', colors.green)
      log(`   Cart items: ${cart.item_count}`)
      log(`   Cart total: ${cart.currency.currency_prefix}${cart.totals.total}`)
    } else {
      log('⚠️  Cart returned empty. This is normal for a new session.', colors.yellow)
    }
  } catch (error) {
    log('❌ CoCart API error. Make sure CoCart plugin is installed.', colors.red)
    log('   Install from: https://wordpress.org/plugins/cart-rest-api-for-woocommerce/', colors.yellow)
    console.error(error)
  }

  // Configuration check
  logSection('Configuration Check')

  if (!process.env.WOO_CONSUMER_KEY) {
    log('❌ WOO_CONSUMER_KEY not set in environment', colors.red)
  } else {
    log('✅ WOO_CONSUMER_KEY is configured', colors.green)
  }

  if (!process.env.WOO_CONSUMER_SECRET) {
    log('❌ WOO_CONSUMER_SECRET not set in environment', colors.red)
  } else {
    log('✅ WOO_CONSUMER_SECRET is configured', colors.green)
  }

  if (!process.env.NEXT_PUBLIC_WOO_URL) {
    log('⚠️  NEXT_PUBLIC_WOO_URL not set, using default', colors.yellow)
  } else {
    log('✅ NEXT_PUBLIC_WOO_URL is configured', colors.green)
  }

  // Summary
  logSection('Test Summary')
  log('\nTo complete setup:', colors.magenta)
  log('1. Install CoCart plugin in WordPress')
  log('2. Install B2BKing plugin for B2B features')
  log('3. Set up WooCommerce API keys in WordPress admin')
  log('4. Copy .env.woocommerce.example to .env.local')
  log('5. Fill in your API credentials')
  log('\nNext steps:', colors.yellow)
  log('- Update homepage to use woo-adapter instead of MedusaJS')
  log('- Test product pages with real WooCommerce data')
  log('- Configure B2B approval workflows in B2BKing')
}

// Run the test if this file is executed directly
if (require.main === module) {
  testConnection().catch(console.error)
}

export default testConnection