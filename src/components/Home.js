import React, { useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";
import { listProducts } from "../actions/productActions";

const Home = () => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return loading ? (
    <div>
      <LinearProgress variant="indeterminate" color="secondary">
        Loading...
      </LinearProgress>{" "}
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <ul data-aos="fade" className="products">
        {products.map((product) => (
          <li key={product._id}>
            <div className="product-card">
              <div className="product image">
                <Link to={"/product/" + product._id}>
                  <img src={product.image} alt="product" />
                </Link>
              </div>
              <div className="product-name">
                <Link to={"/product/" + product._id}>{product.name}</Link>
              </div>
              <div className="product-price">${product.price}</div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-rating">
                {product.rating} stars ({product.numReviews} reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
