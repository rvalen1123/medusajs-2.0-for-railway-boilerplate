import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-grey-10 text-grey-70 border border-grey-20",
        verified: "bg-green-50 text-green-700 border border-green-200",
        metric: "bg-blue-50 text-blue-700 border border-blue-200",
        category: "bg-grey-90 text-white",
        clinical: "bg-brand-primary text-white",
        warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
        outline: "border-2 border-grey-30 bg-white text-grey-90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
