import React,{useState,useEffect} from 'react'
import styles from './Router.css'
import Cookie from 'js-cookie';
import {storage} from '../Firebase'

import { Button, Form, Col } from 'react-bootstrap';
import axios from 'axios';
function AddCategory(props) {
    let mydata=Cookie.get('userInfo');
    console.log(mydata)
    if(mydata==null){
        props.history.push("/adminpanel")
    }
    const [cat, setCat] = useState();
    const[title,setTitle]=useState();
    const[subtitle,setSubtitle]=useState();
    const[size,setSize]=useState();
    const[price,setPrice]=useState();
   const[error1,setError1]=useState();
   const [error2, setError2] = useState();
   const[error,setError]=useState(false);
   const[done,setDone]=useState(false);
   const[done1,setDone1]=useState();
   useEffect(() => {

    const url = '/api/admin';
    const Fetchdata = async () => {
        try {
            const fetchdata = await axios.get(url);
            console.log(fetchdata.data.response);
            return fetchdata.data.response

        }
        catch (error) { console.log("error") };
    }
    Fetchdata()
        .then(resp => {
            console.log(resp);
            setCat(resp)
        })
}, [])
   const handleCat= async(e)=>{
    e.preventDefault();
    const Img1 = document.getElementById('banImg1').files[0];
    const ImgName1=Img1.name;
    const ref1 =await storage.ref(`/subImages/${Img1.name}`);
    const uploadTask1 =await ref1.put(Img1)
     const subImage=   await ref1.getDownloadURL();
    axios.post("/api/admin/storeitem",{title,subtitle,size,price,subImage})
       .then(resp=>{
         if(resp.data.message=="Item Added Successfully")
         {
            setDone(true)
            setError2(false)
             setDone1(resp.data.message)
         }
         else{
          setError1(resp.data.message)
          setError(true)
          setError2(true)
         }
       })
       .catch(err => {
         console.log(err)
       })
       setError(false)
   setDone(false)
    console.log(title,subtitle,size,price)
  }
    return (
        <div className="Add">
            <Form onSubmit={handleCat} >
            {error2 ?(error&& <div className="error"  ><h10>{error1}</h10></div>):(done && <div className="error1"   ><h10>{done1}</h10></div>)}
                <Form.Row>
                    <Form.Group className="Add1" controlId="formGridEmail">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." required   onChange={e => setTitle(e.target.value)}>
                                    <option className="opt" selected='true' disabled='disabled' >Select Category</option>
                                    {cat && cat.map((el) => {
                                        return (
                                            <option className="opt" value={el.title} >{el.title}</option>
                                        )
                                    })}
                                </Form.Control>
                    </Form.Group>
                    <Form.Group className="Add1" controlId="formGridEmail">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control type="text" required placeholder="Enter Item Name"  onChange={e => setSubtitle(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="Add1" controlId="formGridEmail">
                        <Form.Label>Item Size</Form.Label>
                        <Form.Control type="text" required placeholder="Enter Item Size" onChange={e => setSize(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="Add1" required controlId="formGridEmail">
                        <Form.Label>Item Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter Item Price" onChange={e => setPrice(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                    <Form.Label>Item Image</Form.Label>
                        <Form.File id="banImg1" required />
                    </Form.Group>
                </Form.Row>
                <Button variant="primary" type="submit">
                    Add Item
               </Button>
            </Form>
        </div>
    );
}

export default AddCategory;
