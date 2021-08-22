import Header from './Header';
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import * as fp from "fingerpose";
import React from 'react';
import GameOver from './GameOver';

class GamePanel extends React.Component {
  constructor(props) {
    super(props);

    this.iframeRef = React.createRef();
    this.other=0;
    this.promptVisible="hidden";

    //Web Cam Config
    this.webcamRef = React.createRef();
    this.canvasRef = React.createRef();

    //Car Configs and Action Variable
    this.score=0;
    this.scoreSteps=10;
    this.speed = 0.5;
    this.player = {
      left: 48.2,
      top: 78,
      horizontalSpeed: 0,
      verticalSpeed: 0,
    }
    this.move = 'not';
    
    //Obstacles
    this.obstaclesCount=5;
    this.obstacles = [];
    for (let i = 0; i < this.obstaclesCount; i++) {
      this.obstacles.push({
        left: i * (100/this.obstaclesCount),
        top: -200-(i*50),
        speed: 0,
        rendered: false,
      });
    }

    //Bars
    this.bars = [];
    for (let i = -1; i < 3; i++) {
      this.temp = [];
      for (let j = 0; j < 3; j++) {
        this.temp.push({
          left: j * 16 + 42,
          top: i * 40,
        });
      }
      this.bars.push(this.temp);
    }

    this.randomIndex = 2;

    //User Events
    //Keyboard Event
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        this.player.horizontalSpeed = this.speed;
        this.move = 'right';
      }

      else if (event.key === 'ArrowLeft') {
        this.player.horizontalSpeed = -this.speed;
        this.move = 'left';
      }

      else if (event.key === 'ArrowUp') {
        this.player.verticalSpeed = -this.speed;
        this.move = 'up';
        this.changeSpeed(1);
      }

