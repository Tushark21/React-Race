import React from 'react';
import { Routes } from './routes';

const SoundContext = React.createContext('ON');

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
      <div className={"App"}>
      <SoundContext.Provider value="ON">
        <Routes />
        </SoundContext.Provider>
      </div>
    );
  }
}
export default App;