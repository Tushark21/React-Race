import React from 'react';

class Heading extends React.Component {

  render() {
    return (
      <div className="heading_class">
        {this.props.title}
      </div>
    );
  }
}

export default Heading;
