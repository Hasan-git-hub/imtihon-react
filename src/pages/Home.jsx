import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="home-page">
      <div className="home-card">
        <h1>React Router & Hooks CRUD amaliyoti</h1>
        <p>
          Bu loyiha React Router DOM v6, `useState`, `useEffect` va DummyJSON
          API asosida mahsulotlar boshqaruvini ko'rsatadi.
        </p>

        <ul className="home-list">
          <li>Router: Home, Products, Create, 404</li>
          <li>READ: mahsulotlarni yuklash va ko'rsatish</li>
          <li>CREATE: yangi mahsulot qo'shish</li>
          <li>UPDATE: inline tahrirlash</li>
          <li>DELETE: tasdiq bilan o'chirish</li>
        </ul>

        <div className="home-actions">
          <Link className="btn btn-primary" to="/products">
            Mahsulotlarni ko'rish
          </Link>
          <Link className="btn btn-secondary" to="/products/create">
            Yangi mahsulot yaratish
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
