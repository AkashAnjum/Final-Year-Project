import POP from './Popup'
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Cookie from 'js-cookie';
import './home.css';
import 'reactjs-popup/dist/index.css';
import {storage} from '../Firebase'
import {Table,Card,Row,Button, Form } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
import { Link } from 'react-router-dom';
import data from '../data.js';
import axios from 'axios';


export default function ViewCategory(props) {
    let mydata=Cookie.get('userInfo');
    if(mydata==null){
        props.history.push("/adminpanel")
    }
    const [cat, setCat] = useState();
    const [title, setTitle] = useState();
    const [url1,setImage]=useState();
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

        //update


    }, [])
    console.log(cat)
    
    let data1 = data.category;
    //For update
    const handleUpdate = async (_id) => {
        let image;
        const Img1get = document.getElementById('banImg1');
        console.log(Img1get)
        const Img1=Img1get.files[0];
        if(Img1){
        const ref1 =await storage.ref(`/images/${Img1.name}`);
        const uploadTask1 =await ref1.put(Img1)
           image=   await ref1.getDownloadURL();
    
 
 
        }
        console.log(_id)
        await axios.post("/api/admin/update", { _id,title,image})

            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err)
            })
        console.log(title, _id)
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

        //update



    }

    // delete
    const handleDelete = async (_id) => {

        console.log(_id)
        await axios.post("/api/admin/delete", {_id})

            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err)
            })
            //save reload
            console.log(title, _id)
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
        }

        return (
            <div className='forHomeCenter2'>
            <div className='Adddepart2'>
                <Table striped bordered hover responsive variant="light">
                        <thead className="thead" >
                            <tr >
                                <th ><h5>Category Name</h5></th>
                                <th>Category Image</th> 
                                <th></th> 
                            </tr>
                        </thead>
                        <tbody>
                            {cat && cat.map((el) => {
                                console.log(el.title)

                                return (
                                    <tr  >
                                        <td>{el.title}</td>
                                        <td><img className="images" alt="No Image Found" src={el.image} /></td>
                                        <td ><div className="overAll">
                                                    <div className="editIcon">
                                                  <Popup trigger={<Link ><BorderColorSharpIcon className="icon1"/></Link>} position="left top" onClick={e=>(setTitle(el.title),(setImage(el.image)))}>
                                               
                                                        <Card className="managepopup" ><Form onSubmit={(e) => {
                                                            e.preventDefault();
                                                            console.log(el._id)
                                                            handleUpdate(el._id);
                                                        }} >
                                                            <Form.Row>
                                                                <Form.Group>
                                                            <Form.Label>Category Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter Category Name" defaultValue={el.title} required onChange={e => setTitle(e.target.value)} />
                                                            </Form.Group>
                                                            </Form.Row>
                                                           <Form.Row>
                                                               <Form.Group>
                                                           <Form.Label>Category Image</Form.Label>
                                                            <Form.Control type="file" id="banImg1"   />
                                                            </Form.Group>
                                                               </Form.Row>  
                                                               <Form.Row>
                                                                   <Form.Group>
                                                                   <Button type="submit">Update</Button>
                                                                   </Form.Group>
                                                               </Form.Row>
                                                          
                                                        </Form>
                                                        </Card>
                                                         </Popup>
                                                    
                                                </div>
                                                <div className="deleteIcon" >
                                                    <form onClick={(e) => {
                                                    e.preventDefault();
                                                  
                                                    handleDelete(el._id);
                                              }}>
                                                    <Link ><DeleteIcon className="icon"/></Link>
                                                        </form>
                                                        </div>
                                            </div>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>

                    </Table>
               
            </div>
            </div>
        );
    }