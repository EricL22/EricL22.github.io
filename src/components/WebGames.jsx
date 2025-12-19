import { Navigation, Footer } from './'
import mushroom from '../assets/image3.png'
import './WebGames.css'

function WebGames() {
  return (
    <main className="webgames">
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
        </div>

        <div className="personal-right">
          <img src={mushroom} alt="Personal project visual" />
        </div>
      </section>
    </main>
  )
}

export default WebGames
