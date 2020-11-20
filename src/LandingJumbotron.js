// import React, {useState, useEffect} from 'react';
import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

function LandingJumbotron() {
  
  return (
    <Container fluid className="hero" bg="light">
      <div class="hero-content">
          <h1 class="text-dark head">Welcome to BrewFinder</h1>
          <p class="text-dark">The easy way to navigate the complicated world of craft beers.</p>
          <a href="/profile"><button class="btn text-light search">Search for beers!</button></a>
      </div>
    </Container>
  );
}

export default LandingJumbotron;