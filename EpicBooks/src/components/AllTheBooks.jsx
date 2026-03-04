import { useContext, useState } from 'react'
import fantasyBooks from '../../../fantasy.json'
import historyBooks from '../../../history.json'
import horrorBooks from '../../../horror.json'
import romanceBooks from '../../../romance.json'
import scifiBooks from '../../../scifi.json'
import SingleBook from './SingleBook'
import CommentArea from './CommentArea'
import { ThemeContext } from '../context/ThemeContext'

const books = [
  ...fantasyBooks,
  ...historyBooks,
  ...horrorBooks,
  ...romanceBooks,
  ...scifiBooks,
]

function AllTheBooks({ searchValue }) {
  const { theme } = useContext(ThemeContext)
  const [selected, setSelected] = useState('')

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase()),
  )
  const selectedBook = books.find((book) => book.asin === selected)

  return (
    <section className="mb-4">
      <h2 className={`h4 mb-3 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
        Tutti i libri
      </h2>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="row g-3">
            {filteredBooks.map((book, index) => (
              <div key={`${book.asin}-${index}`} className="col-12 col-md-6">
                <SingleBook book={book} selected={selected} onSelect={setSelected} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <CommentArea selected={selected} title={selectedBook?.title} />
        </div>
      </div>
    </section>
  )
}

export default AllTheBooks
