import React from 'react';
import Header from './Header';

class GamePanel extends React.Component {
  constructor(props) {
    super(props);

    this.playerRefs = React.createRef();

    this.speed = 0.5;
    this.horizontalSpeed = 0.5;
    this.verticalSpeed = 0.5;
    this.move = 'not';

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

    this.bars = [];

    for (let i = -1; i < 3; i++) {
      this.temp = [];
      for (let j = 0; j < 3; j++) {
        this.temp.push({
          left: j * 20 + 30,
          top: i * 40,
        });
      }
      this.bars.push(this.temp);
    }

    //console.log(this.obstacles);
    this.randomIndex = 0;

    this.state = {
      left: 48.2,
      top: 75
    }

    document.body.addEventListener('keydown', (event) => {
      console.log(event.key);
      //const node = this.playerRefs.current;
      //console.log('size',node.width);

      if (event.key === 'ArrowRight') {
        this.move = 'right';
      }

      else if (event.key === 'ArrowLeft') {
        this.move = 'left';
      }

      else if (event.key === 'ArrowUp') {
        this.move = 'up';
        this.changeSpeed(1);
      }

      else if (event.key === 'ArrowDown') {
        this.move = 'down';
        
      }
      else if (event.key === ' ') {
        this.move = 'space';
        this.changeSpeed(-1);
      }
    });

    document.body.addEventListener('keyup', (event) => {
      this.move = 'not';
    });

    //for mobile events
    document.body.addEventListener('touchstart', (event) => {
      //console.log(document.body.offsetWidth);
      //console.log(document.body.offsetHeight);
      //console.log('x:',event.touches[0].clientX);
      //console.log('y:',event.touches[0].clientY);

      const x=event.touches[0].clientX;
      const y=event.touches[0].clientY;
      const bodyWidth=document.body.offsetWidth;
      const bodyHeight=document.body.offsetHeight;

      //const node = this.playerRefs.current;
      //console.log('size',node.width);

      if (x>bodyWidth*.8) {
        this.move = 'right';
      }

      else if (x<bodyWidth*.2) {
        this.move = 'left';
      }

      else if (y<bodyHeight*.6) {
        this.move = 'up';
        this.changeSpeed(1);
      }

      else if (y>bodyHeight*.6) {
        this.move = 'down';
        this.changeSpeed(-1);
      }
    });

    document.body.addEventListener('touchend', (event) => {
      this.move = 'not';
      //console.log(event)
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
    if (this.move === 'up') {
      let newValue = this.state.top - this.verticalSpeed;
      newValue = newValue < 50 ? 50 : newValue;
      this.setState({
        top: newValue
      });
    }
    else if (this.move === 'down') {
      let newValue = this.state.top + this.verticalSpeed;
      newValue = newValue > 75 ? 75 : newValue;
      this.setState({
        top: newValue
      });
    }
    else if (this.move === 'left') {
      let newValue = this.state.left - this.horizontalSpeed;
      newValue = newValue < 22 ? 22 : newValue;
      this.setState({
        left: newValue
      });
    }
    else if (this.move === 'right') {
      let newValue = this.state.left + this.horizontalSpeed;
      newValue = newValue > 74 ? 74 : newValue;
      this.setState({
        left: newValue
      });
    }

    const num = this.randomIndex;

    //for new obstacles
    if (!this.obstacles[num].rendered) {
      let leftPos = Math.floor(Math.random() * 50) + 22;
      leftPos = leftPos < 22 ? 22 : leftPos;
      leftPos = leftPos > 74 ? 74 : leftPos;
      this.obstacles[num].left = leftPos;
      this.obstacles[num].speed = (Math.random() * 1) + this.speed + 0.2;
      this.obstacles[num].rendered = true;
    }

    //for obstacles movement
    for (let i = 0; i < 5; i++) {
      if (this.obstacles[i].rendered) {
        this.obstacles[i].top += this.obstacles[i].speed + this.speed;
      }

      if (this.obstacles[i].top > 100) {
        this.obstacles[i].rendered = false;
        this.obstacles[i].top = -200;
        this.obstacles[i].left = i * 20;
      }
    }

    //collisions between obstacles
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.isCollided(this.createRect(this.obstacles[i]), this.createRect(this.obstacles[j]))) {
          if (this.obstacles[i].top < this.obstacles[j].top) {
            if (this.obstacles[i].speed >= this.obstacles[j].speed) {
              this.obstacles[i].speed -= 0.1;
            }
            this.obstacles[i].top = this.obstacles[j].top - 30;
          }
        }
      }
    }

