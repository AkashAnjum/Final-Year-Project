import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Cookie from 'js-cookie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './home.css'
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        width: 700,
    },
    table: {
        minWidth: 450,
    },
    head: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',

    },
    hcell: {
        color: 'white',
    },
    h1cell: {
        color: 'black',
    },
    h2cell: {
        color: 'white',
        backgroundColor: 'gray',
        padding: 5,
        borderRadius: 5,

    },

    row1: {
        backgroundColor: 'white',


    },
    row: {
        backgroundColor: 'lavender',
        '&:hover': {

            backgroundColor: 'lightgray',
        }
    },
    

    update: {
        marginTop: 5,
        '&:hover': {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'black',
        }
    },
    cell: {
        display: 'flex',

    },
    icon: {
        marginLeft: 10,
        borderRadius: 5,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        padding: 5,
    },



});




export default function Pending(props) {
    let mydata=Cookie.get('userId');
    console.log(mydata)
    if(mydata==null){
        props.history.push("/login")
    }
    const classes = useStyles();
    const [cat, setCat] = useState();
    // const [subtitle, setSubtitle] = useState();
    // const [size, setSize] = useState();
    // const [price, setPrice] = useState();
    useEffect(() => {

        const url = '/api/order/show';
        const Fetchdata = async () => {
            try {
                const fetchdata = await axios.post(url, {userId: mydata});
                console.log(fetchdata.data.dates);
                return fetchdata.data.dates

            }
            catch (error) { console.log("error") };
        }

        Fetchdata()
            .then(resp => {
                setCat(resp);
                console.log(resp);
            })


    }, [])
    const handleStoreRej = async (e) => {
        let IDD= e._id
        console.log(IDD)
        await axios.post("/api/total/store", e)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err)
            })
        await axios.post("/api/rejected/store", e)
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err)
            })
            await axios.post("/api/order/delete",{IDD})
            .then(resp => {
                console.log(resp)
                console.log("done")
            })
            .catch(err => {
                console.log(err)
            })
            const url = '/api/order';
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
                    setCat(resp);
                    console.log(resp);
                })
        

    }
    
    
    return (
        <div  >

            {cat && cat.map((el) => {
                console.log(el);
                let subData = el.sub
                console.log(subData)
                console.log(el.title)
                return (
                        <div className="forButtom">
                            <Card>
                                <Card.Body>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableBody>
                                            {subData.map((dl) => {
                                                console.log(dl.subtitle);
                                                console.log(el._id);
                                                return (

                                                    <TableRow className={classes.row} >
                                                        <TableCell component="th" scope="row">{dl.subtitle}</TableCell>
                                                        <TableCell >{dl.size}</TableCell>
                                                        <TableCell >{dl.quantity}</TableCell>
                                                        <TableCell >{dl.itemprice}</TableCell>
                                                    </TableRow>


                                                )
                                            })}

                                            <TableRow className={classes.row1} >
                                                <TableCell component="th" scope="row" className={classes.h1cell}>
                                                    <div >

                                                        <h6 className="bism">{el.address}</h6>
                                                        </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className={classes.h1cell}>Delivery Fee</div>
                                                    <div className={classes.h2cell}>{el.charges}</div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className={classes.h1cell}>Total</div>
                                                    <div className={classes.h2cell}>{el.total}</div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className="link"  onClick={(e) => {
                                                        e.preventDefault();
                                                        console.log(el);
                                                        handleStoreRej(el);
                                                    }}>Reject</div>
                                                </TableCell>
                                            </TableRow>

                                
                                </TableBody>

                </Table>
            </TableContainer>
            </Card.Body>
                </Card>
                     </div>

                        )})}
                    
        </div >
    );
}