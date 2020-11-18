import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NewLink = styled(Link)`
  text-decoration: none;
`;

const StyledLink = ({ className, to, withicon = null, children }) => {
  console.log("fired");
  return (
    <>
      {withicon ? (
        <LinkContainer>
          {withicon}
          <NewLink className={className} to={to}>
            <HeaderXs>{children}</HeaderXs>
          </NewLink>
        </LinkContainer>
      ) : (
        <NewLink className={className} to={to}>
          <HeaderXs>{children}</HeaderXs>
        </NewLink>
      )}
    </>
  );
};

export default StyledLink;
