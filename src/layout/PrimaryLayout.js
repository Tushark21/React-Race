import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../components/Header';

class PrimaryLayout extends React.Component {
    render() {
        return (
            <div className={'App'}>
                {<Header />}
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PrimaryLayout;