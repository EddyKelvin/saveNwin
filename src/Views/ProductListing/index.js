/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./index.css";
import { Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

//modules and packages
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import SearchForm from "../Home/Hero/SearchForm";

//actions
import {
  productList,
  productListCleanup,
} from "../../Store/actions/productList";

const ProductListing = () => {
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const productState = useSelector((s) => s.productList);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const type = searchParams.get("productType");
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const title = searchParams.get("title");

  const changePage = (page) => {
    dispatch(productList({ page: page }));
  };

  useEffect(() => {
    dispatch(productList({ limit: 8, productType: type, city, state, title }));
    window.scrollTo(0, 0);
  }, [useLocation()]);

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
    <div className="product-listing">
      <Container>
        <div className="text-start">
          <SearchForm />
        </div>

        {products && products.products.length < 1 && (
          <>
            <p className="fw-bold fs-6">No result found for your search!</p>
            <p>
              {" "}
              You can <Link to="/signup"> sign up </Link> to become a business
              owner{" "}
            </p>
          </>
        )}
        {products && products.products.length !== 0 && (
          <>
            <div className="topper mb-4">
              <h3>Available Items</h3>
              <h4>{products.totalProducts} Products</h4>
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
                        <CardTitle tag="h5" className="product-title">
                          {product.title}
                        </CardTitle>
                        <p className="product-type">{product.productType}</p>

                        <p className="product-discount">${product.discount}</p>

                        <p className="product-price">${product.sellingPrice}</p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>

            <div className="d-flex justify-content-end pb-5 pt-4">
              <Pagination
                onChange={changePage}
                total={products.totalProducts}
                hideOnSinglePage={true}
              />
            </div>
          </>
        )}

        {!products && (
          <p>
            {" "}
            <div className="text-center py-5">
              <LoadingOutlined style={{ fontSize: 30 }} spin />
            </div>
          </p>
        )}
      </Container>
    </div>
  );
};

export default ProductListing;
