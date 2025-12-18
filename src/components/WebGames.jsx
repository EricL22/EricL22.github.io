import { Navigation, Footer } from './'
import mushroom from '../assets/image3.png'
import './WebGames.css'

function WebGames() {
  return (
    <>
      <Navigation />

      <main className="webgames">
        <section className="game">
          <img src={mushroom} alt="" />

          <div className="game-info">
            <h2>Stuffy War</h2>
            <p className="subtitle">Stick War-style fan game</p>

            <h3>Prerelease Build</h3>
            <ul>
              <li>1/12/2025: Initial prototype</li>
              <li>1/18: Added attack/death sounds and health bars</li>
            </ul>

            <a href="/unity/stuffystick"><button>Play</button></a>
          </div>
        </section>

        <section className="game">
          <img src={mushroom} alt="" />

          <div className="game-info">
            <h2>Blood Typing Game</h2>
            <p className="subtitle">
              Learn to identify the different blood types
            </p>

            <h3>Prerelease Build</h3>
            <ul>
              <li>2/6/2021: Initial prototype</li>
              <li>
                8/2022: Discontinued to the release of Nobel Prize’s <a href="https://educationalgames.nobelprize.org/educational/medicine/bloodtypinggame/index.php">2021
                version</a>.
              </li>
            </ul>

            <a href="/unity/bloodtype"><button>Play</button></a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default WebGames
