import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

function Landing() {
  return (
    <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100 h-100"
            src="http://feckinbrew.com/wp-content/uploads/2017/12/1920x1080-1543232-beer__12.jpg"
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100 h-100"
            src="http://feckinbrew.com/wp-content/uploads/2017/12/1920x1080-1543232-beer__12.jpg"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100 h-100"
            src="http://feckinbrew.com/wp-content/uploads/2017/12/1920x1080-1543232-beer__12.jpg"
            alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  );
}

export default Landing;