import { useState } from 'react'
import { Alert, Badge, Button, Form, ListGroup, Spinner } from 'react-bootstrap'

const COMMENTS_API_URL = 'https://striveschool-api.herokuapp.com/api/comments'
const apiToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTk4M2I1ODRhNzczYzAwMTVhYThlNTgiLCJpYXQiOjE3NzE1ODQzNDQsImV4cCI6MTc3Mjc5Mzk0NH0.SnAFGrNZTONjdV3gL4cWx3QlSJfGu1Wbl9x96nk1-dY'

function SingleComment({ review, onCommentChanged }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(review.comment)
  const [editedRate, setEditedRate] = useState(String(review.rate))
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleUpdate = async () => {
    setSaving(true)
    setError('')
    try {
      const response = await fetch(`${COMMENTS_API_URL}/${review._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          comment: editedComment.trim(),
          rate: String(editedRate),
          elementId: String(review.elementId),
        }),
      })

      if (!response.ok) {
        throw new Error(`Errore PUT recensione (${response.status})`)
      }

      setIsEditing(false)
      if (onCommentChanged) {
        await onCommentChanged()
      }
    } catch (updateError) {
      setError(updateError.message || 'Errore durante la modifica della recensione (PUT).')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setError('')
    try {
      const response = await fetch(`${COMMENTS_API_URL}/${review._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Errore DELETE recensione (${response.status})`)
      }

      if (onCommentChanged) {
        await onCommentChanged()
      }
    } catch (deleteError) {
      setError(deleteError.message || 'Errore durante l\'eliminazione della recensione (DELETE).')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <ListGroup.Item>
      {isEditing ? (
        <>
          <Form.Group className="mb-2" controlId={`edit-comment-${review._id}`}>
            <Form.Control
              as="textarea"
              rows={2}
              value={editedComment}
              onChange={(event) => setEditedComment(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId={`edit-rate-${review._id}`}>
            <Form.Select value={editedRate} onChange={(event) => setEditedRate(event.target.value)}>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </>
      ) : (
        <>
          <p className="mb-2">{review.comment}</p>
          <Badge bg="info">Voto: {review.rate}/5</Badge>
        </>
      )}

      {error && (
        <Alert variant="danger" className="mt-2 mb-2 py-2">
          {error}
        </Alert>
      )}

      <div className="d-flex gap-2 mt-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="primary"
              type="button"
              disabled={saving || !editedComment.trim()}
              onClick={handleUpdate}
            >
              {saving ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Salvataggio...
                </>
              ) : (
                'Salva'
              )}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              type="button"
              onClick={() => {
                setIsEditing(false)
                setEditedComment(review.comment)
                setEditedRate(String(review.rate))
                setError('')
              }}
            >
              Annulla
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline-primary" type="button" onClick={() => setIsEditing(true)}>
            Modifica
          </Button>
        )}
        <Button
          size="sm"
          variant="outline-danger"
          type="button"
          disabled={deleting}
          onClick={handleDelete}
        >
          {deleting ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Eliminazione...
            </>
          ) : (
            'Elimina'
          )}
        </Button>
      </div>
    </ListGroup.Item>
  )
}

export default SingleComment
