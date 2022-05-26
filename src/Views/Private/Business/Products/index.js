import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toast";
import { Container } from "reactstrap";
import Paginate from "../../../../Components/Paginate";
import List from "../../../../Components/ProductList";

import {
  productList,
  productListCleanup,
} from "../../../../Store/actions/productList";
import AxiosCall from "../../../../Utils/axios";
import ProductModal from "./ProductModal";

const ProductList = () => {
  const productListState = useSelector((s) => s.productList);
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [productModal, setProductModal] = useState(false);
  const [createProgram, setCreateProgram] = useState(false);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(
      productList({
        main: "products",
      })
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (productListState.isSuccessful) {
      setProducts(productListState.data);
      dispatch(productListCleanup());
    } else if (productListState.error) {
      setError(productListState.error);
      dispatch(productListCleanup());
    }
  }, [productListState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let discountTotal = 0;
    products.forEach((product) => {
      discountTotal = discountTotal + product.discount;
    });

    if ((discountTotal) => 350) {
      setCreateProgram(true);
    } else {
      setCreateProgram(false);
    }
  }, [products]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = (data) => {
    dispatch(
      productList({
        ...data,
        main: "products",
        owner: user._id,
      })
    );
  };

  const actions = {
    moreOptions: [
      {
        title: "delete",
        onClick: async (_id) => {
          try {
            const result = await AxiosCall({
              method: "DELETE",
              path: `products/${_id}`,
            });
            dispatch(productList({ main: "products" }));
            toast("product deleted successfully");
          } catch (err) {
            toast(err);
          }
        },
      },
    ],
    showProductDetails: (data) => {
      const result = products.filter((product) => product._id === data);
      setProduct(result[0]);
      setProductModal(true);
    },
  };

  const toggle = {
    product: () => setProductModal(!productModal),
  };

  return (
    <Container className="products-list">
      <div>
        <h3>All Products</h3>
        {createProgram && <button>Create New Program</button>}
      </div>
      <List data={products} error={error} actions={actions} />
      {products && <Paginate data={products} navigate={navigate} />}
      <ProductModal
        data={products}
        toggle={toggle.product}
        modal={productModal}
      />
    </Container>
  );
};

export default ProductList;
