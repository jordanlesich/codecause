import React from "react";

import TextBox from "../textbox";
import TextInput from "../../components/input";
import TagCollector from "../../components/tagCollector";
const GetInput = (inputData) => {
  const inputs = {
    textInput: <TextInput {...inputData} />,
    textBox: <TextBox {...inputData} />,
    tagCollector: <TagCollector />,
  };
  return inputs[inputData.type];
};

const InputFactory = ({ inputData }) => {
  return <>{GetInput(inputData)}</>;
};

export default InputFactory;
