import { useState } from 'react'
import fantasyBooks from '../../../fantasy.json'
import historyBooks from '../../../history.json'
import horrorBooks from '../../../horror.json'
import romanceBooks from '../../../romance.json'
import scifiBooks from '../../../scifi.json'
import SingleBook from './SingleBook'

const books = [
  ...fantasyBooks,
  ...historyBooks,
  ...horrorBooks,
  ...romanceBooks,
  ...scifiBooks,
]

function AllTheBooks() {
  const [searchValue, setSearchValue] = useState('')

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <section className="mb-4">
      <h2 className="h4 mb-3">Tutti i libri</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca per titolo..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>
      <div className="row g-3">
        {filteredBooks.map((book, index) => (
          <div key={`${book.asin}-${index}`} className="col-6 col-md-4 col-lg-3">
            <SingleBook book={book} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default AllTheBooks
