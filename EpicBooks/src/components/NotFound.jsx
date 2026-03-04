import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="text-center py-5">
      <h1 className="display-5 fw-bold">404</h1>
      <p className="lead mb-4">Pagina non trovata.</p>
      <Link to="/" className="btn btn-primary">
        Torna alla home
      </Link>
    </section>
  )
}

export default NotFound
