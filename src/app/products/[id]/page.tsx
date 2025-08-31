import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import PriceTag from '@/app/components/PriceTag'
import { Metadata } from 'next'
import { cache } from 'react'
import ProductCategoryDisplay from '../../components/ProductCategoryDisplay'
import { Flavor, Product } from '@prisma/client'

interface ProductPageProps {
  params: { id: string }
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { flavors: true },
  })

  if (!product) notFound()
  return product
})

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id)

  const topFlavor = product.flavors
    .filter((f) => f.imageUrlProduct)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))[0]

  return {
    title: `${product.name} - Big Dog Supplements`,
    description: product.description || '',
    openGraph: {
      images: [{ url: topFlavor?.imageUrlProduct || '/placeholder.png' }],
    },
  }
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id)

  // Pick top flavor (most popular with image)
  const topFlavor = product.flavors
    .filter((f) => f.imageUrlProduct)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))[0]

  const price = topFlavor?.price ?? 0
  const salePrice = topFlavor?.salePrice ?? 0
  const hasSale = salePrice > 0
  const discountPercent = hasSale
    ? Math.round(((price - salePrice) / price) * 100)
    : 0

  // Flavors for dropdown
  const flavors = product.flavors.map((f) => f.name)

  return (
    <>
      <div className="flex justify-center pt-10 flex-col lg:flex-row gap-5">
        {/* Product Image */}
        <Image
          src={topFlavor?.imageUrlProduct || '/placeholder.png'}
          alt={product.name}
          width={500}
          height={500}
          className="w-70 h-auto m-auto sm:w-75 lg:m-0 lg:w-95 xl:w-120 rounded-lg"
          priority
        />

        {/* Product Details */}
        <div className="mx-3">
          <h1 className="text-2xl sm:text-3xl xl:text-5xl font-bold">
            {product.name.toUpperCase()}
          </h1>
          <h3 className="py-3 underline">{product.manufacturer}</h3>

          {/* Price */}
          {hasSale ? (
            <div className="flex flex-row items-baseline gap-3">
              <PriceTag price={salePrice} />
              <span className="text-gray-500 font-light line-through text-md md:text-lg lg:text-xl">
                CAD {price}
              </span>
            </div>
          ) : (
            <PriceTag price={price} styleClassName="mt-4" />
          )}

          {/* Highlighted Text */}
          <div className="my-4">
            <span className="bg-green-100 text-green-800 font-bold text-md sm:text-lg px-3 py-1 rounded shadow-md">
              <span className="mr-2">✔</span>Lowest Price Promised
            </span>
            <div className="w-full border-t border-gray-300 mt-2"></div>
          </div>

          {/* Quantity & Flavor */}
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-md sm:text-lg lg:text-xl">
                Quantity
              </span>
              <select className="border rounded-md px-5 py-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-md sm:text-lg lg:text-xl">
                Flavor
              </span>
              <select className="border rounded-md px-3 py-1">
                {flavors.map((flavor) => (
                  <option key={flavor} value={flavor}>
                    {flavor}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full border-t border-gray-300 my-4"></div>

          {/* Add to Cart */}
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-3 w-full rounded shadow-md transition-all">
            Add to Cart
          </button>

          <p className="text-md sm:text-lg lg:text-xl text-gray-600 mt-2">
            Free Shipping on orders over $150
          </p>
        </div>
      </div>

      {/* Similar & Manufacturer Products */}
      <div>
        <ProductCategoryDisplay
          className="p-4"
          categoryName="Similar Products"
          productItself={product}
        />
        <ProductCategoryDisplay
          className="p-4"
          categoryName={product.manufacturer}
          productItself={product}
        />
      </div>
    </>
  )
}
