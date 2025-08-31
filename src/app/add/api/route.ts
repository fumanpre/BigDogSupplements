import { prisma } from '@/lib/db/prisma'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // 1️⃣ Create product first
    const product = await prisma.product.create({
      data: {
        manufacturer: data.manufacturer,
        name: data.name,
        category: data.category,
        description: data.description || undefined,
        canadian: data.canadian ?? false,
      },
    })

    if (Array.isArray(data.flavors) && data.flavors.length > 0) {
      await prisma.flavor.createMany({
        data: data.flavors.map((f) => ({
          name: f.name,
          imageUrlProduct: f.imageUrlProduct,
          imageUrlNutrition: f.imageUrlNutrition,
          size: f.size,
          no_of_servings: f.no_of_servings,
          unitsAvailable: f.unitsAvailable,
          price: f.price,
          salePrice: f.salePrice,
          popularity: f.popularity,
          productId: product.id, // ✅ attach productId
        })),
      })
    }

    // 3️⃣ Return product
    return new Response(
      JSON.stringify({ ...product, flavors: data.flavors || [] }),
      { status: 201 }
    )
  } catch (err) {
    console.error('Add product API error:', err)
    return new Response(JSON.stringify({ error: 'Failed to add product' }), {
      status: 500,
    })
  }
}
