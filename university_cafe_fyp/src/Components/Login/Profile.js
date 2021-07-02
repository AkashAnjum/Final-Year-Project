import React, {  useState, useEffect } from 'react';
import { Card, Nav } from 'react-bootstrap';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import './Login.css';
import Cookies from 'js-cookie';
import Popup from 'reactjs-popup';


export default function Profile(props) {
    const logout = props.logout;
    const userId = props.userId;
    const [user, setUser] = useState({});

    
    useEffect(() => {
        const url = '/api/user/show';
        const Fetchdata = () => {
            try {
                const fetchdata = axios.post(url, {userId})
                .then(resp => {
                    setUser(resp.data.message)
                })

            }
            catch (error) { console.log("error") };
        }
        Fetchdata()
        
            
    }, []);

    const userName = user.name;
    Cookies.set('userNameD', user.name);
    Cookies.set('userPhoneN', user.phone_no);
    let userNameD = Cookies.get('userNameD')
    console.log('usersss', userNameD)

    return(
        <div className='d-flex justify-content-center '>
            <Card className='card' style={{ minWidth:'80%', maxWidth:"90%", padding:'10px'}}>
                <FaUser size="150px" className='mx-auto p-3' color="black"/>
                <h2>Welcome {user.name} </h2>

                <div className='container border row'>
                    <ul class="list-inline m-0 d-flex justify-content-end col-6">
                        <li class="list-inline-item">
                        {user.name}
                        </li>
                        <li class="list-inline-item ">
                        <Nav.Link>edit</Nav.Link>
                        </li>
                    </ul>
                    <ul class="list-inline d-flex justify-content-end col-6">
                        <li class="list-inline-item">
                        {user.phone_no}
                        </li>
                        <li class="list-inline-item">
                        <Nav.Link>edit</Nav.Link>
                        </li>
                    </ul>
                    <ul class="list-inline d-flex justify-content-end col-6">
                        <li class="list-inline-item">
                            Change Password
                        </li>
                        <li class="list-inline-item">
                        <Nav.Link>edit</Nav.Link>
                        </li>
                    </ul>

                </div>
                
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Card>
        </div>    
 )
}
