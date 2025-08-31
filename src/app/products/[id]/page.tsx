import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import PriceTag from '@/app/components/PriceTag'
import { Metadata } from 'next'
import { cache } from 'react'
import ProductCategoryDisplay from '../../components/ProductCategoryDisplay'

interface ProductPageProps {
  params: {
    id: string
  }
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } })

  if (!product) notFound()

  return product
})

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id)

  return {
    title: product.name + ' - Big Dog Supplements',
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  }
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id)

  const hasSale = product.newSalePrice && product.newSalePrice > 0
  const discountPercent = hasSale
    ? Math.round(((product.price - product.newSalePrice) / product.price) * 100)
    : 0

  const pricePerServing = parseFloat(product.price_per_serving)
  const totalPrice = parseFloat(product.price)

  // Calculate number of servings
  const numberOfServings =
    pricePerServing && totalPrice
      ? Math.round(totalPrice / pricePerServing)
      : undefined

  // Example flavors (could come from DB)
  const flavors = ['Chocolate', 'Vanilla', 'Strawberry']

  return (
    <>
      <div className="flex justify-center pt-10 flex-col lg:flex-row gap-5 ">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="w-70 h-auto m-auto sm:w-75 lg:m-0 lg:w-95 xl:w-120 rounded-lg"
          priority
        />
        <div className="mx-3">
          <h1 className="text-2xl sm:text-3xl xl:text-5xl font-bold">
            {product.name.toUpperCase()}
          </h1>
          <h3 className="py-3 underline">{product.manufacturer}</h3>
          {hasSale ? (
            <div className="flex flex-row items-baseline gap-3">
              {/* discounted price */}
              <PriceTag price={product.newSalePrice!} />
              {/* original price with strike-through */}
              <span className="text-gray-500 font-light line-through text-md md:text-lg lg:text-xl">
                CAD {product.price}
              </span>
            </div>
          ) : (
            <PriceTag price={product.price} className="mt-4" />
          )}

          <div className="my-4 ">
            {/* Highlighted Text with Symbol */}
            <span className=" bg-green-100 text-green-800 font-bold text-md sm:text:lg px-3 py-1 rounded shadow-md">
              <span className="mr-2 ">✔</span>
              Lowest Price Promised
            </span>

            {/* Bottom line */}
            <div className="w-full border-t border-gray-300 mt-2"></div>
          </div>

          {/* Quantity and Flavors */}
          <div className="flex gap-6  mt-4">
            {/* Quantity */}
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

            {/* Flavors */}
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

          {/* Line */}
          <div className="w-full border-t border-gray-300 my-4"></div>

          {/* Add to Cart Button */}
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-3 w-full rounded shadow-md transition-all">
            Add to Cart
          </button>

          {/* Free Shipping Text */}
          <p className="text-md sm:text-lg lg:text-xl text-gray-600 mt-2">
            Free Shipping on orders over $150
          </p>
        </div>
        {/* <p className="py-6">{product.description}</p> */}
      </div>
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
