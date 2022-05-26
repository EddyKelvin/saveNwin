//sytles
import "./index.css";

import React from "react";
import { Container, Row, Col } from "reactstrap";

import happy from "../../../Assets/images/happy.png";
import fromhome from "../../../Assets/images/fromhome.png";

const Promotion = () => (
  <div className="promotion">
    <Container>
      <Row>
        <Col md="6">
          <h1>Shop, save and support your community</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </p>
          <button className="learn-more-btn">Learn more</button>
        </Col>
        <Col md="6" className="img-container">
          <img src={happy} alt="happy shopping" id="img-1" />
          <img src={fromhome} alt="shop from home" id="img-2" />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Promotion;
