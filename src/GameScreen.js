import './App.css';
import './style/button.css';
import GamePanel from './components/GamePanel';
import Header from './components/Header';
import './../node_modules/bootstrap/dist/css/bootstrap.css'

function GameScreen() {
  return (
    <div className="App">
      <Header />

      <GamePanel />
      
    </div>
  );
}

export default GameScreen;