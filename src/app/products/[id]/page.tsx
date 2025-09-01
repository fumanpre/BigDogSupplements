import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import ProductCategoryDisplay from '../../components/ProductCategoryDisplay'
import ProductClient from './ProductClient' // client component

interface Params {
  id: string
}

interface ProductPageProps {
  params: Params
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { flavors: true },
  })

  if (!product) notFound()
  return product
}

// Use destructuring of params with type annotation
export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = await getProduct(id)

  // Sort flavors by popularity
  const sortedFlavors = product.flavors.sort(
    (a, b) => (b.popularity || 0) - (a.popularity || 0)
  )

  return (
    <>
      {/* Product Details */}
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
