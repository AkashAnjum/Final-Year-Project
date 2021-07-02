import React,{useEffect, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import './OrderNow.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Cart from '../Cart/Cart';
import Cookies, { set } from 'js-cookie';
import Loading from '../../Components/Loader/Loader';
import axios from 'axios';
import Popup from 'reactjs-popup';
function OrderNow(props) {
    

    

    const [check, setCheck] = useState(false);
    const cat = props.data;

    const [data, setData] = useState({});
    let user_id = Cookies.get('userId');
    console.log(user_id, 'userit')

    const settingData = (item) =>{
        
            item.map((x)=>{
                setData({
                    user_id:user_id,
                    category_id: x.id,
                    item_id: x._id,
                    quantity:x.qty
                })
            })
            setCheck(true)

        }
        
        
                
                // const storeApi = () => {
                // axios.post("/api/cart/store", data)
                // .then(resp=>{
                //     console.log(resp.data.message)
                //     setData({})
                    
                // })
                // .catch(err => {
                //     console.log(err)
                //  })}

                //  storeApi();


                 useEffect(() => {
                    const url = '/api/cart/store';
                    const Fetchdata = async () => {
                        try {
                            await axios.post(url, data)
                            .then((resp)=>{
                                setData({})
                                setCheck(false)
                                props.setCartItems([])
                                setCheckInd(true)
                                setIsLoading(true)
                                
                            })
                        }
                        catch (error) { console.log("error") };
                    }
                    Fetchdata()
                    
                }, [check]);
        
        
    
                const [isLoading, setIsLoading] = useState(true);
                const [checkInd, setCheckInd] = useState(true);
                const [cartApi, setCartApi] = useState([]) 




                useEffect(() => {
                    const url = '/api/cart/show';
                    const Fetchdata = async () => {
                        console.log(user_id, 'fun')
                        try {
                            await axios.post(url, {user_id: user_id})
                            .then(resp => {
                            setCartApi(resp.data.dates)
                            setCheckInd(false)
                            setIsLoading(false)
                        })
                            
                        }
                        catch (error) { 
                            setCartApi([])
                            console.log("error") };
                    }
                    Fetchdata()
                }, [checkInd]);

    // adding items to cart 

    const onAdd = (dl ,id) =>{
        const exists = props.cartItems.find((x)=> x._id === dl._id);
        if(exists){
            props.setCartItems(
                props.cartItems.map((x) =>
                    x._id === dl._id ? { ...exists, qty: exists.qty+1} : x
                )
            )
        }
        else{
            props.setCartItems([...props.cartItems, {...dl, id, qty: 1}])
        }

        
    }; 
    // removing cart items
    const onRemove = (dl) => {
        
        const exists = props.cartItems.find((x) => x._id === dl._id);
        if( !exists ){
            props.setCartItems([])
        }
        else if (exists.qty === 1) {
          props.setCartItems(props.cartItems.filter((x) => x._id !== dl._id));
        } 
        else {
          props.setCartItems(
            props.cartItems.map((x) =>
              x._id === dl._id ? { ...exists, qty: exists.qty - 1 } : x
            )
          );
        }
        
      }

    
     
    

    return (

        <div className=" container-fluid main-div row ">
            {props.cartItems!==0?
            <aside className='mt-5 col-xxl-4 col-xl-4 col-lg-5 col-md col-sm col'>
                <>
                {isLoading===true?
                                <Loading/> :
                                    <Cart cartItems={props.cartItems} data={data} cartApi={cartApi} 
                                                    changeData={data=>{setData(data)}}
                                                    setCheckInd={checkInd=>setCheckInd(checkInd)}
                                                    setIsLoading={isLoading=>setIsLoading(isLoading)}
                                                    changeCartApi={cartApi=>{setCartApi(cartApi)}}
                                                    user_id={user_id} />}
                                                    
                </>
            </aside>: 
            <asid></asid>}
            {/* Order list */}

            <aside className="col-xxl-8 col-xl-8 col-lg-7 col-md col-sm col row justify-content-end  container">
                <span></span>
            {cat && cat.map((el) => {
                let id = el._id;
                let sub1 = el.sub;
                return (
                    <div key={el._id}>
                        <h3>{el.title}</h3>
                        {sub1.map((dl) => {
                            return (
                                <Card key={dl._id} className='row '>
                                    <Card.Header></Card.Header>
                                    <Card.Body >
                                        <Card.Img variant="top" src={dl.subImage} alt='image will be here' className="Image ml-4 overflow-hidden" />
                                        <div className='First m-2 ml-4 '>
                                            <Card.Title>{dl.subtitle}</Card.Title>
                                            <Card.Text>
                                                {dl.size}
                                            </Card.Text>
                                            <Card.Text >
                                                {dl.price}
                                            </Card.Text>
                                            <br/> <br/>
                                        </div>
                                            <aside className='row_line ml-5 p-1 position-absolute bottom-0 end-0'>
                                                <div className='row '>
                                                    <Button onClick={() => onRemove(dl)} className="remove button col-4">
                                                        -
                                                    </Button>

                                                    <Card style={{color:'black', width:"auto"}}  className='card col-2 shadow'>
                                                    {props.cartItems.map((qt) => {
                                                        return(
                                                            <> 
                                                                    {qt._id===dl._id ?
                                                                <p className='col-2  d-flex flex-nowrap mx-auto ml-0 mr-auto mt-1'>{qt.qty}</p> : <></>}
                                                            </>
                                                        )
                                                    })}
                                                    
                                                    </Card>

                                                    <Button onClick={() => onAdd(dl, id)} className="col-5 add ">
                                                        +
                                                    </Button>

                                                    
                                                </div> 
                                                <br/>

                                                <Button onClick={() => settingData(props.cartItems) } variant="primary" className=" First button">
                                                    Order Now
                                                </Button>
                                                

                                        </aside>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>
                )
            })}
            </aside>
        </div>
    );
}

export default OrderNow;