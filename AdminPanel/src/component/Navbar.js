import styles from './Navbar.css';
import React, {useState,useEffect} from 'react';
import Cookie from 'js-cookie';
import { Link } from 'react-router-dom'
import { Button, Navbar, NavDropdown, Form, Nav, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar(props) {
    
    const [show,setShow]=useState()
    let mydata=Cookie.get('userInfo');
     function logout() {
            console.log("userInfo")
            Cookie.remove("userInfo")  
            setShow(false)
            window.location.href = "/adminpanel"
          }
          useEffect(() => {
            if(mydata){
                setShow(true)
            }
        }, []);        
    
    
    return (
        <div className="navbar">
        <Navbar  collapseOnSelect expand="sm" bg="dark" variant="dark" fixed="top" >
            <Navbar.Brand href="#"><Link to='/adminpanel' className="bism1">UNIVERSITY CAFE</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            { show&&   <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="mr-auto">
                    <Nav.Link href="#4" className="navicons" to='/pending' as={Link} >Orders</Nav.Link>
                    <Nav.Link href="#" className="navicons" as={Link}  to='/viewcategory' >View Category</Nav.Link>
                    <Nav.Link href="#1" className="navicons" as={Link} to='/addcategory'>Add Category</Nav.Link>
                    <Nav.Link href="#2" className="navicons"  to='/viewitem' as={Link}>View Item</Nav.Link>
                    <Nav.Link href="#3" className="navicons" to='/additem' as={Link}>Add Item</Nav.Link>
                    </Nav>
                  
                              <Nav>
                                <Nav.Link  href="#" className="navicons"  onClick={logout} ><h6 >Logout</h6></Nav.Link>
                                </Nav>
                               
            </Navbar.Collapse>}
        </Navbar>
        </div>
    );
}
export default NavBar;
