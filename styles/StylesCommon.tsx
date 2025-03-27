import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
:root {
    --status-successful-bg: #2ecc71;
    --status-pending-bg: #886e03;
    --status-error-bg: #e74c3c;
    --status-refreshing-bg: #3498db;
    --status-unknown-bg: #303030;
    --status-font-size: 10px;
    --status-padding: 0px 5px;
    --status-border-radius: 3px;
    --status-margin: 1px;
    --status-color: white;
    --status-min-width: "60px";
    --status-text-align: "center";
}
    
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

.status-successful {
    background-color: var(--status-successful-bg);
    color: var(--status-color);
    font-size: var(--status-font-size);
    padding: var(--status-padding);
    border-radius: var(--status-border-radius);
    margin: var(--status-margin);
    margin: var(--status-margin);
    min-width: var(--status-min-width);
    text-align: var(--status-text-align)
}

.status-pending {
    background-color: var(--status-pending-bg);
    color: var(--status-color);
    font-size: var(--status-font-size);
    padding: var(--status-padding);
    border-radius: var(--status-border-radius);
    margin: var(--status-margin);
    min-width: var(--status-min-width);
    text-align: var(--status-text-align)
}

.status-error {
    background-color: var(--status-error-bg);
    color: var(--status-color);
    font-size: var(--status-font-size);
    padding: var(--status-padding);
    border-radius: var(--status-border-radius);
    margin: var(--status-margin);
    min-width: var(--status-min-width);
    text-align: var(--status-text-align);
    text-align: center;
}

.status-refreshing {
    background-color: var(--status-refreshing-bg);
    color: var(--status-color);
    font-size: var(--status-font-size);
    padding: var(--status-padding);
    border-radius: var(--status-border-radius);
    margin: var(--status-margin);
    min-width: var(--status-min-width);
    text-align: var(--status-text-align);
}

.status-unknown {
    background-color: var(--status-unknown-bg);
    color: var(--status-color);
    font-size: var(--status-font-size);
    padding: var(--status-padding);
    border-radius: var(--status-border-radius);
    margin: var(--status-margin);
    min-width: var(--status-min-width);
    text-align: var(--status-text-align)
}

`;

interface NoStyleButtonProps {
  isSpinning?: boolean;
}
export const StyledNoStyleButton = styled.button<NoStyleButtonProps>`
  display: inline;
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

export const FileNameTag = styled.small`
  background-color: #6cb4ee;
  color: black;
  border-radius: 3px;
  padding: 1px 5px;
`;
