/**
 * Quality Testing Section - Enhanced Clinical Sophistication
 * Data-driven metrics, specific testing protocols, physician credibility
 */

"use client"

import { motion } from "framer-motion"
import { ArrowRight, FlaskConical, Shield, AlertCircle, Droplet, CheckCircle2, FileCheck, Award } from "lucide-react"

export default function QualitySection() {
  const qualityMetrics = [
    {
      icon: FlaskConical,
      title: "Potency",
      value: "99.4%",
      subtitle: "Average Purity",
      description:
        "High-performance liquid chromatography (HPLC) analysis confirms peptide identity and concentration for every production batch.",
      standard: "HPLC-Verified Testing",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      icon: Shield,
      title: "Sterility",
      value: "USP <797>",
      subtitle: "Compliant",
      description:
        "All products undergo USP <797> sterility testing to ensure freedom from bacterial contamination in cGMP-certified facilities.",
      standard: "Pharmaceutical Grade",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: AlertCircle,
      title: "Endotoxins",
      value: "<0.5 EU/mg",
      subtitle: "LAL Tested",
      description:
        "Bacterial endotoxin testing via LAL assay confirms compliance with USP <85> safety requirements for injectable preparations.",
      standard: "USP <85> Standards",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      icon: Droplet,
      title: "pH Balance",
      value: "7.2-7.6",
      subtitle: "Physiological",
      description:
        "Bacteriostatic water formulations maintain optimal pH balance with 0.9% benzyl alcohol for tissue compatibility and stability.",
      standard: "Tissue Compatible",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section
      className="py-24 lg:py-40 bg-grey-5"
      aria-labelledby="quality-heading"
    >
      <div className="content-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id="quality-heading"
            className="text-4xl lg:text-5xl font-bold text-grey-90 mb-6"
          >
            Third-party verified. Every batch.
          </h2>
          <p className="text-lg text-grey-70 max-w-2xl mx-auto mb-4">
            We don't just claim quality—we prove it. Independent laboratory testing,
            published COAs, and full supply chain transparency.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {qualityMetrics.map((metric, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className={`bg-white rounded-xl border ${metric.borderColor} p-6 hover:shadow-xl transition-all duration-300 group`}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${metric.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <metric.icon className={`h-7 w-7 ${metric.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Title and Value */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="text-2xl font-bold text-grey-90">
                          {metric.value}
                        </h3>
                        <span className="text-sm font-medium text-grey-60">
                          {metric.subtitle}
                        </span>
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                        {metric.standard}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-grey-70 leading-relaxed">
                      {metric.description}
                    </p>

                    {/* Progress Bar Visualization */}
                    <div className="mt-4">
                      <div className="h-2 bg-grey-10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${metric.bgColor}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: metric.title === "Potency" ? "99.4%" : "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certification Badge */}
                <div className="mt-4 pt-4 border-t border-grey-15">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-grey-70">
                      Independently Verified • COA Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/quality"
            className="inline-flex items-center gap-2 text-grey-90 font-semibold hover:text-grey-70 transition-colors"
          >
            View Full Testing Protocol
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

