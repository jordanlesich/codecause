import React, { useState } from "react";

import Input from "./input";
import Button from "./button";
import Form from "./form";

//TODO build client side validation. Build loading UI
function Login({ setLoading }) {
  // const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // login(inputs, setLoading);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form title="Login" submitFn={handleSubmit}>
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
    </Form>
  );
}

export default Login;
