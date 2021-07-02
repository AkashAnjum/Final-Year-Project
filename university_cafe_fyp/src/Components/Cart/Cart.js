import React, { useEffect, useState } from 'react';
import './Cart.css';
import {Card, Button} from 'react-bootstrap';
import axios from 'axios';
import {FaTrash} from "react-icons/fa";
import Cookies from 'js-cookie';
function Cart(props) {
    const cartItems = props.cartItems;
    const cartApi = props.cartApi;
    const itemsPrice = cartApi.reduce((a, c) => a +  c.quantity * c.itemprice , 0);
    // getting user data from cookies
    let userNameD = Cookies.get('userNameD');
    let userPhoneN = Cookies.get('userPhoneN');
    let userId = Cookies.get('userId');
    const [address, setAddress] = useState();
    const [data, setData] = useState([]);
    console.log(userNameD, userPhoneN);
    const [placeOrd, setPlaceOrd] = useState();
    

    // Deleting cart Item
    const DelApi = async(did) => {
            props.setIsLoading(true)
            await axios.post('/api/cart/destroy', {id: did})
                .then(resp =>{ 
                    console.log(resp.data.message)
                    props.setCheckInd(true)}
                )
                .catch(err=>
                    console.log('err'));
    }




    


    const settingData = (cartApi) =>{
        setData(
            
        )

    }
    

    
    const placeOrder = async(cartApi) =>{
        
        let data = {
            name: userNameD,
            number: userPhoneN,
            userId:userId,
            sub: cartApi,
            address: address,
            subtotal: itemsPrice,
            charges: 0,
            total: itemsPrice
        };
        console.log(data, "addreess")
        
        axios.post("/api/order/store",data)
        .then(resp=>{
            console.log(resp, 'resp order store')
            
        })
        .catch(err=>{
        })


        
        axios.post("/api/cart/delete",{user_id: props.user_id})
        .then(resp=>{
            console.log(resp.message, 'resp deleted')
            setPlaceOrd(resp.message)
            props.setCheckInd(true)
        })
        .catch(err=>{
            console.log(err,'error')
        })
    }
    


    
    return(

        <div>
        <aside>
            <div className="container-fluid d-flex justify-content-center d-flex flex-wrap">
            <span style={{color:"red", background:'black', width:'300px'}}></span>
                
                <Card style={{ width: '35rem' , color: 'black', whiteSpace: 'initial' }}>
                        <Card.Header>Your Cart is Here</Card.Header>
                        <p>{placeOrd}</p>
                        <div className='mb-2'>{cartApi.length === 0 && <div>Cart is Empty</div>}</div>
                        <div className='mb-2'>{cartApi.map((sl) => {
                            return (
                                <div key={sl.item_id} className='row ps-1' >

                                        <Card.Text className="col-4 fw-lighter fs-6 word-wrap">{sl.subtitle}</Card.Text>
                                                                                
                                        <Card.Text className="col-2 fw-lighter">
                                       
                                            {sl.quantity}

                                            </Card.Text>
                                        <aside className="col-3 fw-lighter">
                                            {sl.size}
                                        </aside>
                                        <aside className="col-3 fw-lighter">
                                            {sl.itemprice}
                                             <aside className="pb-1"><button onClick={()=>DelApi(sl._id)}><FaTrash/></button></aside>
                                        </aside>
                                        <div>
                                        <hr className=""/>
                                        </div>
                                        
                                </div>
                            )
                        })}
                        </div>
                        {cartApi.length !== 0 && (
                            <>

                                <div className="row" style={{marginTop:'-10px'}}>
                                    <div className="col-4">
                                        <strong>Total Price</strong>
                                    </div>
                                    <div className="col-4 text-end">
                                        <h5>Rs:{itemsPrice}</h5>
                                    </div>

                                    <form onSubmit={(e)=>{
                                        e.preventDefault()
                                        placeOrder(cartApi)}}>
                                        <input type="text" className="form-control mb-3" placeholder="Input Delivery Location" onChange={(e)=>{setAddress(e.target.value)}} required/>
                                        <Button type="submit" variant="primary" >PlaceOrder</Button>
                                    </form>
                                </div>

                                
                            </>
                            )}

                </Card>
            </div>


        </aside>
        </div>
    )
    
}
export default Cart;