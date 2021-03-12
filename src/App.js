import React from 'react';
import { Routes } from './routes';

class App extends React.Component {
  constructor(props){
    super(props);
    this.sound='ON';
    this.carIndex=1;
  }

  toggleSound(){
    this.sound=this.sound==='ON'?'OFF':'ON';
  }

  changeCarIndex(index){
    this.carIndex=index;
  }

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}
export default App;