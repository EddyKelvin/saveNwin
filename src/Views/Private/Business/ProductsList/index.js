/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-line react-hooks/exhaustive-deps
// STYLES
import "./index.css";
import { Popover } from "antd";
import { MoreOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Input } from "antd";

// MODULES AND PACKAGES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AxiosCall from "../../../../Utils/axios";
import { Pagination } from "antd";

// ACTIONS
import {
  getProductList,
  getProductCleanup,
} from "../../../../Store/actions/bussiness/get-product";

const ProductsList = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const getProductState = useSelector((s) => s.getProduct);
  const [products, setProducts] = useState();
  const [currentID, setCurrentID] = useState("");

  const changePage = (page) => {
    dispatch(getProductList({ page: page }));
  };

  useEffect(() => {
    dispatch(getProductList({ limit: 20 }));
  }, []);

  useEffect(() => {
    if (getProductState.isSuccessful) {
      setProducts(getProductState.data);
      dispatch(getProductCleanup());
    } else if (getProductState.error) {
      setProducts(null);
      dispatch(getProductCleanup());
    }
  }, [getProductState]);

  const actions = async (id) => {
    try {
      await AxiosCall({
        method: "DELETE",
        path: "products/" + id,
      });
      dispatch(getProductList({}));
      handleCancel();
    } catch (err) {
      dispatch(getProductCleanup());
    }
  };

  // FOR MODAL
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (value) => dispatch(getProductList({ title: value }));

  return (
    <div className="product-list-container">
      <h3>Items </h3>
      <hr />
      {products && (
        <p>
          {products.totalProducts === 0
            ? null
            : `${products.totalProducts} items`}
        </p>
      )}
      {products && (
        <p>{products.totalProducts === 0 ? "No item found" : null}</p>
      )}

      <div className="search-container">
        <Search
          className="search-input"
          placeholder="Search by title"
          onSearch={onSearch}
          enterButton
        />
      </div>

      {getProductState.isLoading ? (
        <div className="text-center py-5">
          <LoadingOutlined style={{ fontSize: 30 }} Spin />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table borderless">
            {products && products.products.length === 0 ? null : (
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col" className="col-2">
                    Item Title
                  </th>
                  <th scope="col" className="col-2">
                    Category
                  </th>
                  <th scope="col" className="col-2">
                    Type
                  </th>
                  <th scope="col" className="col-2">
                    Selling Price
                  </th>
                  <th scope="col" className="col-2">
                    Discount
                  </th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
            )}

            {products && products.products.length !== 0 && (
              <>
                {products.products.map((product, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}.</td>
                      <td>{product.title}</td>
                      <td>{product.category}</td>
                      <td>{product.productType}</td>
                      <td>${product.sellingPrice}</td>
                      <td>${product.discount}</td>
                      <td className="delete-action">
                        <Popover
                          content={
                            <p
                              className="delete-action"
                              onClick={() => {
                                setCurrentID(product._id);
                                showModal();
                              }}
                            >
                              Delete Item
                            </p>
                          }
                          trigger="click"
                        >
                          <MoreOutlined />
                        </Popover>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </table>
        </div>
      )}

      <Modal
        title="Delete Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p className="text-center">
          Are you sure you want to delete this item?
        </p>

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-danger btn-sm m-4"
            onClick={() => actions(currentID)}
          >
            YES
          </button>
          <button
            className="btn btn-primary btn-sm m-4"
            onClick={() => handleCancel()}
          >
            NO
          </button>
        </div>
      </Modal>

      {products && (
        <div className="d-flex justify-content-end pb-5 pt-4">
          <Pagination
            onChange={changePage}
            total={products.totalProducts}
            hideOnSinglePage={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsList;
