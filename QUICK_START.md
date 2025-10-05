# 🚀 Quick Start Guide - Medusa + Premier Bio Labs

## Prerequisites

1. **Start PostgreSQL** (if not running):
   ```bash
   sudo service postgresql start
   ```

2. **Create database** (first time only):
   ```bash
   sudo -u postgres createdb medusa
   sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
   ```

## Option 1: Automatic Setup (Recommended)

```bash
# Install helper package
npm install

# Run automatic setup
npm run setup

# Then start both servers
npm run dev
```

## Option 2: Manual Setup

### Step 1: Database Setup
```bash
cd backend
npx medusa db:migrate
npx medusa db:sync-links
```

### Step 2: Seed Data
```bash
# From backend directory
npx medusa exec ./src/scripts/seed-all.ts
```

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Storefront:**
```bash
cd storefront
npm run dev:local
```

## Access Points

- **Admin Panel**: http://localhost:9000/admin
  - Email: admin@yourmail.com
  - Password: supersecret

- **Storefront**: http://localhost:8000

## Verify Peptide Products

1. Go to Admin Panel → Products
2. Look for "Research Peptides" category
3. Check storefront for peptide cards with:
   - >98% Purity badges
   - COA indicators
   - Research disclaimers

## Troubleshooting

### PostgreSQL Connection Error
```bash
# Check if PostgreSQL is running
pg_isready

# If not running, start it
sudo service postgresql start

# Check connection
psql -U postgres -d medusa -c "SELECT 1;"
```

### Port Already in Use
```bash
# Kill processes on ports
kill $(lsof -t -i:9000)  # Backend
kill $(lsof -t -i:8000)  # Storefront
```

### Missing Dependencies
```bash
cd backend && npm install
cd ../storefront && npm install
```

## Available Commands

```bash
npm run setup          # Initial setup
npm run backend        # Start backend only
npm run frontend       # Start storefront only
npm run dev           # Start both (requires concurrently)
npm run seed          # Reseed all data
npm run seed:peptides # Seed peptides only
npm run test:integration # Run tests
```

## Features Included

✅ 8 Premier Bio Labs peptide products
✅ Enhanced SEO descriptions (300-500 words)
✅ Custom peptide UI components
✅ Research compliance notices
✅ Automatic peptide detection
✅ COA download buttons
✅ Purity badges

---

**Ready to go!** The peptides will automatically display with enhanced UI.