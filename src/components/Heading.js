import React from 'react';

class Heading extends React.Component {

  handleClick = (loc) => (
    console.log(loc)
  );

  render() {
    return (
      <div className="heading_class">
        {this.props.title}
      </div>
    );
  }
}

export default Heading;
