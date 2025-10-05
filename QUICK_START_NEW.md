# 🚀 Quick Start Guide - WooCommerce + Next.js

## For New Developers

### Prerequisites
- Node.js 18+ installed
- npm or pnpm
- WooCommerce API credentials

### 1. Initial Setup (5 minutes)

```bash
# Clone the repository
git clone <your-repo-url>
cd medusajs-2.0-for-railway-boilerplate/storefront

# Install dependencies
npm install
```

### 2. Configure Environment (2 minutes)

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your WooCommerce API credentials
nano .env.local  # or use your favorite editor
```

Required variables:
```env
NEXT_PUBLIC_WOO_URL=https://premierbiolabs.com
WOO_CONSUMER_KEY=ck_your_key
WOO_CONSUMER_SECRET=cs_your_secret
NEXT_PUBLIC_B2B_ENABLED=true
```

### 3. Test Connection (1 minute)

```bash
# Verify WooCommerce connection
npm run test:woo
```

You should see:
```
✓ Connected to WooCommerce
✓ Found X products
✓ Found Y categories
✓ CoCart is active
```

### 4. Run Development Server (1 minute)

```bash
npm run dev:local
```

Open http://localhost:3000 in your browser.

---

## Project Structure

```
storefront/
├── src/
│   ├── app/                    # Next.js app router pages
│   ├── components/             # React components
│   ├── lib/
│   │   ├── woocommerce/       # WooCommerce API layer ⭐
│   │   │   ├── client.ts      # API client
│   │   │   ├── config.ts      # Configuration
│   │   │   ├── products.ts    # Product functions
│   │   │   ├── cart.ts        # Cart (CoCart)
│   │   │   ├── customers.ts   # Auth & customers
│   │   │   └── types.ts       # TypeScript types
│   │   └── data/
│   │       └── woo-adapter.ts # Data adapter
│   ├── modules/               # Feature modules
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
└── package.json
```

---

## Common Tasks

### Add a New Product Display

```typescript
// pages/products/[handle].tsx
import { getProduct } from '@lib/woocommerce/products'

export default async function ProductPage({ params }) {
  const product = await getProduct(params.handle)
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      {/* Your UI */}
    </div>
  )
}
```

### Work with Cart

```typescript
import { addToCart, getCart } from '@lib/woocommerce/cart'

// Add to cart
await addToCart(productId, quantity)

// Get current cart
const cart = await getCart()
```

### Fetch Products

```typescript
import { getProducts } from '@lib/woocommerce/products'

// Get all products
const products = await getProducts({ per_page: 20 })

// Get featured products
const featured = await getProducts({ featured: true })

// Search products
const results = await getProducts({ search: 'peptide' })
```

---

## Debugging

### Enable Debug Logging

Add to `.env.local`:
```env
NEXT_PUBLIC_API_DEBUG=true
```

### Check WooCommerce Endpoint

```bash
curl https://premierbiolabs.com/wp-json/wc/v3/products \
  -u consumer_key:consumer_secret
```

### Clear Next.js Cache

```bash
rm -rf .next
npm run dev:local
```

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel dashboard for automatic deployments.

### Environment Variables for Production

In Vercel/Railway dashboard, add:
- `NEXT_PUBLIC_WOO_URL`
- `WOO_CONSUMER_KEY`
- `WOO_CONSUMER_SECRET`
- `NEXT_PUBLIC_B2B_ENABLED`

---

## Getting Help

1. Check the [CLEANUP_PLAN.md](./CLEANUP_PLAN.md) for detailed documentation
2. Review [WOOCOMMERCE_SETUP.md](./WOOCOMMERCE_SETUP.md) for WooCommerce config
3. Test connection: `npm run test:woo`
4. Check browser console for errors
5. Review WooCommerce API logs in WordPress admin

---

## What NOT to Do

- ❌ Don't commit `.env.local` file
- ❌ Don't use production API keys in development
- ❌ Don't modify files in `node_modules/`
- ❌ Don't delete the `woocommerce/` directory
- ❌ Don't expose API secrets in client-side code

---

## Next Steps

1. ✅ Get the development server running
2. ✅ Explore the codebase
3. ✅ Try adding a new feature
4. ✅ Read the [full documentation](./CLEANUP_PLAN.md)
5. ✅ Deploy to staging environment

---

**Need help?** Create an issue or contact the team!

