import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Cookie from 'js-cookie';
import { storage } from '../Firebase'

import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
import axios from 'axios';
import { Table,Form,Card,Button } from 'react-bootstrap';
export default function ViewCategory(props) {
    let mydata = Cookie.get('userInfo');
    console.log(mydata)
    if (mydata == null) {
        props.history.push("/adminpanel")
    }
    const [cat, setCat] = useState();
    const [subtitle, setSubtitle] = useState();
    const [size, setSize] = useState();
    const [price, setPrice] = useState();
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

    //update
    const handleUpdate = async (_id, _id2) => {
        let subImage;
        const Img1get = document.getElementById('banImg1');
        console.log(Img1get)
        const Img1=Img1get.files[0];
        if(Img1){
        const ref1 =await storage.ref(`/images/${Img1.name}`);
        const uploadTask1 =await ref1.put(Img1)
           subImage=   await ref1.getDownloadURL();
        }
        console.log(_id)
        await axios.post("/api/admin/updateitem", { _id, _id2, subtitle, size, price,subImage })

            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err)
            })
        console.log(subtitle, _id)

        //reload
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
    // delete
    const handleDelete = async (_id, _id2) => {
        console.log(_id)
        await axios.post("/api/admin/deleteitem", { _id, _id2 })

            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err)
            })
        //reload
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
        <div className='Adddepart'>
            <div className='Adddepart2'>
                <Table striped bordered hover responsive variant="light">
                    <thead className="thead">
                        <tr>
                            <th ><h5>Item Name</h5></th>
                            <th ><h5>Item Image</h5></th>
                            <th><h5>Size</h5></th>
                            <th ><h5>Price</h5></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cat && cat.map((el) => {
                            let subData = el.sub
                            console.log(subData)
                            console.log(el.title)
                            return (
                                <>
                                    <thead className="maintitle">

                                        <h5>{el.title}</h5>
                                    </thead>

                                    {subData.map((dl) => {
                                        console.log(dl.subtitle)
                                        console.log(el._id)
                                        return (
                                            <tr>
                                                <td>{dl.subtitle}</td>
                                                <td><img className="subimages" alt="No Image Found" src={dl.subImage} /></td>
                                                <td>{dl.size}</td>
                                                <td >{dl.price}</td>
                                                <td><div className="overAll">
                                                    <div className="editIcon">
                                                        <Popup trigger={<Link><BorderColorSharpIcon className="icon1" /></Link>} position="left top">
                                                            <Card className="managepopup" ><Form onSubmit={(e) => {
                                                                e.preventDefault();
                                                                console.log(el._id)
                                                                handleUpdate(el._id, dl._id);
                                                            }}>
                                                                <Form.Row>
                                                                    <Form.Group>
                                                                    <Form.Label>Item Name</Form.Label>
                                                                    <Form.Control type="text" placeholder="Name" defaultValue={dl.subtitle} required onChange={e => setSubtitle(e.target.value)} />
                                                                    </Form.Group>
                                                            </Form.Row>
                                                                <Form.Row>
                                                                    <Form.Group>
                                                                        <Form.Label>Item Size</Form.Label>
                                                                        <Form.Control type="text" placeholder="Size" defaultValue={dl.size} required onChange={e => setSize(e.target.value)} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Form.Group>
                                                                        <Form.Label>Item Price</Form.Label>
                                                                        <Form.Control type="text" placeholder="Price" defaultValue={dl.price} onChange={e => setPrice(e.target.value)} />
                                                                    </Form.Group>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Form.Group>
                                                                        <Form.Label>Item Image</Form.Label>
                                                                        <Form.Control type="file" id="banImg1" />
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
                                                            console.log(el._id, dl._id)
                                                            handleDelete(el._id, dl._id);
                                                        }}>
                                                            <Link ><DeleteIcon className="icon" /></Link>
                                                        </form>
                                                    </div>
                                                    </div>
                                                </td>

                                            </tr>
                            )
                        })}

                                </>)
                        })}
                    </tbody>

                </Table>
        </div>
        </div >
    );
}