import React from "react";
import {Container, Row, Spinner} from "react-bootstrap";

function Loading() {
    return (
        <Container>
            <Row style={{justifyContent:"center", margin:10}}>
                <Spinner animation="border" variant="success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Row>
        </Container>

    );
}

export default Loading;