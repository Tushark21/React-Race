import React from 'react';

class Button extends React.Component {

    render() {
        return (
            <div className="info_container">
                {this.props.content}
            </div>
        );
    }
}

export default Button;
