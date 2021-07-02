import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import {storage} from '../Firebase'
import { Button, Form } from 'react-bootstrap';
function AddCategory(props) {
  let mydata=Cookie.get('userInfo');
  console.log(mydata)
  if(mydata==null){
      props.history.push("/adminpanel")
  }
  const [title, setTitle] = useState();
 
  const [error1, setError1] = useState();
  const [error2, setError2] = useState();
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [done1, setDone1] = useState();
  const handleCat =async (e) => {
    let mydata=Cookie.get('userInfo');
    console.log(mydata)
    e.preventDefault();
    const Img1 = document.getElementById('banImg1').files[0];
    const ImgName1=Img1.name
    const ref1 =await storage.ref(`/images/${Img1.name}`);
    const uploadTask1 =await ref1.put(Img1)

const image=await ref1.getDownloadURL();

    axios.post("/api/admin/store", {title,image})
      .then(resp => {
        if (resp.data.message == "Category Added Successfully") {
          setDone(true)
          setError2(false)
          setDone1(resp.data.message)
        }
        else {
          setError1(resp.data.message)
          setError(true)
          setError2(true)
          
        }
      })
      .catch(err => {
        console.log(err)
       

      })
    console.log(title)
    setError(false)
   setDone(false)
  }
  

  
  return (
    <div className="Add">
      <Form onSubmit={handleCat} method='post' enctype="multipart/form-data">
        <Form.Row>

          <Form.Group className="Add1" controlId="formGridEmail">
            {error2 ?(error&& <div className="error"  ><h10>{error1}</h10></div>):(done && <div className="error1"   ><h10>{done1}</h10></div>)}
      <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Category Name" required onChange={e => setTitle(e.target.value)} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
          <Form.Label>Category Image</Form.Label>
            <Form.File id="banImg1" required  name='image'/>
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </div>
  );
}

export default AddCategory;