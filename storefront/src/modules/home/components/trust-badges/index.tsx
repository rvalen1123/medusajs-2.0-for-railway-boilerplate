/**
 * Trust Badges Component - Enhanced Clinical Sophistication
 * Professional credibility markers with icons and animations
 */

"use client"

import { motion } from "framer-motion"
import { Shield, Award, Truck, Users, FlaskConical, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function TrustBadges() {
  const [providerCount, setProviderCount] = useState(0)

  // Animated counter effect
  useEffect(() => {
    const target = 1500
    const increment = target / 40
    const timer = setInterval(() => {
      setProviderCount((prev) => {
        const next = prev + increment
        if (next >= target) {
          clearInterval(timer)
          return target
        }
        return Math.floor(next)
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  const badges = [
    {
      icon: Users,
      title: `${providerCount.toLocaleString()}+ PROVIDERS`,
      subtitle: "Nationwide Network",
      color: "text-brand-primary",
      bgColor: "bg-brand-secondary-light",
    },
    {
      icon: Shield,
      title: "USP COMPLIANT",
      subtitle: "Pharmaceutical Standards",
      color: "text-brand-accent",
      bgColor: "bg-brand-accent/10",
    },
    {
      icon: FlaskConical,
      title: "cGMP FACILITY",
      subtitle: "FDA Registered",
      color: "text-brand-primary",
      bgColor: "bg-brand-secondary-light",
    },
    {
      icon: CheckCircle,
      title: "THIRD-PARTY TESTED",
      subtitle: "Batch Verified",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Truck,
      title: "SAME-DAY SHIPPING",
      subtitle: "Before 2PM PST",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
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
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      className="relative bg-gradient-to-b from-white via-grey-5 to-white py-12 lg:py-16 overflow-hidden"
      aria-label="Quality assurance and trust indicators"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(0, 54, 61, 0.1) 10px,
            rgba(0, 54, 61, 0.1) 20px
          )`
        }} />
      </div>

      <div className="content-container relative z-10">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full ${badge.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
              >
                <badge.icon className={`h-6 w-6 lg:h-7 lg:w-7 ${badge.color}`} />
              </div>
              <h3 className="text-xs lg:text-sm font-bold text-grey-90 tracking-wider mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-grey-60">
                {badge.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Trust Line */}
        <motion.div
          className="mt-8 pt-8 border-t border-grey-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-sm text-grey-70">
            <span className="font-semibold text-grey-90">98%+ Purity Guaranteed</span> ·
            <span className="mx-2">ISO 9001:2015 Certified</span> ·
            <span className="mx-2">HPLC Analysis Available</span> ·
            <span className="font-semibold text-grey-90">Medical Professional Use Only</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

