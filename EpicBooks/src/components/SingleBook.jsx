import { useState } from 'react'
import { Card } from 'react-bootstrap'

function SingleBook({ book }) {
  const [selected, setSelected] = useState(false)

  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Img
        variant="top"
        src={book.img}
        alt={book.title}
        onClick={() => setSelected(!selected)}
        style={{
          height: '300px',
          objectFit: 'cover',
          border: selected ? '3px solid red' : 'none',
          cursor: 'pointer',
        }}
      />
      <Card.Body>
        <Card.Title className="h6 mb-0">{book.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default SingleBook
