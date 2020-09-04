import React from "react";
import styled from "styled-components";

const StyledTagPicker = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagPicker = () => {
  return (
    <StyledTagPicker>
      <CommonTagBox />

      <Input />
      <div className="tag-box" />
    </StyledTagPicker>
  );
};

export default TagPicker;
