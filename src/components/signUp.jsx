import React, { useState, useContext } from "react";

import { AuthContext } from "../contexts/authContext";

import UserForm from "../layouts/userForm";
import Modal from "./modal";
import Input from "./input";
import Button from "./button";

function SignUpPage({ toggleModal }) {
  const { signup } = useContext(AuthContext);
  const [inputs, setInputs] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(inputs, toggleModal);
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
      <UserForm title="Sign Up">
        <Input
          id="name"
          name="displayName"
          value={inputs.displayName}
          placeholder="uniqueusername123"
          label="Make a Unique Username"
          type="text"
          fn={handleChange}
        />
        <Input
          id="email"
          name="email"
          value={inputs.email}
          placeholder="example@example.com..."
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
        <Button value="submit" content="Sign Up" fn={handleSubmit} />
      </UserForm>
    </Modal>
  );
}

export default SignUpPage;
