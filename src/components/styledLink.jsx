import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NewLink = styled(Link)`
  text-decoration: none;
`;

const StyledLink = (props) => {
  return (
    <NewLink {...props}>
      <HeaderXs>{props.children}</HeaderXs>
    </NewLink>
  );
};

export default StyledLink;
