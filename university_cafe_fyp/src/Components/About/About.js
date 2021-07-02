import React from 'react';
import { Card } from 'react-bootstrap';
import './About.css';
import aboutImage from './../../Images/unicafe2.png';
function About() {
  return (
    <div className="about">
      <Card.Img variant="top" src={aboutImage} className="pic" />
      <Card>
        <Card.Header><h3>About US</h3></Card.Header>

        <Card.Body>
          <Card.Text>
            Students live on Bhakkar Campus have many options to have meal, canteen on campus with a students dining place. There are many restaurants in sargodha university bhakkar campus which is just 5 minutes to go.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default About;