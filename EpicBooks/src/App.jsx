import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import Welcome from './components/Welcome'
import AllTheBooks from './components/AllTheBooks'

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <MyNav />

      <main className="flex-grow-1 py-4">
        <div className="container">
          <Welcome />
          <AllTheBooks />
        </div>
      </main>

      <MyFooter />
    </div>
  )
}

export default App