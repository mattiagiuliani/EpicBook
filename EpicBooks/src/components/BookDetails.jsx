import { Link, useParams } from 'react-router-dom'
import fantasyBooks from '../../../fantasy.json'
import historyBooks from '../../../history.json'
import horrorBooks from '../../../horror.json'
import romanceBooks from '../../../romance.json'
import scifiBooks from '../../../scifi.json'
import CommentArea from './CommentArea'

const books = [
  ...fantasyBooks,
  ...historyBooks,
  ...horrorBooks,
  ...romanceBooks,
  ...scifiBooks,
]

function BookDetails() {
  const { asin } = useParams()
  const book = books.find((currentBook) => currentBook.asin === asin)

  if (!book) {
    return (
      <section className="py-4">
        <h2 className="h4">Libro non trovato</h2>
        <p className="mb-3">Nessun libro trovato per ASIN: {asin}</p>
        <Link to="/" className="btn btn-primary">
          Torna alla home
        </Link>
      </section>
    )
  }

  return (
    <section className="py-4">
      <h2 className="h3 mb-3">{book.title}</h2>
      <div className="row g-4 align-items-start">
        <div className="col-12 col-md-4">
          <img
            src={book.img}
            alt={book.title}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-12 col-md-8">
          <p className="mb-2">
            <strong>ASIN:</strong> {asin}
          </p>
          <p className="mb-3">
            <strong>Prezzo:</strong> {book.price}$
          </p>
          <Link to="/" className="btn btn-outline-primary">
            Torna alla home
          </Link>
        </div>
        <div className="col-12">
          <CommentArea selected={asin} title={book.title} />
        </div>
      </div>
    </section>
  )
}

export default BookDetails
