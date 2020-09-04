import styled from "styled-components";
import { getColor } from "../../helpers/palette";

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;
export const Question = styled.p`
  font-size: 2.4rem;
  font-weight: 300;
  margin-bottom: 0.75rem;
`;
export const MsgText = styled.p`
  font-size: 2.4rem;
  font-weight: 300;
  margin-bottom: 0.75rem;
`;

export const Details = styled.p`
  font-weight: 300;
  margin-bottom: 0.75rem;
`;
export const FrameTemplate = styled.div`
  border-top: 1px solid ${getColor("lightBorder")};
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(41, 41, 41, 1);
  height: 100%;
  width: 100%;
  font-size: 1.1rem;
  margin-top: 4rem;
  padding: 2rem 2rem 0 2rem;
  .x-button {
    position: absolute;
    top: -3.2rem;
    right: 0;
  }
  .submit-next-area {
    position: absolute;
    display: flex;
    bottom: 4rem;
    right: 0;
  }
  .sub-input-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  .nav-buttons {
    margin-top: auto;
    display: flex;
    margin-bottom: 4rem;
  }

  .next-area {
    display: flex;
    margin-left: auto;
  }
`;
