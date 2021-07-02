import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [done,setDone]=useState(false)
  const [data,setData]=useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [department, setDepartment] = useState();
  const [phone_no, setPhone_no] = useState();
  const [fpassword, setFPassword] = useState();
  const [lpassword, setLPassword] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  function Register(e) {
    setDone(false)
     e.preventDefault();
     if(fpassword===lpassword){
      setPassword(lpassword)
      let mypass=lpassword
      setError('')
     
    
     let request={
      name:name,
      email:email,
      department:department,
      phone_no:phone_no,
      password:mypass, 
    }  
    
  console.log(request)
    axios.post("/api/user/store",request)
        .then(resp=>{
          console.log(resp.data.message)
          setDone(true)
          setData(resp.data.message)
          if(resp.data.message === "Register successfully")
          {
          
          }
        })
        .catch(err=>{
          alert(err)
        })
      }
      else{
        setError('Confirm Password must be same')
      }
  }

 
  return (
    <div className="container">
      <h3>Signup</h3>

      {/* Name And Email */}
      <Form className="signup"  onSubmit={(e)=>Register(e)}>
      <Form.Group >
      {done&&<div className="loginlinks"><h5>{data}!</h5></div>}
          <Form.Label className='mt-2'>Enter Name</Form.Label>
          <Form.Control type="name" placeholder="abc..." onChange={(e)=>setName(e.target.value)} required/>
        </Form.Group>
        <Form.Group >
          <Form.Label className='mt-2'>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} required/>
        </Form.Group>

        {/* Department Selection */}
        <Form.Group >
          <Form.Label className='mt-2'>Select Department</Form.Label>
          <Form.Control as="select"  onChange={(e)=>setDepartment(e.target.value)} required>
            <option>Biologycal Sciences</option>
            <option>Business Administration</option>
            <option>Chemistry</option>
            <option>Computer Science and IT</option>
            <option>Economics</option>
            <option>Educaion</option>
            <option>English</option>
            <option>Math</option>
            <option>Physics</option>
            <option>Psychology</option>
            <option>Social Work</option>
            <option>Socialogy</option>
            <option>Sports Sciences</option>
          </Form.Control>
        </Form.Group>

        {/* RollNo Selection */}
        <Form.Group >
          <Form.Label className='mt-2'>Enter PhoneNo</Form.Label>
          <Form.Control type="number" placeholder="03000000000" onChange={(e)=>setPhone_no(e.target.value)} required/>
        </Form.Group>
        
        <Form.Group>
          <Form.Label className='mt-2'>Enter Password</Form.Label>
          <Form.Control type="password" onChange={(e)=>setFPassword(e.target.value)} required/> 
        </Form.Group>
        <Form.Group>
          <Form.Label className='mt-2'>Confirm Password</Form.Label> <br/>
          <span style={{color:'darkred'}}>{error}</span>
          <Form.Control type="password" onChange={(e)=>setLPassword(e.target.value)} required/> 
        </Form.Group>


        <Button className='mt-2' variant="primary" type="submit">
          SignUp
        </Button>
      </Form>
    </div>
  );
}

export default Signup;