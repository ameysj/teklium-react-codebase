import React from "react";
import Layout from "../../components/layouts";
import HeroSlider from "../../components/layouts/heroBanner/herobanner";
import Intro from "../../components/layouts/intro/intro";
import Services from "../../components/layouts/services/services";
import ScrollAnimation from "react-animate-on-scroll";

function Homepage() {
  return (
    <Layout>
      <HeroSlider />
      <ScrollAnimation animateIn="animate__fadeInUp">
        <Intro />
      </ScrollAnimation>
      <ScrollAnimation animateIn="animate__fadeInUp">
        <Services />
      </ScrollAnimation>
    </Layout>
  );
}

export default Homepage;
