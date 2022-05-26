/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./index.css";

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image, Card } from "antd";

//actions
import { product, productCleanup } from "../../Store/actions/product";
import {
  productProgram,
  productProgramCleanup,
} from "../../Store/actions/productProgram";

const Product = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const productProgramState = useSelector((state) => state.productProgram);
  const [productDetails, setProductDetails] = useState(null);
  const [programID, setProgramID] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(product({ _id }));
    dispatch(productProgram({ _id }));
  }, []);

  useEffect(() => {
    if (productState.isSuccessful) {
      setProductDetails(productState.data);
      dispatch(productCleanup());
    } else if (productState.error) {
      setError(productState.error);
      dispatch(productCleanup());
    }
  }, [productState]);

  useEffect(() => {
    if (productProgramState.isSuccessful) {
      setProgramID(productProgramState.data[0]._id);
      dispatch(productProgramCleanup());
    } else if (productProgramState.error) {
      setProgramID(null);
      dispatch(productProgramCleanup());
    }
  }, [productProgramState]);

  return (
    <div className="product">
      {error && <h1>{error}</h1>}
      {productDetails && (
        <Container>
          <Row>
            <Col md="4" sm="12">
              <Image
                src={productDetails.avatar.secure_url}
                alt={productDetails.title}
              />
            </Col>
            <Col md="8" sm="12">
              <Card title={productDetails.title} style={{}}>
                <p>
                  Brand: <span>{productDetails.brand}</span>
                </p>

                <p>
                  Type: <span>{productDetails.productType}</span>
                </p>
                <p>
                  Category: <span>{productDetails.category}</span>
                </p>

                <p>
                  Location:{" "}
                  <span>{(productDetails.city, productDetails.state)}</span>
                </p>

                <p>
                  Address: <span>{productDetails.address}</span>
                </p>

                <p className="mb-0">
                  ${productDetails.sellingPrice - productDetails.discount}
                </p>

                <p id="selling">${productDetails.sellingPrice}</p>
                <Link className="text-white" to={`/programs/${programID}`}>
                  <button className="btn btn-secondary btn-sm">
                    View program
                  </button>
                </Link>

                <h6 className="mt-3">Description</h6>
                <p>{productDetails.description}</p>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Product;
