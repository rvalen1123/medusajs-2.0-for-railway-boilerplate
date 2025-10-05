import { Badge } from "@/components/ui/badge"
import {
  Shield,
  FlaskConical,
  BadgeCheck,
  ClipboardCheck,
  Truck,
  Microscope
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TrustBadgeProps {
  type: "purity" | "tested" | "cgmp" | "shipping" | "usp" | "sterile"
  value?: string
  className?: string
}

const badgeConfig = {
  purity: {
    icon: BadgeCheck,
    label: "Verified Purity",
    variant: "verified" as const,
  },
  tested: {
    icon: FlaskConical,
    label: "Third-Party Tested",
    variant: "verified" as const,
  },
  cgmp: {
    icon: Shield,
    label: "cGMP Compliant",
    variant: "clinical" as const,
  },
  shipping: {
    icon: Truck,
    label: "Same-Day Shipping",
    variant: "default" as const,
  },
  usp: {
    icon: ClipboardCheck,
    label: "USP Standards",
    variant: "clinical" as const,
  },
  sterile: {
    icon: Microscope,
    label: "Sterility Tested",
    variant: "verified" as const,
  },
}

export function TrustBadge({ type, value, className }: TrustBadgeProps) {
  const config = badgeConfig[type]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={cn("gap-1.5", className)}>
      <Icon className="h-3 w-3" />
      <span>{value || config.label}</span>
    </Badge>
  )
}
