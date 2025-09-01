import { prisma } from '@/lib/db/prisma'
import ProductCard from '../components/ProductCard'

interface Flavor {
  id: string
  name: string
  imageUrlProduct: string
  imageUrlNutrition: string
  size?: string
  no_of_servings?: string
  unitsAvailable: number
  price: number
  salePrice?: number
  popularity?: number
}

interface Product {
  id: string
  manufacturer: string
  name: string
  category: string
  description?: string
  canadian: boolean
  flavors: Flavor[]
}

interface SearchPageProps {
  searchParams: { query: string }
}

export default async function searchPage({
  searchParams: { query },
}: SearchPageProps) {
  let products: Product[] = []

  const lowerQuery = query.toLowerCase()

  if (lowerQuery === 'best sellers') {
    const allProducts = await prisma.product.findMany({
      include: { flavors: true },
    })
    products = allProducts
      .map((p) => ({
        ...p,
        flavors: p.flavors,
        maxPopularity: p.flavors.length
          ? Math.max(...p.flavors.map((f) => f.popularity || 0))
          : 0,
      }))
      .sort((a, b) => b.maxPopularity! - a.maxPopularity!)
  } else if (lowerQuery === 'sale') {
    const allProducts = await prisma.product.findMany({
      include: { flavors: true },
    })
    products = allProducts
      .map((p) => {
        const saleFlavors = p.flavors.filter(
          (f) => f.salePrice && f.salePrice > 0
        )
        return { ...p, flavors: saleFlavors }
      })
      .filter((p) => p.flavors.length > 0)
  } else if (lowerQuery !== '') {
    products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { manufacturer: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          {
            flavors: {
              some: { name: { contains: query, mode: 'insensitive' } },
            },
          },
        ],
      },
      include: { flavors: true },
      orderBy: { createdAt: 'desc' },
      distinct: ['name'],
    })
  } else {
    products = await prisma.product.findMany({
      include: { flavors: true },
      orderBy: { createdAt: 'desc' },
      distinct: ['name'],
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center font-bold md:text-xl lg:text-2xl p-4">
        No results found for &quot;{query}&quot;. Check the spelling or try
        another search.
      </div>
    )
  }

  return (
    <div className="p-4">
      {/* Filter & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-gray-50 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            defaultValue=""
            className="select select-bordered w-full sm:w-48"
          >
            <option value="" disabled>
              Filter by Category
            </option>
            <option>Protein</option>
            <option>Creatine</option>
            <option>Pre-Workout</option>
            <option>Vitamins</option>
          </select>
        </div>

        <div className="flex gap-3">
          <select
            defaultValue=""
            className="select select-bordered w-full sm:w-48"
          >
            <option value="" disabled>
              Sort by
            </option>
            <option>Price: Low → High</option>
            <option>Price: High → Low</option>
            <option>Newest</option>
          </select>
          <button type="reset" className="btn btn-outline">
            Reset
          </button>
        </div>
      </div>

      {/* Products Grid */}
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
