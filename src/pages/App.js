import React from 'react';
import '../style/App.css';
import '../style/button.css';
import '../style/game-panel.css';
import Header from '../components/Header';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import Menu from './Menu';
import About from './About';
import Options from './Options';
import GameScreen from './GameScreen';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-10">
              
              <Router>
                <Switch>
                  <Route path="/" exact component={Menu} />
                  <Route path="/gamescreen" exact component={GameScreen} />
                  <Route path="/options" exact component={Options} />
                  <Route path="/about" exact component={About} />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

/*
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