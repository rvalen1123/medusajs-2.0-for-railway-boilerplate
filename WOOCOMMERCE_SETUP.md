# WooCommerce Integration Setup Guide

## Quick Start (15 minutes)

### Step 1: WordPress/WooCommerce Setup (on Cloudways)

1. **Install Required Plugins:**
   - [CoCart](https://wordpress.org/plugins/cart-rest-api-for-woocommerce/) - FREE
   - [B2BKing](https://woocommerce-b2b-plugin.com/) - $139
   - [JWT Authentication](https://wordpress.org/plugins/jwt-auth/) - FREE (optional, for customer login)

2. **Generate API Keys:**
   - Go to: WooCommerce → Settings → Advanced → REST API
   - Click "Add key"
   - Description: "Next.js Frontend"
   - User: Select your admin user
   - Permissions: Read/Write
   - Click "Generate API keys"
   - **SAVE THESE KEYS!** (You won't see the secret again)

3. **Configure CoCart:**
   - Should work out of the box
   - Test at: `https://premierbiolabs.com/wp-json/cocart/v2/cart`

4. **Configure B2BKing:**
   - B2BKing → Groups → Add "Medical Professionals"
   - B2BKing → Groups → Add "Research Labs"
   - B2BKing → Registration → Enable approval workflow
   - B2BKing → Settings → Enable tiered pricing

### Step 2: Next.js Frontend Setup

1. **Copy environment template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`:**
   ```env
   NEXT_PUBLIC_USE_WOOCOMMERCE=true
   NEXT_PUBLIC_WOO_URL=https://premierbiolabs.com
   WOO_CONSUMER_KEY=ck_your_key_here
   WOO_CONSUMER_SECRET=cs_your_secret_here
   ```

3. **Test the connection:**
   ```bash
   npm run test:woo
   ```

4. **Run the development server:**
   ```bash
   npm run dev:local
   ```

## What's Working Now

✅ **Products:** Fetching from WooCommerce
✅ **Categories:** Mapped to collections
✅ **Homepage:** Shows WooCommerce products
✅ **Fallback:** Falls back to MedusaJS if WooCommerce fails

## File Structure

```
/lib/woocommerce/        # WooCommerce API layer
  ├── config.ts          # API configuration
  ├── types.ts           # TypeScript types
  ├── products.ts        # Product functions
  ├── cart.ts            # Cart management (CoCart)
  ├── customers.ts       # Customer & auth
  └── test-connection.ts # Test script

/lib/data/              # Data adapters
  ├── collections-woo.ts # WooCommerce collections
  ├── products-woo.ts    # WooCommerce products
  ├── regions-woo.ts     # WooCommerce regions
  └── woo-adapter.ts     # Main adapter layer
```

## How It Works

1. **Dual Mode:** Set `NEXT_PUBLIC_USE_WOOCOMMERCE=true` to use WooCommerce
2. **Fallback:** If WooCommerce fails, automatically falls back to MedusaJS
3. **No UI Changes:** Your components stay exactly the same
4. **Same Data Shape:** Adapter transforms WooCommerce data to match MedusaJS

## Testing Checklist

- [ ] Products display on homepage
- [ ] Category navigation works
- [ ] Product detail pages load
- [ ] Add to cart works
- [ ] Cart displays items
- [ ] Search returns results
- [ ] B2B registration works
- [ ] Customer login works

## Deployment

### Vercel Deployment:
```bash
# Add environment variables in Vercel dashboard
NEXT_PUBLIC_USE_WOOCOMMERCE=true
NEXT_PUBLIC_WOO_URL=https://premierbiolabs.com
WOO_CONSUMER_KEY=ck_xxx
WOO_CONSUMER_SECRET=cs_xxx

# Deploy
vercel --prod
```

### Railway Deployment:
- Add same environment variables in Railway dashboard
- Push to main branch

## Troubleshooting

### "Failed to fetch products"
- Check API keys are correct
- Ensure WooCommerce REST API is enabled
- Check CORS settings if different domain

### "Cart not working"
- Install CoCart plugin
- Check CoCart is activated
- Clear browser localStorage

### "B2B features not showing"
- Install B2BKing plugin
- Configure B2B groups
- Enable approval workflows

## Next Steps

1. **Import Products:**
   - Use WooCommerce CSV import
   - Import your 8 peptides from `wc-product-export-*.csv`

2. **Configure B2B:**
   - Set up customer groups
   - Configure pricing tiers
   - Add approval workflows

3. **Enhance UI:**
   - Use Tailwind UI components
   - Add product quick views
   - Enhance checkout flow

## Support

- WooCommerce Docs: https://woocommerce.com/documentation/
- CoCart Docs: https://cocart.xyz/docs/
- B2BKing Docs: https://woocommerce-b2b-plugin.com/docs/

## Switch Back to MedusaJS

Simply set `NEXT_PUBLIC_USE_WOOCOMMERCE=false` in `.env.local` to switch back to MedusaJS.