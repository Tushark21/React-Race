import './App.css';
import './style/button.css';
import './style/game-panel.css';
import Button from './components/Button';
import Header from './components/Header';
import './../node_modules/bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <div className="App">
      <Header />

      <Button text={"New Game"}/>
      <br></br>
      <Button text={"Option"}/>
      <br></br>
      <Button text={"About"}/>
      <br></br>
      <Button text={"Exit"}/>
      <br></br>
      

    </div>
  );
}

export default App;