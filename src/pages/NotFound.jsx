import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="notfound-page">
      <h1>404</h1>
      <p>Sahifa topilmadi.</p>
      <Link className="btn btn-primary" to="/">
        Bosh sahifaga qaytish
      </Link>
    </section>
  )
}

export default NotFound
