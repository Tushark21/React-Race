import React from 'react'

class Name extends React.Component {
    render() {
        return (
            <div className={'name_class'}>
                <div className={'r_class'}>
                    <p style={{ fontSize: this.props.fontSizes[1], lineHeight: '1', }}>
                        R
                    </p>
                </div>
                <div className={'remain_name_class'}>
                    <p style={{ fontSize: this.props.fontSizes[0], lineHeight: '1', }}>eact</p>
                    <p style={{ fontSize: this.props.fontSizes[0],lineHeight: '1',  }}>ace</p>
                </div>
            </div>
        );
    }
}

export default Name;