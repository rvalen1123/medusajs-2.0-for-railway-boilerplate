/**
 * Featured Categories - Ultra-Modern Mosaic Grid
 * Inspired by yoursoma.com with modern card design and animations
 */

"use client"

import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowRight, TrendingUp, Heart, Activity, Zap } from "lucide-react"

export default function FeaturedCategories() {
  const categories = [
    {
      category: "Metabolic",
      title: "Weight Management",
      peptides: ["Semaglutide", "Tirzepatide"],
      description:
        "Evidence-based protocols for metabolic optimization and body composition management.",
      shopLink: "/store?category=weight-loss",
      icon: TrendingUp,
      gradient: "from-modern-teal-500 to-modern-teal-700",
    },
    {
      category: "Sexual Medicine",
      title: "Intimacy Enhancement",
      peptides: ["PT-141", "Oxytocin"],
      description:
        "Clinical protocols for libido enhancement and sexual function optimization in men and women.",
      shopLink: "/store?category=sexual-health",
      icon: Heart,
      gradient: "from-brand-accent to-brand-accent-hover",
    },
    {
      category: "Tissue Repair",
      title: "Injury Recovery",
      peptides: ["BPC-157", "TB-500"],
      description:
        "Accelerated healing protocols for soft tissue injuries, joint recovery, and athletic performance.",
      shopLink: "/store?category=recovery",
      icon: Activity,
      gradient: "from-modern-sage-400 to-modern-sage-600",
    },
    {
      category: "Anabolic",
      title: "Muscle Growth",
      peptides: ["CJC-1295", "Ipamorelin"],
      description:
        "Natural growth hormone secretagogue protocols for lean muscle development and body recomposition.",
      shopLink: "/store?category=muscle",
      icon: Zap,
      gradient: "from-modern-teal-600 to-brand-primary",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section
      className="py-24 lg:py-32 bg-gradient-to-b from-white via-grey-5 to-white"
      aria-label="Clinical application categories"
    >
      <div className="content-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-grey-90 mb-4">
            Clinical{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              Applications
            </span>
          </h2>
          <p className="text-lg text-grey-60 max-w-2xl mx-auto">
            Discover research-backed peptide protocols for your specific clinical needs
          </p>
        </motion.div>

        {/* Modern Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <LocalizedClientLink href={category.shopLink}>
                <div className="relative h-full p-8 rounded-2xl bg-white border border-grey-20 hover:border-brand-accent/30 shadow-sm hover:shadow-modern transition-all duration-300 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.gradient} text-white`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="relative mb-4">
                    <span className="inline-block px-3 py-1 bg-grey-10 text-grey-70 text-xs font-semibold tracking-wider uppercase rounded-full">
                      {category.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="relative text-2xl font-bold text-grey-90 mb-3 group-hover:text-brand-primary transition-colors">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="relative text-grey-60 text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Key Peptides */}
                  <div className="relative flex flex-col gap-2 mb-6">
                    <p className="text-xs font-semibold text-grey-50 uppercase tracking-wider">Key peptides</p>
                    <div className="flex flex-wrap gap-2">
                      {category.peptides.map((peptide, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 bg-grey-10 text-grey-70 rounded-full border border-grey-20"
                        >
                          {peptide}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="relative inline-flex items-center gap-2 text-sm font-semibold text-brand-primary group-hover:gap-3 transition-all">
                    View Protocols
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </LocalizedClientLink>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
