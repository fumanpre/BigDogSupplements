import { prisma } from '@/lib/db/prisma'
import Image from 'next/image'
import ProductCard from './components/ProductCard'
import Carousel from './components/Carousel'
import ProductCategoryDisplay from './components/ProductCategoryDisplay'

export default async function Home() {
  // const categories = await prisma.category.findMany({
  //   orderBy: { id: 'asc' },
  // })
  return (
    <div>
      <Carousel />
      {/* <h1 className="py-3 text-center text-3xl font-bold">
        Shop By Categories
      </h1> */}
      {/* <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className="w-full sm:w-[48%] md:w-[30%] xl:w-[22%] custom-min-2"
          >
            <ByCategoryCard category={category} />
          </div>
        ))}
      </div> */}
      <ProductCategoryDisplay
        className="p-4 mt-12"
        categoryName="Best Sellers"
      />
      <ProductCategoryDisplay className="p-4" categoryName="Sale" />
    </div>
  )
}
