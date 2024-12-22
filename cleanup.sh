#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting project cleanup...${NC}"

# Remove unnecessary files and directories
echo -e "${YELLOW}Removing unnecessary files and directories...${NC}"
rm -rf dist
rm -rf node_modules
rm -rf .env
rm -rf coverage
rm -rf .nyc_output
rm -rf logs
rm -rf *.log

# Remove all JavaScript files in src (since we're using TypeScript)
find ./src -name "*.js" -type f -delete
find ./src -name "*.js.map" -type f -delete

# Clean package manager files
echo -e "${YELLOW}Cleaning package manager files...${NC}"
rm -rf package-lock.json
rm -rf yarn.lock
rm -rf pnpm-lock.yaml

# Clean TypeScript build artifacts
echo -e "${YELLOW}Cleaning TypeScript build artifacts...${NC}"
rm -rf tsconfig.tsbuildinfo

# Reinstall dependencies
echo -e "${YELLOW}Reinstalling dependencies...${NC}"
npm install

# Rebuild Prisma
echo -e "${YELLOW}Rebuilding Prisma...${NC}"
npx prisma generate

# Create necessary directories if they don't exist
echo -e "${YELLOW}Creating necessary directories...${NC}"
mkdir -p src/{config,lib,middleware,modules,routes}
mkdir -p src/modules/task

echo -e "${GREEN}Cleanup complete!${NC}"
echo -e "${YELLOW}Project structure:${NC}"
tree -I 'node_modules|dist|coverage' 