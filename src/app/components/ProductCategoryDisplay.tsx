import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import Image from 'next/image'
import { Product, Flavor } from '@prisma/client'

interface ProductCategoryDisplayProps {
  className?: string
  categoryName: string
  productItself?: Product
}

export default async function ProductCategoryDisplay({
  className,
  categoryName,
  productItself,
}: ProductCategoryDisplayProps) {
  let products: (Product & { flavors: Flavor[] })[] = []

  if (categoryName === 'Best Sellers') {
    const allProducts = await prisma.product.findMany({
      include: { flavors: true },
    })

    products = allProducts
      .sort((a, b) => {
        const maxA = Math.max(...a.flavors.map((f) => f.popularity || 0))
        const maxB = Math.max(...b.flavors.map((f) => f.popularity || 0))
        return maxB - maxA
      })
      .slice(0, 4)
  } else if (categoryName === 'Sale') {
    const allProducts = await prisma.product.findMany({
      include: { flavors: true },
      where: {
        flavors: { some: { salePrice: { gt: 0 } } },
      },
    })

    // Filter flavors with salePrice > 0 and sort products by max salePrice
    products = allProducts
      .map((p) => {
        const saleFlavors = p.flavors.filter(
          (f) => f.salePrice && f.salePrice > 0
        )
        return {
          ...p,
          flavors: saleFlavors,
          maxSalePrice: Math.max(...saleFlavors.map((f) => f.salePrice!)),
        }
      })
      .sort((a, b) => b.maxSalePrice - a.maxSalePrice)
      .slice(0, 4)
  }

  if (products.length === 0) return null

  return (
    <div className={className}>
      <div className="text-center pb-4">
        <span className="text-2xl xl:text-3xl underline font-semibold">
          {categoryName}
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] no-scrollbar">
        {products.map((product) => {
          const topFlavor =
            categoryName === 'Sale'
              ? product.flavors.sort((a, b) => b.salePrice! - a.salePrice!)[0]
              : product.flavors.sort(
                  (a, b) => (b.popularity || 0) - (a.popularity || 0)
                )[0]

          return (
            <div
              key={product.id}
              className="min-w-[250px] max-w-xs flex-shrink-0"
            >
              <ProductCard
                product={{
                  ...product,
                  imageUrl: topFlavor?.imageUrlProduct || '',
                  price: topFlavor?.price || 0,
                  salePrice: topFlavor?.salePrice,
                }}
              />
            </div>
          )
        })}

        <Link
          href={`/search?query=${categoryName}`}
          className="relative w-[250px] flex-shrink-0 m-10 flex items-center justify-center 
             border border-gray-200 rounded-xl shadow-md 
             transition-all duration-300 ease-in-out 
             hover:scale-105 hover:shadow-xl hover:border-gray-400"
        >
          <Image
            src="https://res.cloudinary.com/divvzytna/image/upload/v1755739692/1a232170-af75-4528-b7fa-7895ed7be5d6_mpe2of.jpg"
            alt="view_all_background"
            width={250}
            height={150}
            className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-20"
          />

          <span className="relative z-10 bg-white px-2 py-2 rounded-lg font-bold text-black text-center shadow-md">
            View All {categoryName} →
          </span>
        </Link>
      </div>
    </div>
  )
}
