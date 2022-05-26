/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
import { Input, Row, Col, Modal, Checkbox, message, Pagination } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  createProgramCleanup,
  createProgram,
} from "../../../../Store/actions/bussiness/create-program";

import {
  getProductList,
  getProductCleanup,
} from "../../../../Store/actions/bussiness/get-product";

const CreateProgram = () => {
  const { Search } = Input;
  const dispatch = useDispatch();
  const createProgramState = useSelector((s) => s.createProgram);
  const getProductState = useSelector((s) => s.getProduct);

  const [products, setProducts] = useState([]);
  const [programTitle, setProgramTitle] = useState("");
  const [programStock, setProgramStock] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [totalDiscount, setTotalDiscount] = useState("");
  const [productsArray, setProductsArray] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
  const [allowCreateProgram, setAllowCreateProgram] = useState(true);

  const calcNum = (arg) => {
    const isStock = selectedItems.find((item) => item._id === arg._id);

    if (isStock) {
      return isStock.in_stock;
    } else {
      return 0;
    }
  };

  const increaseStock = (arg) => {
    setSelectedItems((prev) => {
      const isItem = prev.find((item) => item._id === arg._id);

      if (isItem) {
        return prev.map((item) =>
          item._id === arg._id
            ? {
                ...item,
                in_stock: item.in_stock + 1,
              }
            : item
        );
      }
      return [...prev, { ...arg, in_stock: 1 }];
    });

    setProductsArray((prev) => {
      const isItem = prev.find((item) => item._id === arg._id);

      if (isItem) {
        return prev.map((item) =>
          item._id === arg._id
            ? {
                item: item._id,
                stock: item.in_stock + 1,
              }
            : item
        );
      }
      return [...prev, { stock: 1, item: arg._id }];
    });
  };

  const decreaseStock = (arg) => {
    setSelectedItems((prev) =>
      prev.reduce((ack, item) => {
        if (item._id === arg) {
          if (item.in_stock === 1) return ack;
          return [...ack, { ...item, in_stock: item.in_stock - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );
  };

  const sumPrice = () => {
    setTotalPrice(
      selectedItems.reduce(
        (ack, item) => ack + item.in_stock * item.sellingPrice,
        0
      )
    );

    setTotalDiscount(
      selectedItems.reduce(
        (ack, item) => ack + item.in_stock * item.discount,
        0
      )
    );
  };

  // put id and in stock in an array and prevent from being added twice

  const changePage = (page) => {
    dispatch(getProductList({ page: page }));
  };

  const onSearch = (value) => dispatch(getProductList({ title: value }));

  const onSubmit = () => {
    const data = {
      products: productsArray,
      stock: parseInt(programStock),
      totalPrice,
      totalDiscount,
      title: programTitle,
    };

    dispatch(createProgram(data));
  };

  // // run this when a product is added
  useEffect(() => {
    sumPrice();
  }, [selectedItems]);

  useEffect(() => {
    dispatch(getProductList({ limit: 20 }));
  }, []);

  // GET PRODUCTS FROM BACKEND TO DISPLAY
  useEffect(() => {
    if (getProductState.isSuccessful) {
      setProducts(getProductState.data.products);
      dispatch(getProductCleanup());
    } else if (getProductState.error) {
      setProducts(null);
      dispatch(getProductCleanup());
    }
  }, [getProductState]);

  useEffect(() => {
    if (createProgramState.isSuccessful) {
      message.success("Program created successfully");
      handleCancel();
      // setProductsArray([]);
      setSelectedItems([]);
      setProgramTitle("");
      setProgramStock("");
      dispatch(createProgramCleanup());
    } else if (createProgramState.error) {
      message.error(createProgramState.error);
      dispatch(createProgramCleanup());
    }
  }, [createProgramState]);

  const onChange = () => {
    setAllowCreateProgram(!allowCreateProgram);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showTermsModal = () => {
    setIsTermsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleTermsOk = () => {
    setIsTermsModalVisible(false);
  };

  const handleTermsCancel = () => {
    setIsTermsModalVisible(false);
  };

  return (
    <div className="create-program-container">
      <div className="container-inner">
        <h6>Create VIP Program </h6>
        <hr />

        <div className="search-container">
          <Search
            className="search-input"
            placeholder="Search by title"
            onSearch={onSearch}
            enterButton
          />
        </div>

        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <input
              placeholder="Add a Descriptive title for your program"
              className="input_field"
              type="text"
              name="title"
              value={programTitle}
              onChange={(e) => setProgramTitle(e.target.value)}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <input
              placeholder="Number of program in stock"
              className="input_field"
              type="number"
              name="inStock"
              value={programStock}
              onChange={(e) => setProgramStock(e.target.value)}
            />
          </Col>
        </Row>

        <Row gutter={[16, 24]} className="mt-4">
          <Col xs={{ span: 12 }} md={{ span: 6 }}>
            <div className="create_program_card selling_price">
              <p>Total Selling Price</p>

              <h3>${totalPrice}.00</h3>
            </div>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 6 }}>
            <div className="create_program_card discount_price">
              <p>Total Discount</p>

              <h3>${totalDiscount}.00</h3>
            </div>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 6 }}>
            <div className="create_program_card item_number">
              <p>No. of items</p>

              <h3>{selectedItems.length}</h3>
            </div>
          </Col>
          <Col xs={{ span: 12 }} md={{ span: 6 }}>
            <div className="create_program_card create_btn">
              <button
                disabled={!programTitle && !programStock}
                onClick={showModal}
              >
                Create Program
              </button>
            </div>
          </Col>
        </Row>

        <div className="table-responsive mt-5 mb-5">
          <table className="table borderless">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Item Title</th>
                <th scope="col">Category</th>
                <th scope="col">Selling Price</th>
                <th scope="col">Discount</th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products &&
                products.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>${item.sellingPrice}</td>
                    <td>${item.discount}</td>

                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="calc_button"
                        onClick={() => decreaseStock(item._id)}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      {calcNum(item)}
                      <button
                        className="calc_button"
                        onClick={() => increaseStock(item)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

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

      <Modal
        title="Create New Program"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="text-center">
          <Checkbox onChange={onChange}></Checkbox>{" "}
          <span>
            Agree to{" "}
            <span className="terms-btn" onClick={showTermsModal}>
              terms and conditions
            </span>
          </span>
          <br />
          <div className="d-flex justify-content-evenly mt-5">
            <button
              onClick={handleCancel}
              className="btn-danger btn-sm px-4 py-2"
            >
              CANCEL
            </button>
            <button
              disabled={allowCreateProgram}
              onClick={onSubmit}
              className="btn btn-success btn-sm px-4 py-2"
            >
              {createProgramState.isLoading ? <LoadingOutlined /> : "PROCEED"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Terms of use"
        visible={isTermsModalVisible}
        onOk={handleTermsOk}
        onCancel={handleTermsCancel}
        footer={null}
      >
        <p>
          Terms and Conditions General Site Usage Last Revised: December 16,
          2013 Welcome to www.lorem-ipsum.info. This site is provided as a
          service to our visitors and may be used for informational purposes
          only. Because the Terms and Conditions contain legal obligations,
          please read them carefully. 1. YOUR AGREEMENT By using this Site, you
          agree to be bound by, and to comply with, these Terms and Conditions.
          If you do not agree to these Terms and Conditions, please do not use
          this site. PLEASE NOTE: We reserve the right, at our sole discretion,
          to change, modify or otherwise alter these Terms and Conditions at any
          time.
        </p>
      </Modal>
    </div>
  );
};

export default CreateProgram;
