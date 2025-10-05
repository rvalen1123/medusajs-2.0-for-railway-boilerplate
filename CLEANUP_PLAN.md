# WooCommerce Migration - Cleanup & Best Practices Plan

## 🎯 Executive Summary

You've successfully migrated from MedusaJS to **WooCommerce REST API + B2BKing + Next.js**. This plan will help you:
1. Remove unnecessary MedusaJS infrastructure (~$50-100/month savings on Railway)
2. Clean up unused code and dependencies
3. Implement best practices for your new stack
4. Optimize for production deployment

---

## 📊 Current State Analysis

### ✅ What's Working (KEEP)
- **Next.js Storefront** with WooCommerce integration
- **WooCommerce REST API** integration layer
- **Adapter pattern** for backend abstraction
- **CoCart** for cart management
- **B2BKing** for B2B features

### ❌ What to Remove (DELETE)
- **Entire MedusaJS backend** (`/backend` directory)
- **Railway Services**: 
  - Backend service
  - Worker service
  - Console service
  - 2x Postgres databases
  - 2x Redis instances
  - MeiliSearch
  - MinIO/Bucket storage
- **MedusaJS Dependencies** in storefront
- **Old deployment scripts** for MedusaJS

---

## 🗑️ Phase 1: Clean Up Infrastructure (Railway)

### Services to Decommission

| Service | Purpose (Old) | Action | Est. Savings |
|---------|---------------|--------|--------------|
| **Backend** | MedusaJS API | Delete | $20/mo |
| **Worker** | Background jobs | Delete | $10/mo |
| **Postgres** | Main DB | Delete | $15/mo |
| **Postgres-b3xW** | Secondary DB | Delete | $15/mo |
| **Redis** | Cache/Sessions | Delete | $10/mo |
| **Redis-Je5H** | Secondary cache | Delete | $10/mo |
| **MeiliSearch** | Product search | Delete | $15/mo |
| **Bucket/MinIO** | File storage | Delete | $10/mo |
| **Console** | Admin panel | Delete | $5/mo |
| **Primary** | Old deployment | Check & Delete | $10/mo |
| **TOTAL SAVINGS** | | | **~$120/mo** |

### Services to Keep/Modify

| Service | New Purpose | Action |
|---------|-------------|--------|
| **Storefront** | Next.js frontend | Keep, update env vars |
| **Web** | Not deployed yet | Either deploy Next.js here OR delete |

### Railway Cleanup Steps

```bash
# DO THIS IN RAILWAY DASHBOARD:

1. Go to your Railway project
2. For EACH service listed above (Backend, Worker, Postgres, etc.):
   a. Click on the service
   b. Go to "Settings" tab
   c. Scroll to bottom → Click "Delete Service"
   d. Confirm deletion

3. For the "Storefront" or "Web" service:
   a. Update environment variables (see Phase 3)
   b. Redeploy with only WooCommerce config

4. Clean up volumes:
   - Delete: postgres-volume, redis-volume, meilisearch-volume, bucket-volume
```

**⚠️ WARNING**: Back up any data you want to keep before deleting databases!

---

## 🧹 Phase 2: Clean Up Codebase

### 2.1 Delete Entire Backend Directory

```bash
# This removes ALL MedusaJS backend code
rm -rf /home/rvalen/medusajs-2.0-for-railway-boilerplate/backend
```

**What's being removed:**
- MedusaJS core application
- Custom modules (email, file storage, etc.)
- Database migrations
- Admin panel
- API routes
- ~500MB of dependencies

### 2.2 Remove Root-Level MedusaJS Files

```bash
cd /home/rvalen/medusajs-2.0-for-railway-boilerplate

# Delete these files:
rm start-local.sh          # MedusaJS startup script
rm -rf docs/               # MedusaJS documentation
rm README.md               # MedusaJS-focused readme
```

### 2.3 Update Root package.json

**Remove these scripts:**
```json
{
  "scripts": {
    "backend": "...",      // DELETE
    "seed": "...",         // DELETE
    "seed:peptides": "...", // DELETE
    "db:migrate": "...",   // DELETE
    "db:setup": "...",     // DELETE
    "dev": "..."           // KEEP but modify
  }
}
```

**New simplified version:**
```json
{
  "name": "premierbiolabs-woocommerce-storefront",
  "version": "2.0.0",
  "description": "Premier Bio Labs - WooCommerce + Next.js B2B Storefront",
  "scripts": {
    "dev": "cd storefront && npm run dev:local",
    "build": "cd storefront && npm run build:next",
    "start": "cd storefront && npm start",
    "test:woo": "cd storefront && npm run test:woo"
  },
  "devDependencies": {
    // Can remove concurrently if not needed
  }
}
```

### 2.4 Clean Up Storefront Dependencies

