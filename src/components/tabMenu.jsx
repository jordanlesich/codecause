import React, { useState } from "react";
import styled from "styled-components";
import { X } from "react-feather";

import { fadeIn, fadeOut } from "../helpers/anims";
import { getColor } from "../helpers/palette";

import Button from "../components/button";

const StyledTabMenu = styled.div`
  height: 100%;
  background-color: ${getColor("white")};

  .in {
    opacity: 1;
  }
  .anim-in {
    animation: ${fadeIn} 0.2s ease-in both;
  }
  .anim-out {
    animation: ${fadeOut} 0.2s ease-out both;
  }
  .out {
    opacity: 0;
  }
  .tab-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
  }
  .tab-frame {
    height: 100%;
  }
  .tab-stage {
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tab-buttons-bar {
    display: flex;
    justify-content: center;
    z-index: 30;
    background-color: ${getColor("dark")};
    border-radius: 0px;
    width: 100%;
  }
  .closeButton {
    border-right: none;
  }
`;
const TabMenu = ({ options, title, handleToggle }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [fadeAnim, setFadeAnim] = useState("out");

  const switchOption = (val) => {
    setSelectedOption(options.find((option) => option.value === val));
  };

  const handleTabChange = (e) => {
    //do nothing if in the process of animation
    if (fadeAnim === "anim-in" || fadeAnim === "anim-out") return;
    //open first tab
    if (selectedOption === null && fadeAnim === "out") {
      setFadeAnim("anim-in");
      switchOption(e.target.value);
      setTimeout(() => {
        setFadeAnim("in");
      }, 200);
      return;
    }
    //if user clicked tab that is already open, close it.
    if (selectedOption.value === e.target.value && fadeAnim === "in") {
      setFadeAnim("anim-out");
      setTimeout(() => {
        setFadeAnim("out");
        setSelectedOption(null);
      }, 200);
      return;
    }
    //if user clicked a different tab than the one that is already open,
    //then fade out, then into the new tab
    if (selectedOption.value !== e.target.value && fadeAnim === "in") {
      setFadeAnim("anim-out");
      const form = e.target.value;
      setTimeout(() => {
        setFadeAnim("out");
        switchOption(null);
      }, 200);
      setTimeout(() => {
        setFadeAnim("anim-in");
        switchOption(form);
      }, 300);
      setTimeout(() => {
        setFadeAnim("in");
      }, 500);
    }
  };

  return (
    <>
      <StyledTabMenu>
        <h2 className="tab-title">{title}</h2>
        <div className="tab-frame">
          <div className="tab-buttons-bar">
            {options &&
              options.map(({ tabButton, value }, index) => (
                <Button
                  key={index}
                  className={"tabButton"}
                  content={tabButton}
                  value={value}
                  fn={handleTabChange}
                  height="4rem"
                  width={`${100 / options.length}%`}
                  bgColor={getColor("dark")}
                  border={`1px solid ${getColor("secondary")}`}
                  selected={
                    selectedOption != null && value === selectedOption.value
                  }
                />
              ))}
            <Button
              className="tabButton closeButton"
              content={<X />}
              value="close-button"
              fn={handleToggle}
              height="4rem"
              width={`${100 / options.length}%`}
              bgColor={getColor("dark")}
              border={`1px solid ${getColor("secondary")}`}
            />
          </div>
          <div className={`tab-stage ${fadeAnim}`}>
            {selectedOption != null && selectedOption.tabCard}
          </div>
        </div>
      </StyledTabMenu>
    </>
  );
};

export default TabMenu;
