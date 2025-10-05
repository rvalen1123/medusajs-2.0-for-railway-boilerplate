#!/bin/bash

echo "🧬 Premier Bio Labs Product Integration Pipeline"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Function to check command status
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 successful${NC}"
    else
        echo -e "${RED}✗ $1 failed${NC}"
        exit 1
    fi
}

# Step 1: Install Python dependencies
echo "Step 1: Installing Python dependencies..."
echo "-----------------------------------------"
pip install playwright beautifulsoup4 lxml 2>/dev/null || pip3 install playwright beautifulsoup4 lxml
check_status "Python package installation"

# Install Playwright browsers if needed
echo "Installing Playwright browsers..."
playwright install chromium 2>/dev/null || python3 -m playwright install chromium
check_status "Playwright browser installation"

# Step 2: Run scraping script
echo ""
echo "Step 2: Scraping Premier Bio Labs products..."
echo "----------------------------------------------"
cd tasks/premier-bio-labs-integration/scripts
python3 scrape-products.py
check_status "Product scraping"

# Step 3: Transform data
echo ""
echo "Step 3: Transforming product data..."
echo "-------------------------------------"
python3 transform-data.py
check_status "Data transformation"

# Step 4: Generate enhanced descriptions
echo ""
echo "Step 4: Generating SEO descriptions..."
echo "---------------------------------------"
python3 generate-descriptions.py
check_status "Description generation"

# Return to project root
cd ../../..

# Step 5: Run Medusa seed script
echo ""
echo "Step 5: Seeding products to Medusa..."
echo "--------------------------------------"

# Check if backend is running
if ! curl -s http://localhost:9000/health > /dev/null; then
    echo -e "${YELLOW}Warning: Medusa backend doesn't appear to be running${NC}"
    echo "Start it with: cd backend && npm run dev"
    echo ""
    echo "Would you like to start it now? (y/n)"
    read -r response
    if [[ "$response" == "y" ]]; then
        cd backend
        npm run dev &
        BACKEND_PID=$!
        echo "Waiting for backend to start..."
        sleep 10
        cd ..
    fi
fi

# Run the seed script
cd backend
npx medusa exec ./src/scripts/seed-peptides.ts
check_status "Product seeding"
cd ..

# Step 6: Display summary
echo ""
echo "================================================"
echo -e "${GREEN}✅ Integration Complete!${NC}"
echo "================================================"
echo ""

# Check if products were created
if [ -f "tasks/premier-bio-labs-integration/data/final-products.json" ]; then
    PRODUCT_COUNT=$(grep -c '"title"' tasks/premier-bio-labs-integration/data/final-products.json)
    echo "📊 Summary:"
    echo "  - Products processed: $PRODUCT_COUNT"
    echo "  - Data location: tasks/premier-bio-labs-integration/data/"
    echo ""
fi

echo "🔍 Next Steps:"
echo "  1. Check the admin panel: http://localhost:9000/admin/products"
echo "  2. View on storefront: http://localhost:8000"
echo "  3. Test product pages and variant selection"
echo "  4. Verify peptide specifications display"
echo ""

# Ask if user wants to open the admin panel
echo "Would you like to open the admin panel now? (y/n)"
read -r response
if [[ "$response" == "y" ]]; then
    if command -v xdg-open > /dev/null; then
        xdg-open http://localhost:9000/admin/products
    elif command -v open > /dev/null; then
        open http://localhost:9000/admin/products
    else
        echo "Please open http://localhost:9000/admin/products in your browser"
    fi
fi

echo ""
echo "✨ Thank you for using Premier Bio Labs Integration!"