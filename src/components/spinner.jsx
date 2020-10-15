import React from "react";
import styled from "styled-components";

const StyledSpinner = styled.div`
  .loader {
    font-size: 10px;
    margin: 1rem auto;
    text-indent: -9999em;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 50%;
    background: #707070;
    background: -moz-linear-gradient(
      left,
      #707070 10%,
      rgba(112, 112, 112, 0) 42%
    );
    background: -webkit-linear-gradient(
      left,
      #707070 10%,
      rgba(112, 112, 112, 0) 42%
    );
    background: -o-linear-gradient(
      left,
      #707070 10%,
      rgba(112, 112, 112, 0) 42%
    );
    background: -ms-linear-gradient(
      left,
      #707070 10%,
      rgba(112, 112, 112, 0) 42%
    );
    background: linear-gradient(
      to right,
      #707070 10%,
      rgba(112, 112, 112, 0) 42%
    );
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #707070;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ radius, width, height }) => {
  return (
    <StyledSpinner
      width={radius || width || "11rem"}
      height={radius || height || "11rem"}
    >
      <div className="loader" />
    </StyledSpinner>
  );
};

export default Spinner;