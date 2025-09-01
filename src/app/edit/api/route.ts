import { prisma } from '@/lib/db/prisma'
import { NextRequest, NextResponse } from 'next/server'

// Define a type for creating a flavor
type FlavorInput = {
  name: string
  imageUrlProduct: string
  imageUrlNutrition: string
  size?: string
  no_of_servings?: string
  unitsAvailable?: number
  popularity?: number
  price?: number
  salePrice?: number
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''

  console.log('🔎 Incoming search query: :::::', search) // ✅ log query

  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { manufacturer: { contains: search, mode: 'insensitive' } },
        ],
      },
      include: {
        flavors: true, // ✅ include flavors so the edit form gets them
      },
      orderBy: { name: 'asc' },
    })

    console.log('✅ Products found:', products.length) // ✅ log count
    return NextResponse.json(products)
  } catch (err) {
    console.error('❌ Prisma error:', err) // ✅ log error details
    return NextResponse.json(
      { error: 'Failed to fetch products', details: String(err) }, // send some info to client
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, flavors, ...data } = body

    if (!id)
      return NextResponse.json({ error: 'Missing product id' }, { status: 400 })

    // 1️⃣ Update main product fields
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
      },
    })

    // 2️⃣ Handle flavors: delete existing and recreate
    if (Array.isArray(flavors)) {
      await prisma.flavor.deleteMany({ where: { productId: id } })
      await prisma.flavor.createMany({
        data: flavors.map((f: FlavorInput) => ({
          ...f,
          productId: id,
        })),
      })
    }

    // 3️⃣ Return updated product with flavors
    const productWithFlavors = await prisma.product.findUnique({
      where: { id },
      include: { flavors: true },
    })

    return NextResponse.json(productWithFlavors)
  } catch (err) {
    console.error('❌ Update error:', err)
    return NextResponse.json(
      { error: 'Failed to update product', details: String(err) },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id') // e.g., /edit/api?id=PRODUCT_ID

    if (!id)
      return NextResponse.json({ error: 'Missing product id' }, { status: 400 })

    // 1️⃣ Delete related flavors first
    await prisma.flavor.deleteMany({
      where: { productId: id },
    })

    // 2️⃣ Delete the product
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Product deleted' })
  } catch (err) {
    console.error('❌ Delete error:', err)
    return NextResponse.json(
      { error: 'Failed to delete product', details: String(err) },
      { status: 500 }
    )
  }
}
