import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      togg: false,
      classTop: 'icon top',
      classMid: 'icon middle',
      classBottom: 'icon bottom'
    };
  }

  toggle=()=> {
    console.log(this.state.togg);
    if (! this.state.togg) {
      this.setState({
        togg: true,
        classTop: 'icon top move_left',
        classMid: 'icon middle mid_rotate',
        classBottom: 'icon bottom move_right'
      });
    }
    else{
      this.setState({
        togg: false,
        classTop: 'icon top',
        classMid: 'icon middle',
        classBottom: 'icon bottom'
      });
    }

  }

  render() {
    return (
      <div style={{ backgroundColor: '', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ marginLeft: '10px' }}>
          <img src={require('../assets/app-logo.png').default} style={{width: '60px', height: '60px'}}></img>
        </div>
        <div id="container" onClick={this.toggle}>
          <div >
            <span id="topLine" className={this.state.classTop}></span>
            <span id="midLine" className={this.state.classMid}></span>
            <span id="bottomLine" className={this.state.classBottom}></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

/*
document.getElementById("container").addEventListener("click",function(){
            document.getElementById("topLine").classList.toggle("move_left");
            document.getElementById("midLine").classList.toggle("mid_rotate");
            document.getElementById("bottomLine").classList.toggle("move_right");
        });
        */

