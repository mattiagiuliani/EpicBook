import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import Welcome from './components/Welcome'
import AllTheBooks from './components/AllTheBooks'
import NotFound from './components/NotFound'
import BookDetails from './components/BookDetails'
import { ThemeContext } from './context/ThemeContext'

function App() {
  const [searchValue, setSearchValue] = useState('')
  const [theme, setTheme] = useState('light')
  const toggleTheme = () =>
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-vh-100 d-flex flex-column ${
          theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'
        }`}
      >
        <MyNav searchValue={searchValue} onSearchChange={setSearchValue} />

        <main className="flex-grow-1 py-4">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Welcome />
                    <AllTheBooks searchValue={searchValue} />
                  </>
                }
              />
              <Route path="/book/:asin" element={<BookDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <MyFooter />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
