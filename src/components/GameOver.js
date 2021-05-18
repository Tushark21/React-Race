import React from 'react';
import { createBrowserHistory } from 'history';

class GameOver extends React.Component {

    constructor(props){
        super(props);
        this.history=createBrowserHistory();
    }

    render() {
        return (
            <div className="game_over" style={{visibility: this.props.isVisible}}>
                <span>GAME OVER</span>
                <span style={{fontSize: "60px"}}>Score: {this.props.score}</span>
                <button className="select_button game_over_button" onClick={() =>this.history.go(0)}>Replay</button>
                <button className="select_button game_over_button" onClick={() => this.history.goBack()}>Home</button>
            </div>
        );
    }
}

export default GameOver;
