import React from "react";
import styled from "styled-components";

import { getColor } from "../helpers/palette";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${getColor("lightBorder")};
  border-radius: 10% 10% 4px 4px;
  padding-bottom: 2rem;
`;

const StyledTitle = styled.h1`
  margin: 2rem;
  color: ${getColor("dark")};
`;

const userForm = ({ children, title }) => {
  return (
    <StyledForm>
      <StyledTitle>{title}</StyledTitle>
      {children}
    </StyledForm>
  );
};

export default userForm;
