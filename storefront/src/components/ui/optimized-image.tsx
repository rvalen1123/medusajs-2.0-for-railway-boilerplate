/**
 * Optimized Image Component
 * Handles lazy loading, WebP format, and responsive images
 */

"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onLoad?: () => void
  aspectRatio?: "1:1" | "4:3" | "16:9" | "21:9" | "auto"
}

const aspectRatioClasses = {
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "21:9": "aspect-[21/9]",
  "auto": "",
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=",
  onLoad,
  aspectRatio = "auto",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Preload image for better performance
    if (priority && src) {
      const img = new window.Image()
      img.src = src
    }
  }, [src, priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
  }

  // Fallback for failed images
  if (hasError) {
    return (
      <div
        className={cn(
          "bg-grey-10 flex items-center justify-center text-grey-50",
          aspectRatioClasses[aspectRatio],
          className
        )}
        style={!fill && width && height ? { width, height } : undefined}
      >
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    )
  }

  const imageProps = {
    src,
    alt,
    quality,
    onLoad: handleLoad,
    onError: handleError,
    className: cn(
      "transition-opacity duration-300",
      isLoaded ? "opacity-100" : "opacity-0",
      className
    ),
    ...(placeholder === "blur" && blurDataURL && { placeholder, blurDataURL }),
    ...(priority && { priority }),
    ...(sizes && { sizes }),
  }

  if (fill) {
    return (
      <div className={cn("relative", aspectRatioClasses[aspectRatio], className)}>
        <Image {...imageProps} fill style={{ objectFit: "cover" }} />
      </div>
    )
  }

  if (!width || !height) {
    console.warn("OptimizedImage: width and height are required when fill is false")
    return null
  }

  return <Image {...imageProps} width={width} height={height} />
}

/**
 * Lazy Image Component - Wrapper with Intersection Observer
 */
export function LazyImage(props: OptimizedImageProps) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    )

    const element = document.getElementById(`lazy-image-${props.src}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [props.src])

  return (
    <div id={`lazy-image-${props.src}`} className={props.className}>
      {isInView ? (
        <OptimizedImage {...props} />
      ) : (
        <div
          className={cn(
            "bg-grey-10 animate-pulse",
            aspectRatioClasses[props.aspectRatio || "auto"],
            props.className
          )}
          style={
            !props.fill && props.width && props.height
              ? { width: props.width, height: props.height }
              : undefined
          }
        />
      )}
    </div>
  )
}

/**
 * Progressive Image Component - Shows low quality then high quality
 */
export function ProgressiveImage({
  lowQualitySrc,
  highQualitySrc,
  ...props
}: OptimizedImageProps & {
  lowQualitySrc?: string
  highQualitySrc: string
}) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || props.src)
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.src = highQualitySrc
    img.onload = () => {
      setCurrentSrc(highQualitySrc)
      setIsHighQualityLoaded(true)
    }
  }, [highQualitySrc])

  return (
    <OptimizedImage
      {...props}
      src={currentSrc}
      className={cn(
        props.className,
        !isHighQualityLoaded && "blur-sm"
      )}
    />
  )
}