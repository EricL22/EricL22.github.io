import { NavLink, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  return (
    <header className="nav">
      <nav className="nav-links">
        <a href="#">Immersive Chinese</a>
        <NavLink to="/unity">Web Games</NavLink>
        <a href="/ling.html">Linguistics</a>

        {!isHome && (
          <NavLink to="/" className="home-button">
            Home
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Navigation
