import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function LandingJumbotron(props) {
  
  return (
    <Container fluid>
        <Row xs={1} sm={2} md={3} lg={4} xl={5}>
            <Col><h1>{ props.username }</h1></Col>
            <Col><h1>{ props.username }</h1></Col>
            <Col><h1>{ props.username }</h1></Col>
            <Col><h1>{ props.username }</h1></Col>
            <Col><h1>{ props.username }</h1></Col>
            <Col><h1>{ props.username }</h1></Col>
            <Col><h1>{ props.username }</h1></Col>
            <Col><h1>{ props.username }</h1></Col>
        </Row>
    </Container>
  );
}

export default LandingJumbotron;