import { Routes, Route } from 'react-router-dom'
import { Portfolio, Footer, Navigation, WebGames } from './components'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/unity" element={<Portfolio />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
