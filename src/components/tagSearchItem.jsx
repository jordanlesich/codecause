import React from "react";
import { Square, CheckSquare } from "react-feather";
import styled from "styled-components";

import Button from "../components/button";
import { BodySm } from "../styles/typography";
import { getColor } from "../helpers/palette";

const StyledTagItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
  .tag-list-item {
    /* margin: 0 0.8rem; */
    color: ${getColor("primary")};
    font-weight: 400;
    padding: 0;
    height: 2rem;
    margin-right: 0.8rem;
    span {
      padding: 0;
      margin: 0;
    }
  }
`;

const TagSearchItem = ({ name, projects, selected, handleTagSelect }) => {
  const handleClick = () => {
    handleTagSelect(name);
  };
  return (
    <StyledTagItem>
      <Button
        content={name}
        fn={handleClick}
        className="text-button tag-list-item"
        withIcon={
          selected ? (
            <CheckSquare size="24px" color={getColor("primary")} />
          ) : (
            <Square size="24px" color={getColor("dark")} />
          )
        }
      />
      <BodySm>({projects.length})</BodySm>
    </StyledTagItem>
  );
};

export default TagSearchItem;
