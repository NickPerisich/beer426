import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">BeerFinder</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#home">Login</Nav.Link>
        <Nav.Link href="#link">Register</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;