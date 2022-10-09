import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import SignIn from "./components/forms/SignIn";
import SignUp from "./components/forms/SignUp";
import { useSelector } from "react-redux";
import ProductsScreen from "./components/productsScreen";
import Shipping from "./components/Shipping";

const App = () => {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <div className="logo">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">
              <h2>ShopStix</h2>
            </Link>
          </div>
          <div className="header-links">
            <ul>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              {userInfo ? (
                <li>
                  <Link to="/products">{userInfo.name}</Link>
                </li>
              ) : (
                <li>
                  <Link to="/signin">Sign in</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="sidebar" onClick={closeMenu}>
          <Link to="/">
            <span>iPhone</span>
          </Link>
          <Link to="/">
            <span>Android</span>
          </Link>
          <Link to="/">
            <span>Cart</span>
          </Link>
          <Link to="/">
            <span>Back</span>
          </Link>
        </div>
        <main>
          <div className="content">
            <Route path="/" exact={true} component={Home} />
            <Route path="/product/:id" component={Product} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </div>
        </main>
        <div className="footer">&copy; 2020 all rights reserved.</div>
      </div>
    </BrowserRouter>
  );
};

export default App;
