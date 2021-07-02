import React from 'react';
import { Card } from 'react-bootstrap';
import './Card.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
function CardComp(props) {
    const cat = props.data;

    return (
        
        <> 
            <div>
             {cat && cat.map((el) => {

                return (
                    
                    <Link key={el._id} to='/ordernow' className='' >
                        
                        <Card className='card_hover float-left col-lg-3 col-md-5 col-sm-5 col-11 m-3 ml-4 p-2 manu bg_color'>
                            <Card.Img  variant="top" src={el.image} alt='image will be here' className="card_image mt-2 rounded overflow-hidden" />
                            <Card.Body className='card_body'>
                                <Card.Title>{el.title}</Card.Title>
                            </Card.Body>
                        </Card> 
                    </Link> 
                )
            })}
            </div>
            



        </>
         
    )
}
export default CardComp;