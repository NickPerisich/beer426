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
  let [username, setUsername] = useState('');
  let [firstname, setFirstname] = useState('');

  const logInUser = (user) => {
    setUsername(user.username);
    setFirstname(user.firstName);
  }

  const logout = () => {
    setDefaults();
  }

  function setDefaults() {
    setUsername('');
    setFirstname('');
  }

  return (
    <Router>
      <Navbar expand="md" className="shadow bg-blue">
      <Navbar.Brand href="#home" className="text-light">BrewFinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            { username.length > 0 ? 
            <>
                <Link className="nav-link middle text-light" to="/profile">Profile</Link>
                <Link className="nav-link middle text-light" to="/" onClick={setDefaults}>Logout</Link>
            </> :
              <Link className="nav-link middle text-light" to="/">Login</Link>
             }
              <Link className="nav-link middle text-light" to="/about">About</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <LandingJumbotron username={username} firstname={firstname} />
          <Landing logInUser={logInUser} />
        </Route>
        <Route path="/profile">
          <ProfilePage username={username}  logout={logout}/>
        </Route>
        <Route path="/about">
          <h1>This is the about page</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
