# Premier Bio Labs - Modern Component Library Guide

## Overview

This document provides a complete guide to the modernized component library for Premier Bio Labs. The library is built on shadcn/ui principles with a clinical medical aesthetic.

---

## 🎨 Design Principles

### Clinical Sophistication
- **Clean & Minimal**: White backgrounds, subtle borders, generous whitespace
- **Professional Typography**: Inter font family, clear hierarchy
- **Subtle Animations**: 200-300ms transitions, small movements (4px lifts)
- **Monochrome Icons**: Lucide React for clean, professional iconography
- **Data-Driven**: Trust signals, metrics, and certifications throughout

### Color System (Clinical Authority)
```css
/* Primary Colors */
--brand-primary: #1A365D;        /* Deep navy */
--brand-secondary: #2D6A4F;       /* Deep teal */

/* Greys (0-90 scale) */
--grey-0: #FFFFFF;
--grey-5: #F8F9FA;
--grey-10: #F3F4F6;
--grey-20: #E9ECEF;
--grey-30: #DEE2E6;
--grey-40: #CED4DA;
--grey-50: #ADB5BD;
--grey-60: #6C757D;
--grey-70: #495057;
--grey-80: #343A40;
--grey-90: #212529;
```

---

## 📦 Component Library

### Base UI Components (`/src/components/ui/`)

#### Button
Professional button component with multiple variants.

**Import:**
```tsx
import { Button } from "@/components/ui/button"
```

**Variants:**
- `default` - Grey-90 background (most common)
- `primary` - Brand primary navy
- `outline` - Border-only for secondary actions
- `ghost` - Transparent for subtle actions
- `link` - Text link style

**Sizes:**
- `default` - h-12 (48px)
- `sm` - h-10 (40px)
- `lg` - h-14 (56px)
- `icon` - Square 40px

**Example:**
```tsx
<Button variant="primary" size="lg">
  Browse Catalog
</Button>

<Button variant="outline">
  Request Access
</Button>
```

---

#### Card Family
Container components for content blocks.

**Import:**
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
```

**Example:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>HPLC-Verified Potency</CardTitle>
    <CardDescription>Third-party testing</CardDescription>
  </CardHeader>
  <CardContent>
    <p>High-performance liquid chromatography analysis...</p>
  </CardContent>
  <CardFooter>
    <Button>View Protocol</Button>
  </CardFooter>
</Card>
```

---

#### Badge
Small labels for status, metrics, and categories.

**Import:**
```tsx
import { Badge } from "@/components/ui/badge"
```

**Variants:**
- `default` - Grey background
- `verified` - Green for trust signals
- `metric` - Blue for data points
- `category` - Dark for classifications
- `clinical` - Brand primary for certifications
- `warning` - Yellow for alerts
- `outline` - Border-only

**Example:**
```tsx
<Badge variant="verified">99.4% Pure</Badge>
<Badge variant="clinical">cGMP Certified</Badge>
<Badge variant="metric">USP <797></Badge>
```

---

#### Accordion
Collapsible content sections using Radix UI.

**Import:**
```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion"
```

**Example:**
```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Are peptides safe?</AccordionTrigger>
    <AccordionContent>
      Peptides are typically safe when properly administered...
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### Clinical Components (`/src/components/clinical/`)

#### TrustBadge
Pre-configured badges for medical certifications and quality indicators.

**Import:**
```tsx
import { TrustBadge } from "@/components/clinical/trust-badge"
```

**Types:**
- `purity` - Verified purity percentage (BadgeCheck icon)
- `tested` - Third-party testing (FlaskConical icon)
- `cgmp` - cGMP compliance (Shield icon)
- `shipping` - Shipping speed (Truck icon)
- `usp` - USP standards (ClipboardCheck icon)
- `sterile` - Sterility testing (Microscope icon)

**Example:**
```tsx
{/* With custom value */}
<TrustBadge type="purity" value="99.4% Pure" />

{/* Default label */}
<TrustBadge type="cgmp" />
<TrustBadge type="tested" />
<TrustBadge type="shipping" />
```

---

#### PeptideCard
Professional product card with trust signals and animations.

**Import:**
```tsx
import { PeptideCard } from "@/components/clinical/peptide-card"
```

**Props:**
```tsx
interface PeptideCardProps {
  peptide: {
    id: string
    name: string
    handle: string
    description?: string
    purity?: number
    thumbnail?: string
    price?: {
      calculated_amount: number
      currency_code: string
    }
    metadata?: {
      batch?: string
      tested?: boolean
      cgmp?: boolean
      coa_url?: string
    }
  }
  region: {
    currency_code: string
  }
}
```

**Features:**
- Framer Motion hover animation (lifts 4px)
- Automatic purity badge overlay
- Trust signal badges
- COA download link
- Professional typography

**Example:**
```tsx
<PeptideCard
  peptide={product}
  region={region}
