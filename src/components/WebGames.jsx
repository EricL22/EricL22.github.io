import { Navigation, Footer } from './'
import mushroom from '../assets/image3.png'
import './WebGames.css'

function WebGames() {
  return (
    <main className="webgames">
      <section className="game">
        <div className="personal-right">
          <img src={mushroom} alt="Personal project visual" />
        </div>
        
        <div className="personal-left">
          <h2>Personal Projects</h2>
        </div>
      </section>
    </main>
  )
}

export default WebGames
