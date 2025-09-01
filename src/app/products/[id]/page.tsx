// src/app/products/[id]/page.tsx
import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import ProductCategoryDisplay from '../../components/ProductCategoryDisplay'
import ProductClient from './ProductClient'

// 1. Update the interface to use Promise for params
interface ProductPageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { flavors: true },
  })

  if (!product) notFound()
  return product
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 2. Await the params object before destructuring
  const { id } = await params
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
