'use client'

import { useState } from 'react'

interface FlavorInput {
  name: string
  imageUrlProduct: string
  imageUrlNutrition: string
  size?: string
  no_of_servings?: string
  unitsAvailable: number | ''
  price: number | ''
  salePrice?: number | ''
  popularity?: number | ''
}

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    manufacturer: '',
    name: '',
    category: '',
    description: '',
    canadian: false,
    flavors: [
      {
        name: '',
        imageUrlProduct: '',
        imageUrlNutrition: '',
        size: '',
        no_of_servings: '',
        unitsAvailable: '',
        price: '',
        salePrice: '',
        popularity: '',
      } as FlavorInput,
    ],
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    flavorIndex?: number,
    field?: keyof FlavorInput
  ) {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (flavorIndex !== undefined && field) {
      const newFlavors = [...formData.flavors]
      newFlavors[flavorIndex] = {
        ...newFlavors[flavorIndex],
        [field]: type === 'number' ? Number(value) : value,
      }
      setFormData({ ...formData, flavors: newFlavors })
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      })
    }
  }

  function addFlavor() {
    setFormData({
      ...formData,
      flavors: [
        ...formData.flavors,
        {
          name: '',
          imageUrlProduct: '',
          imageUrlNutrition: '',
          size: '',
          no_of_servings: '',
          unitsAvailable: '',
          price: '',
          salePrice: '',
          popularity: '',
        },
      ],
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/add/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          manufacturer: formData.manufacturer.trim(),
          name: formData.name.trim(),
          category: formData.category.trim(),
          description: formData.description.trim() || undefined,
          canadian: formData.canadian,
          flavors: formData.flavors.map((f) => ({
            name: f.name.trim(),
            imageUrlProduct: f.imageUrlProduct.trim(),
            imageUrlNutrition: f.imageUrlNutrition.trim(),
            size: f.size?.trim() || undefined,
            no_of_servings: f.no_of_servings?.trim() || undefined,
            unitsAvailable: Number(f.unitsAvailable) || 0,
            price: Number(f.price) || 0,
            salePrice: f.salePrice ? Number(f.salePrice) : undefined,
            popularity: f.popularity ? Number(f.popularity) : undefined,
          })),
        }),
      })

      if (!res.ok) throw new Error('Failed to add product')

      const result = await res.json()
      setMessage(`✅ Product added: ${result.name}`)

      // Reset form
      setFormData({
        manufacturer: '',
        name: '',
        category: '',
        description: '',
        canadian: false,
        flavors: [
          {
            name: '',
            imageUrlProduct: '',
            imageUrlNutrition: '',
            size: '',
            no_of_servings: '',
            unitsAvailable: '',
            price: '',
            salePrice: '',
            popularity: '',
          },
        ],
      })
    } catch (err) {
      console.error(err)
      setMessage('❌ Error adding product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Products</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Info */}
        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="canadian"
            checked={formData.canadian}
            onChange={handleChange}
          />
          <span>Canadian Product?</span>
        </label>

        {/* Flavors */}
        <h2 className="font-bold mt-4">Flavors</h2>
        {formData.flavors.map((flavor, i) => (
          <div key={i} className="border p-3 space-y-2 rounded">
            <input
              type="text"
              placeholder="Flavor Name"
              value={flavor.name}
              onChange={(e) => handleChange(e, i, 'name')}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL Product"
              value={flavor.imageUrlProduct}
              onChange={(e) => handleChange(e, i, 'imageUrlProduct')}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL Nutrition"
              value={flavor.imageUrlNutrition}
              onChange={(e) => handleChange(e, i, 'imageUrlNutrition')}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="text"
              placeholder="Size (grams/ml) (optional)"
              value={flavor.size}
              onChange={(e) => handleChange(e, i, 'size')}
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="No. of servings (optional)"
              value={flavor.no_of_servings}
              onChange={(e) => handleChange(e, i, 'no_of_servings')}
              className="border p-2 w-full rounded"
            />
            <input
              type="number"
              placeholder="Units Available"
              value={flavor.unitsAvailable}
              onChange={(e) => handleChange(e, i, 'unitsAvailable')}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={flavor.price}
              onChange={(e) => handleChange(e, i, 'price')}
              className="border p-2 w-full rounded"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Sale Price (optional)"
              value={flavor.salePrice}
              onChange={(e) => handleChange(e, i, 'salePrice')}
              className="border p-2 w-full rounded"
            />
            <input
              type="number"
              placeholder="Popularity (optional)"
              value={flavor.popularity}
              onChange={(e) => handleChange(e, i, 'popularity')}
              className="border p-2 w-full rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addFlavor}
          className="bg-gray-500 text-white px-3 py-1 m-3 rounded"
        >
          + Add Flavor
        </button>

        <br />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}
