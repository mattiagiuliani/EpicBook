import { Component } from 'react'
import { Alert } from 'react-bootstrap'
import AddComment from './AddComment'
import CommentList from './CommentList'

const BOOK_COMMENTS_API_URL = 'https://striveschool-api.herokuapp.com/api/books'
const apiToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTk4M2I1ODRhNzczYzAwMTVhYThlNTgiLCJpYXQiOjE3NzE1ODQzNDQsImV4cCI6MTc3Mjc5Mzk0NH0.SnAFGrNZTONjdV3gL4cWx3QlSJfGu1Wbl9x96nk1-dY'

class CommentArea extends Component {
  state = {
    comments: [],
    loading: false,
    fetchError: '',
  }

  componentDidMount() {
    this.fetchComments()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.fetchComments()
    }
  }

  fetchComments = async () => {
    const { selected } = this.props

    if (!selected) {
      this.setState({ comments: [], loading: false, fetchError: '' })
      return
    }

    this.setState({ loading: true, fetchError: '' })

    try {
      const response = await fetch(`${BOOK_COMMENTS_API_URL}/${selected}/comments`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Errore GET recensioni (${response.status})`)
      }

      const data = await response.json()
      this.setState({ comments: data, loading: false })
    } catch (error) {
      this.setState({
        comments: [],
        loading: false,
        fetchError: error.message || 'Errore durante il caricamento delle recensioni.',
      })
    }
  }

  render() {
    const { selected, title } = this.props
    const { comments, loading, fetchError } = this.state

    return (
      <section className="mt-3 mt-lg-0">
        <h3 className="h5 mb-3">{selected ? `Recensioni: ${title}` : 'Recensioni'}</h3>

        {!selected ? (
          <Alert variant="info" className="py-2 mb-3">
            Seleziona un libro per vedere e aggiungere recensioni.
          </Alert>
        ) : (
          <div className="mb-3">
            <CommentList
              comments={comments}
              loading={loading}
              error={fetchError}
              onCommentChanged={this.fetchComments}
            />
          </div>
        )}
        <AddComment selected={selected} onCommentAdded={this.fetchComments} />
      </section>
    )
  }
}

export default CommentArea
