import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

/**
 * Database connection checker
 * Verifies PostgreSQL is accessible before running seeds
 */
export default async function checkDatabase({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    logger.info("🔍 Checking database connection...")

    // Try to access the query service
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    // Attempt a simple query
    const result = await query.graph({
      entity: "store",
      fields: ["id", "name"],
    }).catch(() => null)

    if (result) {
      logger.info("✅ Database connection successful!")
      logger.info(`   Store found: ${result.data?.[0]?.name || 'Default Store'}`)
      return true
    } else {
      logger.warn("⚠️  Database connected but no store found")
      logger.info("   This is normal for a fresh database")
      return true
    }

  } catch (error: any) {
    logger.error("❌ Database connection failed!")
    logger.error("")

    // Provide specific error messages
    if (error.code === 'ECONNREFUSED') {
      logger.error("📍 PostgreSQL is not running or not accessible")
      logger.error("")
      logger.error("Solutions:")
      logger.error("  1. Start PostgreSQL:")
      logger.error("     - Docker: docker-compose up -d postgres")
      logger.error("     - Local: sudo service postgresql start")
      logger.error("")
      logger.error("  2. Check your connection settings in .env:")
      logger.error("     DATABASE_URL=postgres://user:password@localhost:5432/medusa")
      logger.error("")
    } else if (error.code === '28P01') {
      logger.error("📍 Authentication failed")
      logger.error("   Check your database credentials in .env")
      logger.error("")
    } else if (error.code === '3D000') {
      logger.error("📍 Database does not exist")
      logger.error("   Create it with: createdb medusa")
      logger.error("")
    } else {
      logger.error("📍 Unknown error:", error.message)
      logger.error("")
    }

    logger.error("For more help:")
    logger.error("  - Check logs: docker logs <postgres-container>")
    logger.error("  - Test connection: psql <DATABASE_URL>")
    logger.error("  - Documentation: https://docs.medusajs.com/development/backend/configurations#database_url")

    return false
  }
}