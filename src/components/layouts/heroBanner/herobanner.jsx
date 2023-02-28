import React from "react";
import { Carousel } from "react-bootstrap";
import { SliderData } from "../../../Constants/HeroBanner/Herobanner.data";
import { Container, Row, Col } from "react-bootstrap";

const HeroSlider = () => {
  return (
    <section className="hero-section">
      <Carousel>
        {SliderData.map((slideData) => (
          <Carousel.Item key={slideData.title}>
            <Container>
              <Row>
                <Col lg={6} className="slide-text">
                  <h2>{slideData.title}</h2>
                  <p>{slideData.discription}</p>
                </Col>
                <Col lg={6} className="hero-img">
                  <img
                    src={slideData.image}
                    alt={slideData.alt}
                  />
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default HeroSlider;
