import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'

const createEmptyFormData = () => ({
  title: '',
  price: '',
  description: '',
  brand: '',
})

function CreateProduct() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(createEmptyFormData())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setFormData(createEmptyFormData())
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const title = formData.title.trim()
    const description = formData.description.trim()
    const brand = formData.brand.trim()
    const price = Number(formData.price)

    if (!title || !description || !brand || !formData.price.toString().trim()) {
      setError("Barcha maydonlarni to'ldiring.")
      return
    }

    if (Number.isNaN(price) || price <= 0) {
      setError("Narx 0 dan katta bo'lishi kerak.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
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
        throw new Error("Mahsulotni yaratishda xatolik bo'ldi.")
      }

      const createdProduct = await response.json()

      navigate('/products', {
        state: {
          successMessage: "Yangi mahsulot muvaffaqiyatli qo'shildi.",
          createdProduct: {
            ...createdProduct,
            title,
            price,
            description,
            brand,
          },
        },
      })
    } catch (createError) {
      setError(
        createError.message ||
          "Yaratishda xatolik yuz berdi. Keyinroq qayta urinib ko'ring.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="create-page">
      <div className="page-header">
        <h1>Yangi mahsulot yaratish</h1>
        <p>Formani to'ldiring va mahsulotni ro'yxatga qo'shing.</p>
      </div>

      <ProductForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitLabel="Mahsulotni qo'shish"
        loading={loading}
        error={error}
      />
    </section>
  )
}

export default CreateProduct
