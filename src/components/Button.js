import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <button className="button_class">
              {this.props.text}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Button;
