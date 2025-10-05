import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

export default function ImageGalleryTiered({ images }: ImageGalleryProps) {
  if (!images || images.length === 0) {
    return <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 h-96 bg-gray-100" />
  }
  
  // Ensure we have at least 4 images (repeat if needed)
  const displayImages = [...images]
  while (displayImages.length < 4) {
    displayImages.push(...images)
  }
  
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
      {/* First image - spans 2 rows on desktop, hidden on mobile */}
      <div className="row-span-2 aspect-[3/4] size-full rounded-lg overflow-hidden max-lg:hidden">
        <Image
          src={displayImages[0].url}
          alt={displayImages[0].alt || 'Product image'}
          width={800}
          height={1067}
          className="size-full object-cover"
          priority
        />
      </div>
      
      {/* Second image - col 2, row 1, hidden on mobile */}
      <div className="col-start-2 aspect-[3/2] size-full rounded-lg overflow-hidden max-lg:hidden">
        <Image
          src={displayImages[1].url}
          alt={displayImages[1].alt || 'Product image'}
          width={600}
          height={400}
          className="size-full object-cover"
        />
      </div>
      
      {/* Third image - col 2, row 2, hidden on mobile */}
      <div className="col-start-2 row-start-2 aspect-[3/2] size-full rounded-lg overflow-hidden max-lg:hidden">
        <Image
          src={displayImages[2].url}
          alt={displayImages[2].alt || 'Product image'}
          width={600}
          height={400}
          className="size-full object-cover"
        />
      </div>
      
      {/* Fourth image - col 3, spans 2 rows, shown on mobile */}
      <div className="row-span-2 aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4] overflow-hidden">
        <Image
          src={displayImages[3].url}
          alt={displayImages[3].alt || 'Product image'}
          width={800}
          height={1000}
          className="size-full object-cover"
          priority
        />
      </div>
    </div>
  )
}

