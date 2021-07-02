import './Contact/contact.css'
import axios from 'axios';
import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
export default function ActivateUser(props) {
    const _id=props.match.params.id;
    // const [_id,setId]=useState(props.match.params.id)
     const [done,setDone]=useState(false)
     const [nodone,setNoDone]=useState(true)
     const [data,setData]=useState();
    
    useEffect(() => {
      
     console.log(_id)
      if (_id) {
      //   return response.status(401).json({message: 'Cannot Validate an User!'})
      console.log(_id)
      axios.post("/api/user/active",{_id})
      .then(resp => {
          console.log(resp.data.message)
          if(resp.data.message=='Email has been registered'||'Email Already registered')
          {
           setDone(true)
           setNoDone(false)
           setData(resp.data.message)
          }
          })
      .catch(err => {
          console.log(err)
      })
    }
    else{
        console.log("api ni chali")
    }


    },[])
    // const response = await fetch(`/${hash}`);
    // if (response.status >= 400) {
    // //   return response.status(401).json({message: 'Cannot Validate an User!'})
    // } else {
    //     console.log(response)
    // //   response.writeHead(307,props.history.push("/signup") );

    //   response.end();
    // }
    return (
        <div>
          {nodone&&<div  className="loginlink"><h5>Your Email Activation is in procsess......</h5></div>}
          {done&&<div className="loginlink"><h5>{data}. You can login Now! <Link className="lodinlink" to="/login"> login</Link></h5></div>}
        </div>
    )
  }