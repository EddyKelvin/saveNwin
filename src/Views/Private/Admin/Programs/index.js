import "./index.css";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  productList,
  productListCleanup,
} from "../../../../Store/actions/productList";
import Axios from "axios";
import ProductModal from "./ProductModal";
import AxiosCall from "../../../../Utils/axios";
import { Popover, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Moment from "moment";
import { toast } from "react-toast";

const Programs = () => {
  const [programs, setPrograms] = useState(null);
  const key = "updatable";
  useEffect(async () => {
    try {
      const requestObj = {
        path: `programs/search`,
        method: "GET",
      };
      const { data } = await AxiosCall(requestObj);

      setPrograms(data.programs);
    } catch (err) {
      console.log("An error occured when trying");
    }
  }, []);

  const moreOptions = [
    {
      title: "delete",
      onClick: async (_id) => {
        try {
          const result = await AxiosCall({
            method: "DELETE",
            path: "programs/" + _id,
          });

          if (result.status == 200) {
            if (document.querySelector(".program-row-" + _id)) {
              document.querySelector(".program-row-" + _id).remove();
            }
            message.success({ content: "Program deleted", key, duration: 2 });
          } else {
            message.error({ content: "An error occurred", key, duration: 2 });
          }
          //   dispatch(users({ role: "customer" }));
          toast("successful");
        } catch (error) {
          toast(error);
        }
      },
    },
  ];

  return (
    <Container className="programs-list">
      <h3 style={{ marginTop: 20 }}>All Programs</h3>

      <div className="table-wrapper" style={{ minWidth: 1000 }}>
        <div className="table">
          <li className="table-head" id="top-level">
            <span style={{ width: 100 }}>No</span>
            <span>Programs title</span>
            <span>Email (owner)</span>
            <span>Total Price</span>
            <span>Total Discount</span>
            <span>Date created</span>
            <span className="actions">Actions</span>
          </li>
          <ul className="table-body">
            {programs &&
              programs.map((data, key) => (
                <li className={"all-users program-row-" + data._id} key={key}>
                  <span className="items" style={{ width: 100 }}>
                    {key + 1}
                  </span>
                  <span className="items">{data.title}</span>
                  <span className="items">{data.owner.email}</span>
                  <span className="items">${data.totalPrice}</span>
                  <span className="items">${data.totalDiscount}</span>
                  <span className="items">
                    {Moment(data.createdAt).format("Do MM  YYYY, h:mm a")}
                  </span>
                  <span className="items actions">
                    <Popover
                      content={
                        <ul id="action-list">
                          {moreOptions.map((option, key) => (
                            <li
                              className="action-items"
                              onClick={() => option.onClick(data._id)}
                              key={key}
                            >
                              {option.title}
                            </li>
                          ))}
                        </ul>
                      }
                      trigger="click"
                    >
                      <MoreOutlined />
                    </Popover>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Programs;
