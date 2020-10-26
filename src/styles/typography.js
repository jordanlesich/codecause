import styled from "styled-components";
import { Link } from "react-router-dom";

import { getColor } from "../helpers/palette";

export const DisplayXl = styled.h1`
  font-size: 4rem;
  line-height: 5.4rem;
  letter-spacing: 1px;
  font-weight: 700;
`;
export const DisplayLg = styled.h2`
  font-size: 3.4rem;
  line-height: 4.4rem;
  font-weight: 700;
`;
export const DisplayMd = styled.h3`
  font-size: 2.8rem;
  line-height: 3.4rem;
  font-weight: 700;
`;
export const DisplaySm = styled.h4`
  font-size: 2.2rem;
  line-height: 3rem;
  font-weight: 700;
`;

export const HeaderLg = styled.h2`
  font-size: 1.9rem;
  line-height: 2.8rem;
  font-weight: 700;
`;
export const HeaderMd = styled.h3`
  font-size: 1.7rem;
  line-height: 2.6rem;
  font-weight: 700;
`;
export const HeaderSm = styled.h4`
  font-size: 1.5rem;
  line-height: 2.3rem;
  font-weight: 700;
`;
export const HeaderXs = styled.p`
  font-size: 1.2rem;
  line-height: 1.5rem;
  font-weight: 700;
`;
export const Overline = styled.h5`
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const BodyLg = styled.p`
  font-size: 1.7rem;
  line-height: 2.6rem;
`;
export const BodyMd = styled.p`
  font-size: 1.5rem;
  line-height: 2.3rem;
`;
export const BodySm = styled.p`
  font-size: 1.3rem;
  line-height: 2rem;
`;
export const BodyXs = styled.p`
  font-size: 1.1rem;
  line-height: 1.5rem;
`;

export const BoldText = styled.span`
  font-weight: 700;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: inherit;
  font-size: 1.3rem;
  line-height: 2rem;
  color: ${getColor("primary")};
  :visited {
    color: ${getColor("purple400")};
  }
`;