**Remove MedusaJS packages from `storefront/package.json`:**

```json
{
  "dependencies": {
    // REMOVE THESE:
    "@medusajs/js-sdk": "...",        // DELETE
    "@medusajs/types": "...",         // DELETE
    "@medusajs/ui": "...",            // DELETE (unless using UI components)
    "@meilisearch/instant-meilisearch": "...", // DELETE
    "medusajs-launch-utils": "...",   // DELETE
    "algoliasearch": "...",           // DELETE (if not using)
    
    // KEEP THESE:
    "axios": "^1.6.7",                // For WooCommerce API
    "@stripe/stripe-js": "...",       // If using Stripe
    "@paypal/paypal-js": "...",       // If using PayPal
    // ... all other UI libraries
  }
}
```

After editing, run:
```bash
cd storefront
npm install  # Reinstall with cleaned dependencies
```

### 2.5 Remove MedusaJS Code from Storefront

**Delete these directories/files:**

```bash
cd /home/rvalen/medusajs-2.0-for-railway-boilerplate/storefront/src

# If you have MedusaJS-specific files:
rm -rf lib/medusa/        # Old MedusaJS client code
rm -rf lib/data/index.ts  # If it imports MedusaJS
rm -rf modules/medusa/    # Any MedusaJS modules

# Keep these:
# lib/woocommerce/        ✅ KEEP
# lib/data/woo-adapter.ts ✅ KEEP
# lib/data/*-woo.ts       ✅ KEEP
```

### 2.6 Update Environment Variables

**Delete `storefront/.env.local.template` (old MedusaJS config)**

**Create new `storefront/.env.example`:**

```env
# WooCommerce Configuration
NEXT_PUBLIC_WOO_URL=https://premierbiolabs.com
WOO_CONSUMER_KEY=ck_your_consumer_key_here
WOO_CONSUMER_SECRET=cs_your_consumer_secret_here

# Feature Flags
NEXT_PUBLIC_USE_WOOCOMMERCE=true

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Stripe (if handling payments in frontend)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Optional: PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxx

# B2BKing (if needed for frontend)
NEXT_PUBLIC_B2B_ENABLED=true
```

**Your `.env.local` should be:**
```env
NEXT_PUBLIC_USE_WOOCOMMERCE=true
NEXT_PUBLIC_WOO_URL=https://premierbiolabs.com
WOO_CONSUMER_KEY=<your_actual_key>
WOO_CONSUMER_SECRET=<your_actual_secret>
NEXT_PUBLIC_B2B_ENABLED=true
```

---

## 🏗️ Phase 3: Refactor for Best Practices

### 3.1 Remove Fallback to MedusaJS

**Current issue**: Your adapter has fallback logic to MedusaJS. This should be removed.

**Files to update:**
- `storefront/src/lib/data/woo-adapter.ts`
- Any pages/components that check `NEXT_PUBLIC_USE_WOOCOMMERCE`

**Before:**
```typescript
const useWoo = process.env.NEXT_PUBLIC_USE_WOOCOMMERCE === 'true'
if (useWoo) {
  // WooCommerce
} else {
  // MedusaJS fallback
}
```

**After:**
```typescript
// Just use WooCommerce directly
import wooAdapter from '@lib/woocommerce/adapter'
```

### 3.2 Improve WooCommerce API Client

**Create a proper API client with:**
- ✅ Error handling
- ✅ Request/response interceptors
- ✅ Retry logic
- ✅ Rate limiting
- ✅ Type safety

**New file: `storefront/src/lib/woocommerce/client.ts`**

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios'
import { wooConfig } from './config'

class WooCommerceClient {
  private client: AxiosInstance
  
  constructor() {
    this.client = axios.create({
      baseURL: `${wooConfig.baseUrl}/wp-json`,
      timeout: 10000,
      headers: wooConfig.headers,
      auth: {
        username: wooConfig.consumerKey,
        password: wooConfig.consumerSecret
      }
    })
    
    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`[WooCommerce API] ${config.method?.toUpperCase()} ${config.url}`)
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    
    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error('[WooCommerce API Error]:', {
            status: error.response.status,
            message: error.response.data,
            url: error.config?.url
          })
        }
        return Promise.reject(error)
      }
    )
  }
  
  // Generic GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.client.get<T>(endpoint, { params })
    return response.data
  }
  
  // Generic POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(endpoint, data)
    return response.data
  }
  
  // Generic PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(endpoint, data)
    return response.data
  }
  
  // Generic DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.client.delete<T>(endpoint)
    return response.data
  }
}

// Export singleton instance
export const wooClient = new WooCommerceClient()
```

### 3.3 Add Request Caching

**Use Next.js built-in caching + SWR for client-side:**

```bash
cd storefront
npm install swr
```

**Example usage in components:**
```typescript
import useSWR from 'swr'
import { getProducts } from '@lib/woocommerce/products'

