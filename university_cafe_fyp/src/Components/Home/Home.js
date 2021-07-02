import React from 'react';
import cafeimage from './../../Images/unicafe2.png';
import CardComp from '../Card/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Card/Card.css';

function Home(props) {


  return (
    <div className="container-fluid" >
      <div>
        <div className=''>
          <img src={cafeimage} alt="cafepic" style={{maxHeight:'310px', marginTop:"-30px"}} className="shadow container-fluid mx-auto img-fluid"/> 
        </div> 
        <hr/>
        {/* Menues */}
        <div className='my-1'>
          <h1 className='tab-center'>Menu</h1>
        </div>
        <div className='mb-2' style={{clear:"both"}}>
          <div className=''>
            <div className='align-items-center mx-auto'>
              <div className="container" >
                <CardComp data={props.data}/>
              </div>
            </div>
            
            
          </div>
        </div>
      </div> 
    </div>
  );
}
export default Home;