import '../style/App.css';
import '../style/button.css';
import GamePanel from '../components/GamePanel';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

function GameScreen() {
  return (
    <div className="App">
      <Heading title={"Game View"}/>

      <GamePanel />
      
    </div>
  );
}

export default GameScreen;

/*
<Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "contact" component = {Contact} />
      </Route>
   </Router>
*/