/>
```

---

#### QualityMetric
Data visualization cards for testing protocols.

**Import:**
```tsx
import { QualityMetric } from "@/components/clinical/quality-metric"
```

**Types:**
- `potency` - HPLC testing (FlaskConical icon, blue)
- `sterility` - Sterility assurance (Microscope icon, green)
- `endotoxins` - Endotoxin testing (Activity icon, purple)
- `ph` - pH balance (ClipboardCheck icon, teal)

**Example:**
```tsx
<QualityMetric
  type="potency"
  value="99.4%"
  description="High-performance liquid chromatography analysis confirms peptide identity and concentration for every production batch."
  standard="HPLC-Verified Testing"
/>
```

---

## 🎬 Animation Patterns

### Framer Motion Setup

**Import:**
```tsx
import { motion } from "framer-motion"
```

### Card Hover Animation (Recommended)
```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
  className="bg-white border border-grey-20 rounded-lg p-6"
>
  {/* Card content */}
</motion.div>
```

### Staggered List Reveal
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
}

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Scroll-Triggered Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {/* Section content */}
</motion.div>
```

---

## 🎯 Icon System (Lucide React)

### Common Clinical Icons

**Import:**
```tsx
import {
  FlaskConical,      // Laboratory/testing
  Microscope,        // Research/analysis
  Shield,            // Safety/certification
  BadgeCheck,        // Verification
  ClipboardCheck,    // Documentation/COA
  FileText,          // Documents
  Activity,          // Health metrics
  Users,             // Physicians/customers
  Truck,             // Shipping
  ChevronDown,       // Expandable sections
  ArrowRight,        // Forward navigation
} from "lucide-react"
```

### Usage
```tsx
import { FlaskConical } from "lucide-react"

<FlaskConical className="h-5 w-5 text-grey-60" />
```

**Size Guidelines:**
- Small: `h-4 w-4` (16px)
- Default: `h-5 w-5` (20px)
- Large: `h-6 w-6` (24px)

---

## 🛠️ Utility Functions

### cn() - Class Name Merger
Combines clsx and tailwind-merge for proper Tailwind precedence.

**Import:**
```tsx
import { cn } from "@/lib/utils"
```

**Usage:**
```tsx
<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className  // Props className override
)} />
```

### Currency Formatter
```tsx
import { formatCurrency } from "@/lib/utils"

formatCurrency(9900) // "$99.00"
```

### Purity Formatter
```tsx
import { formatPurity } from "@/lib/utils"

formatPurity(0.994) // "99.40%"
```

---

## 📱 Responsive Patterns

### Mobile-First Approach
```tsx
<div className="
  grid
  grid-cols-1        /* Mobile: 1 column */
  md:grid-cols-2     /* Tablet: 2 columns */
  lg:grid-cols-3     /* Desktop: 3 columns */
  gap-6
">
```

### Breakpoints (Tailwind)
- `sm`: 640px (small tablets)
- `md`: 768px (tablets)
- `lg`: 1024px (small desktop)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (large desktop)

---

## ✅ Component Checklist

When creating new components, ensure:

- [ ] Use clinical color palette (grey-XX, brand-primary)
- [ ] Typography follows hierarchy (text-xl, font-bold)
- [ ] Animations are subtle (200-300ms, small movements)
- [ ] Icons are from Lucide React (monochrome)
- [ ] Buttons use shadcn Button component
- [ ] Cards have hover states (shadow-lg)
- [ ] Mobile-responsive (test sm/md/lg)
- [ ] Accessible (ARIA labels, focus states)
- [ ] TypeScript typed (interfaces for props)

---

## 🚀 Quick Start Examples

### Professional Product Card
```tsx
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrustBadge } from "@/components/clinical/trust-badge"

<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
  className="bg-white border border-grey-20 rounded-lg overflow-hidden"
>
  <div className="p-6">
    <h3 className="text-xl font-bold text-grey-90">BPC-157</h3>
    <div className="flex gap-2 mt-4">
      <TrustBadge type="purity" value="99.4% Pure" />
      <TrustBadge type="tested" />
    </div>
    <Button variant="primary" className="mt-6 w-full">
      Add to Cart
    </Button>
  </div>
</motion.div>
```

### Trust Section
```tsx
<section className="py-24 bg-grey-5">
  <div className="content-container">
    <h2 className="text-4xl font-bold text-grey-90 text-center mb-12">
      Clinical-Grade Quality
    </h2>
    <div className="grid md:grid-cols-4 gap-4">
      <TrustBadge type="purity" value="99.4%" />
      <TrustBadge type="cgmp" />
      <TrustBadge type="tested" />
      <TrustBadge type="shipping" />
    </div>
  </div>
</section>
```

---

## 📚 Additional Resources

- **Lucide Icons**: [https://lucide.dev](https://lucide.dev)
- **Framer Motion**: [https://www.framer.com/motion](https://www.framer.com/motion)
- **Radix UI**: [https://www.radix-ui.com](https://www.radix-ui.com)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)

---

## 🎯 Design System Tokens

All design tokens are defined in:
- **Colors**: `storefront/tailwind.config.js` (theme.extend.colors)
- **Spacing**: 8px base unit system
- **Typography**: `storefront/src/styles/globals.css`
- **Animations**: `storefront/tailwind.config.js` (theme.extend.animation)

---

This component library provides everything needed to build professional, medical-grade interfaces for Premier Bio Labs. All components follow clinical design principles and are production-ready.
