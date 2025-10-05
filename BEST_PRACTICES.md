# 🌟 WooCommerce + Next.js Best Practices

## 📋 Table of Contents

1. [Security](#security)
2. [Performance](#performance)
3. [Code Organization](#code-organization)
4. [Error Handling](#error-handling)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Monitoring](#monitoring)

---

## 🔒 Security

### ✅ DO

**1. Keep API Keys Server-Side**
```typescript
// ✅ GOOD - Server-side only
// app/api/products/route.ts
import { wooClient } from '@woo/client'

export async function GET() {
  const products = await wooClient.get('/wc/v3/products')
  return Response.json(products)
}
```

**2. Use Environment Variables Correctly**
```env
# ✅ Server-only (no NEXT_PUBLIC prefix)
WOO_CONSUMER_KEY=ck_xxx
WOO_CONSUMER_SECRET=cs_xxx

# ✅ Client-safe (NEXT_PUBLIC prefix)
NEXT_PUBLIC_WOO_URL=https://premierbiolabs.com
```

**3. Validate User Input**
```typescript
import { z } from 'zod'

const cartSchema = z.object({
  productId: z.number().positive(),
  quantity: z.number().min(1).max(100)
})

export async function addToCart(data: unknown) {
  const validated = cartSchema.parse(data) // Throws if invalid
  // ... proceed
}
```

**4. Sanitize HTML Content**
```typescript
import DOMPurify from 'isomorphic-dompurify'

// Product descriptions from WooCommerce
const cleanHTML = DOMPurify.sanitize(product.description)
```

**5. Rate Limiting**
```typescript
// middleware.ts
import { rateLimit } from '@/lib/rate-limit'

export async function middleware(request: NextRequest) {
  const limiter = rateLimit({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 500,
  })
  
  try {
    await limiter.check(10, request.ip) // 10 requests per minute
  } catch {
    return new Response('Rate limit exceeded', { status: 429 })
  }
}
```

### ❌ DON'T

```typescript
// ❌ BAD - Exposing secrets
const apiKey = 'ck_live_xxx' // Hardcoded

// ❌ BAD - Passing secrets to client
<Component apiKey={process.env.WOO_CONSUMER_KEY} />

// ❌ BAD - No input validation
async function addToCart(productId: any) {
  // Directly using unvalidated input
  await wooClient.post(`/cart/add-item`, { product_id: productId })
}
```

---

## ⚡ Performance

### ✅ DO

**1. Use Next.js Caching**
```typescript
// App router - cache for 1 hour
export async function getProducts() {
  return fetch('https://premierbiolabs.com/wp-json/wc/v3/products', {
    next: { revalidate: 3600 } // 1 hour
  })
}
```

**2. Implement ISR (Incremental Static Regeneration)**
```typescript
// app/products/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug)
  return <ProductDetails product={product} />
}
```

**3. Use SWR for Client-Side Data**
```typescript
import useSWR from 'swr'

function ProductList() {
  const { data, error } = useSWR('/api/products', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  })
}
```

**4. Optimize Images**
```typescript
import Image from 'next/image'

<Image
  src={product.image}
  alt={product.name}
  width={500}
  height={500}
  loading="lazy"
  quality={85}
  placeholder="blur"
/>
```

**5. Lazy Load Components**
```typescript
import dynamic from 'next/dynamic'

const Reviews = dynamic(() => import('@/components/Reviews'), {
  loading: () => <Skeleton />,
  ssr: false // Only load on client
})
```

**6. Bundle Analysis**
```bash
# Add to package.json
"analyze": "ANALYZE=true next build"

# Run
npm run analyze
```

### ❌ DON'T

```typescript
// ❌ BAD - No caching
fetch('https://api.com/products') // Fetches on every request

// ❌ BAD - Loading all products at once
const allProducts = await getProducts({ per_page: 10000 })

// ❌ BAD - No image optimization
<img src={product.image} /> // Use next/image instead

// ❌ BAD - Importing entire library
import _ from 'lodash' // Import specific functions instead
```

---

## 📁 Code Organization

### ✅ DO

**1. Use Consistent Folder Structure**
```
src/
├── app/                    # App router pages
│   ├── (shop)/            # Route groups
│   │   ├── products/
│   │   └── cart/
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI
│   ├── cart/             # Cart components
│   └── product/          # Product components
├── lib/                   # Utilities
│   ├── woocommerce/      # WooCommerce API
│   └── utils/            # Helper functions
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
└── styles/               # Global styles
```

**2. Use Barrel Exports**
```typescript
// components/ui/index.ts
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'

// Import like this:
import { Button, Card } from '@/components/ui'
```

**3. Separate Business Logic**
```typescript
// lib/woocommerce/products.ts
export async function getProduct(id: number) {
  // API call logic
}

// components/ProductCard.tsx
import { getProduct } from '@/lib/woocommerce/products'
// Component only handles UI
```

**4. Use TypeScript Properly**
```typescript
// types/product.ts
export interface Product {
  id: number
  name: string
  price: number
  slug: string
}

// Use everywhere
import { Product } from '@/types/product'
```

### ❌ DON'T

```typescript
// ❌ BAD - Everything in one file
// page.tsx (5000 lines)

// ❌ BAD - Mixing concerns
function ProductCard() {
  // API calls, business logic, and UI all mixed
}

// ❌ BAD - No types
function addToCart(product) { // What is product?
}
```

---

## 🚨 Error Handling

### ✅ DO

**1. Use Error Boundaries**
```typescript
// components/ErrorBoundary.tsx
'use client'

export class ErrorBoundary extends Component {
  // ... see CLEANUP_PLAN.md for full code
}

// app/layout.tsx
<ErrorBoundary fallback={<ErrorPage />}>
  {children}
</ErrorBoundary>
```

**2. Handle API Errors Gracefully**
```typescript
export async function getProducts() {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch products:', error)
    
    // Log to error tracking
    if (typeof window !== 'undefined') {
      Sentry.captureException(error)
    }
    
    // Return fallback data
    return []
  }
}
```

**3. Show User-Friendly Messages**
```typescript
function ProductPage() {
  const { data, error } = useSWR('/api/products', fetcher)
  
  if (error) {
    return (
      <Alert variant="error">
        <p>Unable to load products.</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Alert>
    )
  }
}
```

**4. Validate at Boundaries**
```typescript
// API route validation
export async function POST(request: Request) {
  const body = await request.json()
  
  const validated = cartSchema.safeParse(body)
  
  if (!validated.success) {
    return Response.json(
      { error: 'Invalid data', details: validated.error },
      { status: 400 }
    )
  }
  
  // Proceed with validated data
}
```

### ❌ DON'T

```typescript
// ❌ BAD - Silent failures
try {
  await addToCart(product)
} catch (error) {
  // Do nothing - user doesn't know it failed
}

// ❌ BAD - Exposing internal errors
catch (error) {
  alert(error.message) // Might expose sensitive info
}

// ❌ BAD - Generic error messages
return <div>Error</div> // Not helpful
```

---

## 🧪 Testing

### ✅ DO

**1. Test WooCommerce Connection**
```bash
npm run test:woo
```

**2. Write Unit Tests**
```typescript
// lib/woocommerce/__tests__/products.test.ts
import { transformProductForUI } from '../products'

describe('transformProductForUI', () => {
  it('should transform WooCommerce product to UI format', () => {
    const wooProduct = { /* ... */ }
    const result = transformProductForUI(wooProduct)
    
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('name')
    expect(result.price).toBeGreaterThan(0)
  })
})
```

**3. Integration Tests**
```typescript
// __tests__/api/products.test.ts
describe('Products API', () => {
  it('should fetch products from WooCommerce', async () => {
    const products = await getProducts()
    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBeGreaterThan(0)
  })
})
```

**4. E2E Tests with Playwright**
```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test'

test('should complete checkout flow', async ({ page }) => {
  await page.goto('/products/peptide-1')
  await page.click('[data-testid="add-to-cart"]')
  await page.goto('/cart')
  await page.click('[data-testid="checkout"]')
  
  // Fill form...
  await page.click('[data-testid="submit-order"]')
  
  await expect(page.locator('text=Order Confirmed')).toBeVisible()
})
```

### ❌ DON'T

```typescript
// ❌ BAD - No tests
// Just shipping to production without testing

// ❌ BAD - Testing implementation details
expect(component.state.count).toBe(5) // Test behavior, not internals

// ❌ BAD - Hardcoded test data
const testProduct = { id: 123 } // Use factories/fixtures
```

---

## 🚀 Deployment

### ✅ DO

**1. Use Environment-Specific Configs**
```env
# .env.development
NEXT_PUBLIC_WOO_URL=https://staging.premierbiolabs.com
WOO_CONSUMER_KEY=ck_test_xxx

# .env.production (in Vercel)
NEXT_PUBLIC_WOO_URL=https://premierbiolabs.com
WOO_CONSUMER_KEY=ck_live_xxx
```

**2. Implement Health Checks**
```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    woocommerce: await checkWooCommerce(),
    database: await checkDatabase(),
    timestamp: new Date().toISOString()
  }
  
  const healthy = Object.values(checks).every(v => v.healthy)
  
  return Response.json(checks, {
    status: healthy ? 200 : 503
  })
}
```

**3. Use CI/CD**
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm test
      - uses: amondnet/vercel-action@v20
```

**4. Gradual Rollouts**
```typescript
// Feature flags
const useNewCheckout = process.env.NEXT_PUBLIC_NEW_CHECKOUT_ENABLED === 'true'

if (useNewCheckout) {
  return <NewCheckout />
} else {
  return <OldCheckout />
}
```

### ❌ DON'T

```typescript
// ❌ BAD - Committing secrets
git add .env.local // NEVER!

// ❌ BAD - No staging environment
// Deploy directly to production

// ❌ BAD - No rollback plan
// Can't undo if something breaks
```

---

## 📊 Monitoring

### ✅ DO

**1. Add Error Tracking (Sentry)**
```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

**2. Add Analytics**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

**3. Log Important Events**
```typescript
export async function addToCart(productId: number, quantity: number) {
  try {
    const result = await wooClient.post('/cart/add-item', {
      product_id: productId,
      quantity
    })
    
    // Log success
    console.log('[Cart] Item added:', { productId, quantity })
    
    // Track analytics
    gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: result.total,
      items: [{ id: productId, quantity }]
    })
    
    return result
  } catch (error) {
    // Log error
    console.error('[Cart] Failed to add item:', error)
    Sentry.captureException(error)
    throw error
  }
}
```

**4. Monitor Performance**
```typescript
// Send to analytics
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
  
  // Send to analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
    metric_label: metric.label
  })
}
```

**5. Set Up Uptime Monitoring**
- Use services like UptimeRobot, Pingdom, or Better Uptime
- Monitor: Homepage, API health endpoint, checkout flow

### ❌ DON'T

```typescript
// ❌ BAD - No error tracking
// Just hoping nothing breaks

// ❌ BAD - Console.log in production
console.log('User data:', sensitiveData) // Remove these!

// ❌ BAD - No performance monitoring
// Don't know if site is slow
```

---

## 📋 Quick Checklist

### Before Going Live

- [ ] Environment variables configured
- [ ] API keys are production keys
- [ ] All tests passing
- [ ] Error boundaries in place
- [ ] Analytics set up
- [ ] Error tracking (Sentry) configured
- [ ] Performance optimized (Lighthouse 90+)
- [ ] SEO meta tags added
- [ ] SSL certificate active
- [ ] Backup plan ready
- [ ] Monitoring set up
- [ ] Documentation updated

### Weekly Maintenance

- [ ] Check error logs
- [ ] Review analytics
- [ ] Update dependencies: `npm outdated`
- [ ] Check uptime reports
- [ ] Review performance metrics
- [ ] Backup database

### Monthly Tasks

- [ ] Security audit: `npm audit`
- [ ] Dependency updates
- [ ] Review and archive old logs
- [ ] Performance review
- [ ] User feedback review

---

## 📚 Additional Resources

- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application/deploying)
- [WooCommerce API Best Practices](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**Last Updated**: October 2025

