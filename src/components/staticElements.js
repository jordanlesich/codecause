import styled from "styled-components";
import { getColor } from "../helpers/palette";

export const DashBox = styled.div`
  padding: 2.4rem 4rem;
  border: 1px solid ${getColor("lightBorder")};
  border-radius: 4px;
  .top-section {
    margin-bottom: 0.8rem;
  }
  .display {
    margin-bottom: 1.6rem;
  }
`;

export const DashboxTitleSection = styled.div`
  display: flex;
  svg {
    margin-right: 0.8rem;
    transform: translate(0rem, 0.4rem);
  }
`;
