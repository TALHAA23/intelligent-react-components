import styled from "styled-components";

const StyledObjectRepresentation = styled.div`
  margin-left: 0.375rem;
  margin-right: 0.375rem;
  background-color: #333;
  color: #fff;
  font-family: monospace;
  font-size: 14px;
  padding: 1rem;
  border-radius: 4px;
  overflow-y: auto;
`;

const StyledObjectEntryNull = styled.span`
  color: #ccc;
`;

const StyledObjectEntryUndefined = styled(StyledObjectEntryNull)``;

const StyledObjectEntryString = styled.span`
  color: #00ff00;
`;

const StyledObjectEntryNumber = styled(StyledObjectEntryString)`
  color: #0049da;
`;

const StyledObjectEntryBoolean = styled(StyledObjectEntryNumber)``;

const StyledObjectEntryFunction = styled.span`
  color: #ff0000;
`;

const StyledObjectEntryKey = styled.span`
  color: #903dc7;
`;

const StyledObjectEntryArrayToggle = styled.span`
  cursor: pointer;
`;

const StyledObjectEntryObjectToggle = styled(StyledObjectEntryArrayToggle)``;

const StyledObjectEntryEmptyArray = styled.span`
  color: #ccc;
`;

const StyledObjectEntryEmptyObject = styled(StyledObjectEntryEmptyArray)``;

export {
  StyledObjectRepresentation,
  StyledObjectEntryNull,
  StyledObjectEntryUndefined,
  StyledObjectEntryString,
  StyledObjectEntryEmptyObject,
  StyledObjectEntryBoolean,
  StyledObjectEntryFunction,
  StyledObjectEntryKey,
  StyledObjectEntryObjectToggle,
  StyledObjectEntryNumber,
  StyledObjectEntryEmptyArray,
  StyledObjectEntryArrayToggle,
};
