'use client'

import { useState } from 'react'
import PriceTag from '@/app/components/PriceTag'
import { Flavor, Product } from '@prisma/client'
import Image from 'next/image'

interface FlavorSelectorProps {
  product: Product & { flavors: Flavor[] }
  flavors: Flavor[]
  onFlavorChange?: (flavor: Flavor) => void
}

export default function ProductClient({
  product,
  flavors,
  onFlavorChange,
}: FlavorSelectorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0])
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState('product') // 'product' or 'nutrition'

  const price = selectedFlavor.price ?? 0
  const salePrice = selectedFlavor.salePrice ?? 0
  const hasSale = salePrice > 0 && price > 0
  const discountPercent = hasSale
    ? Math.round(((price - salePrice) / price) * 100)
    : 0
  const stock = selectedFlavor.unitsAvailable ?? 0
  const quantityCap = Math.min(stock, 5)

  const handleFlavorSelect = (flavor: Flavor) => {
    setSelectedFlavor(flavor)
    setQuantity(1)
    setCurrentImage('product')
    if (onFlavorChange) onFlavorChange(flavor)
  }

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${selectedFlavor.name} to cart`)
  }

  const imageList = [
    { type: 'product', url: selectedFlavor.imageUrlProduct },
    selectedFlavor.imageUrlNutrition && {
      type: 'nutrition',
      url: selectedFlavor.imageUrlNutrition,
    },
  ].filter(Boolean)

  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl">
        {/* Image Section */}
        <div className="flex flex-col lg:flex-1 items-center">
          {/* Main Image */}
          <div className="overflow-hidden rounded-xl  w-[320px] sm:w-[360px] md:w-[400px] lg:w-[450px] xl:w-[500px] mb-4">
            <Image
              src={
                currentImage === 'nutrition'
                  ? selectedFlavor.imageUrlNutrition || '/placeholder.png'
                  : selectedFlavor.imageUrlProduct || '/placeholder.png'
              }
              alt={`${product.name} - ${selectedFlavor.name}`}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {imageList.map((img) => (
              <div
                key={img.type}
                onClick={() => setCurrentImage(img.type)}
                className={`w-16 h-16 rounded-lg overflow-hidden border cursor-pointer transition-transform hover:scale-105 ${
                  currentImage === img.type
                    ? 'border-amber-500'
                    : 'border-gray-300'
                }`}
              >
                <Image
                  src={img.url!}
                  alt={img.type}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col backdrop-blur-sm bg-white/60 border border-white/30 rounded-3xl p-8 shadow-xl">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1 text-gray-800 tracking-tight">
            {product.name.toUpperCase()}
          </h1>
          <h3 className="text-lg underline font-medium text-gray-600 mb-3">
            {product.manufacturer}
          </h3>

          {/* Canadian + Lowest Price */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold uppercase tracking-wide shadow-md animate-pulse">
              <span className="text-green-900 font-bold">✔</span> Lowest Price
              Possible
            </span>
            {product.canadian && (
              <span className="flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold uppercase tracking-wide shadow-md animate-pulse">
                <span className="text-red-900 font-bold">🇨🇦</span> Proudly
                Canadian
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-gray-700 text-md mb-6">{product.description}</p>
          )}

          {/* Price */}
          <div className="mb-6">
            {hasSale ? (
              <div className="flex items-baseline gap-3">
                <PriceTag
                  price={salePrice}
                  styleClassName="text-3xl font-bold text-yellow-600"
                />
                <span className="text-gray-400 line-through text-lg">
                  CAD {price.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  -{discountPercent}% OFF
                </span>
              </div>
            ) : (
              <PriceTag
                price={price}
                styleClassName="text-3xl font-bold text-yellow-600"
              />
            )}
          </div>

          {/* Flavors */}
          <div className="mb-6 flex flex-wrap gap-3">
            {flavors.map((flavor) => (
              <button
                key={flavor.id}
                type="button"
                onClick={() => handleFlavorSelect(flavor)}
                className={`
                  relative px-6 py-3 rounded-full border transition-all transform shadow-sm hover:scale-105 hover:shadow-lg font-medium
                  ${
                    flavor.id === selectedFlavor.id
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300 border-amber-500 text-black shadow-lg scale-105'
                      : 'bg-white border-gray-300 text-gray-700'
                  }
                `}
              >
                {flavor.name}
                {flavor.id === selectedFlavor.id && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Size & Servings */}
          <div className="mb-6 flex flex-wrap gap-4 text-gray-700">
            {selectedFlavor.size && (
              <div className="px-3 py-1 border-l-4 border-yellow-400 rounded-r-full font-medium bg-yellow-50">
                Size: {String(selectedFlavor.size).toUpperCase()}
              </div>
            )}
            {selectedFlavor.no_of_servings && (
              <div className="px-3 py-1 border-l-4 border-green-400 rounded-r-full font-medium bg-green-50">
                Servings: {String(selectedFlavor.no_of_servings).toUpperCase()}
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            {stock > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold"
                >
                  -
                </button>
                <span className="px-5 py-2 border rounded-full font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(quantityCap, q + 1))
                  }
                  className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition font-bold"
                >
                  +
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`
                flex-1 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-black
                ${stock === 0 ? 'bg-gray-400 cursor-not-allowed text-white' : ''}
              `}
            >
              {stock === 0 ? 'Out of Stock' : `Add ${quantity} to Cart`}
            </button>
          </div>

          <p className="text-md text-gray-500 mt-3 text-center">
            Free Shipping on orders over $150
          </p>
        </div>
      </div>
    </div>
  )
}
