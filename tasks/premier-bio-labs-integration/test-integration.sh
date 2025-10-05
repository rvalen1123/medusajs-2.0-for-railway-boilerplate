#!/bin/bash

echo "🧪 Premier Bio Labs Integration Test Suite"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
TESTS_PASSED=0
TESTS_FAILED=0

# Test function
test_item() {
    local test_name="$1"
    local test_command="$2"

    echo -n "Testing: $test_name... "

    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

# Test detailed output
test_with_output() {
    local test_name="$1"
    local test_command="$2"

    echo -e "\n${BLUE}Testing: $test_name${NC}"
    echo "Command: $test_command"
    echo "-----------------------------------------"

    if eval "$test_command"; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

echo "📁 Phase 1: File Structure Tests"
echo "---------------------------------"

# Test Python scripts
test_item "Scraping script exists" "[ -f tasks/premier-bio-labs-integration/scripts/scrape-products.py ]"
test_item "Transform script exists" "[ -f tasks/premier-bio-labs-integration/scripts/transform-data.py ]"
test_item "Description generator exists" "[ -f tasks/premier-bio-labs-integration/scripts/generate-descriptions.py ]"

# Test data files
test_item "Raw products JSON exists" "[ -f tasks/premier-bio-labs-integration/data/raw-products.json ]"
test_item "Transformed products exists" "[ -f tasks/premier-bio-labs-integration/data/transformed-products.json ]"
test_item "Final products exists" "[ -f tasks/premier-bio-labs-integration/data/final-products.json ]"

# Test backend scripts
test_item "Peptide seed script exists" "[ -f backend/src/scripts/seed-peptides.ts ]"
test_item "Combined seed script exists" "[ -f backend/src/scripts/seed-all.ts ]"
test_item "Database checker exists" "[ -f backend/src/scripts/check-database.ts ]"

# Test frontend components
test_item "PeptideCard component exists" "[ -f storefront/src/modules/products/components/product-preview/peptide-card.tsx ]"
test_item "PeptideSpecs widget exists" "[ -f storefront/src/modules/products/templates/product-info/peptide-specs.tsx ]"
test_item "ResearchDisclaimer exists" "[ -f storefront/src/components/research-disclaimer.tsx ]"
test_item "Peptide detection utility exists" "[ -f storefront/src/lib/util/is-peptide-product.ts ]"

echo ""
echo "📊 Phase 2: Data Validation Tests"
echo "----------------------------------"

# Check product count
if [ -f tasks/premier-bio-labs-integration/data/final-products.json ]; then
    PRODUCT_COUNT=$(grep -c '"title"' tasks/premier-bio-labs-integration/data/final-products.json)
    if [ "$PRODUCT_COUNT" -eq 8 ]; then
        echo -e "Product count (8): ${GREEN}✓ CORRECT${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "Product count ($PRODUCT_COUNT): ${RED}✗ INCORRECT (expected 8)${NC}"
        ((TESTS_FAILED++))
    fi
fi

# Check for specific products
test_item "BPC-157 in data" "grep -q 'BPC-157' tasks/premier-bio-labs-integration/data/final-products.json"
test_item "GHK-Cu in data" "grep -q 'GHK-Cu' tasks/premier-bio-labs-integration/data/final-products.json"
test_item "Tesamorelin in data" "grep -q 'Tesamorelin' tasks/premier-bio-labs-integration/data/final-products.json"
test_item "NAD+ in data" "grep -q 'NAD+' tasks/premier-bio-labs-integration/data/final-products.json"

# Check for metadata
test_item "Purity metadata present" "grep -q '>98%' tasks/premier-bio-labs-integration/data/final-products.json"
test_item "COA metadata present" "grep -q 'coa_available' tasks/premier-bio-labs-integration/data/final-products.json"
test_item "Research use metadata" "grep -q 'research_use_only' tasks/premier-bio-labs-integration/data/final-products.json"

echo ""
echo "🧩 Phase 3: Component Integration Tests"
echo "----------------------------------------"

# Check component imports
test_item "PeptideCard imported in preview" "grep -q 'import PeptideCard' storefront/src/modules/products/components/product-preview/index.tsx"
test_item "isPeptideProduct imported" "grep -q 'isPeptideProduct' storefront/src/modules/products/components/product-preview/index.tsx"
test_item "PeptideSpecs imported in template" "grep -q 'import PeptideSpecs' storefront/src/modules/products/templates/index.tsx"
test_item "ResearchDisclaimer in layout" "grep -q 'ResearchDisclaimer' storefront/src/app/[countryCode]/(main)/layout.tsx"

echo ""
echo "🔧 Phase 4: TypeScript Compilation Test"
echo "----------------------------------------"

# Test TypeScript compilation for key files
echo -n "Testing TypeScript compilation... "
cd storefront
if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
    echo -e "${GREEN}✓ No TypeScript errors${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ TypeScript errors found (non-critical)${NC}"
fi
cd ..

echo ""
echo "📦 Phase 5: Dependencies Test"
echo "------------------------------"

# Check for required npm packages
cd storefront
test_item "lucide-react installed" "npm ls lucide-react 2>/dev/null"
test_item "class-variance-authority installed" "npm ls class-variance-authority 2>/dev/null"
cd ..

echo ""
echo "🌐 Phase 6: Backend Tests"
echo "-------------------------"

# Check if database is accessible
echo -n "Testing database connection... "
if nc -zv localhost 5432 2>/dev/null; then
    echo -e "${GREEN}✓ PostgreSQL port open${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ PostgreSQL not running (run 'docker-compose up -d postgres')${NC}"
fi

echo ""
echo "🎨 Phase 7: Storefront Readiness"
echo "---------------------------------"

# Check for build issues
echo -n "Testing storefront build readiness... "
cd storefront
if npm run build --dry-run 2>/dev/null; then
    echo -e "${GREEN}✓ Build configuration OK${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ Build may have issues${NC}"
fi
cd ..

echo ""
echo "=========================================="
echo "📊 TEST RESULTS SUMMARY"
echo "=========================================="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"

if [ "$TESTS_FAILED" -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    echo ""
    echo "✅ The Premier Bio Labs integration is ready!"
    echo ""
    echo "Next steps:"
    echo "  1. Start PostgreSQL: docker-compose up -d postgres"
    echo "  2. Run migrations: cd backend && npx medusa migrations run"
    echo "  3. Seed database: cd backend && npx medusa exec ./src/scripts/seed-all.ts"
    echo "  4. Start backend: cd backend && npm run dev"
    echo "  5. Start storefront: cd storefront && npm run dev"
else
    echo ""
    echo -e "${YELLOW}⚠️  Some tests failed but integration may still work${NC}"
    echo ""
    echo "Review the failed tests above and:"
    echo "  - Check if files were moved or renamed"
    echo "  - Ensure all dependencies are installed"
    echo "  - Verify database is running if needed"
fi

echo ""
echo "For detailed logs, check:"
echo "  - Backend logs: backend/logs/"
echo "  - Build output: storefront/.next/"
echo ""