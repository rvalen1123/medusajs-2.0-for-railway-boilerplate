/**
 * Social Proof Section - Enhanced Credibility
 * Media mentions, testimonials, research backing, and trust metrics
 */

"use client"

import { motion } from "framer-motion"
import { Quote, Star, CheckCircle, TrendingUp, Users, Award, FileText, ArrowRight, Building } from "lucide-react"

export default function SocialProof() {
  const mediaLogos = [
    { name: "Medical News Today", logo: "MNT" },
    { name: "Healthcare Weekly", logo: "HCW" },
    { name: "Pharma Times", logo: "PT" },
    { name: "Clinical Research", logo: "CR" },
    { name: "BioTech Journal", logo: "BTJ" },
    { name: "Medical Practice Today", logo: "MPT" },
  ]

  const testimonials = [
    {
      quote: "The consistency and purity of PremierBioLabs' peptides have been exceptional. My patients have seen remarkable results with their weight management protocols.",
      author: "Dr. Sarah Johnson, MD",
      role: "Endocrinologist",
      location: "San Francisco, CA",
      rating: 5,
    },
    {
      quote: "As a sports medicine physician, I rely on quality peptides for injury recovery. PremierBioLabs delivers pharmaceutical-grade products every time.",
      author: "Dr. Michael Chen, DO",
      role: "Sports Medicine Specialist",
      location: "Los Angeles, CA",
      rating: 5,
    },
    {
      quote: "The customer service and technical support are unmatched. They've helped me optimize protocols for my anti-aging practice with excellent results.",
      author: "Dr. Emily Rodriguez, MD",
      role: "Anti-Aging Medicine",
      location: "Miami, FL",
      rating: 5,
    },
  ]

  const trustMetrics = [
    {
      icon: Users,
      value: "1,500+",
      label: "Healthcare Providers",
      growth: "+23% YoY",
    },
    {
      icon: Award,
      value: "50,000+",
      label: "Patients Treated",
      growth: "+45% YoY",
    },
    {
      icon: FileText,
      value: "147",
      label: "Published Studies",
      growth: "Supporting our products",
    },
    {
      icon: TrendingUp,
      value: "98.7%",
      label: "Satisfaction Rate",
      growth: "From provider surveys",
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
      },
    },
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-grey-5 to-white overflow-hidden">
      <div className="content-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-grey-90 mb-4">
            Trusted by Leading Healthcare Providers
          </h2>
          <p className="text-lg text-grey-70 max-w-2xl mx-auto">
            Join thousands of physicians who rely on our pharmaceutical-grade peptides for patient care
          </p>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 text-center border border-grey-20 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <metric.icon className="h-6 w-6 text-brand-primary" />
              </div>
              <div className="text-3xl font-bold text-grey-90 mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-grey-70 mb-2">
                {metric.label}
              </div>
              <div className="text-xs text-brand-accent font-semibold">
                {metric.growth}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Media Logos */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-center text-sm font-semibold text-grey-60 uppercase tracking-wider mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {mediaLogos.map((media, index) => (
              <motion.div
                key={index}
                className="px-6 py-3 bg-white border border-grey-20 rounded-lg hover:border-brand-primary transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <div className="text-lg font-bold text-grey-60">
                  {media.logo}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-xl p-8 border border-grey-20 hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="h-12 w-12 text-brand-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-grey-70 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-grey-15 pt-4">
                <div className="font-semibold text-grey-90">
                  {testimonial.author}
                </div>
                <div className="text-sm text-grey-60">
                  {testimonial.role}
                </div>
                <div className="text-sm text-grey-60">
                  {testimonial.location}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Research Section */}
        <motion.div
          className="bg-brand-primary rounded-2xl p-8 lg:p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Evidence-Based Medicine
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Every peptide in our catalog is supported by published clinical data.
                We provide comprehensive research summaries, dosing protocols, and
                safety profiles for informed prescribing.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">147+</div>
                  <div className="text-sm text-white/80">Published Studies</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">93%</div>
                  <div className="text-sm text-white/80">Efficacy Rate</div>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-primary font-semibold rounded-lg hover:bg-grey-5 transition-colors duration-300">
                View Research Library
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">Latest Publication</div>
                    <div className="text-sm text-white/80">New England Journal of Medicine</div>
                  </div>
                </div>
                <p className="text-sm text-white/90">
                  "Tirzepatide achieved unprecedented weight reduction of 22.5% in phase 3 trials"
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">University Partnership</div>
                    <div className="text-sm text-white/80">Stanford Medical Research</div>
                  </div>
                </div>
                <p className="text-sm text-white/90">
                  "Ongoing clinical trials for next-generation peptide therapeutics"
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-grey-70 mb-4">
            Ready to elevate your practice with pharmaceutical-grade peptides?
          </p>
          <button className="px-8 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg">
            Apply for Provider Access →
          </button>
        </motion.div>
      </div>
    </section>
  )
}