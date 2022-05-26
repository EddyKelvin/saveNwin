/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import AxiosCall from "../../../../Utils/axios";
import Moment from "moment";
import { Pagination } from "antd";

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(async () => {
    try {
      const requestObj = {
        path: `products/search`,
        method: "GET",
      };
      const { data } = await AxiosCall(requestObj);
      setProducts(data.products);
      setPagination(data);
    } catch (err) {
      console.log("An error occured when trying");
    }
  }, []);

  const changePage = async (page) => {
    try {
      const requestObj = {
        path: `products/search?page=${page}`,
        method: "GET",
      };
      const { data } = await AxiosCall(requestObj);
      setProducts(data.products);
      setPagination(data);
    } catch (err) {
      console.log("An error occured");
    }
  };

  return (
    <Container className="products-list">
      <h3 style={{ marginTop: 20 }}>All Products</h3>

      <div className="table-wrapper" style={{ minWidth: 1000 }}>
        <div className="table">
          <li className="table-head" id="top-level">
            <span style={{ width: 100 }}>No</span>
            <span>Product title</span>
            <span>Category</span>
            <span>Email address</span>
            <span>Date created</span>
            <span>Amount</span>
          </li>
          <ul className="table-body">
            {products &&
              products.map((data, key) => (
                <li className="all-users" key={key}>
                  <span className="items" style={{ width: 100 }}>
                    {key + 1}
                  </span>
                  <span
                    className="items"
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <img
                      style={{
                        display: "block",
                        marginRight: 20,
                        borderRadius: 8,
                      }}
                      height={50}
                      width={50}
                      src={data.avatar.secure_url}
                      alt="product"
                    />
                    {data.title}
                  </span>
                  <span className="items">{data.category}</span>
                  <span className="items">{data.owner.email}</span>
                  <span className="items">
                    {Moment(data.createdAt).format("Do MM  YYYY, h:mm a")}
                  </span>
                  <span className="items">${data.sellingPrice}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="d-flex justify-content-end pb-5 pt-4">
        <Pagination
          onChange={changePage}
          total={pagination && pagination.totalProducts}
          hideOnSinglePage={true}
        />
      </div>
    </Container>
  );
};

export default ProductList;
