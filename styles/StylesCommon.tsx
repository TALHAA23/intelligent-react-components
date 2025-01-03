import styled from "styled-components";
export const StyledNoStyleButton = styled.button`
  color: #333;
  font-size: 16px;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:disabled {
    opacity: 0.5;
  }
`;
