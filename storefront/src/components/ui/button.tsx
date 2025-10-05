import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-grey-90 text-white hover:bg-grey-80 shadow-sm hover:shadow-md focus-visible:ring-grey-60 rounded-xl",
        outline: "border-2 border-grey-30 bg-transparent text-grey-90 hover:bg-grey-5 hover:border-grey-40 focus-visible:ring-grey-60 rounded-xl",
        ghost: "hover:bg-grey-10 hover:text-grey-90 focus-visible:ring-grey-60 rounded-lg",
        link: "text-grey-90 underline-offset-4 hover:underline",
        primary: "bg-brand-primary text-white hover:bg-brand-primary-hover shadow-modern hover:shadow-modern-lg focus-visible:ring-brand-primary hover:-translate-y-0.5 rounded-xl",
        secondary: "bg-brand-accent text-white hover:bg-brand-accent-hover shadow-sm hover:shadow-md focus-visible:ring-brand-accent hover:-translate-y-0.5 rounded-xl",
        accent: "bg-gradient-to-r from-brand-accent to-brand-accent-light text-white hover:opacity-90 shadow-glow hover:shadow-glow-lg focus-visible:ring-brand-accent rounded-xl",
      },
      size: {
        default: "h-12 px-8 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-10 py-4 text-lg",
        xl: "h-16 px-12 py-5 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
