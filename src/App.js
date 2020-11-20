import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LandingJumbotron from './LandingJumbotron'
import Landing from './Landing';
import ProfilePage from './ProfilePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  let [username, setUsername] = useState('nickgfp');

  const logInUser = (username) => {
    setUsername(username);
  }

  return (
    <Router>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">BeerFinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            { username.length > 0 ? 
            <>
              <Nav.Link>
                <Link to="/profile">Profile</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/" onClick={() => setUsername('')}>Logout</Link>
              </Nav.Link>
            </> :
            <Nav.Link>
              <Link to="/">Login</Link>
            </Nav.Link> }
            <Nav.Link>
              <Link to="/about">About</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <LandingJumbotron />
          <Landing logInUser={logInUser} />
        </Route>
        <Route path="/profile">
          <ProfilePage username={username}/>
        </Route>
        <Route path="/about">
          <h1>This is the about page</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
