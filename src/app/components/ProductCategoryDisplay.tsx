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
    // Fetch products with flavors
    const allProducts = await prisma.product.findMany({
      include: { flavors: true },
    })

    // Sort by max flavor popularity descending
    products = allProducts
      .sort((a, b) => {
        const maxA = Math.max(...a.flavors.map((f) => f.popularity || 0))
        const maxB = Math.max(...b.flavors.map((f) => f.popularity || 0))
        return maxB - maxA
      })
      .slice(0, 4) // top 4 products
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
          // pick the flavor with highest popularity
          const topFlavor = product.flavors.sort(
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
                  // override image and price for card
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

// import { prisma } from '@/lib/db/prisma'
// import Link from 'next/link'
// import ProductCard from '../components/ProductCard'
// import Image from 'next/image'
// import { Product } from '@prisma/client'

// interface ProductCategoryDisplayProps {
//   className?: string
//   categoryName: string
//   productItself?: Product
// }

// export default async function ProductCategoryDisplay({
//   className,
//   categoryName,
//   productItself,
// }: ProductCategoryDisplayProps) {
//   let products: any[] = [] // ✅ initialized as empty array

//   if (categoryName === 'Best Sellers') {
//     // Fetch products based on highest flavor popularity
//     products = await prisma.product.findMany({
//       include: {
//         flavors: true,
//       },
//     })

//     products = products
//       .sort((a, b) => {
//         const maxA = Math.max(...a.flavors.map((f) => f.popularity || 0))
//         const maxB = Math.max(...b.flavors.map((f) => f.popularity || 0))
//         return maxB - maxA // descending
//       })
//       .slice(0, 4) // take top 4

//     // } else if (categoryName === 'Sale') {
//     //   // Fetch all sale items with newSalePrice > 0
//     //   products = await prisma.product.findMany({
//     //     where: { newSalePrice: { gt: 0 } },
//     //     orderBy: { salePrice: 'desc' },
//     //     take: 4,
//     //     distinct: ['name'],
//     //   })
//     // }
//     // else if (categoryName === 'Similar Products') {
//     //   products = await prisma.product.findMany({
//     //     where: {
//     //       category: {
//     //         equals: productItself.category,
//     //         mode: 'insensitive', // ignore case
//     //       },
//     //       total_census_buyers: { gt: 0 },
//     //     },
//     //     orderBy: {
//     //       total_census_buyers: 'desc',
//     //     },
//     //     take: 4,
//     //     distinct: ['name'],
//     //   })
//     // } else if (categoryName === `${productItself.manufacturer}`) {
//     //   products = await prisma.product.findMany({
//     //     where: {
//     //       manufacturer: {
//     //         equals: productItself.manufacturer,
//     //         mode: 'insensitive', // ignore case
//     //       },
//     //       total_census_buyers: { gt: 0 },
//     //     },
//     //     orderBy: {
//     //       total_census_buyers: 'desc',
//     //     },
//     //     take: 4,
//     //     distinct: ['name'],
//     //   })
//   }

//   if (products.length === 0) {
//     // ✅ If no products, skip rendering completely
//     return null
//   }

//   return (
//     <div className={className}>
//       <div className="text-center pb-4">
//         <span className="text-2xl xl:text-3xl underline font-semibold">
//           {categoryName}
//         </span>
//       </div>

//       <div className="flex gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] no-scrollbar ">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="min-w-[250px] max-w-xs flex-shrink-0"
//           >
//             <ProductCard product={product} />
//           </div>
//         ))}

//         <Link
//           href={`/search?query=${categoryName}`}
//           className="relative w-[250px] flex-shrink-0 m-10 flex items-center justify-center
//              border border-gray-200 rounded-xl shadow-md
//              transition-all duration-300 ease-in-out
//              hover:scale-105 hover:shadow-xl hover:border-gray-400"
//         >
//           {/* Background Image */}
//           <Image
//             src="https://res.cloudinary.com/divvzytna/image/upload/v1755739692/1a232170-af75-4528-b7fa-7895ed7be5d6_mpe2of.jpg"
//             alt="view_all_background"
//             width={250}
//             height={150}
//             className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-20"
//           />

//           {/* Text Box */}
//           <span className="relative z-10 bg-white px-2 py-2 rounded-lg font-bold text-black text-center shadow-md">
//             View All {categoryName} →
//           </span>
//         </Link>
//       </div>
//     </div>
//   )
// }
