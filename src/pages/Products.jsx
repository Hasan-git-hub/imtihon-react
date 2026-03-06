import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const createEmptyFormData = () => ({
  title: '',
  price: '',
  description: '',
  brand: '',
})

function Products() {
  const location = useLocation()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState(createEmptyFormData())
  const [editingProduct, setEditingProduct] = useState(null)
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || '',
  )
  const [savingEdit, setSavingEdit] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://dummyjson.com/products?limit=30')
        if (!response.ok) {
          throw new Error("Mahsulotlar yuklanmadi.")
        }

        const data = await response.json()
        const fetchedProducts = Array.isArray(data.products) ? data.products : []
        const createdProduct = location.state?.createdProduct

        if (createdProduct) {
          const filteredProducts = fetchedProducts.filter(
            (item) => item.id !== createdProduct.id,
          )
          setProducts([createdProduct, ...filteredProducts])
        } else {
          setProducts(fetchedProducts)
        }
      } catch (fetchError) {
        setError(
          fetchError.message ||
            "Yuklashda xatolik bo'ldi. Iltimos keyinroq qayta urinib ko'ring.",
        )
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [location.state])

  useEffect(() => {
    if (!successMessage) {
      return
    }

    const timer = setTimeout(() => {
      setSuccessMessage('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [successMessage])

  const handleStartEdit = (product) => {
    setEditingProduct(product.id)
    setError(null)
    setFormData({
      title: product.title || '',
      price: String(product.price || ''),
      description: product.description || '',
      brand: product.brand || '',
    })
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    setFormData(createEmptyFormData())
    setError(null)
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()

    if (!editingProduct) {
      return
    }

    const title = formData.title.trim()
    const description = formData.description.trim()
    const brand = formData.brand.trim()
    const price = Number(formData.price)

    if (!title || !description || !brand || !formData.price.toString().trim()) {
      setError("Tahrirlash uchun barcha maydonlarni to'ldiring.")
      return
    }

    if (Number.isNaN(price) || price <= 0) {
      setError("Narx 0 dan katta bo'lishi kerak.")
      return
    }

    setSavingEdit(true)
    setError(null)

    try {
      const response = await fetch(`https://dummyjson.com/products/${editingProduct}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price,
          description,
          brand,
        }),
      })

      if (!response.ok) {
        throw new Error("Mahsulotni yangilashda xatolik bo'ldi.")
      }

      const updatedProductFromApi = await response.json()

      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (product.id !== editingProduct) {
            return product
          }

          return {
            ...product,
            ...updatedProductFromApi,
            title,
            price,
            description,
            brand,
          }
        }),
      )

      setEditingProduct(null)
      setFormData(createEmptyFormData())
      setSuccessMessage('Mahsulot muvaffaqiyatli yangilandi.')
    } catch (updateError) {
      setError(
        updateError.message ||
          "Yangilashda xatolik bo'ldi. Iltimos keyinroq qayta urinib ko'ring.",
      )
    } finally {
      setSavingEdit(false)
    }
  }

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Rostdan ham mahsulotni o'chirmoqchimisiz?")
    if (!isConfirmed) {
      return
    }

    setError(null)

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error("Mahsulotni o'chirishda xatolik bo'ldi.")
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      )
      setSuccessMessage("Mahsulot ro'yxatdan o'chirildi.")

      if (editingProduct === id) {
        setEditingProduct(null)
        setFormData(createEmptyFormData())
      }
    } catch (deleteError) {
      setError(
        deleteError.message ||
          "O'chirishda xatolik bo'ldi. Iltimos keyinroq qayta urinib ko'ring.",
      )
    }
  }

  return (
    <section className="products-page">
      <div className="page-header">
        <h1>Barcha mahsulotlar</h1>
        <p>DummyJSON API bilan CRUD amaliyoti.</p>
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      {loading && <p className="loading-text">Yuklanmoqda...</p>}

      {!loading && products.length === 0 && (
        <p className="empty-state">Mahsulotlar topilmadi.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isEditing={editingProduct === product.id}
              editFormData={formData}
              onEditFormDataChange={setFormData}
              onEditSubmit={handleEditSubmit}
              onCancelEdit={handleCancelEdit}
              onStartEdit={handleStartEdit}
              onDelete={handleDelete}
              editLoading={savingEdit}
              formError={error}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Products
