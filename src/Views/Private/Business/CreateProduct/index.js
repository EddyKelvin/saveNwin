/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Button from "../../../../Components/customButton/button";
import { Row, Col, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.css";
//actions
import {
  createProductCleanup,
  createProduct,
} from "../../../../Store/actions/bussiness/create-product";

function CreateBusinessProduct() {
  const dispatch = useDispatch();
  const createProductState = useSelector((s) => s.createProduct);
  const [fileName, setFileName] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    dispatch(createProduct(formData));
    reset(data);
  };

  useEffect(() => {
    if (createProductState.isSuccessful) {
      message.success("item created successfully");
      dispatch(createProductCleanup());
    } else if (createProductState.error) {
      message.error(createProductState.error);
      console.log(createProductState);
      dispatch(createProductCleanup());
    }
  }, [createProductState]);

  return (
    <div className="create-product-container">
      <div>
        <div className="container-inner">
          <h6>Create Item for VIP program</h6>

          <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
            <div className="productImageDiv">
              <label htmlFor="productImage">
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <input
                      type="file"
                      id="productImage"
                      onChange={(e) => onChange(e.target.files[0])}
                    />
                  )}
                />

                <span>SELECT IMAGE </span>
                <span style={{ color: "#000" }}>
                  select quality image to impress
                  <br />
                  customer.
                </span>
                {fileName && <span>{fileName}</span>}
                <Button
                  scolor="#FF4C4F"
                  brColor="#FF4C4F"
                  br={9}
                  mt={20}
                  width={100}
                  height={35}
                  title="choose file"
                />
              </label>
            </div>
            {errors.image && (
              <small className="create-item-error">Image is required</small>
            )}

            <hr />

            <div>
              <h6>Item Information</h6>

              <div className="create-item-input-container">
                <label>Name</label>
                <input
                  className="create-item-input"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <small className="create-item-error">Name is required</small>
                )}
              </div>

              <Row gutter={15}>
                <Col span={12}>
                  <div className="create-item-input-container">
                    <label>Selling Price</label>
                    <input
                      placeholder="$"
                      className="create-item-input"
                      {...register("price", { required: true })}
                    />
                    {errors.price && (
                      <small className="create-item-error">
                        Price is required
                      </small>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <div className="create-item-input-container">
                    <label>Discount</label>
                    <input
                      placeholder="$"
                      className="create-item-input"
                      {...register("discount", { required: true })}
                    />
                    {errors.discount && (
                      <small className="create-item-error">
                        Discount is required
                      </small>
                    )}
                  </div>
                </Col>
              </Row>

              <Row gutter={15}>
                <Col span={12}>
                  <div className="create-item-input-container">
                    <label>Product Type</label>
                    <select
                      className="create-item-input"
                      {...register("productType", { required: true })}
                    >
                      <option></option>
                      <option value="service">Service</option>
                      <option values="product">Products</option>
                    </select>
                    {errors.productType && (
                      <small className="create-item-error">
                        Product type is required
                      </small>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <div className="create-item-input-container">
                    <label>Product Category</label>
                    <select
                      className="create-item-input"
                      {...register("category", { required: true })}
                    >
                      <option></option>
                      <option></option>
                      <option value="used">Used Item</option>
                      <option value="new">New Item</option>
                      <option value="refurbished">Refurbished Item</option>
                      <option value="Direct Services">Direct Service</option>
                      <option value="Indirect Service">Indirect Service</option>
                    </select>
                    {errors.category && (
                      <small className="create-item-error">
                        Product category is required
                      </small>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="create-item-input-container">
                <label>Address</label>
                <input
                  className="create-item-input"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <small className="create-item-error">
                    Address is required
                  </small>
                )}
              </div>
              <Row gutter={15}>
                <Col span={12}>
                  <div className="create-item-input-container">
                    <label>Tags</label>
                    <input
                      placeholder="Separate tags with commas (e.g #tag, #tag)"
                      className="create-item-input"
                      {...register("tags", { required: true })}
                    />
                    {errors.tags && (
                      <small className="create-item-error">
                        Tags are required
                      </small>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <div className="create-item-input-container">
                    <label>Brand</label>
                    <input
                      className="create-item-input"
                      {...register("brand", { required: true })}
                    />
                    {errors.brand && (
                      <small className="create-item-error">
                        Name is required
                      </small>
                    )}
                  </div>
                </Col>
              </Row>

              <div className="create-item-input-container">
                <label>Description</label>

                <textarea
                  rows="5"
                  className="text-area"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description && (
                  <small className="create-item-error">
                    Description is required
                  </small>
                )}
              </div>
              <div className="create-item-input-container">
                <label>Terms of Service</label>

                <textarea
                  rows="5"
                  className="text-area"
                  {...register("terms", { required: true })}
                ></textarea>
                {errors.terms && (
                  <small className="create-item-error">
                    Terms of service is required
                  </small>
                )}
              </div>
            </div>

            <div className="btnwrap">
              <button type="submit" className="create-item-submit-btn">
                {createProductState.isLoading ? (
                  <LoadingOutlined style={{ fontSize: 23 }} />
                ) : (
                  "submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBusinessProduct;
