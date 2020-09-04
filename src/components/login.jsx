import React, { useState, useContext } from "react";

import { AuthContext } from "../contexts/authContext";
import Modal from "./modal";
import Input from "./input";
import Button from "./button";
import UserForm from "../layouts/userForm";

//TODO build client side validation. Build loading UI
function Login({ toggleModal }) {
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs, toggleModal);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal toggleModal={toggleModal}>
      <UserForm title="Login">
        <Input
          id="email"
          name="email"
          value={inputs.email}
          placeholder="example@example.ex"
          label="Email"
          type="email"
          fn={handleChange}
        />
        <Input
          id="password"
          name="password"
          value={inputs.password}
          placeholder="Enter password..."
          label="Password"
          type="password"
          fn={handleChange}
        />
        <Button value="submit" content="Login" fn={handleSubmit} />
      </UserForm>
    </Modal>
  );
}

export default Login;
