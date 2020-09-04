import React from "react";

import TextBox from "../../components/textbox";
import TextInput from "../../components/input";

const GetInput = (inputData) => {
  const inputs = {
    textInput: <TextInput {...inputData} />,
    textBox: <TextBox {...inputData} />,
  };
  return inputs[inputData.type];
};

const InputFactory = ({ inputData }) => {
  return <>{GetInput(inputData)}</>;
};

export default InputFactory;