    //for bars movement
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        this.bars[i][j].top += this.speed;
        if (this.bars[i][j].top > 120) {
          this.bars[i][j].top = -40;
        }
      }
      this.bars.push(this.temp);
    }

    const playerObj = {
      left: this.state.left,
      top: this.state.top
    }
    for (let i = 0; i < 5; i++) {
      if (this.isCollided(this.createRect(playerObj), this.createRect(this.obstacles[i]))) {
        //clearInterval(this.timerID1);
        //clearInterval(this.timerID2);
        break;
      }
    }

    this.setState({});
  }

  changeSpeed(factor) {
    this.speed += factor * 0.1;

    this.speed = this.speed < 0.5 ? 0.5 : this.speed;
    this.speed = this.speed > 1.5 ? 1.5 : this.speed;
  }

  createRect(obj) {
    return ({
      left: obj.left,
      right: obj.left + 5,
      top: obj.top,
      bottom: obj.top + 30
    });
  }

  isCollided(obj1, obj2) {
    //object 1 is always below object 2
    if (obj1.top < obj2.top) {
      const tempObj = obj1;
      obj1 = obj2;
      obj2 = tempObj;
    }

    //right-bottom
    if (this.isInside(obj1, obj2.right, obj2.bottom)) {
      return true;
    }

    //left-bottom
    else if (this.isInside(obj1, obj2.left, obj2.bottom)) {
      return true;
    }

    //right-top
    if (this.isInside(obj1, obj2.right, obj2.top)) {
      return true;
    }

    //left-top
    if (this.isInside(obj1, obj2.left, obj2.top)) {
      return true;
    }

    //mid-bottom
    if (this.isInside(obj1, obj2.left + 2, obj2.bottom)) {
      return true;
    }

    return false;
  }

  isInside(rect, x, y) {
    if ((x > rect.left && x < rect.right) && (y > rect.top && y < rect.bottom)) {
      return true;
    }
    return false;
  }

  render() {

    return (
      <div style={{ height: '100%', backgroundColor: '#00000080', overflow: 'hidden' }} >
        <Header></Header>
        <img alt='sprite' ref={this.playerRefs} style={{ zIndex: '1', position: 'fixed', left: this.state.left + '%', top: this.state.top + '%' }} src={require('../assets/car1.png').default}></img>

        {/* boundary */}
        <div style={{ width: '1.5%', height: '100%', zIndex: '0', backgroundColor: 'grey', position: 'fixed', left: '20%', top: '0%' }} ></div>
        <div style={{ width: '1.5%', height: '100%', zIndex: '0', backgroundColor: 'grey', position: 'fixed', left: '80%', top: '0%' }} ></div>

        {/* road bars mid */}
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[0][0].left + '%', top: this.bars[0][0].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[1][0].left + '%', top: this.bars[1][0].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[2][0].left + '%', top: this.bars[2][0].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[3][0].left + '%', top: this.bars[3][0].top + '%' }} ></div>

        {/* road bars left */}
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[0][1].left + '%', top: this.bars[0][1].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[1][1].left + '%', top: this.bars[1][1].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[2][1].left + '%', top: this.bars[2][1].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[3][1].left + '%', top: this.bars[3][1].top + '%' }} ></div>

        {/* road bars right */}
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[0][2].left + '%', top: this.bars[0][2].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[1][2].left + '%', top: this.bars[1][2].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[2][2].left + '%', top: this.bars[2][2].top + '%' }} ></div>
        <div style={{ width: '1.5%', height: '20%', zIndex: '0', backgroundColor: 'white', position: 'fixed', left: this.bars[3][2].left + '%', top: this.bars[3][2].top + '%' }} ></div>


        {/* Obstructions */}
        <img alt='sprite' ref={this.obstacles[0].ref} style={{ zIndex: '1', display: 'block', position: 'fixed', left: this.obstacles[0].left + '%', top: this.obstacles[0].top + '%' }} src={require('../assets/car_down1.png').default}></img>
        <img alt='sprite' ref={this.obstacles[1].ref} style={{ zIndex: '1', display: 'block', position: 'fixed', left: this.obstacles[1].left + '%', top: this.obstacles[1].top + '%' }} src={require('../assets/car_down2.png').default}></img>
        <img alt='sprite' ref={this.obstacles[2].ref} style={{ zIndex: '1', display: 'block', position: 'fixed', left: this.obstacles[2].left + '%', top: this.obstacles[2].top + '%' }} src={require('../assets/car_down3.png').default}></img>
        <img alt='sprite' ref={this.obstacles[3].ref} style={{ zIndex: '1', display: 'block', position: 'fixed', left: this.obstacles[3].left + '%', top: this.obstacles[3].top + '%' }} src={require('../assets/car_down4.png').default}></img>
        <img alt='sprite' ref={this.obstacles[4].ref} style={{ zIndex: '1', display: 'block', position: 'fixed', left: this.obstacles[4].left + '%', top: this.obstacles[4].top + '%' }} src={require('../assets/car_down5.png').default}></img>

      </div>

    );
  }
}

export default GamePanel;
