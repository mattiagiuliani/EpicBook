import { useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'

const COMMENTS_API_URL = 'https://striveschool-api.herokuapp.com/api/comments'
const apiToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTk4M2I1ODRhNzczYzAwMTVhYThlNTgiLCJpYXQiOjE3NzE1ODQzNDQsImV4cCI6MTc3Mjc5Mzk0NH0.SnAFGrNZTONjdV3gL4cWx3QlSJfGu1Wbl9x96nk1-dY'

function AddComment({ selected, onCommentAdded }) {
  const [newComment, setNewComment] = useState('')
  const [newRate, setNewRate] = useState('3')
  const [posting, setPosting] = useState(false)
  const [postError, setPostError] = useState('')
  const [postSuccess, setPostSuccess] = useState('')

  const handleClick = async () => {
    if (!selected) return

    setPosting(true)
    setPostError('')
    setPostSuccess('')

    try {
      const response = await fetch(COMMENTS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          comment: newComment.trim(),
          rate: String(newRate),
          elementId: String(selected),
        }),
      })

      if (!response.ok) {
        throw new Error(`Errore POST recensione (${response.status})`)
      }

      setNewComment('')
      setNewRate('3')
      setPostSuccess('Recensione salvata con successo.')
      if (onCommentAdded) {
        await onCommentAdded()
      }
    } catch (error) {
      setPostError(error.message || 'Errore durante il salvataggio della recensione.')
    } finally {
      setPosting(false)
    }
  }

  return (
    <Form>
      <Form.Group className="mb-2" controlId={`newComment-${selected || 'none'}`}>
        <Form.Label className="small mb-1">Nuova recensione</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2" controlId={`newRate-${selected || 'none'}`}>
        <Form.Label className="small mb-1">Voto</Form.Label>
        <Form.Select value={newRate} onChange={(event) => setNewRate(event.target.value)} required>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {postError && (
        <Alert variant="danger" className="py-2">
          {postError}
        </Alert>
      )}
      {postSuccess && (
        <Alert variant="success" className="py-2">
          {postSuccess}
        </Alert>
      )}

      <Button
        type="button"
        size="sm"
        disabled={posting || !newComment.trim() || !selected}
        onClick={handleClick}
      >
        {posting ? (
          <>
            <Spinner as="span" animation="border" size="sm" className="me-2" />
            Salvataggio...
          </>
        ) : (
          'Pubblica'
        )}
      </Button>
    </Form>
  )
}

export default AddComment
