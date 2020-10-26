import React from "react";

import TextBox from "../../components/textBox";
import Input from "../../components/input";
import TagCollector from "../../components/tagCollector";
const GetInput = (inputData) => {
  const inputs = {
    sentence: <Input {...inputData} />,
    paragraph: <TextBox {...inputData} />,
    tagCollector: <TagCollector />,
  };
  return inputs[inputData.responseSize];
};

const InputFactory = ({ inputData }) => {
  return <>{GetInput(inputData)}</>;
};

export default InputFactory;