      else if (event.key === 'ArrowDown') {
        this.player.verticalSpeed = this.speed;
        this.move = 'down';
      }
      else if (event.key === ' ') {
        this.move = 'space';
        this.changeSpeed(-1);
      }
    });

    document.body.addEventListener('keyup', (event) => {
      this.move = 'not';
      this.player.verticalSpeed = 0;
      this.player.horizontalSpeed = 0;
    });

    //for mobile events
    document.body.addEventListener('touchstart', (event) => {
      const x = event.touches[0].clientX;
      const y = event.touches[0].clientY;
      const bodyWidth = document.body.offsetWidth;
      const bodyHeight = document.body.offsetHeight;

      if (x > bodyWidth * .7) {
        this.player.horizontalSpeed = this.speed;
        this.move = 'right';
      }

      else if (x < bodyWidth * .3) {
        this.player.horizontalSpeed = -this.speed;
        this.move = 'left';
      }

      else if (y < bodyHeight * .6) {
        this.player.verticalSpeed = -this.speed;
        this.move = 'up';
        this.changeSpeed(1);
      }

      else if (y > bodyHeight * .6) {
        this.move = 'down';
        this.player.verticalSpeed = this.speed;
        this.changeSpeed(-1);
      }
    });

    document.body.addEventListener('touchend', (event) => {
      this.move = 'not';
    });

    //Hand Gesture Controls
    this.runHandpose = async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded.");
      
      //*************loading animation will be added here****************

      //Starts after model gets loaded
      //Game Loop
      this.timerID1 = setInterval(
        () => {
          this.gameLoop();
          
          this.other+=1;
          if(this.other===10){
            this.generateIndex();
            this.detect(net);
            this.other=0;
          }
        },
        20
      );
    };

    ///*////////////////////////
    this.detect = async (net) => {
      //Check data is available
      if (
        typeof this.webcamRef.current !== "undefined" &&
        this.webcamRef.current !== null &&
        this.webcamRef.current.video.readyState === 4
      ) {

        //Get Video Properties
        const video = this.webcamRef.current.video;
        const videoWidth = this.webcamRef.current.video.videoWidth;
        const videoHeight = this.webcamRef.current.video.videoHeight;

        //Set video width
        this.webcamRef.current.video.width = videoWidth;
        this.webcamRef.current.video.height = videoHeight;

        //Set canvas height and width
        this.canvasRef.current.width = videoWidth;
        this.canvasRef.current.height = videoHeight;

        //Make Detections
        //console.log("before:",Date.now());
        const hand = await net.estimateHands(video);
        this.gameLoop();
        //console.log("hand", hand);
        //console.log("after :",Date.now());

        //Draw hand pointer and seperator
        const ctx = this.canvasRef.current.getContext("2d");

        const canvasUpMidX = videoWidth / 2;
        const cavasUpMidY = 2;

        const canvasDownMidX = videoWidth / 2;
        const cavasDownMidY = videoHeight;

        ctx.beginPath();
        ctx.moveTo(
          canvasUpMidX,
          cavasUpMidY,
        );
        ctx.lineTo(
          canvasDownMidX,
          cavasDownMidY,
        );
        ctx.strokeStyle = "gold";
        ctx.lineWidth = 4;
        ctx.stroke();

        //drawHand(hand, ctx,videoWidth);
        if (hand.length > 0) {
          // Loop through each prediction
          var prediction = hand[0];

          const boundingBox = prediction.boundingBox;
          const bottomRight = boundingBox.bottomRight;
          const topLeft = boundingBox.topLeft;

          const centerX = videoWidth - (topLeft[0] + bottomRight[0]) / 2;
          const centerY = (topLeft[1] + bottomRight[1]) / 2;

          //console.log(centerX);
          //Action
          if (centerX < videoWidth / 2) {
            this.player.horizontalSpeed = -this.speed;
            this.move = 'left';
          }
          else {
            this.player.horizontalSpeed = this.speed;
            this.move = 'right';
          }

          ctx.beginPath();
          ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
          ctx.fillStyle = "#000000";
          ctx.fill();
        }
        else {
          this.move = 'not';
          this.player.verticalSpeed = 0;
          this.player.horizontalSpeed = 0;
        }
      }
    };
  }

  componentDidMount() {
    this.runHandpose();
  }

  componentWillUnmount() {
    clearInterval(this.timerID1);
    //clearInterval(this.timerID2);
  }

  generateIndex() {
    this.randomIndex = Math.floor(Math.random() * this.obstaclesCount);
  }

  gameLoop() {
    //var currTime=new Date();
    //console.log("Game Loop: ");

    //Actions for each events
    this.player.left += this.player.horizontalSpeed;
    this.player.top += this.player.verticalSpeed;

    this.player.left = this.player.left < 32 ? 32 : this.player.left;
    this.player.left = this.player.left > 64 ? 64 : this.player.left;

    this.player.top = this.player.top < 50 ? 50 : this.player.top;
    this.player.top = this.player.top > 78 ? 78 : this.player.top;

    //for new obstacles
    const num = this.randomIndex;
    if (!this.obstacles[num].rendered) {
      let leftPos = Math.floor(Math.random() * 36) + 30;
      leftPos = leftPos < 32 ? 32 : leftPos;
      leftPos = leftPos > 64 ? 64 : leftPos;
      this.obstacles[num].left = leftPos;
      this.obstacles[num].speed = (Math.random() * 0.2) + this.speed + 0.2;
      this.obstacles[num].rendered = true;
    }

    //for obstacles movement
    //4 may be changed
    for (let i = 0; i < this.obstaclesCount; i++) {
      if (this.obstacles[i].rendered) {
        this.obstacles[i].top += this.obstacles[i].speed + this.speed;
      }

      if (this.obstacles[i].top > 100) {
        this.obstacles[i].rendered = false;
        this.obstacles[i].top = -200;
        this.obstacles[i].left = i * 20;
        this.score+=this.scoreSteps;
      }
    }

    //collisions between obstacles
    for (let i = 0; i < this.obstaclesCount; i++) {
      for (let j = 0; j < this.obstaclesCount; j++) {
        if (this.isCollided(this.createRect(this.obstacles[i]), this.createRect(this.obstacles[j]))) {
          if (this.obstacles[i].top < this.obstacles[j].top) {
            if (this.obstacles[i].speed >= this.obstacles[j].speed) {
              this.obstacles[i].speed -= 0.1;
            }
            //this.obstacles[i].top = this.obstacles[j].top - 30;
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
    }

    //collisions between obstacles and car
    for (let i = 0; i < this.obstaclesCount; i++) {
      if (this.isCollided(this.createRect(this.player), this.createRect(this.obstacles[i]))) {
        ////////////////////////////////////////////
        clearInterval(this.timerID1);
        //clearInterval(this.timerID2);
        this.promptVisible="visible";
        break;
      }
    }

    //console.log("Before State");
    this.setState({});
  }

  changeSpeed(factor) {
    this.speed += factor * 0.1;

    this.speed = this.speed < 0.3 ? 0.3 : this.speed;
    this.speed = this.speed > 1 ? 1 : this.speed;
  }

  createRect(obj) {
    return ({
      left: obj.left,
      right: obj.left + 5,
      top: obj.top,
      bottom: obj.top + 20
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
      <div className={'game_panel_container'} >
        <Header></Header>
        <img alt={'car-sprite'} className={'sprite'} style={{ left: this.player.left + '%', top: this.player.top + '%' }} src={require('../assets/car1.png').default}></img>

        {/* boundary */}
        <div className={'boundary'} style={{ left: '30%' }} ></div>
        <div className={'boundary'} style={{ left: '70%' }} ></div>
        
        {/* road bars mid */}
        <div className={'bars'} style={{ left: this.bars[0][0].left + '%', top: this.bars[0][0].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[1][0].left + '%', top: this.bars[1][0].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[2][0].left + '%', top: this.bars[2][0].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[3][0].left + '%', top: this.bars[3][0].top + '%' }} ></div>

        {/* road bars left */}
        <div className={'bars'} style={{ left: this.bars[0][1].left + '%', top: this.bars[0][1].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[1][1].left + '%', top: this.bars[1][1].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[2][1].left + '%', top: this.bars[2][1].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[3][1].left + '%', top: this.bars[3][1].top + '%' }} ></div>

        {/* road bars right */}
        {/*
        <div className={'bars'} style={{ left: this.bars[0][2].left + '%', top: this.bars[0][2].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[1][2].left + '%', top: this.bars[1][2].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[2][2].left + '%', top: this.bars[2][2].top + '%' }} ></div>
        <div className={'bars'} style={{ left: this.bars[3][2].left + '%', top: this.bars[3][2].top + '%' }} ></div>
        */}

        {/* Obstructions */}
        <img alt={'obstacle'} className={'sprite'} style={{ left: this.obstacles[0].left + '%', top: this.obstacles[0].top + '%' }} src={require('../assets/car_down1.png').default}></img>
        <img alt={'obstacle'} className={'sprite'} style={{ left: this.obstacles[1].left + '%', top: this.obstacles[1].top + '%' }} src={require('../assets/car_down2.png').default}></img>
        <img alt={'obstacle'} className={'sprite'} style={{ left: this.obstacles[2].left + '%', top: this.obstacles[2].top + '%' }} src={require('../assets/car_down3.png').default}></img>
        <img alt={'obstacle'} className={'sprite'} style={{ left: this.obstacles[3].left + '%', top: this.obstacles[3].top + '%' }} src={require('../assets/car_down4.png').default}></img>
        {/*<img alt={'obstacle'} className={'sprite'} style={{ left: this.obstacles[4].left + '%', top: this.obstacles[4].top + '%' }} src={require('../assets/car_down5.png').default}></img>*/}
      
        <span className="score_banner">Score: {this.score}</span>
    
        <Webcam ref={this.webcamRef} className="video_area"/>
        <canvas ref={this.canvasRef} className="video_area"/>
        
        
{/*
      <iframe ref={this.iframeRef} src="http://localhost:3001/" allow="camera;microphone" className="video_area"></iframe>
*/}
      <GameOver score={this.score} isVisible={this.promptVisible}/>
      </div>
    );
  }
}

function Bar(props) {
  return (<div className={'bars'} style={{ left: props.left + '%', top: props.top + '%' }} ></div>);
}

export default GamePanel;