import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";

const Shipping = (props) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const submit = (e) => {
    e.preventDefault();
    dispatch(saveShipping(address, city, postalCode, country));
  };

  return (
    <div className="dy">
      <div className="containe">
        <h1 className="h1">Shipping</h1>
        <form className="form" onSubmit={submit}>
          <label className="label">Address</label>
          <input
            className="linput"
            type="text"
            name="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <label className="label">City</label>
          <input
            className="linput"
            type="text"
            name="city"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <label className="label">Postal Code</label>
          <input
            className="linput"
            type="text"
            name="postalCode"
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          />
          <label className="label">Country</label>
          <input
            className="linput"
            type="text"
            name="country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <button className="buttonn">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
