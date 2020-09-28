import React from "react";
import styled from "styled-components";

import Spinner from "./spinner";
import { getColor } from "../helpers/palette";

const StyledForm = styled.form`
  position: relative;
  color: ${getColor("font")};
  margin: 2.4rem;
  .form-title {
    margin-bottom: 2.4rem;
  }
  .inputs-section {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }
  .buttons-section {
    display: flex;
  }
  &.single-col {
    max-width: 28rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .spinner-wrapper {
    position: absolute;
    bottom: 0;
    right: 0.8rem;
  }
`;

const userForm = ({ children, className, submitFn, singleCol, loading }) => {
  return (
    <StyledForm
      className={`${className} ${singleCol && "single-col"}`}
      onSubmit={submitFn}
    >
      {children}
      {loading && (
        <div className="spinner-wrapper">
          <Spinner radius="3rem" />
        </div>
      )}
    </StyledForm>
  );
};

export default userForm;
