import React,{ useState,getState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Form, Button, Card, Col, Row } from 'react-bootstrap';
export default function Login(props) {
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
                    window.location.href = "/adminpanel"
                }
                else  {
                    setError(true);
                    setError1(resp.data.message)
                }
                
               })

    }
   

    return (
        <div className="forHome" >
            <Card style={{ width: '24rem' },{borderWidth:3},{borderColor:'rgb(238, 91, 46)'}}  >
                <Card.Body>
                    <Form onSubmit={(e) => login(e)} >
                    <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail"> 
                            {error&&<div className="false"><h10>{error1}</h10></div>}
                            </Form.Group>
                            </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}