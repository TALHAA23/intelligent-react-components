import styled from "styled-components";
export const StyledAIButtonWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const StyledAIButton = styled.button`
  background: #fbca1f;
  font-family: inherit;
  padding: 5px 10px;
  margin: 5px;
  font-weight: 900;
  font-size: 14px;
  border: 3px solid black;
  border-radius: 0.4em;
  box-shadow: 0.1em 0.1em;
  cursor: pointer;

  &:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
  }

  &:active {
    transform: translate(0.05em, 0.05em);
    box-shadow: 0.05em 0.05em;
  }
`;

export const StyledRegenerateIcon = styled.img`
  height: 25px;
  aspect-ratio: 1/1;
`;
