import React, { useState } from 'react';
import {Card,Nav, Button,Col} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import styles from './home.css'
import { Link } from 'react-router-dom'
import Pending from './Pending.js'
import Cookie from 'js-cookie';
import Rejected from './Reject.js'
import Total from './Total.js'
import Delivered from './Deliver.js'
export default function Order(props) {
    let mydata=Cookie.get('userInfo');
    console.log(mydata, 'cookie userInfo')
    if(mydata==null){
        props.history.push("/adminpanel")
    }
    return (
          
        <div className="forHomeCenter">
               <Col sm="8" xm="12" >
            <Card>
                <Card.Header >
                    <Nav variant="tabs" defaultActiveKey="#first"  >
                        <Nav.Item>
                            <Nav.Link  href="#" as={Link} to="pending">Pending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="#1" as={Link} to="delivered">Delivered</Nav.Link>

                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="#3" as={Link} to="rejected">Rejected</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link href="#2" to="total" as={Link}>Total</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                            <div className="forpadding">
                            <Switch>
                            <Route exact path="/pending" component={Pending} />
                            <Route exact path="/delivered" component={Delivered} />
                            <Route exact path="/total" component={Total} />
                            <Route exact path="/rejected" component={Rejected}/>
                            </Switch>
                            </div>
            </Card>
            </Col>
        </div>
        
    );
}