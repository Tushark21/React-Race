import React from 'react'
import Header from '../components/Header';

class PrimaryLayout extends React.Component {
    render() {
        return (
            <div className={'App'}>
                {<Header />}
                <div className={'main_container'}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}

export default PrimaryLayout;