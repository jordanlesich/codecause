import React from "react";
import Tag from "./tag";
import { StyledTagBox } from "./tagBox";

const TagCollector = ({ tags, type, clickFn }) => {
  return (
    <StyledTagBox>
      <p className="tag-title">{type} tags:</p>
      <div className="inner-box">
        {tags &&
          tags.map((tag, index) => (
            <Tag
              type={type}
              text={tag}
              key={index}
              fn={clickFn}
              value={tag}
              remove={true}
            />
          ))}
      </div>
    </StyledTagBox>
  );
};

export default TagCollector;
