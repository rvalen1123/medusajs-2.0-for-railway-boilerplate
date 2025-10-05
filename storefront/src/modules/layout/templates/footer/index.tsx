/**
 * Footer - Ultra-Modern Layout
 * Multi-column design with modern styling
 */

"use client"

import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock, Shield, CreditCard, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/store" },
      { name: "Weight Management", href: "/store?category=weight-loss" },
      { name: "Sexual Health", href: "/store?category=sexual-health" },
      { name: "Recovery & Healing", href: "/store?category=recovery" },
      { name: "Muscle Growth", href: "/store?category=muscle" },
      { name: "Best Sellers", href: "/store?sort=popular" },
      { name: "New Arrivals", href: "/store?sort=newest" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Quality Standards", href: "/quality" },
      { name: "Certifications", href: "/certifications" },
      { name: "Medical Advisory Board", href: "/medical-advisory" },
      { name: "Research & Studies", href: "/research" },
      { name: "Careers", href: "/careers" },
      { name: "Press & Media", href: "/press" },
    ],
    support: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "#faq" },
      { name: "Shipping Information", href: "/shipping" },
      { name: "Returns & Refunds", href: "/returns" },
      { name: "Provider Resources", href: "/resources" },
      { name: "Dosing Guidelines", href: "/dosing" },
      { name: "Storage Instructions", href: "/storage" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Refund Policy", href: "/refund-policy" },
      { name: "Medical Disclaimer", href: "/disclaimer" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "HIPAA Compliance", href: "/hipaa" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/premierbiolabs", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/premierbiolabs", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/premierbiolabs", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/premierbiolabs", label: "LinkedIn" },
  ]

  const paymentMethods = [
    "Visa", "Mastercard", "American Express", "Discover", "PayPal", "Wire Transfer"
  ]

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }

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
    <footer className="bg-gradient-to-b from-white to-grey-5 border-t border-grey-20">
      <div className="content-container">
        {/* Main Footer Content */}
        {/* Newsletter Section */}
        <motion.div
          className="py-12 border-b border-grey-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-grey-90 mb-3">
              Stay Updated on Clinical Research
            </h3>
            <p className="text-grey-70 mb-6">
              Get the latest peptide research, clinical studies, and exclusive offers for medical professionals.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email"
                className="flex-1 px-4 py-3 rounded-lg border border-grey-30 focus:border-brand-primary focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="text-xs text-grey-60 mt-4">
              For licensed medical professionals only. We respect your privacy and comply with HIPAA regulations.
            </p>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          className="py-16 lg:py-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Brand Column */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <LocalizedClientLink href="/" className="inline-block mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                  PremierBioLabs
                </h3>
              </LocalizedClientLink>
              <p className="text-grey-70 mb-6 leading-relaxed">
                Research-grade peptides for medical professionals. Third-party tested,
                batch-verified purity, and same-day shipping. Trusted by over 1,500 healthcare providers nationwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-grey-70">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href="mailto:support@premierbiolabs.com" className="hover:text-brand-primary transition-colors text-sm">
                    support@premierbiolabs.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-grey-70">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href="tel:1-800-737-8433" className="hover:text-brand-primary transition-colors text-sm">
                    1-800-PEPTIDE (1-800-737-8433)
                  </a>
                </div>
                <div className="flex items-center gap-3 text-grey-70">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">Mon-Fri 9AM-5PM PST</span>
                </div>
                <div className="flex items-start gap-3 text-grey-70">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    123 Medical Plaza, Suite 100<br />
                    San Diego, CA 92121
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary-light rounded-lg">
                <Shield className="h-5 w-5 text-brand-primary" />
                <span className="text-sm font-medium text-grey-90">Medical Professional Use Only</span>
              </div>
            </motion.div>

            {/* Shop Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-grey-90 uppercase tracking-wider mb-6">
                Shop
              </h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-grey-70 hover:text-brand-primary transition-colors text-sm"
                    >
                      {link.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-grey-90 uppercase tracking-wider mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-grey-70 hover:text-brand-primary transition-colors text-sm"
                    >
                      {link.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-grey-90 uppercase tracking-wider mb-6">
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-grey-70 hover:text-brand-primary transition-colors text-sm"
                    >
                      {link.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="py-8 border-t border-grey-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col gap-8">
            {/* Legal Links and Social */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="text-sm text-grey-60">
                © {new Date().getFullYear()} PremierBioLabs. All rights reserved.
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {footerLinks.legal.map((link) => (
                  <LocalizedClientLink
                    key={link.name}
                    href={link.href}
                    className="text-sm text-grey-60 hover:text-brand-primary transition-colors"
                  >
                    {link.name}
                  </LocalizedClientLink>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-grey-10 hover:bg-brand-primary text-grey-70 hover:text-white flex items-center justify-center transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-grey-60">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Secure Payment Methods</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-3 py-2 bg-white border border-grey-20 rounded-md text-xs font-medium text-grey-70"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges Row */}
        <motion.div
          className="py-8 border-t border-grey-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-grey-60">
              <Shield className="h-4 w-4 text-brand-primary" />
              <span className="text-xs font-medium">FDA Registered Facility</span>
            </div>
            <div className="flex items-center gap-2 text-grey-60">
              <Shield className="h-4 w-4 text-brand-primary" />
              <span className="text-xs font-medium">cGMP Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-grey-60">
              <Shield className="h-4 w-4 text-brand-primary" />
              <span className="text-xs font-medium">USP Standards</span>
            </div>
            <div className="flex items-center gap-2 text-grey-60">
              <Shield className="h-4 w-4 text-brand-primary" />
              <span className="text-xs font-medium">Third-Party Tested</span>
            </div>
            <div className="flex items-center gap-2 text-grey-60">
              <Shield className="h-4 w-4 text-brand-primary" />
              <span className="text-xs font-medium">ISO 9001:2015 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-grey-60">
              <Shield className="h-4 w-4 text-brand-primary" />
              <span className="text-xs font-medium">&gt;98% Purity Guaranteed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
