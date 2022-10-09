import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/userActions";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  const submit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    dispatch(signin(email, password));
  };

  return (
    <div className="dy">
      <div className="containe">
        <h1 className="h1">Welcome</h1>
        <form className="form" onSubmit={submit}>
          <label className="label">Email or Phone</label>
          <input
            className="linput"
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="label">Password</label>
          <input
            className="linput"
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <a className="a" href="/">
            Forgot Password?
          </a>
          <button className="buttonn">Submit</button>
          <div className="link">
            Not a member?
            <a
              className="a"
              href={redirect === "/" ? "signup" : "signup?redirect=" + redirect}
            >
              Sigup here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
