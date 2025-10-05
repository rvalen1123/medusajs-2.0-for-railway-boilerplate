import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import TrustBadges from "@modules/home/components/trust-badges"
import UseCases from "@modules/home/components/use-cases"
import QualitySection from "@modules/home/components/quality"
import SocialProof from "@modules/home/components/social-proof"
import FeaturedCategories from "@modules/home/components/featured-categories"
import FAQ from "@modules/home/components/faq"
import { getCollectionsWithProducts } from "@lib/data/collections-woo"
import { getRegion } from "@lib/data/regions-woo"

export const metadata: Metadata = {
  title: "PremierBioLabs - Clinical-Grade Peptides for Medical Professionals",
  description:
    "Research-grade peptides for physicians. Third-party tested, batch-verified purity, USP compliant. Trusted by 1,200+ medical practices. HPLC analysis, cGMP facilities.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  let collections = null
  let region = null

  try {
    collections = await getCollectionsWithProducts(countryCode)
    region = await getRegion(countryCode)
  } catch (error) {
    console.warn("Could not fetch data from backend:", error.message)
    // Continue rendering with null data - components will handle gracefully
  }

  return (
    <>
      <Hero />
      <TrustBadges />
      <UseCases />
      <QualitySection />
      <SocialProof />
      <FeaturedCategories />
      <FAQ />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
