/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// STYLES
import { Container, Row, Col, Card, CardBody, CardImg } from "reactstrap";
import fromhome from "../../Assets/images/fromhome.png";
import { FlagFilled } from "@ant-design/icons";
import "./index.css";

//ACTIONS
import { programsList, programsCleanup } from "../../Store/actions/programs";
import { addToCart, addToCartCleanup } from "../../Store/actions/addToCart";

import SearchForm from "../Home/Hero/SearchForm";

const ProgramListing = () => {
  const dispatch = useDispatch();
  const programState = useSelector((state) => state.programs);
  const cartState = useSelector((state) => state.addToCart);
  const userState = useSelector((state) => state.getMe);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [programs, setPrograms] = useState([]);
  const [totalPrograms, setTotalPrograms] = useState("");

  const budget = searchParams.get("budget");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const minDiscount = searchParams.get("minDiscount");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  useEffect(() => {
    dispatch(
      programsList({
        city,
        state,
        budget,
        minDiscount,
        startDate,
        endDate,
      })
    );
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [useLocation()]);

  const wishlist = (id, type) => {
    dispatch(addToCart({ id, type }));
  };

  useEffect(() => {
    if (cartState.isSuccessful) {
      setPrograms((prevPrograms) => {
        const cart = JSON.parse(localStorage.getItem("cart"));

        const programs = prevPrograms.map((program) => {
          if (cart && cart.includes(program._id)) {
            program.inCart = true;
          } else {
            program.inCart = false;
          }
          return program;
        });
        return programs;
      });
      dispatch(addToCartCleanup());
    } else if (cartState.error) {
      message.error(cartState.error);
      dispatch(addToCartCleanup());
    }
  }, [cartState]);

  useEffect(() => {
    if (programState.isSuccessful) {
      setPrograms(programState.data.programs);
      const programs = programState.data.programs;
      const checkedPrograms = programs.map((program) => {
        const cart = JSON.parse(localStorage.getItem("cart"));

        if (cart && cart.includes(program._id)) {
          program.inCart = true;
        }

        return program;
      });
      setTotalPrograms(programState.data.totalPrograms);
      setPrograms(checkedPrograms);
      dispatch(programsCleanup());
    } else if (programState.error) {
      setPrograms([]);
      dispatch(programsCleanup());
    }
  }, [programState]);

  return (
    <div className="program-list">
      <Container>
        <div className="text-start">
          <SearchForm />
        </div>

        {programState.isLoading ? (
          <div className="text-center py-5">
            <LoadingOutlined style={{ fontSize: 30 }} spin />
          </div>
        ) : (
          <>
            <div className="topper mb-4 mt-4">
              <h3>Available Programs</h3>
              <h4>{totalPrograms} Programs</h4>
            </div>

            {programs && programs.length < 1 && (
              <>
                <p className="fw-bold fs-6 text-center">
                  No result found for your search!
                </p>
                <p className="text-center">
                  {" "}
                  You can{" "}
                  <Link to="/signup" className="text-danger">
                    {" "}
                    sign up{" "}
                  </Link>{" "}
                  to become a business owner{" "}
                </p>
              </>
            )}

            <Row xs="2" md="3" lg="4">
              {programs &&
                programs.map((program) => (
                  <Col key={program._id} md="3" sm="6" className="col">
                    <Card>
                      {program.flag ? (
                        <p className="flag">
                          <FlagFilled
                            style={{ color: "#000000", fontSize: "13px" }}
                          />
                        </p>
                      ) : null}
                      <Link to={`/programs/${program._id}`}>
                        <CardImg
                          src={fromhome}
                          alt="happy"
                          className="avatar"
                        />
                        <CardBody>
                          <h4>{program.title}</h4>
                          <p className="total-discount">
                            ${program.totalPrice - program.totalDiscount}
                          </p>
                        </CardBody>
                      </Link>

                      {userState.data &&
                      userState.data.user.role === "business" ? null : (
                        <>
                          {userState.data &&
                          userState.data.user.role === "customer" ? (
                            <>
                              {program.inCart ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() =>
                                    wishlist(program._id, "remove")
                                  }
                                >
                                  Remove from wishlist
                                </button>
                              ) : (
                                <button
                                  className="btn btn-success"
                                  onClick={() => wishlist(program._id, "add")}
                                >
                                  Add to wishlist
                                </button>
                              )}
                            </>
                          ) : null}
                        </>
                      )}
                    </Card>
                  </Col>
                ))}
            </Row>
          </>
        )}
      </Container>

      {!programs && <p>Fetching Products...</p>}
    </div>
  );
};

export default ProgramListing;
