import React from 'react';
import './contact.css';
import {FaEnvelope, FaPhone} from "react-icons/fa";

function Contact() {
  return (
    <div className="main container p-3">
    <div className="container submain border p-2 m-1">
      <h2>Get In Touch</h2><hr/>
      <div className="col p-4">
        {/* row1 */}
        <div className="row border p-2 m-1" style={{marginTop:"5px"}}>
          <div className="list-inline row">
            <a className='list-inline-item col-3' href="mailto:badartariq343@gmail.com" style={{marginRight:"2px"}}><FaEnvelope size={35}/> </a> 
            <p className='list-inline-item col-8'>You Can <a href="mailto:badartariq343@gmail.com" data-bs-toggle="tooltip" data-bs-placement="left" title="badartariq343@gmail.com">Mail</a> us if you need any kind of help </p>
          </div>
        </div>
        {/* Row2 */}
        <div className="row border p-2 m-1" style={{marginTop:"5px"}}>
          <div className="list-inline row">
            <a className='list-inline-item col-3' href="tel:+923017973564" style={{marginRight:"2px"}}><FaPhone size={35}/> </a> 
            <p className='list-inline-item col-8'>You Can 
            <a href='tel:923017973564' data-bs-toggle="tooltip" data-bs-placement="left" title="+923017973564"> Call </a>
             us if you need any kind of help</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  </div>
  );
}

export default Contact;