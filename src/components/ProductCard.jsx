import ProductForm from './ProductForm'

function ProductCard({
  product,
  isEditing,
  editFormData,
  onEditFormDataChange,
  onEditSubmit,
  onCancelEdit,
  onStartEdit,
  onDelete,
  editLoading,
  formError,
}) {
  const imageSrc =
    product.thumbnail ||
    product.images?.[0] ||
    'https://picsum.photos/seed/fallback/480/320'

  if (isEditing) {
    return (
      <article className="product-card editing-card">
        <h3 className="product-title">Mahsulotni tahrirlash</h3>
        <ProductForm
          formData={editFormData}
          setFormData={onEditFormDataChange}
          onSubmit={onEditSubmit}
          submitLabel="Yangilash"
          loading={editLoading}
          error={formError}
          onCancel={onCancelEdit}
        />
      </article>
    )
  }

  return (
    <article className="product-card">
      <img className="product-image" src={imageSrc} alt={product.title} />

      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-meta">
          <span>${Number(product.price || 0).toLocaleString('en-US')}</span>
          <span>{product.brand || 'Noma`lum brend'}</span>
        </p>
        <p className="product-description">{product.description}</p>
      </div>

      <div className="product-actions">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => onStartEdit(product)}
        >
          Tahrirlash
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => onDelete(product.id)}
        >
          O'chirish
        </button>
      </div>
    </article>
  )
}

export default ProductCard
