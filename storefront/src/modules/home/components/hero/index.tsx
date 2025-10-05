/**
 * Hero Component - Ultra-Modern Design
 * Inspired by yoursoma.com with sophisticated animations and modern aesthetics
 */

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Award, Truck, Users } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useEffect, useState } from "react"

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      },
    },
  }

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const trustBadges = [
    { icon: Shield, text: "USP Compliant" },
    { icon: Award, text: "Third-Party Tested" },
    { icon: Truck, text: "Same-Day Shipping" },
    { icon: Users, text: "1,500+ Providers" },
  ]

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-grey-5 via-white to-brand-secondary-light">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-brand-accent opacity-10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-primary opacity-10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="content-container py-24 lg:py-32 relative z-10">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: mounted ? opacity : 1 }}
        >
          {/* Premium Badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/80 backdrop-blur-sm border border-grey-20 shadow-sm"
          >
            <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-grey-70">
              Research-Grade Peptides
            </span>
          </motion.div>

          {/* Main Headline - Modern & Bold */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-grey-90 leading-[1.1] mb-6 tracking-tight"
          >
            Clinical-grade peptides{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              for medical professionals
            </span>
          </motion.h1>

          {/* Subheadline - Clean & Informative */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-grey-60 leading-relaxed mb-10 max-w-2xl"
          >
            Third-party tested. Batch-verified purity. Same-day shipping.{" "}
            <span className="text-grey-90 font-semibold">
              The peptide supplier trusted by physicians.
            </span>
          </motion.p>

          {/* Modern CTAs with Glass Effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <LocalizedClientLink href="/store">
              <Button
                size="lg"
                className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-6 text-lg rounded-xl shadow-modern hover:shadow-modern-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Browse Catalog
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/account">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-grey-30 hover:border-brand-primary hover:bg-brand-primary/5 px-8 py-6 text-lg rounded-xl transition-all duration-300"
              >
                Request Access
              </Button>
            </LocalizedClientLink>
          </motion.div>

          {/* Trust Badges - Modern Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                variants={badgeVariants}
                className="flex items-center gap-2 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-grey-15 hover:border-brand-accent/30 transition-all duration-300 group"
              >
                <badge.icon className="h-5 w-5 text-brand-primary group-hover:text-brand-accent transition-colors" />
                <span className="text-sm font-medium text-grey-70 group-hover:text-grey-90 transition-colors">
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}

export default Hero
