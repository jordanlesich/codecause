import React from "react";

import { Search as SearchIcon } from "react-feather";
import styled from "styled-components";

import { getColor } from "../helpers/palette";
import Input from "./input";
const StyledSearch = styled.div`
  .search-input {
    position: relative;
    width: 100%;
    max-width: 23rem;
    min-width: 19rem;
  }
  input {
    border: 1px solid ${getColor("grey300")};
  }
  .error-msg {
    display: none;
  }
  .search-icon {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
  }
`;

const Search = ({ placeholder, onType, value }) => {
  return (
    <StyledSearch>
      <Input
        value={value}
        onType={onType}
        placeholder={placeholder}
        className="search-input"
        appendEl={
          <SearchIcon className="search-icon" size={"1.6rem"} fill="white" />
        }
      />
    </StyledSearch>
  );
};

export default Search;
