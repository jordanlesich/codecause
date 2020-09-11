import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TagBox from "../components/tagBox";
import { getTags } from "../actions/tags";

const TagSearchMenu = styled.aside`
  margin: 1rem;
  h2 {
    font-size: 2.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
    margin-left: 1rem;
  }
`;

const TagSearch = ({ queryByTag }) => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const retrieveTags = async () => {
      setTags(await getTags());
    };
    retrieveTags();
  }, []);

  const loading = <p>Loading ...</p>;

  return (
    <TagSearchMenu>
      <h2>Search by Tag</h2>
      {tags === null ? (
        loading
      ) : (
        <>
          <TagBox
            type="solution"
            tagObj={tags.solution}
            clickFn={queryByTag}
            limit={5}
          />
          <TagBox
            type="cause"
            tagObj={tags.cause}
            clickFn={queryByTag}
            limit={8}
          />
          <TagBox
            type="skill"
            tagObj={tags.skill}
            clickFn={queryByTag}
            limit={15}
          />
        </>
      )}
    </TagSearchMenu>
  );
};

export default TagSearch;
