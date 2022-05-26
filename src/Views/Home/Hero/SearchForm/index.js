import "./index.css";

import React, { useState, useEffect } from "react";
import { Form, Button, Select, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import america from "../../../../Utils/location/america";

import { programsList } from "../../../../Store/actions/programs";

import { productList } from "../../../../Store/actions/productList";

const SearchForm = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [minDiscount, setMinDiscount] = useState("");
  const [budget, setBudget] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state) return setCities(america[state]);
    setCities([]);
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [state]);

  // for program /////
  const onFinishProgram = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    let data = {
      budget,
      minDiscount,
      state,
      city,
      startDate: start,
      endDate: end,
      limit: 8,
    };

    dispatch(programsList(data));
  };

  // for item //////////////
  const onFinish = () => {
    let data = {
      state,
      city,
      title,
      productType: type,
      limit: 8,
    };
    dispatch(productList(data));
  };

  const states = Object.keys(america);

  const [productDropdown, setProductDropdown] = useState(false);
  const [programDropdown, setProgramDropdown] = useState(false);

  const toggleProduct = () => {
    setProductDropdown(!productDropdown);
    setProgramDropdown(false);
  };

  const toggleProgram = () => {
    setProgramDropdown(!programDropdown);
    setProductDropdown(false);
  };

  return (
    <section className="search-form">
      <div className="dropdown-container">
        <Button className="text" id="btn">
          Sort by:
        </Button>

        {/* FOR PROGRAMS /////////////////////////////////////// */}
        <div className="programs-container">
          <Button onClick={() => toggleProgram()}>
            Programs <DownOutlined style={{ fontSize: "12px" }} />
          </Button>

          <form
            name="search-form"
            onSubmit={onFinishProgram}
            className="products-dropdown"
            style={
              programDropdown
                ? { display: "block", right: "-90px" }
                : { display: "none" }
            }
          >
            <Select
              onChange={(value) => setState(value)}
              placeholder="state"
              style={{ width: "100%" }}
              className="input-field mb-3"
            >
              {states.map((state) => (
                <Option key={state} value={state} style={{ width: "200px" }}>
                  {state}{" "}
                </Option>
              ))}
            </Select>

            <Select
              onChange={(value) => setCity(value)}
              placeholder="city"
              style={{ width: "100%" }}
              className="input-field mb-3"
            >
              {cities.map((city, index) => (
                <Option key={index} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
            <Input
              value={minDiscount}
              onChange={(e) => setMinDiscount(e.target.value)}
              type="number"
              placeholder="$ Min Discount"
              className="input-field mb-3"
            />
            <Input
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              type="number"
              placeholder="$ Budget"
              className="input-field mb-3"
            />

            <label>Start Date</label>
            <Input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              name="start-date"
              className="mb-3"
            />

            <label>End Date</label>
            <Input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              className="mb-3"
            />

            <Link
              to={`programs-list/?minDiscount=${minDiscount}&city=${city}&state=${state}&budget=${budget}&startDate=${startDate}&endDate=${endDate}`}
            >
              <button className="search-btn" type="submit">
                Search
              </button>
            </Link>
          </form>
        </div>

        {/* FOR PRODUCTS//////////////////////////// */}
        <div className="product-container">
          <Button onClick={() => toggleProduct()}>
            Products <DownOutlined style={{ fontSize: "12px" }} />
          </Button>

          <Form
            form={form}
            name="search-form"
            onFinish={onFinish}
            className="products-dropdown"
            style={productDropdown ? { display: "block" } : { display: "none" }}
          >
            <Select
              onChange={(value) => setType(value)}
              placeholder="Sort by type"
              style={{ width: "100%" }}
              className="mb-3"
            >
              <Option value="new">New product</Option>
              <Option value="used">Used product</Option>
              <Option value="refurbished">Refurbished product</Option>
              <Option value="directService">Direct Services</Option>
              <Option value="indirectService">Indirect Services</Option>
            </Select>

            <Select
              onChange={(value) => setState(value)}
              placeholder="state"
              style={{ width: "100%" }}
              className="mb-3"
            >
              {states.map((state) => (
                <Option key={state} value={state} style={{ width: "200px" }}>
                  {state}{" "}
                </Option>
              ))}
            </Select>

            <Select
              onChange={(value) => setCity(value)}
              placeholder="city"
              style={{ width: "100%" }}
              className="mb-3"
            >
              {cities.map((city, index) => (
                <Option key={index} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Sort by title"
              className="input-field mb-3"
            />

            <Link
              to={`products-list/?productType=${type}&city=${city}&state=${state}&title=${title}`}
            >
              <button type="submit" className="search-btn">
                Search
              </button>
            </Link>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
