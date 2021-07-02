import React, { useState } from 'react';
import {Card,Nav, Button,Col} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import styles from './home.css'
import { Link } from 'react-router-dom'
import Pending from './Pending.js'
import Cookie from 'js-cookie';
import Rejected from './Reject.js'
import Delivered from './Deliver.js'
export default function Order(props) {
    
    let mydata=Cookie.get('userId');
    console.log(mydata, 'cookie userInfo')
    if(mydata==null){
        props.history.push("/login")
    }
    return (
          
        <div className=" container">
               <Col sm="10" xm="12" >
            <Card>
                <Card.Header >
                    <Nav variant="tabs" defaultActiveKey="#first" className="container" >
                        <Nav.Item>
                            <Nav.Link  href="#" as={Link} to="uipending">Pending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="#1" as={Link} to="uidelivered">Delivered</Nav.Link>

                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="#3" as={Link} to="uirejected">Rejected</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                            <div className="forpadding">
                            <Switch>
                            <Route exact path="/uipending" component={Pending} />
                            <Route exact path="/uidelivered" component={Delivered} />
                            <Route exact path="/uirejected" component={Rejected}/>
                            </Switch>
                            </div>
            </Card>
            </Col>
        </div>
        
    );
}