import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";
import useInput from "../Hooks/useInput";

import Form from "./form";
import Input from "./input";
import Button from "./button";
import { DisplayLg, BodySm } from "../styles/typography";

const err = {
  mail: "Not a valid email",
  pass: "8-16 chars. A capital letter. A number.",
};

const Login = ({ setMessage }) => {
  const { signin } = useAuth();

  const { value: email, bind: bindEmail } = useInput("", [], err["mail"]);
  const { value: password, bind: bindPass } = useInput("", [], err["pass"]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await signin(email, password);
    if (result.error) {
      if (result.error.code === "auth/invalid-email") {
        setMessage({ type: "error", error: result.error.message });
        setLoading(false);
      } else if (result.error.code === "auth/user-not-found") {
        setMessage({
          type: "error",
          error: "Email address and/or password doesn't match our records",
        });
        setLoading(false);
      } else {
        setMessage({ type: "error", error: result.error.message });
        setLoading(false);
      }
    }
  };

  const checkAllValid = () => {
    if (email === "" || password === "") {
      return true;
    } else {
      return false;
    }
  };

  const toSignUp = () => {
    history.push("/signup");
    setMessage(null);
  };

  return (
    <>
      <Form submitFn={handleSubmit} loading={loading === true} singleCol>
        <DisplayLg className="form-title">Log In</DisplayLg>
        <div className={`inputs-section`}>
          <Input
            id="email"
            name="email"
            {...bindEmail}
            placeholder="example@example.com..."
            label="Email"
            type="email"
            disabled={loading === true}
          />
          <Input
            id="password"
            name="password"
            {...bindPass}
            placeholder="Enter password..."
            label="Password"
            type="password"
            disabled={loading === true}
          />
        </div>
        <div className="buttons-section">
          <Button
            value="submit"
            content="Sign Up"
            fn={handleSubmit}
            className="primary"
            disabled={checkAllValid()}
          />
        </div>
      </Form>
      <BodySm>Don't have an account?</BodySm>
      <Button className="text-button" fn={toSignUp} content="Sign up" />
    </>
  );
};

export default Login;
