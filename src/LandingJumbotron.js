import React from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from "react-router-dom";

function LandingJumbotron(props) {
  let history = useHistory();

  return (
    <Container fluid className="hero" bg="light">
      <div class="hero-content">
          <h1 class="text-dark head">Welcome {props.username && 'back'} to BrewFinder</h1>
          <p class="text-dark">The easy way to navigate the complicated world of craft beers.</p>
          {props.username && <button class="btn text-light search" onClick={() => history.push("/profile")}>Search for beers!</button>}
      </div>
    </Container>
  );
}

export default LandingJumbotron;