import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import seedDemoData from "./seed"
import seedPeptideProducts from "./seed-peptides"

/**
 * Combined seed script that runs both demo and peptide data
 * Ensures proper order of execution
 */
export default async function seedAllData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    logger.info("🌱 Starting complete database seeding...")
    logger.info("")

    // Step 1: Run main seed (creates sales channels, regions, etc.)
    logger.info("Step 1: Seeding demo data (regions, channels, basic products)...")
    logger.info("-" + "=".repeat(60))

    await seedDemoData({ container })

    logger.info("✅ Demo data seeding complete!")
    logger.info("")

    // Step 2: Run peptide seed (requires sales channels from step 1)
    logger.info("Step 2: Seeding Premier Bio Labs peptide products...")
    logger.info("-" + "=".repeat(60))

    await seedPeptideProducts({ container })

    logger.info("✅ Peptide product seeding complete!")
    logger.info("")

    // Success summary
    logger.info("=" + "=".repeat(60))
    logger.info("🎉 ALL SEEDING COMPLETE!")
    logger.info("=" + "=".repeat(60))
    logger.info("")
    logger.info("📊 What was created:")
    logger.info("  ✓ Regions (Europe with EUR/USD currencies)")
    logger.info("  ✓ Sales channels")
    logger.info("  ✓ Shipping profiles and options")
    logger.info("  ✓ Stock locations")
    logger.info("  ✓ Demo products (T-shirts, etc.)")
    logger.info("  ✓ Peptide categories (Research Peptides, Growth Factors, etc.)")
    logger.info("  ✓ 8 Premier Bio Labs peptide products")
    logger.info("")
    logger.info("🔗 Access Points:")
    logger.info("  Admin Panel: http://localhost:9000/admin")
    logger.info("  Storefront:  http://localhost:8000")
    logger.info("")
    logger.info("💡 Next Steps:")
    logger.info("  1. Login to admin panel")
    logger.info("  2. Check products under 'Research Peptides' category")
    logger.info("  3. Test peptide product pages on storefront")
    logger.info("  4. Verify research disclaimer appears")
    logger.info("")

  } catch (error) {
    logger.error("❌ Seeding failed:", error)

    // Provide troubleshooting tips
    logger.error("")
    logger.error("🔍 Troubleshooting tips:")
    logger.error("  1. Ensure PostgreSQL is running")
    logger.error("  2. Check database connection in .env")
    logger.error("  3. Try running migrations: npx medusa migrations run")
    logger.error("  4. Clear database and retry if conflicts exist")

    throw error
  }
}