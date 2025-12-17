import React from 'react'
import fbLogo from '../assets/facebook.svg'
import liLogo from '../assets/linkedin.svg'
import ytLogo from '../assets/youtube.svg'
import igLogo from '../assets/instagram.svg'
import './Footer.css'

function Footer() {
  return (
    <>
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
    </>
  )
}

export default Footer
