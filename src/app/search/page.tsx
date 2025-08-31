import { prisma } from '@/lib/db/prisma'
import ProductCard from '../components/ProductCard'

interface searchPageProps {
  searchParams: { query: string }
}

export default async function searchPage({
  searchParams: { query },
}: searchPageProps) {
  let products: any[] = []

  // }  else if (query.toLowerCase() === 'related products') {
  //   products = await prisma.product.findMany({
  //     where: {
  //       manufacturer: {
  //         equals: products.manufacturer,
  //         mode: 'insensitive', // ignore case
  //       },
  //       category: {
  //         equals: products.category,
  //         mode: 'insensitive', // ignore case
  //       },
  //       total_census_buyers: { gt: 0 },
  //     },
  //     orderBy: {
  //       total_census_buyers: 'desc',
  //     },
  //     distinct: ['name'],
  //   })
  // }
  if (query.toLowerCase() === 'best sellers') {
    // 🔥 Special query for top sellers based on flavor popularity
    const productsWithPopularity = await prisma.product.findMany({
      include: {
        flavors: true, // include flavors
      },
    })

    // Sort products by the maximum popularity of their flavors
    products = productsWithPopularity
      .map((p) => ({
        ...p,
        maxPopularity: p.flavors.length
          ? Math.max(...p.flavors.map((f) => f.popularity || 0))
          : 0,
      }))
      .sort((a, b) => b.maxPopularity - a.maxPopularity)
  } else if (query.toLowerCase() === 'sale') {
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
  } else if (query.toLowerCase() !== '') {
    // 🔎 Regular search with flavors included
    products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { manufacturer: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          {
            flavors: {
              some: {
                name: { contains: query, mode: 'insensitive' }, // search in flavor names
              },
            },
          },
        ],
      },
      orderBy: { createdAt: 'desc' }, // newest products first
      distinct: ['name'], // avoid duplicate product names
      include: {
        flavors: true, // include flavor info for display
      },
    })
  } else {
    // Optional: fetch all products if query is empty
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      distinct: ['name'],
      include: { flavors: true },
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center font-bold md:text-xl lg:text-2xl p-4">
        No results found for "{query}". Check the spelling or use a different
        word or phrase.
      </div>
    )
  }

  return (
    <div className="p-4">
      {/* Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-50 p-4 rounded-2xl shadow-sm">
        {/* Left side: Search + Category */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Category Filter */}
          <select className="select select-bordered w-full sm:w-48">
            <option disabled selected>
              Filter by Category
            </option>
            <option>Protein</option>
            <option>Creatine</option>
            <option>Pre-Workout</option>
            <option>Vitamins</option>
          </select>
        </div>

        {/* Right side: Sort + Reset */}
        <div className="flex gap-3">
          {/* Sort */}
          <select className="select select-bordered w-full sm:w-48">
            <option disabled selected>
              Sort by
            </option>
            <option>Price: Low → High</option>
            <option>Price: High → Low</option>
            <option>Newest</option>
          </select>

          {/* Reset */}
          <button type="reset" className="btn btn-outline">
            Reset
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {/* Product Grid */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((product) => {
          const topFlavor = product.flavors.sort(
            (a, b) => (b.popularity || 0) - (a.popularity || 0)
          )[0]

          return (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                // override image and price for card
                imageUrl: topFlavor?.imageUrlProduct || '/placeholder.png',
                price: topFlavor?.price || 0,
                salePrice: topFlavor?.salePrice,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
