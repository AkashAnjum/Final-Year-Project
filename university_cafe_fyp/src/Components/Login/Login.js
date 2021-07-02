import React from 'react';
import './Login.css';
import {NavLink} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';


function Login(props) {
  let SignIn = props.SignIn;
  
  return (
    <div className="container ">
      <h3>Login</h3>
      <Form className= "login justify-content-center p-3" >
      <span style={{color:"darkred",borderRadius:'5px', padding:'10px', width:'300px'}}>{props.messageRes}</span>
      <br/>
        <Form.Group >
          <Form.Label className='mt-2'>Enter Your Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" id="email" required onChange={e=>props.changeEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group >
          <Form.Label className='mt-2'>Enter Your Password</Form.Label>
          <Form.Control type="password" placeholder="Password" id="password" required onChange={e=>props.changePassword(e.target.value)}/>
        </Form.Group>
        <Button className='mt-2' variant="primary" type="submit" onClick={(e)=>SignIn(e)}>
          LogIn
        </Button>
        <br/>
          <h6 className='mt-2'>Not registered</h6>
          <NavLink exact to="/signup" className='signup' >
           SignUp
          </NavLink>
      </Form>

    </div>
  );
}

export default Login;