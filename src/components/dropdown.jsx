import React from "react";
import { ChevronDown, ChevronRight, ChevronUp } from "react-feather";
import styled from "styled-components";

import Button from "../components/button";
import Spinner from "../components/spinner";
import Break from "../components/break";
import { getColor } from "../helpers/palette";

const StyledDropdown = styled.ul`
  list-style: none;
  .title {
    color: ${getColor("blue300")};
    font-size: 1.7rem;
    line-height: 2.6rem;
    font-weight: 700;
  }
  .title-section {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    margin-bottom: 0.8rem;
    svg {
      transform: translate(0.8rem, 0.2rem);
    }
  }
  .alert-btn {
    padding: 0.4rem 0.8rem;
    height: 2.4rem;
    margin-left: 1.6rem;
    background-color: ${getColor("red200")};
  }
  .loading-right {
    right: 2.4rem;
    position: absolute;
  }
`;

const Dropdown = ({
  status = "idle",
  title,
  children,
  alert = null,
  type,
  dispatchDocs,
  fetchApplications,
  onFetch,
  count = 0,
}) => {
  const handleClick = () => {
    if (status === "idle") {
      fetchApplications(type);
      if (onFetch) {
        onFetch();
      }
    } else if (status === "open") {
      dispatchDocs({ type: "SWITCH_VIEW", docType: type, viewType: "closed" });
    } else if (status === "closed") {
      dispatchDocs({ type: "SWITCH_VIEW", docType: type, viewType: "open" });
    }
  };
  return (
    <>
      <StyledDropdown className={`${alert && "alert"}`}>
        <div className="title-section">
          <Button
            className="text-button title"
            content={`${title} (${count})`}
            fn={handleClick}
            alert={"New Application"}
            appendIcon={
              status === "open" ? (
                <ChevronUp size="2rem" />
              ) : (
                <ChevronDown size="2rem" />
              )
            }
            disabled={count <= 0}
          />
          {alert && <Button className="warning alert-btn" content={alert} />}
          {status === "loading" && (
            <Spinner className="loading-right" radius="2rem" />
          )}
        </div>
        <Break type="soft" />
        {status === "open" && children}
      </StyledDropdown>
    </>
  );
};

export default Dropdown;
