import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import fbLogo from './assets/facebook.svg'
import liLogo from './assets/linkedin.svg'
import ytLogo from './assets/youtube.svg'
import igLogo from './assets/instagram.svg'
import './Portfolio.css'

function Portfolio() {
  return (
    <div className="page">
      {/* Top Navigation */}
      <header className="nav">
        <nav className="nav-links">
          <a href="#">Immersive Chinese</a>
          <a href="#">Web Games</a>
          <a href="#">Linguistics</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Eric Lok’s Portfolio</h1>
          <p>
            Subheading that sets up context, shares more info about the website,
            or generally gets people psyched to keep scrolling.
          </p>
        </div>
      </section>

      {/* Personal Projects */}
      <section className="personal-projects">
        <div className="personal-left">
          <h2>Personal Projects</h2>

          <div className="project-block">
            <h3>Immersive Chinese</h3>
            <p>Learn Chinese as a Second Language just as a native would!</p>
          </div>

          <div className="project-block">
            <h3>Web Games</h3>
            <p>Various projects incorporating Unity’s WebGL engine.</p>
          </div>

          <div className="project-block">
            <h3>Misc. Linguistic Ideas</h3>
            <p>
              Tools including character conversions and specifications. May be
              useful for highly niche fields of East Asian studies.
            </p>
          </div>

          <div className="buttons">
            <button className="btn-primary">Button</button>
            <button className="btn-secondary">Secondary button</button>
          </div>
        </div>

        <div className="personal-right">
          <img src={reactLogo} alt="Personal project visual" />
        </div>
      </section>

      {/* Collaborative Projects */}
      <section className="collaborative-projects">
        <h2>Collaboratory Projects</h2>

        <div className="card-grid">
          <div className="card">
            <img src={viteLogo} alt="Climate UAV" />
            <h4>Climate UAV</h4>
            <p>Body text for whatever you’d like to add more to the subheading.</p>
          </div>

          <div className="card">
            <img src={viteLogo} alt="Fitness Tracker" />
            <h4>Fitness Tracker Application</h4>
            <p>Body text for whatever you’d like to expand on the main point.</p>
          </div>

          <div className="card">
            <img src={viteLogo} alt="King of the Ring" />
            <h4>King of the Ring</h4>
            <p>Body text for whatever you’d like to share more.</p>
          </div>
        </div>
      </section>
	  
	  {/* Divider */}
      <div className="footer-divider" />

      {/* Footer */}
      <footer className="footer">
        <div className="socials">
          <a href="https://twitter.com" aria-label="Facebook">
            <img src={fbLogo} alt="" />
          </a>
          <a href="https://twitter.com" aria-label="LinkedIn">
            <img src={liLogo} alt="" />
          </a>
          <a href="https://twitter.com" aria-label="Youtube">
            <img src={ytLogo} alt="" />
          </a>
          <a href="https://twitter.com" aria-label="Instagram">
            <img src={igLogo} alt="" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio
