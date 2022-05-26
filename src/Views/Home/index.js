/* eslint-disable react-hooks/exhaustive-deps */
//styles
import "./index.css";

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Promotion from "./Promotion";
import PopularPrograms from "./PopularProgram";
import { useDispatch, useSelector } from "react-redux";

//components
import SubscriptionModal from "./SubscriptionModal";

//actions
import { sub } from "../../Store/actions/subscription";
import { productList } from "../../Store/actions/productList";

const Home = () => {
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const toggle = () => setModal(!modal);

  const subscribe = (data) => {
    dispatch(sub(data));
  };

  useEffect(() => {
    dispatch(productList({ page: 1, limit: 4, main: "products" }));
  }, []);

  return (
    <div className="home">
      <Hero />
      <Promotion />
      <PopularPrograms />
      <div className="sub-pane">
        <div className="col-md-6">
          <h2>Subscribe to our newsletter</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </p>
          <form className="sub-form col-md-6">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Your email address"
            />
            <button onClick={subscribe} className="sub-btn">
              Search
            </button>
          </form>
        </div>
      </div>
      {authState.isLoggedIn || document.cookie ? null : (
        <SubscriptionModal
          toggle={toggle}
          subscribe={subscribe}
          modal={modal}
        />
      )}
    </div>
  );
};

export default Home;
