import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

import Input from "./input";
import { getColor } from "../helpers/palette";
import { widthQuery } from "../styles/responsive";

const StyledTagMaker = styled.form`
  position: relative;
  width: 34.8rem;
  display: inline-block;
  @media ${widthQuery.mobileM} {
    width: 28rem;
  }

  .list-open {
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    border: 1px solid ${getColor("primary")};
  }
  .dropdown-input {
    transition: none;
  }
  .dropdown-list {
    display: none;
    position: absolute;
    top: 6rem;
    list-style: none;
    background-color: ${getColor("white")};
    border: 1px solid ${getColor("primary")};
    border-top: none;
    border-radius: 0 0 4px 4px;
    left: 0;
    width: 100%;
    max-width: 34.8rem;
    &.listOpen {
      display: inline-block;
    }
  }
  .dropdown-option {
    position: relative;
  }
  .option-button {
    padding: 1rem 1.6rem;
    font-size: 1.4rem;
    color: inherit;
    outline: none;
    width: 100%;
    text-align: start;
    border: none;
    font-family: inherit;
    background-color: ${getColor("white")};
    cursor: pointer;
    :hover:enabled,
    :focus:enabled {
      background: ${getColor("blue000")};
    }
  }
  .isSelected {
    background: ${getColor("blue000")};
  }
  .dropdown-option:last-child {
    button {
      border-radius: 0 0 6px 6px;
      padding-bottom: 1.6rem;
    }
  }
  .no-related {
    font-style: italic;
    border-radius: 0 0 6px 6px;
    cursor: default;
  }
`;

const TagMaker = ({ disabled, tags, addTag }) => {
  const [inputValue, setInputValue] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [filteredTags, setFilteredTags] = useState([]);

  const clickRef = useRef(null);

  useEffect(() => {
    setFilteredTags(
      tags
        .filter((tag) => tag.name.includes(inputValue.toLowerCase()))
        .sort((a, b) => (a.projects > b.projects ? -1 : 1))
        .slice(0, 5)
    );
  }, [inputValue, tags]);

  useEffect(() => {
    const active = document.activeElement.name;
    if (active === "createTagInput" && inputValue !== "") {
      setListOpen(true);
    } else if (inputValue === "") {
      setListOpen(false);
    }
  }, [inputValue, listOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCursor(null);
    if (cursor === null) {
      addTag(inputValue);
      setInputValue("");
    } else if (cursor !== null && filteredTags.length) {
      addTag(filteredTags[cursor].name);
      setInputValue("");
    } else {
      return;
    }
  };

  const handleTyping = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonPress = (e) => {
    addTag(e.target.value);
    setInputValue("");
  };

  const handleClick = useCallback((e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setListOpen(false);
    }
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      const tryCursorDown = () => {
        if (cursor === null || cursor === filteredTags.length - 1) {
          setCursor(0);
        } else {
          setCursor((prevState) => prevState + 1);
        }
      };
      const tryCursorUp = () => {
        if (cursor === null) {
          return;
        } else if (cursor === 0) {
          setCursor(null);
        } else {
          setCursor((prevState) => prevState - 1);
        }
      };

      if (!listOpen) return;
      if (e.key === "ArrowDown") {
        tryCursorDown();
      } else if (e.key === "ArrowUp") {
        tryCursorUp();
      } else if (e.key === "Tab") {
        const active = document.activeElement.name;
        if (active === "last-option-button") {
          setListOpen(false);
        }
      }
    },
    [listOpen, cursor, filteredTags]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleClick);
    };
  }, [handleKeyPress, handleClick]);

  return (
    <StyledTagMaker onSubmit={handleSubmit} ref={clickRef}>
      <Input
        placeholder="Create or find a tag"
        inputClassName={`dropdown-input ${listOpen && "list-open"}`}
        label="Create Tag"
        autoFocus
        onType={handleTyping}
        value={inputValue}
        disabled={disabled}
        id="createTagInput"
        divClassName={`tag-search-dropdown`}
      />
      <ul className={`dropdown-list ${listOpen && "listOpen"}`}>
        {filteredTags?.length ? (
          filteredTags.map((tag, index) => (
            <li className="dropdown-option" key={tag.name} value={tag.name}>
              <button
                value={tag.name}
                onClick={handleButtonPress}
                type={"button"}
                className={`option-button ${index === cursor && "isSelected"}`}
                name={
                  index === filteredTags.length - 1
                    ? "last-option-button"
                    : "option-button"
                }
              >
                {tag.name}
              </button>
            </li>
          ))
        ) : (
          <li>
            <button
              className={`option-button no-related`}
              type="button"
              name={"last-option-button"}
              disabled={true}
            >
              No related tags (Create your own)
            </button>
          </li>
        )}
      </ul>
    </StyledTagMaker>
  );
};

export default TagMaker;
