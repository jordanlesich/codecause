import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { StepperContext } from "../../contexts/stepperContext";
import Break from "../../components/break";
import { BodyMd, HeaderMd, DisplayLg } from "../../styles/typography";
import { getColor } from "../../helpers/palette";

const ResultsFrame = styled.div`
  overflow-y: auto;
  ul {
    list-style: none;
  }
  .result {
    position: relative;
    margin-right: 4rem;
  }
  .question {
    margin-bottom: 0.8rem;
  }
  .single-answer,
  .tag-box,
  .results-break {
    margin-bottom: 1.6rem;
  }
  .single-answer {
    margin-right: 3.2rem;
  }
  .tag-box {
    display: flex;
    margin-right: 3.2rem;
  }
  .tag-answer {
    margin-right: 1.6rem;
  }
  .edit-link {
    position: absolute;
    right: 0;
    top: 20%;
    text-decoration: none;
    color: ${getColor("primary")};
    :visited {
      color: ${getColor("primary")};
    }
  }
`;

const formatAnswer = (answer) => {
  if (answer === "" || !answer) {
    return <BodyMd className="single-answer">{"Answer still required"}</BodyMd>;
  } else if (Array.isArray(answer) && !answer?.length) {
    return <BodyMd className="single-answer">{"Answer still required"}</BodyMd>;
  } else if (typeof answer === "string") {
    return <BodyMd className="single-answer">{answer}</BodyMd>;
  } else if (Array.isArray(answer)) {
    return (
      <div className="tag-box">
        {answer.map((tag) => {
          return (
            <BodyMd className="tag-answer" key={tag}>
              {tag}
            </BodyMd>
          );
        })}
      </div>
    );
  }
};

const Results = () => {
  const { stepperData, currentFrame, route } = useContext(StepperContext);
  const { title, details } = currentFrame;

  return (
    <ResultsFrame>
      {title && <DisplayLg className="title">{title}</DisplayLg>}
      {details && <BodyMd className="details">{details}</BodyMd>}
      <Break type="soft" className="results-break result" />
      <ul>
        {stepperData.map((step, index) => {
          return (
            <li key={step.tag} className="result">
              <Link className="edit-link" to={`${route}/${index}/0`}>
                <BodyMd>Edit</BodyMd>
              </Link>
              <HeaderMd className="question">{step.question}</HeaderMd>
              {formatAnswer(step.answer)}
              <Break type="soft" className="results-break" />
            </li>
          );
        })}
      </ul>
    </ResultsFrame>
  );
};

export default Results;
