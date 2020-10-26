import React from "react";
import styled from "styled-components";
import { formatDistanceToNow, format } from "date-fns";

import Tag from "../components/tag";
import { DisplayLg, BodyMd, BodyXs, BoldText } from "../styles/typography";

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
    margin-bottom: 0.8rem;
    button {
      margin-left: 0.8rem;
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
        <BodyMd>Creating: </BodyMd>
        {solutionTags.map((tag) => (
          <Tag key={tag.name + "solution"} tag={tag.name} type={"solution"} />
        ))}
      </div>
      <div className="tag-box">
        <BodyMd>For: </BodyMd>
        {causeTags.map((tag) => (
          <Tag key={tag.name + "cause"} tag={tag.name} type={"cause"} />
        ))}
      </div>
      <div className="tag-box">
        <BodyMd>Needs: </BodyMd>
        {skillTags.map((tag) => (
          <Tag key={tag.name + "skill"} tag={tag.name} type={"skill"} />
        ))}
      </div>
    </TitleSection>
  );
};

export default PaperTitle;
