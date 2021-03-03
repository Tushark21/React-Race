import '../style/App.css';
import '../style/button.css';
import GamePanel from '../components/GamePanel';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Header from '../components/Header';
import PrimaryLayout from '../layout/PrimaryLayout';

function GameScreen() {
  return (
    <PrimaryLayout>
      <GamePanel />
    </PrimaryLayout>
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