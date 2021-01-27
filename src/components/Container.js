import React from 'react';

class Button extends React.Component {

    render() {
        return (
            <div className="container_class">
                {this.props.content}
            </div>
        );
    }
}

export default Button;
