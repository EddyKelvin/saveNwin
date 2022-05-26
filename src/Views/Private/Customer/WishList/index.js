import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { message } from "antd";
import "./index.css";

import { getCart, getCartCleanup } from "../../../../Store/actions/getCart";

const Wishlist = () => {
  const dispatch = useDispatch();
  const getCartState = useSelector((s) => s.getCart);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (getCartState.isSuccessful) {
      setCart(getCartState.data);
      dispatch(getCartCleanup());
    } else if (getCartState.error) {
      message.error(getCartState.error);
      dispatch(getCartCleanup());
    }
  }, [getCartState]);

  return (
    <section className="wishlist-container">
      <h3>Wishlist</h3>
      <hr />

      <div className="table-responsive">
        <table className="table borderless">
          <thead>
            <tr>
              <th scope="col" className="col-1">
                No.
              </th>
              <th scope="col" className="col-3">
                Title
              </th>
              <th scope="col" className="col-2">
                Selling Price
              </th>
              <th scope="col" className="col-2">
                Discount Price
              </th>
              <th scope="col" className="col-3">
                Seller
              </th>
              <th scope="col" className="col-1">
                Checkout
              </th>
            </tr>
          </thead>

          {cart.map((item, index) => (
            <tbody key={item._id}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.title}</td>
                <td>${item.totalPrice}</td>
                <td>${item.totalPrice - item.totalDiscount}</td>
                {item.owner ? (
                  <td>{item.owner.email}</td>
                ) : (
                  <td> Not found </td>
                )}
                <td>
                  <Link to={`/programs/${item._id}`}>
                    <button className="btn btn-danger btn-sm">Checkout</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </section>
  );
};

export default Wishlist;
