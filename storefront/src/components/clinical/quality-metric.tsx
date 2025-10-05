import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, Microscope, Activity, ClipboardCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface QualityMetricProps {
  type: "potency" | "sterility" | "endotoxins" | "ph"
  value: string
  description: string
  standard?: string
  className?: string
}

const metricConfig = {
  potency: {
    icon: FlaskConical,
    label: "Potency Testing",
    color: "text-blue-600",
  },
  sterility: {
    icon: Microscope,
    label: "Sterility Testing",
    color: "text-green-600",
  },
  endotoxins: {
    icon: Activity,
    label: "Endotoxin Testing",
    color: "text-purple-600",
  },
  ph: {
    icon: ClipboardCheck,
    label: "pH Balance",
    color: "text-teal-600",
  },
}

export function QualityMetric({
  type,
  value,
  description,
  standard,
  className,
}: QualityMetricProps) {
  const config = metricConfig[type]
  const Icon = config.icon

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn("p-3 rounded-lg bg-grey-5", config.color)}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-grey-90">{config.label}</h4>
              <Badge variant="metric">{value}</Badge>
            </div>
            <p className="text-sm text-grey-70 leading-relaxed mb-2">
              {description}
            </p>
            {standard && (
              <p className="text-xs text-grey-60 font-semibold">
                Standard: {standard}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
