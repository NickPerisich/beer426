import React from 'react';
import Container from 'react-bootstrap/Container';

function About() {

  return (
    <Container fluid className="hero" bg="light">
        <h1>About</h1>
        <h2>The App</h2>
        <p>Tech used:</p>
        <ul>
            <li>React frontend</li>
            <li>Express backend</li>
            <li>MongoDB database</li>
            <li>Open Beer Database API by Opendatasoft</li>
        </ul>
        <p>
            Express runs the app, serving the compiled React front end to the client user. This front end is what the user interacts with. When the user 
            does anything that necessitates remembering a profiles state, a call back to the Express backend is made. The backend then interacts with the
            remotely hosted MongoDB database, performing CRUD actions on profiles and liked beers as necessary. The app is mobile freindly, and can respond
            to any change of screen size as necessary due to it's columnar design. These columns (plus the top bar menu) collapse into each other as the
            screen width gets smaller. Reccomendations are generated based on the catagories of beers that the user has previously liked. A catagory of beer
            that the user has previously selected is much more likely to be picked than one the user has only infrequently selected. React router is used to 
            manage navigation throughout the web app, removing unnecessary page loads.
        </p>
        <h2>API</h2>
        <h3>Register</h3>
        <ul>
            <li>Purpose: Register a new user</li>
            <li>Endpoint: POST  /api/register</li>
            <li>Request Params: username (string), password (string), firstName (string), lastName (string)</li>
            <li>Response: A "SUCCESS" or "TAKEN" message</li>
        </ul>
        <h3>Login</h3>
        <ul>
            <li>Purpose: Login a user</li>
            <li>Endpoint: POST  /api/login</li>
            <li>Request Params: username (string), password (string)</li>
            <li>Response: A "INCORRECT" or the user's data</li>
        </ul>
        <h3>Update Likes</h3>
        <ul>
            <li>Purpose: Change liked beers of user</li>
            <li>Endpoint: POST  /api/updatelikes</li>
            <li>Request Params: username (string), likedBeers (json)</li>
            <li>Response: Empty response body</li>
        </ul>
        <h3>Likes</h3>
        <ul>
            <li>Purpose: Change liked beers of user</li>
            <li>Endpoint: POST  /api/likes</li>
            <li>Request Params: username (string)</li>
            <li>Response: Liked beers of the user as a json array</li>
        </ul>
        <h3>Delete User</h3>
        <ul>
            <li>Purpose: Delete a users profile</li>
            <li>Endpoint: POST  /api/deleteuser</li>
            <li>Request Params: username (string)</li>
            <li>Response: Empty response body</li>
        </ul>
    </Container>
  );
}

export default About;