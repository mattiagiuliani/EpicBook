import { Alert, ListGroup, Spinner } from 'react-bootstrap'
import SingleComment from './SingleComment'

function CommentList({ comments, loading, error, onCommentChanged }) {
  if (error) {
    return (
      <Alert variant="danger" className="py-2">
        {error}
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2">
        <Spinner animation="border" size="sm" />
        <span>Caricamento recensioni...</span>
      </div>
    )
  }

  if (comments.length === 0) {
    return <p className="text-muted mb-0">Nessuna recensione disponibile.</p>
  }

  return (
    <ListGroup>
      {comments.map((review) => (
        <SingleComment key={review._id} review={review} onCommentChanged={onCommentChanged} />
      ))}
    </ListGroup>
  )
}

export default CommentList
