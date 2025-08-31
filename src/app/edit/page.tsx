'use client'

import { useEffect, useState } from 'react'

interface FlavorInput {
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
  flavors: FlavorInput[]
}

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/edit/api?search=${encodeURIComponent(search)}`)
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error(err)
      setMessage('❌ Error fetching products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [search])

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await fetch(`/edit/api?id=${id}`, { method: 'DELETE' })

      if (!res.ok) throw new Error('Failed to delete product')
      setMessage('✅ Product deleted')
      fetchProducts()
    } catch (err) {
      console.error(err)
      setMessage('❌ Error deleting product')
    }
  }

  // Prefill form for editing
  const handleEdit = (product: Product) => {
    // Ensure flavors is at least an empty array
    const safeProduct = {
      ...product,
      description: product.description || '',
      flavors: product.flavors || [],
    }
    setEditProduct(safeProduct)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Update product
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editProduct) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`/edit/api`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProduct),
      })
      if (!res.ok) throw new Error('Failed to update product')
      setMessage('✅ Product updated')
      setEditProduct(null)
      fetchProducts()
    } catch (err) {
      console.error(err)
      setMessage('❌ Error updating product')
    } finally {
      setLoading(false)
    }
  }

  const handleFlavorChange = (
    index: number,
    field: keyof FlavorInput,
    value: any
  ) => {
    if (!editProduct) return
    const flavors = editProduct.flavors ? [...editProduct.flavors] : []
    flavors[index] = { ...flavors[index], [field]: value }
    setEditProduct({ ...editProduct, flavors })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Existing Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, category or manufacturer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />

      {/* Edit form */}
      {editProduct && (
        <form
          onSubmit={handleUpdate}
          className="border p-4 mb-6 rounded space-y-4"
        >
          <h2 className="text-xl font-bold">Edit Product</h2>
          <input
            type="text"
            value={editProduct.manufacturer}
            onChange={(e) =>
              setEditProduct({ ...editProduct, manufacturer: e.target.value })
            }
            placeholder="Manufacturer"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            value={editProduct.name}
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
            placeholder="Product Name"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            value={editProduct.category}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
            placeholder="Category"
            className="border p-2 w-full rounded"
            required
          />
          <textarea
            value={editProduct.description || ''}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
            placeholder="Description"
            className="border p-2 w-full rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editProduct.canadian}
              onChange={(e) =>
                setEditProduct({ ...editProduct, canadian: e.target.checked })
              }
            />
            <span>Canadian Product?</span>
          </label>

          <h3 className="font-bold">Flavors</h3>
          {editProduct.flavors.map((flavor, i) => (
            <div key={i} className="border p-2 rounded space-y-2">
              <input
                type="text"
                value={flavor.name}
                onChange={(e) => handleFlavorChange(i, 'name', e.target.value)}
                placeholder="Flavor Name"
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                value={flavor.imageUrlProduct}
                onChange={(e) =>
                  handleFlavorChange(i, 'imageUrlProduct', e.target.value)
                }
                placeholder="Image URL Product"
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                value={flavor.imageUrlNutrition}
                onChange={(e) =>
                  handleFlavorChange(i, 'imageUrlNutrition', e.target.value)
                }
                placeholder="Image URL Nutrition"
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                value={flavor.size || ''}
                onChange={(e) => handleFlavorChange(i, 'size', e.target.value)}
                placeholder="Size (optional)"
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                value={flavor.no_of_servings || ''}
                onChange={(e) =>
                  handleFlavorChange(i, 'no_of_servings', e.target.value)
                }
                placeholder="No. of servings (optional)"
                className="border p-2 w-full rounded"
              />
              <input
                type="number"
                value={flavor.unitsAvailable}
                onChange={(e) =>
                  handleFlavorChange(
                    i,
                    'unitsAvailable',
                    Number(e.target.value)
                  )
                }
                placeholder="Units Available"
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="number"
                value={flavor.price}
                step="0.01"
                onChange={(e) =>
                  handleFlavorChange(i, 'price', Number(e.target.value))
                }
                placeholder="Price"
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="number"
                value={flavor.salePrice || ''}
                step="0.01"
                onChange={(e) =>
                  handleFlavorChange(i, 'salePrice', Number(e.target.value))
                }
                placeholder="Sale Price (optional)"
                className="border p-2 w-full rounded"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      )}

      {/* Products List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{p.name}</p>
                <p className="text-sm">
                  {p.category} - {p.manufacturer}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {message && <p className="mt-4">{message}</p>}
    </div>
  )
}
