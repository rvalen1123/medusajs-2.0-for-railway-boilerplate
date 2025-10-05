#!/bin/bash

echo "🚀 Medusa + Premier Bio Labs Local Startup Script"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if PostgreSQL is running
echo -e "${BLUE}Checking PostgreSQL status...${NC}"
if pg_isready -q; then
    echo -e "${GREEN}✓ PostgreSQL is running${NC}"
else
    echo -e "${YELLOW}PostgreSQL is not running${NC}"
    echo ""
    echo "Please start PostgreSQL first:"
    echo "  sudo service postgresql start"
    echo ""
    echo "Then create the database if it doesn't exist:"
    echo "  sudo -u postgres createdb medusa"
    echo ""
    echo "And set the password for postgres user:"
    echo "  sudo -u postgres psql -c \"ALTER USER postgres PASSWORD 'postgres';\""
    echo ""
    exit 1
fi

# Check if database exists
echo -e "${BLUE}Checking if 'medusa' database exists...${NC}"
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw medusa; then
    echo -e "${GREEN}✓ Database 'medusa' exists${NC}"
else
    echo -e "${YELLOW}Database 'medusa' does not exist${NC}"
    echo "Creating database..."
    sudo -u postgres createdb medusa
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Database created${NC}"
    else
        echo -e "${RED}✗ Failed to create database${NC}"
        exit 1
    fi
fi

# Navigate to backend
cd backend || { echo -e "${RED}Backend directory not found${NC}"; exit 1; }

# Run migrations
echo ""
echo -e "${BLUE}Running database migrations...${NC}"
npx medusa db:migrate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Migrations complete${NC}"
else
    echo -e "${YELLOW}⚠ Migrations may have issues${NC}"
fi

# Check if we need to seed
echo ""
echo -e "${BLUE}Checking if seeding is needed...${NC}"
npx medusa exec ./src/scripts/check-database.ts 2>/dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Database needs seeding${NC}"
    echo ""
    echo -e "${BLUE}Running complete seed (demo + peptides)...${NC}"
    npx medusa exec ./src/scripts/seed-all.ts
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Seeding complete${NC}"
    else
        echo -e "${RED}✗ Seeding failed${NC}"
        echo "Trying individual seeds..."
        npx medusa exec ./src/scripts/seed.ts
        npx medusa exec ./src/scripts/seed-peptides.ts
    fi
else
    echo -e "${GREEN}✓ Database already seeded${NC}"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=================================================="
echo ""
echo "Now you can start the servers:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 (Storefront):"
echo "  cd storefront && npm run dev:local"
echo ""
echo "Or use the quick start commands:"
echo "  npm run backend   # Start backend in new terminal"
echo "  npm run frontend  # Start frontend in new terminal"
echo ""
echo "Access points:"
echo "  Admin: http://localhost:9000/admin"
echo "  Store: http://localhost:8000"
echo ""