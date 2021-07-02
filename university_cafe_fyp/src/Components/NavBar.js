
import React from 'react';
import './NavBar.css';
import unicafelogo from './../Images/universitycafelogo.png';
import {NavLink, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {FaHome, FaPhone, FaSignInAlt, FaCartArrowDown, FaAddressBook, FaCartPlus, FaPersonBooth, FaRegClipboard} from "react-icons/fa";
import {Navbar, Nav} from 'react-bootstrap';


export default function NavBar(props) {
  const loginStatus = props.loginStatus;
  
  return (
    <div className='main-nav container-fluid '>

      {/* logo image willbe here */}
      <section className='nav_logo'>
        <Link to='/' className='linklogo'>
          <img src={unicafelogo} className='' height='60px' alt='logo unicafe'/>
        </Link>


                  {loginStatus===true? 
                    <>
                      <div class="dropdown">
                        <NavLink exact activeClassName='active_class_btnlink btn btn-secondary dropdown-toggle' to="/profile" className=' btnlink float-end'>
                          <FaPersonBooth/> Logout
                        </NavLink>
                        </div>
                    </> :
                    <>
                    <NavLink exact activeClassName='active_class_btnlink' to="/login" className=' btnlink float-end'>
                      <FaSignInAlt/> LogIn
                    </NavLink>
                    </>}


      </section>

        {/* Navigation bar here */}
        <div className=''>
          <section className='main-nav '>
          
            <Navbar bg="light" expand="lg" id="navbar" className=''>
              
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" >
            
                <Nav className="mr-auto ms-5" >
                    <NavLink exact activeClassName='active_class' to="/" className='link'>
                      <FaHome/> Home
                    </NavLink>

                    
                    <NavLink exact activeClassName='active_class' to="/ordernow" className='link'>
                      <FaCartPlus/> OrderNow
                    </NavLink>

                    <NavLink exact activeClassName='active_class' to="/about" className='link'>
                      <FaAddressBook/> About
                    </NavLink>
                    <NavLink exact activeClassName='active_class' to="/contact" className='link'>
                      <FaPhone/> Contact
                    </NavLink>

                    {loginStatus===true? 
                    <NavLink exact activeClassName='active_class' to="/track" className='link'>
                      <FaRegClipboard/> Order History
                    </NavLink> :
                    <></> }
                </Nav>
              </Navbar.Collapse>


              {/* cart */}
              <NavLink exact activeClassName='active_class' to='/cart' className='link '>  
                <FaCartArrowDown className="" size="25" color="brown"/>
              </NavLink>


            </Navbar>

          </section>
      </div>
    </div>
  );
}
