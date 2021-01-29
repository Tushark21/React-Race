import '../style/App.css';
import '../style/button.css';
import '../style/game-panel.css';
import Button from '../components/Button';
import Heading from '../components/Heading';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {useHistory} from 'react-router-dom';

function Menu() {

  const history = useHistory();
  
  return (
    <div>
      <Heading title={"Menu"} />

      <Button text={"Start"} history={history} loc={"gamescreen"}>

      </Button>
      <br></br>
      <Button text={"Option"} history={history} loc={"options"}>

      </Button>
      <br></br>
      <Button text={"About"} history={history} loc={"about"}>

      </Button>
      <br></br>
      <Button text={"Exit"} history={history} loc={"exit"}>

      </Button>

    </div>
  );
}

export default Menu;



/*


      <Router>
        <Button text={"Start"} loc={"gamescreen"}>
          <Link to="/gamescreen">GameScreen</Link>
        </Button>
        <br></br>
        <Button text={"Option"} loc={"option"}>
          <Link to="/option">Options</Link>
        </Button>
        <br></br>
      <Button text={"About"} loc={"about"}>
          <Link to="/about">About</Link>
        </Button>
        <br></br>
        <Button text={"Exit"} loc={"Exit"}>
          <Link to="/about">About</Link>
        </Button>
        <br></br>

            <Switch>
            <Route path="/about">
              <About />
            </Route>

            <Route path="/gamescreen">
              <GameScreen />
            </Route>

            <Route path="/options">
              <Options />
              </Route >

              <Route path="/">
                <Menu />
              </Route>

            </Switch>
        </Router>


<Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {App} />
         <Route path = "option" component = {GameScreen} />
         <Route path = "about" component = {GameScreen} />
         <Route path = "GameScreen" component = {GameScreen} />
      </Route>
   </Router>
*/