import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Overline, BodySm, BodyXs } from "../styles/typography";
import { getColor } from "../helpers/palette";

const StyledUserList = styled.div`
  .inner-section {
    max-height: 25vh;
    overflow-y: auto;
    padding: 1.6rem 0.4rem;
    list-style: none;
    a {
      text-decoration-line: none;
      color: ${getColor("primary")};
    }
    .award {
      color: ${getColor("primary")};
    }
    li {
      margin-bottom: 1.6rem;
    }
    a:visited {
      color: ${getColor("primary")};
    }
    .user-role {
      margin-top: 0.8rem;
    }
  }
`;

const ActiveUserList = ({ contributors = [], creator, awards = [] }) => {
  return (
    <StyledUserList>
      <Overline>CREATOR</Overline>
      <div className="inner-section">
        <Link to={`user/${creator}`} className="creator-link">
          <BodySm>{creator}</BodySm>
        </Link>
      </div>
      <Overline>CONTRIBUTORS ({contributors.length})</Overline>

      <ul className="inner-section">
        {contributors.length !== 0 &&
          contributors.map((user) => (
            <li key={user.displayName}>
              <Link to={`user/${user.id}`}>
                <BodySm className="user-name">{user.displayName}</BodySm>
                {user.role && (
                  <BodyXs className="user-role">{user.role}</BodyXs>
                )}
              </Link>
            </li>
          ))}
      </ul>

      <Overline>AWARDS ({awards.length})</Overline>
      {
        <ul className="inner-section">
          {awards.length !== 0 &&
            awards.map((award) => (
              <li key={award.name}>
                <BodySm className="award">{award.name}</BodySm>
              </li>
            ))}
        </ul>
      }
    </StyledUserList>
  );
};

export default ActiveUserList;
