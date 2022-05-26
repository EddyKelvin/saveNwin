/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./index.css";

//modules and packages
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardImg, CardBody } from "reactstrap";

//actions
import {
  productList,
  productListCleanup,
} from "../../../Store/actions/productList";

const ProductListing = () => {
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const productState = useSelector((s) => s.productList);

  useEffect(() => {
    dispatch(productList());
  }, []);

  useEffect(() => {
    if (productState.isSuccessful) {
      setProducts(productState.data);
      dispatch(productListCleanup());
    } else if (productState.error) {
      setProducts(null);
      dispatch(productListCleanup());
    }
  }, [productState]);

  return (
    <div className="popular-products">
      <Container>
        {products && products.products.length !== 0 && (
          <>
            <div className="topper">
              <h3>feautured products</h3>
              <Link to="/products-list">View all</Link>
            </div>

            <Row xs="2" md="3" lg="4">
              {products.products.map((product) => (
                <Col className="col" key={product._id}>
                  <Link to={`/products/${product._id}`}>
                    <Card>
                      <div className="avatar-container">
                        <CardImg
                          top
                          width="100%"
                          src={product.avatar.secure_url}
                          alt={product.title}
                          className="avatar"
                        />
                      </div>
                      <CardBody>
                        <h4 className="product-title">
                          {product.title}
                          <span> ({product.productType}) </span>
                        </h4>
                        <span className="info">&#9432;</span>
                        <p className="product-discount">${product.discount}</p>
                        <p className="product-price">${product.sellingPrice}</p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </>
        )}
        {!products && <h3>Oops, Unable to fetch products</h3>}
      </Container>
    </div>
  );
};

export default ProductListing;
