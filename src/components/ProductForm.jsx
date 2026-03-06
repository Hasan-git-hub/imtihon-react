function ProductForm({
  formData,
  setFormData,
  onSubmit,
  submitLabel = "Saqlash",
  loading = false,
  error = null,
  onCancel,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form className="product-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label className="form-label" htmlFor="title">
          Nomi
        </label>
        <input
          id="title"
          className="input-control"
          name="title"
          type="text"
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="Mahsulot nomini kiriting"
          required
        />
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="price">
          Narxi
        </label>
        <input
          id="price"
          className="input-control"
          name="price"
          type="number"
          value={formData.price || ''}
          onChange={handleChange}
          min="1"
          step="0.01"
          placeholder="0"
          required
        />
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="brand">
          Brend
        </label>
        <input
          id="brand"
          className="input-control"
          name="brand"
          type="text"
          value={formData.brand || ''}
          onChange={handleChange}
          placeholder="Brend nomi"
          required
        />
      </div>

      <div className="form-row">
        <label className="form-label" htmlFor="description">
          Tavsif
        </label>
        <textarea
          id="description"
          className="input-control textarea-control"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Qisqacha tavsif"
          rows="4"
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Yuborilmoqda...' : submitLabel}
        </button>
        {onCancel && (
          <button className="btn btn-ghost" type="button" onClick={onCancel}>
            Bekor qilish
          </button>
        )}
      </div>
    </form>
  )
}

export default ProductForm
