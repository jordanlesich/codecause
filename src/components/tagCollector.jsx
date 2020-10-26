import React from "react";
import styled from "styled-components";

import Tag from "./tag";
import { HeaderXs, BodyXs } from "../styles/typography";

const StyledTagBox = styled.div`
  .description {
    display: flex;
  }
  .limit-indicator {
    font-style: italic;
  }
  .description-title {
    text-transform: capitalize;
    margin-bottom: 0.8rem;
    margin-right: 0.8rem;
  }
  .inner-box {
    display: flex;
    button {
      margin-right: 1.6rem;
    }
  }
`;

const TagCollector = ({ tags, tagType, removeTag, limit }) => {
  const handleRemove = (e) => {
    console.log("fired");
    removeTag(e.target.value);
  };

  return (
    <StyledTagBox>
      <div className="description">
        <HeaderXs className="description-title">Your {tagType} tags:</HeaderXs>
        <BodyXs className="limit-indicator">
          (Tag {tags.length} of {limit})
        </BodyXs>
      </div>

      <div className="inner-box">
        {tags &&
          tags.map((tag, index) => (
            <Tag
              type={tagType}
              value={tag}
              tag={tag}
              key={index}
              fn={handleRemove}
              withDeleteIcon
            />
          ))}
      </div>
    </StyledTagBox>
  );
};

export default TagCollector;
