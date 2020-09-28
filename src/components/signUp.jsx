import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../Hooks/useAuth";
import useInput from "../Hooks/useInput";
import {
  addProfile,
  checkProfileExists,
  deleteProfile,
} from "../actions/profiles";
import Form from "./form";
import Input from "./input";
import Button from "./button";
import { DisplayLg, BodySm } from "../styles/typography";
import {
  isValidEmail,
  onlyAlphaNumeric,
  containsLetter,
  containsNumber,
  containsUpperCaseLetter,
  isRangeCharacters,
  isMoreThanXCharacters,
} from "../helpers/validations";

const err = {
  name: "Alphanumeric. 6+ chars. Unique.",
  mail: "A valid email.",
  pass: "8-16 chars. A capital letter. A number.",
};

const passRulesOnType = [
  containsLetter,
  containsNumber,
  containsUpperCaseLetter,
  isRangeCharacters([8, 16]),
];
const nameRulesOnType = [isMoreThanXCharacters(5), onlyAlphaNumeric];
const emailRulesOnType = [isValidEmail];

const SignUpPage = ({ setMessage }) => {
  const { signup } = useAuth();
  const {
    value: displayName,
    bind: bindName,
    setErrMsg: setNameErr,
    valid: nameValid,
    setValid: setNameValid,
  } = useInput("", nameRulesOnType, err["name"]);
  const { value: email, bind: bindEmail, valid: mailValid } = useInput(
    "",
    emailRulesOnType,
    err["mail"]
  );
  const { value: password, bind: bindPass, valid: passValid } = useInput(
    "",
    passRulesOnType,
    err["pass"]
  );
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fullPageResult = (msg, url) => {
    setMessage(msg);
  };

  const createAuth = async (inputs) => {
    const signUpResult = await signup(inputs);
    if (signUpResult.error || !signUpResult) {
      deleteProfile(displayName);
      setMessage(signUpResult);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const exists = await checkProfileExists(displayName);
    if (exists.error) {
      fullPageResult(exists, "/error");
    }
    if (exists) {
      setNameValid(false);
      setLoading(false);
      setNameErr("Name aleady exists. Please try another.");
      return;
    }
    const result = await addProfile({ displayName, email, password });
    if (!result.error) {
      createAuth({ displayName, email, password });
    } else {
      fullPageResult(result, "/error");
    }
  };

  const checkAllValid = () => {
    if (
      displayName === "" ||
      email === "" ||
      password === "" ||
      !nameValid ||
      !passValid ||
      !mailValid
    ) {
      return true;
    } else {
      return false;
    }
  };

  const toLogin = () => {
    history.push("/login");
  };

  return (
    <>
      <Form submitFn={handleSubmit} loading={loading === true} singleCol>
        <DisplayLg className="form-title">Sign Up</DisplayLg>
        <div className={`inputs-section`}>
          <Input
            id="name"
            name="displayName"
            {...bindName}
            placeholder="uniqueusername123"
            label="Make a Unique Username"
            type="text"
            disabled={loading === true}
          />
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
      <BodySm>Already have an account?</BodySm>
      <Button className="text-button" fn={toLogin} content="Login" />
    </>
  );
};

export default SignUpPage;
