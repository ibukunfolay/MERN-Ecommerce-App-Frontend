import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();

  const removeHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);
  return (
    <div className="cart">
      <div className="cart-list">
        <ol className="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart Is Empty</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div className="cartImage">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cartName">
                  <Link to={"/product/" + productId}>{item.name}</Link>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className="button"
                      type="button"
                      onClick={() => {
                        removeHandler(item.product);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cartPrice">${item.price}</div>
              </li>
            ))
          )}
        </ol>
      </div>
      <div className="cart-Action">
        <h4>
          Subtotal({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h4>
        <button
          className="button primary"
          disabled={cartItems.length === 0}
          onClick={() => props.history.push("/signin?redirect=shipping")}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
