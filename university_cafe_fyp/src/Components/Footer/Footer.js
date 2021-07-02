import React from 'react';
import './Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaFacebook, FaTwitter} from "react-icons/fa";

function Footer(){
  return(
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col" style={{marginTop:"30px"}}>
            <div className="list-unstyled">
              <a href="https://web.facebook.com/profile.php?id=100008842248043" style={{marginRight:"30px"}}><FaFacebook size={40}/></a> 
              <a href="https://twitter.com/TheBadarTariq"><FaTwitter size={40}/></a> 
            </div>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Team Members</h4>
            <ul className="list-unstyled">
              <li>Akash Anjum</li>
              <li>Badar Tariq</li>
              <li>Abid Nazeer</li>
              </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            {new Date().getFullYear()} University Cafe | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  )
}
export default Footer;