import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function Welcome() {
  const { theme } = useContext(ThemeContext)

  return (
    <section className="mb-4">
      <h1 className="display-6 fw-bold mb-3">Benvenuto su EpicBooks</h1>
      <div
        className={`alert ${theme === 'dark' ? 'alert-secondary' : 'alert-success'}`}
        role="alert"
      >
        Esplora il catalogo e scopri nuovi libri consigliati.
      </div>
    </section>
  )
}

export default Welcome
