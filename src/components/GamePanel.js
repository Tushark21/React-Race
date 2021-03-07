import React from 'react';
import car from '../assets/car1.png'

class GamePanel extends React.Component {
  constructor(props) {
    super(props);

    this.playerRefs = React.createRef();
    this.speedIncreased = 0;

    this.obstacles = [];

    for (let i = 0; i < 5; i++) {
      this.obstacles.push({
        ref: React.createRef(),
        left: i * 20,
        top: -200,
        speed: 0,
        rendered: false,
      });
    }

    //console.log(this.obstacles);
    this.randomIndex = 0;

    this.state = {
      left: 40,
      top: 75
    }

    document.body.addEventListener('keydown', (event) => {
      console.log(event.key);
      const node = this.playerRefs.current;

      if (event.key === 'ArrowRight') {
        let newValue = this.state.left + 1;
        newValue = newValue > 90 ? 90 : newValue;

        this.setState({
          left: newValue
        })
      }

      else if (event.key === 'ArrowLeft') {
        let newValue = this.state.left - 1;
        newValue = newValue < 10 ? 10 : newValue;

        this.setState({
          left: newValue
        })
      }

      else if (event.key === 'ArrowUp') {
        let newValue = this.state.top - 1;
        newValue = newValue < 50 ? 50 : newValue;
        this.changeSpeed(1);

        this.setState({
          top: newValue
        })
      }

      else if (event.key === 'ArrowDown') {
        let newValue = this.state.top + 1;
        newValue = newValue > 75 ? 75 : newValue;
        this.changeSpeed(-1);

        this.setState({
          top: newValue
        })
      }

    });

  }

  componentDidMount() {
    this.timerID1 = setInterval(
      () => this.gameLoop(),
      10
    );

    this.timerID2 = setInterval(
      () => this.generateIndex(),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID1);
    clearInterval(this.timerID2);
  }

  generateIndex() {
    this.randomIndex = Math.floor(Math.random() * 5);
  }

  gameLoop() {
    const num = this.randomIndex;

    if (!this.obstacles[num].rendered) {
      this.obstacles[num].left += Math.floor(Math.random() * 10);
      this.obstacles[num].speed = (Math.random() * 1.1) + this.speedIncreased;
      this.obstacles[num].rendered = true;
    }

    for (let i = 0; i < 5; i++) {
      if (this.obstacles[i].rendered) {
        this.obstacles[i].top += this.obstacles[i].speed;
      }

      if (this.obstacles[i].top > 100) {
        this.obstacles[i].rendered = false;
        this.obstacles[i].top = -200;
        this.obstacles[i].left = i * 20;
      }
    }

    this.setState({});
  }

  changeSpeed(factor) {
    this.speedIncreased += factor * 0.1;
    for (let i = 0; i < 5; i++) {
      if (this.speedIncreased > 0.0 && this.speedIncreased < 1.0) {
        if (this.obstacles[i].rendered) {
          this.obstacles[i].speed += factor * 0.1;
        }
      }
      else{
        this.speedIncreased=this.speedIncreased<0?0:this.speedIncreased;
        this.speedIncreased=this.speedIncreased>1?1:this.speedIncreased;
      }
    }
  }

  render() {

    return (
      <div style={{ height: '100%', backgroundColor: '#00000080', overflow: 'hidden' }} >
        <img ref={this.playerRefs} style={{ position: 'relative', left: this.state.left + '%', top: this.state.top + '%' }} src={require('../assets/car1.png').default}></img>

        {/* Obstructions */}
        <img ref={this.obstacles[0].ref} style={{ display: 'block', position: 'relative', left: this.obstacles[0].left + '%', top: this.obstacles[0].top + '%' }} src={require('../assets/car_down1.png').default}></img>
        <img ref={this.obstacles[1].ref} style={{ display: 'block', position: 'relative', left: this.obstacles[1].left + '%', top: this.obstacles[1].top + '%' }} src={require('../assets/car_down2.png').default}></img>
        <img ref={this.obstacles[2].ref} style={{ display: 'block', position: 'relative', left: this.obstacles[2].left + '%', top: this.obstacles[2].top + '%' }} src={require('../assets/car_down3.png').default}></img>
        <img ref={this.obstacles[3].ref} style={{ display: 'block', position: 'relative', left: this.obstacles[3].left + '%', top: this.obstacles[3].top + '%' }} src={require('../assets/car_down4.png').default}></img>
        <img ref={this.obstacles[4].ref} style={{ display: 'block', position: 'relative', left: this.obstacles[4].left + '%', top: this.obstacles[4].top + '%' }} src={require('../assets/car_down5.png').default}></img>

      </div>

    );
  }
}

export default GamePanel;
