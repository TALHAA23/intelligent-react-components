import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    box-sizing: border-box;
  }

  .spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

`;

interface NoStyleButtonProps {
  isSpinning?: boolean;
}
export const StyledNoStyleButton = styled.button<NoStyleButtonProps>`
  color: #333;
  font-size: 16px;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:disabled {
    opacity: 0.5;
  }
  ${(props) =>
    props.isSpinning &&
    `
    animation: spin 1s linear infinite; 
  `}

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StyledComponentsWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const StyledXSLightText = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 300;
`;
