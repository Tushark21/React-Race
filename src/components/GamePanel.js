import React from 'react';

class GamePanel extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-8">
            <canvas id={"mycanvas"} className="game_panel">
                
            </canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default GamePanel;
