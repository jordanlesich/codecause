import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import { TagContext } from "../contexts/tagSearchContext";
import Break from "../components/break";
import Search from "../components/search";
import Button from "../components/button";
import TagSearchItem from "../components/tagSearchItem";
import { HeaderSm } from "../styles/typography";
import { getColor } from "../helpers/palette";
import { getTags } from "../actions/tags";

const TagSearchMenu = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 2.4rem;

  .search-title {
    margin-top: 4rem;
    margin-bottom: 1.6rem;
  }
  .tag-list {
    list-style: none;
    margin-top: 1.6rem;
    margin-bottom: 3.2rem;
    max-height: 50%;
    overflow-y: auto;
  }
  .end-btns {
    display: flex;
    button {
      margin-right: 2.4rem;
    }
    .search-button {
      color: ${getColor("primary")};
    }
  }
`;

const TagSearch = ({ tagType }) => {
  const {
    useTagContext,
    searchStrings,
    handleSearchText,
    performSearch,
  } = useContext(TagContext);
  const currentSearch = searchStrings[tagType];
  const [tags, dispatchTags] = useTagContext(tagType);

  useEffect(() => {
    if (!tags.length) {
      const getTagsFromFirestore = async () => {
        const result = await getTags(tagType, "tagSearch");
        dispatchTags({
          type: "INIT",
          payload: result,
        });
      };
      getTagsFromFirestore();
    }
  }, [tags, dispatchTags, tagType]);

  const handleTagSelect = (name) => {
    dispatchTags({ type: "TOGGLE", name });
  };
  const clearSelectedTags = () => {
    dispatchTags({ type: "CLEAR" });
  };
  const handleNewSearchText = (e) => {
    handleSearchText(tagType, e.target.value.trim());
  };

  return (
    <TagSearchMenu>
      <Search
        placeholder="Search for tags"
        onType={handleNewSearchText}
        value={currentSearch}
      />
      <HeaderSm className="search-title">Filter by {tagType} tags</HeaderSm>
      <Break type="hard" />
      <ul className="tag-list">
        {tags &&
          tags
            .filter((tag) => tag.name.includes(currentSearch))
            .map((tag) => (
              <TagSearchItem
                name={tag.name}
                projects={tag.projects}
                key={`tag-search-${tag.name}`}
                selected={tag.selected}
                handleTagSelect={handleTagSelect}
              />
            ))}
        {/* {loading && loadingUI} */}
      </ul>

      <div className="end-btns">
        <Button
          content="Clear"
          className="text-button"
          fn={clearSelectedTags}
        />
        <Button
          content="Search"
          className="text-button search-button"
          fn={performSearch}
        />
      </div>
    </TagSearchMenu>
  );
};

export default TagSearch;
