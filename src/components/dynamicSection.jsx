import React from "react";
import styled from "styled-components";
import { Edit, Move, Trash } from "react-feather";

import Section from "./section";
import Button from "../components/button";
import { getColor } from "../helpers/palette";

const StyledDynamicSection = styled(Section)`
  border-top: 1px solid rgba(0, 0, 0, 0);
  transition: 0.2s all;
  .icon-box {
    position: absolute;
    top: 0.3rem;
    right: 2rem;
  }
  .icon-button {
    color: ${getColor("secondary300")};
    transition: 0.2s all;

    padding: 0.3rem;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  :hover {
    border-top: 1px solid ${getColor("lightBorder")};
    .icon-button {
      color: ${getColor("secondary")};
    }
  }
`;
const DynamicSection = ({ label, children, selectAndDisplay, index }) => {
  const handleEdit = () => {
    selectAndDisplay(index, "edit");
  };
  const handleDelete = () => {
    selectAndDisplay(index, "delete");
  };
  const handleMove = () => {
    selectAndDisplay(index, "move");
  };
  return (
    <StyledDynamicSection label={label}>
      <div className="icon-box">
        <Button className="icon-button" content={<Edit />} fn={handleEdit} />
        <Button className="icon-button" content={<Move />} fn={handleMove} />
        <Button className="icon-button" content={<Trash />} fn={handleDelete} />
      </div>
      <p>{children}</p>
    </StyledDynamicSection>
  );
};

export default DynamicSection;
