import { Suspense } from "react"
import { listRegions } from "@lib/data/regions-woo"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  let regions: StoreRegion[] = []

  try {
    regions = await listRegions().then((regions: StoreRegion[]) => regions)
  } catch (error) {
    console.warn("Could not fetch regions for nav:", error.message)
  }

  return (
    <div className="sticky top-0 inset-x-0 z-50 transition-all duration-300">
      <header className="relative h-20 mx-auto backdrop-blur-lg bg-white/80 border-b border-grey-20 shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Left Section - Menu */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center">
              <SideMenu regions={regions} />
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 tracking-tight"
              data-testid="nav-store-link"
            >
              PremierBioLabs
            </LocalizedClientLink>
          </div>

          {/* Right Section - Navigation Links */}
          <div className="flex items-center gap-x-8 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-8 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="text-sm font-medium text-grey-70 hover:text-brand-primary transition-colors duration-200 relative group"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="text-sm font-medium text-grey-70 hover:text-brand-primary transition-colors duration-200 relative group"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-grey-70 hover:text-brand-primary transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
