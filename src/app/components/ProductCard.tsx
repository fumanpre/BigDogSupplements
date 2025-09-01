import { Product, Flavor } from '@prisma/client'
import Link from 'next/link'
import PriceTag from './PriceTag'
import Image from 'next/image'

interface ProductCardProps {
  product: Product & { flavors: Flavor[] }
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7

  // Pick the most popular flavor that has a valid image
  const topFlavor = product.flavors
    .filter((f) => f.imageUrlProduct)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))[0]

  const price = topFlavor?.price ?? 0
  const salePrice = topFlavor?.salePrice ?? 0
  const hasSale = salePrice > 0
  const discountPercent = hasSale
    ? Math.round(((price - salePrice) / price) * 100)
    : 0

  return (
    <Link
      href={'/products/' + product.id}
      className="card w-full bg-base-100 transform transition-transform duration-300 hover:scale-103 group"
    >
      <figure className="relative">
        <Image
          src={topFlavor?.imageUrlProduct || '/placeholder.png'}
          alt={product.name}
          width={800}
          height={400}
          className="h-52 sm:h-52 md:h-60 lg:h-72 xl:h-80 w-auto object-cover"
        />

        {isNew && (
          <div className="absolute top-2 left-2 badge bg-green-500 text-white text-xs font-bold px-2 py-1">
            New
          </div>
        )}
        {hasSale && (
          <div className="absolute top-2 right-2 badge bg-red-500 text-white text-xs font-bold px-2 py-1">
            -{discountPercent}% OFF
          </div>
        )}
      </figure>
      <div className="card-body bg-white rounded-b-xl">
        <div className="flex flex-col">
          {hasSale && (
            <span className="text-gray-500 font-light line-through text-md md:text-lg lg:text-xl">
              CAD {price}
            </span>
          )}
          <PriceTag price={hasSale ? salePrice : price} />
        </div>
        <h2 className="card-title text-sm md:text-lg lg:text-xl font-bold group-hover:underline">
          {product.name}
        </h2>
        <h3 className="text-xs md:text-sm underline lg:no-underline font-semibold group-hover:underline">
          {product.manufacturer}
        </h3>
      </div>
    </Link>
  )
}
