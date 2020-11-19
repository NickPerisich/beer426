// import React, {useState, useEffect} from 'react';
import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

function LandingJumbotron() {
  
  return (
    <Jumbotron fluid>
        <Container>
            <h1>BeerFinder</h1>
            <p>The easy way to navigate the complicated world of craft brews.</p>
        </Container>
    </Jumbotron>
  );
}

export default LandingJumbotron;