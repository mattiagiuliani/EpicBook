import { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'

function SingleBook({ book, selected, onSelect }) {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const isSelected = selected === book.asin

  return (
    <Card
      className={`h-100 border-0 shadow-sm ${isDark ? 'bg-secondary text-light' : 'bg-white'}`}
      onClick={() => onSelect(book.asin)}
      style={{ cursor: 'pointer' }}
    >
      <Card.Img
        variant="top"
        src={book.img}
        alt={book.title}
        style={{
          height: '300px',
          objectFit: 'cover',
          border: isSelected ? '3px solid red' : 'none',
        }}
      />
      <Card.Body>
        <Card.Title className="h6 mb-3">{book.title}</Card.Title>
        <Link
          to={`/book/${book.asin}`}
          className={`btn btn-sm ${isDark ? 'btn-light' : 'btn-outline-primary'}`}
          onClick={(event) => event.stopPropagation()}
        >
          Dettagli
        </Link>
      </Card.Body>
    </Card>
  )
}

export default SingleBook

