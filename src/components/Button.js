import React from 'react';

class Button extends React.Component {

  handleClick = (history, loc) => {
    console.log(loc);
    if (loc === '/exit') {
      window.close();
    }
    else {
      history.push(loc);
    }
  }

  render() {
    return (
      <div >
        <button className="button_class" onClick={() => (this.handleClick(this.props.history, '/' + this.props.loc))}>
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default Button;
