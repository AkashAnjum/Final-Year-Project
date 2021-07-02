import React,{useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import NavBar from './Components/NavBar';
import Signup from './Components/Signup/Signup';
import './App.css';
import OrderNow from './Components/OrderNow/OrderNow';
import axios from 'axios';
import Loading from './Components/Loader/Loader';
import Profile from './Components/Login/Profile';
import Cookies from 'js-cookie';
import ActivateUser from './Components/hash';
import Order from './Tracking/Order';
  
function RouteConfig(){ 

    const [name, setName] = useState();
    const [phone, setPhone] = useState();

    const [loginStatus, setLoginStatus] = useState(false);
    let mydata=Cookies.get('userInfoUi');
        useEffect(() => {
            if(mydata){
                setLoginStatus(true)
            }
        }, []); 

        function logout() {
            Cookies.remove("userInfoUi") 
            setLoginStatus(false)
            window.location.href=('/')
          }
    
    // LogIn
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [messageRes, setMessageRes] = useState();
    
    let userId = Cookies.get('userId');
    
    function SignIn(e) {
        e.preventDefault()
        let request={
        email: email,
        password: password,
    }

    axios.post("/api/user/login"
    , request,
    {headers: {
        Authorization: 'Bearer' + mydata
    }})
        .then(resp=>{
            if (resp.data.message === "Login successfull!" ) {
                
                console.log(resp.data.message) 
                Cookies.set('userId', resp.data.messagex);
                Cookies.set('userInfoUi', resp.data.token)
                setLoginStatus(true)
                
                
            }
            else if(resp.data.message==='password not match') {
                setMessageRes(resp.data.message)
            }
            else{
                setMessageRes(resp.data.message)
            }
        })
        .catch(err => {
            console.log(err)
        })
        

 }



    // fetching data catagries 
    const [cat, setCat] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const url = '/api/admin';
        const Fetchdata = async () => {
            try {
                const fetchdata = await axios.get(url);
                return fetchdata.data.response
            }
            catch (error) { console.log("error") };
        }
        Fetchdata()
            .then(resp => {
                setCat(resp)
                setIsLoading(false)
            })
    }, []);
    


    return(
        <div>
            <Router>
                <NavBar loginStatus={loginStatus}/>  
                <div style={{marginTop:20}}>  
                <Switch>
                    <Route exact path = '/' render={()=>
                        <>
                            {isLoading===true?
                                <Loading/> :
                                <Home data={cat} /> }     
                        </>}
                    />
                    <Route exact path = '/about' render={()=><About/>}/>
                    <Route exact path = '/Contact' render = {()=><Contact/>}/>
                    {
                        loginStatus===true? 
                        <Redirect from='/login' to = '/ordernow'/> :
                    <Route exact path = '/login' render = {()=><Login 
                                                                SignIn={SignIn}
                                                                changeEmail = {email => setEmail(email)}
                                                                changePassword = {password => setPassword(password)}
                                                                messageRes = {messageRes}
                                                                />}/>
                                                                }

                    <Route exact path = '/profile' render = {()=><Profile logout={logout} userId={userId}/>}/>
                    <Route exact path = '/signup' render = {()=><Signup/>}/>
                    <Route exact path = '/active/:id' component ={ActivateUser}/>
                    <Route exact path='/track' render = {() => <Order/>} />
                    <Route exact path='/uipending' render = {() => <Order/>} />
                    <Route exact path='/uidelivered' render = {() => <Order/>} />
                    <Route exact path='/uirejected' render = {() => <Order/>} />


                    {loginStatus === true? <>
                    <Route exact path = '/ordernow' render = {()=>  <OrderNow data={cat}
                                                                    setCartItems={cartItems=>setCartItems(cartItems)}
                                                                    cartItems={cartItems}/> }/>
                    <Route exact path = '/cart' render = {()=> <OrderNow cartItems={cartItems} userId={userId}/> }/>
                    </> : <Redirect to='/login'/>}
                    
                    <Route exact path = '*' component ={() => <h2>404 Not Found</h2>}/>
                </Switch>
                </div>
            </Router>
        </div>
    )
}
export default RouteConfig;