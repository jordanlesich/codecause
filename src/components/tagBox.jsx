import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Tag from "./tag";
import { getColor } from "../helpers/palette";

const sortTagsToArray = (tagObj) => {
  return Object.keys(tagObj)
    .map((key) => ({
      name: key,
      amt: tagObj[key],
    }))
    .sort((a, b) => {
      if (a.amt > b.amt) {
        return -1;
      }
      if (a.amt < b.amt) {
        return 1;
      } else {
        return 0;
      }
    });
};

export const StyledTagBox = styled.div`
  margin: 1rem 0;
  .tag-title {
    font-size: 1.2rem;
    letter-spacing: -0.022em;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
  }
  .inner-box {
    border: 1px solid ${getColor("lightBorder")};
    padding: 1rem;
  }
`;
const TagBox = ({ type, tagObj, clickFn, limit = 10, label }) => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    if (tagObj != undefined) {
      setTags(sortTagsToArray(tagObj).slice(0, limit));
    }
  }, [tagObj]);
  return (
    <StyledTagBox>
      <p className="tag-title">{label ? label : `${type} tags:`}</p>
      <div className="inner-box">
        {tags !== null ? (
          tags.map((tag, index) => (
            <Tag
              type={type}
              text={tag.name}
              key={index}
              fn={clickFn}
              value={tag.name}
            />
          ))
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </StyledTagBox>
  );
};

export default TagBox;
