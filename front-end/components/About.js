import React from 'react';
import { Container, Row, Col } from "reactstrap";


const About = () => {

  return (
    <section className="section" id="about">
      <Container>
        <h1 className="feature-header">TEAM MEMBERS</h1>
        <div className="about-content">
          The Doge Pound was founded by four friends who set a goal and want to achieve it. Four oddly matched people expressing themselves via art and creating something interesting and hilarious.
        </div>
        <Row style={{marginBottom: "20px"}}>
          <Col lg={6} md={6}>
            <div className="member d-flex">
              <img src="/images/member1.jpg" alt="" className="mr-5" />
              <div>
                <div className="member-name">
                  CRYPTO BABE
                </div>
                <div className="member-content">
                  Shows off but for a reason. Artist, Designer.
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6}>
            <div className="member d-flex">
              <img src="/images/member1.jpg" alt="" className="mr-5" />
              <div>
                <div className="member-name">
                  CRYPTO BABE
                </div>
                <div className="member-content">
                  Shows off but for a reason. Artist, Designer.
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={6}>
            <div className="member d-flex">
              <img src="/images/member1.jpg" alt="" className="mr-5" />
              <div>
                <div className="member-name">
                  CRYPTO BABE
                </div>
                <div className="member-content">
                  Shows off but for a reason. Artist, Designer.
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6}>
            <div className="member d-flex">
              <img src="/images/member1.jpg" alt="" className="mr-5" />
              <div>
                <div className="member-name">
                  CRYPTO BABE
                </div>
                <div className="member-content">
                  Shows off but for a reason. Artist, Designer.
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;