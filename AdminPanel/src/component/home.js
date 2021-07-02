import React, { useState,useEffect } from 'react';
import {Card,Nav, Button,Col,Form} from 'react-bootstrap'
import Cookie from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom'
export default function Home() {
    let mydata=Cookie.get('userInfo');
    console.log(mydata)
    const [error,setError]=useState(false);
    const [error1,setError1]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    function login(e) {
        e.preventDefault();
        let request = {
            email,
            password
        }
        axios.post("/api/adminpanel/login", request)
            .then(resp => {
               if (resp.data.message == "Login successfull!" ) {
                    console.log(resp.data.message) 
                    console.log(resp.data.token)  
                    Cookie.set('userInfo', (resp.data.token));
                    window.location.href = "/pending"
                }
                else  {
                    setError(true);
                    setError1(resp.data.message)
                }
                
               })

    }
   
    useEffect(() => {
    if(mydata==null){
    setShow(true)
    }
}, []); 
    const[show,setShow]=useState(false)
    return (
        <div className="forHomeCenter1">
                 <Col sm="10" xm="12" >
               <h1 className="text">Welcome to University Cafe Admin Panel</h1>
               {show&&
                 <Card style={{ width: '16rem' }}  >
                 <Card.Body>
                     <Form onSubmit={(e) => login(e)} >
                     <Form.Row>
                             <Form.Group as={Col} controlId="formGridEmail"> 
                             {error&&<div className="false"><h10>{error1}</h10></div>}
                             </Form.Group>
                             </Form.Row>
                         <Form.Row className="loginform">
                             <Form.Group as={Col} controlId="formGridEmail">
                                 <Form.Label>Email</Form.Label>
                                 <Form.Control type="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)} />
                             </Form.Group>
                             </Form.Row>
                             <Form.Row className="loginform">
                             <Form.Group as={Col} controlId="formGridPassword">
                                 <Form.Label>Password</Form.Label>
                                 <Form.Control type="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)}/>
                             </Form.Group>
                         </Form.Row >
                         <Button variant="primary" type="submit">
                             Login
                         </Button>
                     </Form>
                 </Card.Body>
             </Card>
            //    <Link to="/loginadmin"><Button variant="primary" className="linkhome" type="submit">
            //         Login
            //    </Button></Link>
               }</Col>
        </div>  
    );
}