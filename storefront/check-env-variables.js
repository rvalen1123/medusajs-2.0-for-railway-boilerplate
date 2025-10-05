const c = require("ansi-colors")

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    // TODO: we need a good doc to point this to
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
]

async function hydrateKeyFromBackend() {
  const backend = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  if (!backend) return false
  
  try {
    const url = `${backend.replace(/\/$/, "")}/key-exchange`
    console.log(c.dim(`\nAttempting to fetch publishable key from ${url}...`))
    
    const res = await fetch(url, { 
      signal: AbortSignal.timeout(3000)
    })
    
    if (!res.ok) return false
    
    const json = await res.json()
    if (json.publishableApiKey) {
      process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY = json.publishableApiKey
      console.log(c.green(`✓ Using publishable key from backend\n`))
      return true
    }
  } catch (err) {
    console.log(c.dim(`Could not fetch key from backend: ${err.message}\n`))
  }
  return false
}

async function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter(function (env) {
    return !process.env[env.key]
  })

  if (missingEnvs.length > 0) {
    // Try to auto-fetch the publishable key from backend
    const hydrated = await hydrateKeyFromBackend()
    
    // Re-check after hydration attempt
    const stillMissing = requiredEnvs.filter(function (env) {
      return !process.env[env.key]
    })
    
    if (stillMissing.length > 0) {
      console.error(
        c.red.bold("\n🚫 Error: Missing required environment variables\n")
      )

      stillMissing.forEach(function (env) {
        console.error(c.yellow(`  ${c.bold(env.key)}`))
        if (env.description) {
          console.error(c.dim(`    ${env.description}\n`))
        }
      })

      console.error(
        c.yellow(
          "\nPlease set these variables in your .env.local file or environment before starting the application.\n"
        )
      )

      process.exit(1)
    }
  }
}

module.exports = checkEnvVariables
