import React from 'react';
import car from '../assets/car1.png'

class GamePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canvas: null, ctx: null }
    this.carPos = {
      left: 10,
    }

    this.carObj = new Image();
    this.carObj.src = require('../assets/car1.png').default;
  }

  componentDidMount() {
    const tempCanvas = this.refs.canvas;

    this.setState({
      canvas: tempCanvas
    });

    const tempCtx = tempCanvas.getContext("2d");

    this.setState({

      ctx: tempCtx
    });

    //this.carObj.height = tempCanvas.height/4;
    //this.carObj.width = tempCanvas.width/4;
    tempCtx.drawImage(this.carObj, this.carPos.left, 10, tempCanvas.width/10,tempCanvas.height/3);
  }

  render() {
    const canvas=this.state.canvas;
    const ctx=this.state.ctx;

    document.body.addEventListener('keydown', (event) => {
      console.log(event.key);
      if (event.key === 'ArrowRight') {
        this.carPos.left += 1;
        console.log(this.carPos.left);
      }

      else if (event.key === 'ArrowLeft') {
        this.carPos.left -= 1;
        console.log(this.carPos.left);
      }

      this.carPos.left = this.carPos.left > this.state.canvas.width-10 ? this.state.canvas.width-10 : this.carPos.left;
      this.carPos.left = this.carPos.left < 10 ? 10 : this.carPos.left;

      this.state.ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
      this.state.ctx.drawImage(this.carObj, this.carPos.left, 10,this.state.canvas.width/10,this.state.canvas.height/3);

    });

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }} >
        <canvas id={"mycanvas"} ref='canvas' className="game_panel" >
        </canvas>
      </div>

    );
  }
}

export default GamePanel;
