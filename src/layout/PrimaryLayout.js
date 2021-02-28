import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

class PrimaryLayout extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.heading}</h1>
                <Container>
                    <Row className="row justify-content-md-center">
                        <Col className="col-12">
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default PrimaryLayout;