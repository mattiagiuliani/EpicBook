import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function MyNav({ searchValue, onSearchChange }) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        isDark ? 'navbar-dark bg-black' : 'navbar-light bg-white'
      }`}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          EpicBooks
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Browse
              </a>
            </li>
          </ul>
          <form className="d-flex ms-lg-3" role="search">
            <input
              type="search"
              className="form-control"
              placeholder="Cerca per titolo..."
              aria-label="Cerca libri"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </form>
          <button
            type="button"
            className={`btn ms-2 ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`}
            onClick={toggleTheme}
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default MyNav
