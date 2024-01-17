import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                success: "bg-emrald-700 text-secondary border-emrald-800",
                warning: "bg-yellow-100/80 text-yellow-primary border-yellow-30",
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string
}

const iconMap = {
    success: CheckCircleIcon,
    warning: AlertTriangle
}

export const Banner = ({
    label,
    variant
}: BannerProps) => {
    const Icon = iconMap[variant || "warning"]
    return (
        <div
            className={cn(
                bannerVariants({ variant })
            )}
        >
            <Icon
                className="h-4 w-4 mr-2"
            />
            {label}
        </div>
    )
}