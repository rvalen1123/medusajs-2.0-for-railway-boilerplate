#!/bin/bash

# =================================
# MedusaJS Cleanup Script
# =================================
# This script safely removes MedusaJS code and dependencies
# Run this AFTER you've verified WooCommerce is working

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🧹 MedusaJS to WooCommerce Migration Cleanup Script"
echo "=================================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Confirmation prompt
echo -e "${YELLOW}⚠️  WARNING: This script will:${NC}"
echo "  1. Delete the entire /backend directory"
echo "  2. Remove MedusaJS-related files"
echo "  3. Update package.json files"
echo "  4. Clean up dependencies"
echo ""
echo -e "${RED}This action CANNOT be undone!${NC}"
echo ""
read -p "Have you backed up everything? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Aborting. Please backup your data first."
    exit 1
fi

echo ""
read -p "Are you ABSOLUTELY sure you want to continue? (yes/no): " confirm2

if [ "$confirm2" != "yes" ]; then
    echo "Aborting."
    exit 1
fi

echo ""
echo "Starting cleanup in 5 seconds... (Ctrl+C to cancel)"
sleep 5

# =================================
# Phase 1: Backup
# =================================
echo ""
echo "📦 Phase 1: Creating backup..."

BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

if [ -d "backend" ]; then
    echo "  → Backing up backend/ to $BACKUP_DIR/backend/"
    cp -r backend "$BACKUP_DIR/"
fi

echo "  → Backing up root package.json"
cp package.json "$BACKUP_DIR/"

echo -e "${GREEN}✓ Backup created at: $BACKUP_DIR${NC}"

# =================================
# Phase 2: Delete Backend
# =================================
echo ""
echo "🗑️  Phase 2: Removing MedusaJS backend..."

if [ -d "backend" ]; then
    echo "  → Deleting backend/ directory..."
    rm -rf backend
    echo -e "${GREEN}✓ Backend directory removed${NC}"
else
    echo -e "${YELLOW}  ℹ Backend directory not found, skipping${NC}"
fi

# =================================
# Phase 3: Clean Root Directory
# =================================
echo ""
echo "🧹 Phase 3: Cleaning root directory..."

# Remove MedusaJS-specific files
files_to_remove=(
    "start-local.sh"
    "README.md"
    "QUICK_START.md"
)

for file in "${files_to_remove[@]}"; do
    if [ -f "$file" ]; then
        echo "  → Removing $file"
        rm "$file"
    fi
done

# Remove docs directory if it exists
if [ -d "docs" ]; then
    echo "  → Removing docs/ directory"
    rm -rf docs
fi

echo -e "${GREEN}✓ Root directory cleaned${NC}"

# =================================
# Phase 4: Update Root package.json
# =================================
echo ""
echo "📝 Phase 4: Updating root package.json..."

cat > package.json << 'EOF'
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
  "keywords": [
    "woocommerce",
    "nextjs",
    "b2b",
    "ecommerce"
  ],
  "repository": {
    "type": "git",
    "url": "your-repo-url"
  }
}
EOF

echo -e "${GREEN}✓ Root package.json updated${NC}"

# =================================
# Phase 5: Clean Storefront Dependencies
# =================================
echo ""
echo "📦 Phase 5: Cleaning storefront dependencies..."

if [ -d "storefront" ]; then
    cd storefront
    
    echo "  → Removing MedusaJS packages..."
    
    # Remove MedusaJS packages if they exist
    if [ -f "package.json" ]; then
        npm uninstall \
            @medusajs/js-sdk \
            @medusajs/types \
            @medusajs/ui \
            @medusajs/client-types \
            @medusajs/ui-preset \
            @meilisearch/instant-meilisearch \
            medusajs-launch-utils \
            algoliasearch \
            2>/dev/null || true
        
        echo "  → Reinstalling dependencies..."
        npm install
    fi
    
    cd ..
    echo -e "${GREEN}✓ Storefront dependencies cleaned${NC}"
else
    echo -e "${YELLOW}  ℹ Storefront directory not found${NC}"
fi

# =================================
# Phase 6: Create New README
# =================================
echo ""
echo "📄 Phase 6: Creating new README..."

cat > README.md << 'EOF'
# Premier Bio Labs - B2B Storefront

Modern B2B e-commerce platform powered by WooCommerce REST API, B2BKing, and Next.js.

## 🚀 Quick Start

```bash
cd storefront
npm install
cp .env.example .env.local
# Edit .env.local with your WooCommerce API keys
npm run dev:local
```

Open http://localhost:3000

## 📚 Documentation

- [Quick Start Guide](./QUICK_START_NEW.md)
- [Cleanup Plan](./CLEANUP_PLAN.md)
- [WooCommerce Setup](./WOOCOMMERCE_SETUP.md)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: WooCommerce REST API + B2BKing
- **Styling**: Tailwind CSS, Radix UI
- **Deployment**: Vercel

## 📦 Project Structure

```
├── storefront/          # Next.js application
│   ├── src/
│   │   ├── app/        # App router pages
│   │   ├── lib/
│   │   │   └── woocommerce/  # WooCommerce API
│   │   └── components/
│   └── package.json
└── README.md
```

## 🚀 Deployment

Deploy to Vercel:
```bash
vercel --prod
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_WOO_URL`
- `WOO_CONSUMER_KEY`
- `WOO_CONSUMER_SECRET`

## 📞 Support

For issues or questions, create an issue or contact the team.

---

**Migrated from MedusaJS to WooCommerce** - October 2025
EOF

echo -e "${GREEN}✓ New README created${NC}"

# =================================
# Phase 7: Summary
# =================================
echo ""
echo "=================================================="
echo -e "${GREEN}✅ Cleanup Complete!${NC}"
echo "=================================================="
echo ""
echo "Summary of changes:"
echo "  ✓ Deleted backend/ directory"
echo "  ✓ Removed MedusaJS-related files"
echo "  ✓ Updated root package.json"
echo "  ✓ Cleaned storefront dependencies"
echo "  ✓ Created new README.md"
echo ""
echo "Backup location: $BACKUP_DIR/"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Review the changes"
echo "  2. Test the storefront: cd storefront && npm run dev:local"
echo "  3. Delete Railway services (see CLEANUP_PLAN.md Phase 1)"
echo "  4. Deploy to production"
echo ""
echo -e "${GREEN}Need to rollback?${NC} Your backup is in: $BACKUP_DIR/"
echo ""

