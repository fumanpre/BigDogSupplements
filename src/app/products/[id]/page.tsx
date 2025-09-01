import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import PriceTag from '@/app/components/PriceTag'
import ProductCategoryDisplay from '../../components/ProductCategoryDisplay'
import ProductClient from './ProductClient' // new client component
import { Flavor } from '@prisma/client'

interface ProductPageProps {
  params: { id: string }
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { flavors: true },
  })

  if (!product) notFound()
  return product
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id)

  // Sort flavors by popularity first
  const sortedFlavors = product.flavors.sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  )

  return (
    <>
      {/* Product Details */}
      {/* Client-side Flavor & Cart logic */}
      <ProductClient product={product} flavors={sortedFlavors} />

      {/* Similar & Manufacturer Products */}
      <div className="py-6 sm:py-10 lg:py-20">
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
