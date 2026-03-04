import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function MyFooter() {
  const { theme } = useContext(ThemeContext)

  return (
    <footer
      className={`border-top py-3 mt-auto ${
        theme === 'dark' ? 'bg-black text-light border-secondary' : 'bg-white'
      }`}
    >
      <div className="container">
        <small className={theme === 'dark' ? 'text-light' : 'text-muted'}>
          EpicBooks - React App
        </small>
      </div>
    </footer>
  )
}

export default MyFooter
