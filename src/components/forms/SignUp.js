import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/userActions";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const dispatch = useDispatch();

  const userSignup = useSelector((state) => state.userSignup);
  const { loading, userInfo, error } = userSignup;

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
    dispatch(signup(name, email, password));
  };

  return (
    <div className="dy">
      <div className="containe">
        <h1 className="h1">Welcome</h1>
        <form className="form" onSubmit={submit}>
          <label className="label">Name</label>
          <input
            className="linput"
            type="name"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
          <label className="label">Re-Enter Password</label>
          <input
            className="linput"
            type="password"
            name="repassword"
            onChange={(e) => {
              setRePassword(e.target.value);
            }}
          />
          <a className="a" href="/">
            Forgot Password?
          </a>
          <button className="buttonn">Submit</button>
          <div className="link">
            already have an account?
            <a
              className="a"
              href={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
            >
              Signin here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
