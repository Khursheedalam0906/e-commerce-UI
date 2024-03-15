import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Banner1 from "../components/assets/Banner1.png";
import Banner2 from "../components/assets/Banner2.png";
import Banner3 from "../components/assets/Banner3.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Banner = () => {
  return (
    <Carousel data-bs-theme="warning">
      <Carousel.Item>
        <img className="d-block w-100" src={Banner1} alt="First slide" />
        <Carousel.Caption>
          <h5 className="text-light">Buy Gadgets</h5>
          <p className="text-light">Upto 60% off on all gadgets</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Banner2} alt="Second slide" />
        <Carousel.Caption>
          <h5 className="text-light">Buy apple Products</h5>
          <p className="text-light">The Biggest Sale</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Banner3} alt="Third slide" />
        <Carousel.Caption>
          <h5 className="text-light">Black Friday Sale</h5>
          <p className="text-light">All gadegts 60% off.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