export function ProductList() {
  const { data: products, error, isLoading } = useSWR(
    '/woo/products',
    () => getProducts({ per_page: 20 }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  )
  
  if (isLoading) return <Loading />
  if (error) return <Error />
  return <ProductGrid products={products} />
}
```

### 3.4 Implement Proper Error Boundaries

**Create `storefront/src/components/ErrorBoundary.tsx`:**

```typescript
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo)
    // Send to error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      )
    }

    return this.props.children
  }
}
```

### 3.5 Add Environment Validation

**Create `storefront/src/lib/env.ts`:**

```typescript
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_WOO_URL: z.string().url(),
  WOO_CONSUMER_KEY: z.string().min(1),
  WOO_CONSUMER_SECRET: z.string().min(1),
  NEXT_PUBLIC_B2B_ENABLED: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
})

export function validateEnv() {
  try {
    envSchema.parse(process.env)
    console.log('✅ Environment variables validated')
  } catch (error) {
    console.error('❌ Invalid environment variables:', error)
    throw new Error('Environment validation failed')
  }
}

// Call this in your root layout or middleware
export const env = envSchema.parse(process.env)
```

### 3.6 Add TypeScript Path Aliases

**Update `storefront/tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@lib/*": ["./src/lib/*"],
      "@components/*": ["./src/components/*"],
      "@modules/*": ["./src/modules/*"],
      "@types/*": ["./src/types/*"],
      "@woo/*": ["./src/lib/woocommerce/*"]
    }
  }
}
```

Now you can import like:
```typescript
import { wooClient } from '@woo/client'
import { Button } from '@components/ui/Button'
```

---

## 🚀 Phase 4: Production Deployment

### 4.1 Choose Your Hosting

**Option A: Vercel (RECOMMENDED for Next.js)**
- ✅ Optimized for Next.js
- ✅ Automatic deployments from Git
- ✅ Edge functions
- ✅ Free tier available
- ✅ Built-in analytics
- 💰 Cost: $0-20/mo

**Steps:**
1. Connect GitHub repo to Vercel
2. Add environment variables
3. Deploy!

```bash
# Or deploy manually:
npm install -g vercel
cd storefront
vercel --prod
```

**Option B: Keep Railway (for Storefront only)**
- Keep the "Storefront" or "Web" service
- Delete all other services
- 💰 Cost: $10-20/mo

**Option C: Netlify**
- Similar to Vercel
- Good Next.js support
- 💰 Cost: $0-20/mo

### 4.2 Production Environment Variables

**In Vercel/Railway Dashboard, add:**

```env
NODE_ENV=production
NEXT_PUBLIC_WOO_URL=https://premierbiolabs.com
WOO_CONSUMER_KEY=<production_key>
WOO_CONSUMER_SECRET=<production_secret>
NEXT_PUBLIC_B2B_ENABLED=true

# Optional but recommended:
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxx@sentry.io/xxx
```

### 4.3 Set Up Monitoring

**Add Sentry for error tracking:**

```bash
cd storefront
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**Add Vercel Analytics:**
```bash
npm install @vercel/analytics
```

In `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🔍 Phase 5: Testing & Validation

### 5.1 Create Test Checklist

```bash
# Create test documentation
```

**Manual Testing Checklist:**

- [ ] **Homepage**
  - [ ] Products load from WooCommerce
  - [ ] Images display correctly
  - [ ] Links work
  
- [ ] **Product Pages**
  - [ ] Product details show
  - [ ] Add to cart works
  - [ ] Variations work (if applicable)
  
- [ ] **Cart**
  - [ ] View cart
  - [ ] Update quantities
  - [ ] Remove items
  - [ ] Cart persists
  
- [ ] **Checkout**
  - [ ] Form validation
  - [ ] Payment integration (Stripe/PayPal)
  - [ ] Order confirmation
  
- [ ] **B2B Features**
  - [ ] B2B registration
  - [ ] Approval workflow
  - [ ] Tiered pricing display
  - [ ] Quote requests (if implemented)
  
- [ ] **Account**
  - [ ] Login
  - [ ] Registration
  - [ ] Order history
  - [ ] Profile updates

### 5.2 Performance Testing

**Add performance monitoring:**

```typescript
// storefront/src/middleware.ts
export function middleware(request: NextRequest) {
  const start = Date.now()
  
  return NextResponse.next({
    headers: {
      'x-response-time': `${Date.now() - start}ms`
    }
  })
}
```

**Run Lighthouse audits:**
```bash
npm install -g lighthouse
lighthouse https://your-site.vercel.app --view
```

**Target scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

## 📋 Phase 6: Documentation Updates

### 6.1 Create New README

**Delete old `README.md` and create new:**

```markdown
# Premier Bio Labs - B2B Storefront

Modern B2B e-commerce platform powered by WooCommerce REST API, B2BKing, and Next.js.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: WooCommerce REST API + B2BKing
- **Styling**: Tailwind CSS, Radix UI
- **Payments**: Stripe (or WooCommerce Payments)
- **Hosting**: Vercel
- **CMS**: WordPress + WooCommerce (Cloudways)

## Quick Start

1. Clone and install:
   \`\`\`bash
   git clone <your-repo>
   cd storefront
   npm install
   \`\`\`

2. Set up environment:
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your WooCommerce API keys
   \`\`\`

3. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open http://localhost:3000

## Documentation

- [WooCommerce Setup](./WOOCOMMERCE_SETUP.md)
- [API Documentation](./docs/API.md)
- [B2B Features](./docs/B2B.md)

## Deployment

Deploy to Vercel:
\`\`\`bash
vercel --prod
\`\`\`

## Support

For issues: [Create an issue](https://github.com/your-repo/issues)
```

### 6.2 Create API Documentation

**Create `storefront/docs/API.md`:**

```markdown
# API Documentation

## WooCommerce Integration

All API calls go through our adapter layer in `/lib/woocommerce/`.

### Products

\`\`\`typescript
import { getProducts, getProduct } from '@woo/products'

// Get all products
const products = await getProducts({ per_page: 20 })

// Get single product
const product = await getProduct('product-slug')
\`\`\`

### Cart (CoCart)

\`\`\`typescript
import { addToCart, getCart } from '@woo/cart'

// Add to cart
await addToCart(productId, quantity)

// Get cart
const cart = await getCart()
\`\`\`

[... more documentation ...]
```

---

## ✅ Phase 7: Final Checklist

### Before You Start Deleting:

- [ ] **Backup everything**
  - Export WordPress/WooCommerce data
  - Backup any custom code
  - Screenshot Railway settings
  
- [ ] **Verify WooCommerce is working**
  - Test all features manually
  - Check production API keys
  - Verify B2BKing is configured
  
- [ ] **Update DNS** (if needed)
  - Point domain to Vercel instead of Railway
  - Update SSL certificates
  
- [ ] **Notify team**
  - Let anyone else know about the change
  - Document the migration

### Execution Order:

1. ✅ **Week 1**: Code cleanup (Phase 2)
   - Remove backend directory
   - Clean dependencies
   - Update environment files
   
2. ✅ **Week 2**: Refactoring (Phase 3)
   - Implement best practices
   - Add error handling
   - Add monitoring
   
3. ✅ **Week 3**: Deploy & test (Phase 4-5)
   - Deploy to Vercel
   - Run all tests
   - Fix any issues
   
4. ✅ **Week 4**: Infrastructure cleanup (Phase 1)
   - Delete Railway services
   - Cancel subscriptions
   - Update documentation

---

## 💰 Cost Comparison

### Before (MedusaJS on Railway):
- Backend: $20/mo
- Worker: $10/mo
- Postgres x2: $30/mo
- Redis x2: $20/mo
- MeiliSearch: $15/mo
- MinIO: $10/mo
- Console: $5/mo
- Storefront: $10/mo
- **TOTAL: ~$120/month**

### After (WooCommerce + Vercel):
- WordPress/WooCommerce (Cloudways): $30/mo (you already have this)
- B2BKing: $139 one-time
- Vercel: $0-20/mo
- **TOTAL: ~$20/month** ✨

**SAVINGS: $100/month = $1,200/year!**

---

## 🆘 Troubleshooting

### "Can't connect to WooCommerce API"
1. Check API keys are correct
2. Verify REST API is enabled in WooCommerce
3. Check CORS settings
4. Test with: `npm run test:woo`

### "Products not loading"
1. Check network tab for failed requests
2. Verify product permalinks in WordPress
3. Check WooCommerce product status (must be "Published")

### "Cart not working"
1. Ensure CoCart plugin is activated
2. Clear browser localStorage
3. Check CoCart endpoints: `/wp-json/cocart/v2/`

### Need to rollback to MedusaJS?
Don't delete Railway services yet! Keep them for 1-2 weeks as backup.

---

## 📞 Next Steps

1. **Review this plan** with your team
2. **Set a timeline** for each phase
3. **Create a rollback plan** (just in case)
4. **Start with Phase 2** (code cleanup) - it's safe and reversible
5. **Deploy to staging first** before touching production

---

## 📚 Additional Resources

- [WooCommerce REST API Docs](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [CoCart Documentation](https://cocart.xyz/docs/)
- [B2BKing Docs](https://woocommerce-b2b-plugin.com/docs/)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

**Last Updated**: October 5, 2025
**Version**: 1.0.0

