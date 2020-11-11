import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";

import Tag from "../components/tag";
import { DisplayLg, BodyXs, BoldText } from "../styles/typography";

const TitleSection = styled.div`
  margin-bottom: 3.2rem;
  .title {
    margin-bottom: 1.2rem;
  }
  .time-section {
    margin-bottom: 2.4rem;
  }
  .single-line {
    margin-bottom: 0.8rem;
  }
  .tag-box {
    display: flex;
    flex-wrap: wrap;
    button {
      margin-right: 0.8rem;
      margin-bottom: 0.8rem;
    }
  }
`;

const PaperTitle = ({ project }) => {
  const {
    name,
    creator,
    timeCreated,
    lastUpdated,
    causeTags,
    solutionTags,
    skillTags,
  } = project;
  const updated = lastUpdated || timeCreated;
  const history = useHistory();

  const searchByTag = (e) => {
    // history.push("/projects");
    history.push({
      pathname: "/projects",
      search: e.target.value,
    });
  };

  return (
    <TitleSection>
      <DisplayLg className="title">{name}</DisplayLg>
      <div className="time-section">
        <BodyXs className="single-line">
          Posted by <BoldText>{creator}</BoldText>{" "}
          {formatDistanceToNow(timeCreated)} ago
        </BodyXs>
        <BodyXs className="single-line">
          Last updated: <BoldText></BoldText> {format(updated, "MM/dd/yyyy")}
        </BodyXs>
      </div>
      <div className="tag-box">
        {solutionTags.map((tag) => (
          <Tag
            key={tag.name + "solution"}
            tag={tag.name}
            type={tag.type}
            value={`${tag.type}&${tag.name}`}
            fn={searchByTag}
          />
        ))}
        {causeTags.map((tag) => (
          <Tag
            key={tag.name + "cause"}
            tag={tag.name}
            type={"cause"}
            value={`${tag.type}&${tag.name}`}
            fn={searchByTag}
          />
        ))}
        {skillTags.map((tag) => (
          <Tag
            key={tag.name + "skill"}
            tag={tag.name}
            type={"skill"}
            value={`${tag.type}&${tag.name}`}
            fn={searchByTag}
          />
        ))}
      </div>
    </TitleSection>
  );
};

export default PaperTitle;
