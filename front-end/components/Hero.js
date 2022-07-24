import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Hero = () => {
  return (
    <section className="section position-relative" style={{marginTop: "30px", marginBottom: "30px"}}>
      <Container>
        <img src="/images/hero.jpg" alt="" style={{width: "100%", height: "100%"}}/>
      </Container>
    </section>
  );
}

export default Hero;