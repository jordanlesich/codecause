import React, { useReducer, createContext, useState } from "react";

import tagReducer from "../reducers/tagReducer";
import { queryProjectsByTags } from "../actions/project";

export const TagContext = createContext();

export const TagSearchProvider = ({ setProjects, children }) => {
  const [skillTags, dispatchSkillTags] = useReducer(tagReducer, []);
  const [causeTags, dispatchCauseTags] = useReducer(tagReducer, []);
  const [solutionTags, dispatchSolutionTags] = useReducer(tagReducer, []);
  const [searchStrings, setSearchStrings] = useState({
    cause: "",
    solution: "",
    skill: "",
  });

  const useTagContext = (tagType) => {
    const tagStateEnum = {
      cause: [causeTags, dispatchCauseTags],
      solution: [solutionTags, dispatchSolutionTags],
      skill: [skillTags, dispatchSkillTags],
    };
    return tagStateEnum[tagType];
  };

  const handleSearchText = (tagType, string) => {
    setSearchStrings((prevStr) => ({ ...prevStr, [tagType]: string }));
  };

  const performSearch = async () => {
    const selectedTags = [...skillTags, ...solutionTags, ...causeTags].filter(
      (tag) => tag.selected
    );
    const result = await queryProjectsByTags(selectedTags);
    setProjects(result);
  };
  return (
    <TagContext.Provider
      value={{
        useTagContext,
        handleSearchText,
        searchStrings,
        performSearch,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};
