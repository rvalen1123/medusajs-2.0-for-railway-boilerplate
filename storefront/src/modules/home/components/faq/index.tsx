/**
 * FAQ Section - Ultra-Modern Accordion
 * Smooth animations and modern design
 */

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "What makes your peptides different from others?",
      answer:
        "Our peptides are research-grade with third-party verification for every batch. We provide complete COAs (Certificates of Analysis) with HPLC purity testing, ensuring >98% purity. All peptides are manufactured in cGMP facilities and meet USP sterility requirements.",
    },
    {
      question: "Are your peptides safe for clinical use?",
      answer:
        "Yes, all our peptides are manufactured in FDA-registered, cGMP-compliant facilities. Each batch undergoes rigorous testing including sterility testing (USP <71>), endotoxin testing (USP <85>), and HPLC purity analysis. We provide full documentation including COAs and safety data sheets.",
    },
    {
      question: "How do I choose the right peptide for my patients?",
      answer:
        "We provide detailed clinical guides for each peptide category. Our medical advisory team is available to assist with protocol selection based on patient goals and medical history. We recommend starting with our clinical application categories: Weight Management, Sexual Health, Recovery, or Muscle Growth.",
    },
    {
      question: "What is your shipping and storage policy?",
      answer:
        "We offer same-day shipping for orders placed before 2 PM EST. All peptides are shipped with temperature-controlled packaging and ice packs. Products should be stored at 2-8°C (refrigerated) upon arrival. We provide detailed storage and reconstitution instructions with every order.",
    },
    {
      question: "Do you provide support for healthcare providers?",
      answer:
        "Yes, we offer dedicated support for medical professionals including dosing protocols, patient education materials, and clinical consultation. Our team includes licensed pharmacists and medical advisors available for protocol guidance.",
    },
    {
      question: "What testing certifications do you provide?",
      answer:
        "Every batch includes: HPLC purity testing (>98% verification), Mass Spectrometry analysis, Endotoxin testing (USP <85>), Sterility testing (USP <71>), and pH balance verification. Full COAs are available for download with every order.",
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-white" aria-label="Frequently asked questions">
      <div className="content-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="h-8 w-8 text-brand-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-grey-90 mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-grey-60 max-w-2xl mx-auto">
            Everything you need to know about our research-grade peptides and services
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-4xl mx-auto space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-grey-20 rounded-2xl overflow-hidden bg-white hover:border-brand-accent/30 transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4 group"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-grey-90 group-hover:text-brand-primary transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-grey-60 group-hover:text-brand-primary transition-colors" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <div className="pt-4 border-t border-grey-15">
                        <p className="text-grey-70 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-grey-70 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-grey-10 hover:bg-brand-primary hover:text-white text-grey-90 font-semibold rounded-xl transition-all duration-300 hover:shadow-modern"
          >
            Contact Our Team
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
