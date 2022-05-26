/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./index.css";
import { FlagFilled } from "@ant-design/icons";

//modules and packages
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardImg } from "reactstrap";
import fromhome from "../../../Assets/images/fromhome.png";

//actions
import { programsList, programsCleanup } from "../../../Store/actions/programs";

const PopularPrograms = () => {
  const programState = useSelector((s) => s.programs);
  const [programs, setPrograms] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(programsList({ limit: 8 }));
  }, []);

  useEffect(() => {
    if (programState.isSuccessful) {
      setPrograms(programState.data.programs);
      dispatch(programsCleanup());
    } else if (programState.error) {
      setPrograms([]);
      dispatch(programsCleanup());
    }
  }, [programState]);

  return (
    <div className="popular-programs">
      <Container>
        <div className="topper">
          <h3>Popular programs</h3>
          <Link to="/programs-list">View all</Link>
        </div>

        <Row xs="2" md="3" lg="4">
          {programs &&
            programs.map((program) => (
              <Col key={program._id} className="col">
                <Link to={`/programs/${program._id}`}>
                  <Card>
                    {program.flag ? (
                      <p className="flag">
                        <FlagFilled
                          style={{ color: "#000000", fontSize: "13px" }}
                        />
                      </p>
                    ) : null}
                    <CardImg src={fromhome} alt="happy" className="avatar" />
                    <CardBody className="py-3">
                      <h4 className="text-capitalize">{program.title}</h4>
                      <p className="total-discount">
                        ${program.totalPrice - program.totalDiscount}
                      </p>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default PopularPrograms;
