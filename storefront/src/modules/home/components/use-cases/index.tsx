/**
 * Use Cases Component - Enhanced Clinical Categories
 * Premium category cards with imagery and clear CTAs
 */

"use client"

import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heart, Activity, Brain, Zap, ArrowRight, TrendingUp, Shield, Dumbbell } from "lucide-react"
import Image from "next/image"

export default function UseCases() {
  const categories = [
    {
      id: "weight-loss",
      label: "Metabolic Health",
      title: "Weight Loss",
      description:
        "GLP-1 agonists like Semaglutide and Tirzepatide for clinical weight management. Proven protocols for metabolic optimization.",
      stats: "15-20% weight reduction",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      shopLink: "/store?category=weight-loss",
      learnLink: "/learn/weight-loss",
      image: "/images/use-cases/weight-loss.jpg",
      featuredProducts: ["Semaglutide", "Tirzepatide", "AOD-9604"],
    },
    {
      id: "sexual-health",
      label: "Sexual Medicine",
      title: "Sexual Health",
      description:
        "PT-141 (Bremelanotide) and Kisspeptin for enhanced libido and sexual function. Evidence-based protocols for both men and women.",
      stats: "80% efficacy rate",
      icon: Heart,
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      shopLink: "/store?category=sexual-health",
      learnLink: "/learn/sexual-health",
      image: "/images/use-cases/sexual-health.jpg",
      featuredProducts: ["PT-141", "Kisspeptin", "Oxytocin"],
    },
    {
      id: "recovery",
      label: "Tissue Repair",
      title: "Recovery & Healing",
      description:
        "BPC-157, TB-500, and GHK-Cu for accelerated tissue repair and injury recovery. Trusted by sports medicine professionals.",
      stats: "2x faster healing",
      icon: Activity,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      shopLink: "/store?category=recovery",
      learnLink: "/learn/recovery",
      image: "/images/use-cases/recovery.jpg",
      featuredProducts: ["BPC-157", "TB-500", "GHK-Cu"],
    },
    {
      id: "muscle-strength",
      label: "Performance",
      title: "Muscle & Strength",
      description:
        "Growth hormone secretagogues like CJC-1295 and Ipamorelin for lean muscle development and strength gains.",
      stats: "12% muscle increase",
      icon: Dumbbell,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      shopLink: "/store?category=muscle",
      learnLink: "/learn/muscle-strength",
      image: "/images/use-cases/muscle.jpg",
      featuredProducts: ["CJC-1295", "Ipamorelin", "GHRP-6"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section
      className="py-20 lg:py-32 bg-gradient-to-b from-white to-grey-5"
      aria-labelledby="use-cases-heading"
    >
      <div className="content-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="use-cases-heading" className="text-3xl lg:text-4xl font-bold text-grey-90 mb-4">
            Peptide Solutions for Every Practice
          </h2>
          <p className="text-lg text-grey-70 max-w-2xl mx-auto">
            Evidence-based peptide protocols tailored to specific clinical applications
          </p>
        </motion.div>

        {/* Category Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-grey-15"
            >
              {/* Card Header with Gradient */}
              <div className={`h-48 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                    <category.icon className="h-6 w-6 text-grey-90" />
                  </div>
                  <div>
                    <p className="text-white/90 text-xs font-semibold uppercase tracking-wider mb-1">
                      {category.label}
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <p className="text-grey-70 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Stats Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${category.bgColor} mb-4`}>
                  <Shield className="h-3 w-3 text-grey-90" />
                  <span className="text-xs font-semibold text-grey-90">
                    {category.stats}
                  </span>
                </div>

                {/* Featured Products */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-grey-60 uppercase tracking-wider mb-2">
                    Popular Products:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.featuredProducts.map((product) => (
                      <span
                        key={product}
                        className="text-xs px-2 py-1 bg-grey-10 text-grey-70 rounded-md"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <LocalizedClientLink
                    href={category.shopLink}
                    className="flex-1 px-4 py-2 bg-grey-90 hover:bg-grey-80 text-white text-sm font-semibold rounded-lg transition-all duration-300 text-center"
                  >
                    Shop Now
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href={category.learnLink}
                    className="flex-1 px-4 py-2 border border-grey-30 hover:border-grey-60 text-grey-90 text-sm font-semibold rounded-lg transition-all duration-300 text-center"
                  >
                    Learn More
                  </LocalizedClientLink>
                </div>
              </div>

              {/* Hover Effect Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <LocalizedClientLink href="/store">
            <button className="px-8 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg">
              Explore All Peptides →
            </button>
          </LocalizedClientLink>
        </motion.div>
      </div>
    </section>
  )
}

