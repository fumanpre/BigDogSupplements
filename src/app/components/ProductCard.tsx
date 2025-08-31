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

  // Pick the most popular flavor
  const topFlavor = product.flavors.sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  )[0]

  const price = topFlavor?.price || 0
  const salePrice = topFlavor?.salePrice
  const hasSale = salePrice !== undefined && salePrice > 0
  const discountPercent = hasSale
    ? Math.round(((price - (salePrice || 0)) / price) * 100)
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
          <div className="absolute top-2 right-2 badge bg-green-500 text-white text-xs font-bold px-2 py-1">
            New
          </div>
        )}
        {hasSale && (
          <div className="absolute top-2 left-2 badge bg-red-500 text-white text-xs font-bold px-2 py-1">
            -{discountPercent}%
          </div>
        )}
      </figure>
      <div className="card-body bg-white rounded-b-xl">
        {hasSale ? (
          <div className="flex flex-col">
            <span className="text-gray-500 font-light line-through text-md md:text-lg lg:text-xl">
              CAD {price}
            </span>
            <PriceTag price={salePrice || 0} />
          </div>
        ) : (
          <PriceTag price={price} />
        )}
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
