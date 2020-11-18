import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

function Landing() {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  function handleLoginSubmit(event){
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login)
    })
  }

  function handleRegisterSubmit(event){
    event.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(register)
    })
  }

  function validateLoginForm() {
    return login.username.length > 0 && login.password.length > 0;
  }

  function validateRegisterForm() {
    return register.username.length > 0 && 
    register.password.length > 0 &&
    register.firstName.length > 0 &&
    register.lastName.length > 0;
  }
  
  return (
    <CardDeck style={{ marginRight: '0px', marginLeft: '0px', marginTop: '15px' }}>
      <Card>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formLoginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" value={login.username} onChange={(e) => setLogin({...login, username: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={login.password} onChange={(e) => setLogin({...login, password: e.target.value})}/>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!validateLoginForm()}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group controlId="formRegisterFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" value={register.firstName} onChange={(e) => setRegister({...register, firstName: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="formRegisterLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name"  value={register.LastName} onChange={(e) => setRegister({...register, lastName: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="formRegisterUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username"  value={register.username} onChange={(e) => setRegister({...register, username: e.target.value})}/>
            </Form.Group>

            <Form.Group controlId="formRegisterPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={register.password} onChange={(e) => setRegister({...register, password: e.target.value})} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!validateRegisterForm()}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </CardDeck>
  );
}

export default Landing;