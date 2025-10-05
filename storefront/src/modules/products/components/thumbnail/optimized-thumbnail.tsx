import { Container, clx } from "@medusajs/ui"
import React from "react"
import { LazyImage } from "@/components/ui/optimized-image"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

type OptimizedThumbnailProps = {
  thumbnail?: string | null
  images?: any[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  priority?: boolean
  "data-testid"?: string
}

const OptimizedThumbnail: React.FC<OptimizedThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  priority = false,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden p-4 bg-ui-bg-subtle shadow-elevation-card-rest rounded-large group-hover:shadow-elevation-card-hover transition-shadow ease-in-out duration-150",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} priority={priority} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
  priority,
}: Pick<OptimizedThumbnailProps, "size" | "priority"> & { image?: string }) => {
  if (!image) {
    return (
      <div className="w-full h-full absolute inset-0 flex items-center justify-center">
        <PlaceholderImage size={size === "small" ? 16 : 24} />
      </div>
    )
  }

  const sizes = {
    small: "(max-width: 576px) 180px, 180px",
    medium: "(max-width: 576px) 280px, 290px",
    large: "(max-width: 576px) 360px, 440px",
    full: "(max-width: 576px) 100vw, (max-width: 768px) 50vw, 33vw",
    square: "(max-width: 576px) 280px, (max-width: 768px) 360px, 480px",
  }

  return (
    <LazyImage
      src={image}
      alt="Product thumbnail"
      fill
      quality={75}
      sizes={sizes[size || "small"]}
      className="absolute inset-0 object-cover object-center"
      priority={priority}
      aspectRatio={size === "square" ? "1:1" : "auto"}
    />
  )
}

export default OptimizedThumbnail