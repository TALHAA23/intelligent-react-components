import styled from "styled-components";

const root = {
  "--text-color": "white",
  "--width": "100%",
  "--height": "auto",
  "--max-height": "350px",
  "--bg-color": "#0f172a",
  "--padding": "5px",
  "--logo-width": "50px",
  "--position-btm": "26px",
};

const StyledSmIcon = styled.img`
  width: 20px;
  aspect-ratio: 1/1;
`;

const StyledLogoAsButton = styled.img`
  width: 60px;
  aspect-ratio: 1/1;
  background-color: transparent;
  border-radius: 0.25rem;
`;

const StyledLogo = styled.img`
  width: ${root["--logo-width"]};
  aspect-ratio: 1/1;
`;

const StyledArrowDownMark = styled.img`
  width: 20px;
  aspect-ratio: 1/1;
  background-color: rgb(30, 41, 59);
  border-radius: 0.25rem;
  padding: 0.25rem;
`;

const StyledDevtoolWrapper = styled.section`
  position: absolute;
  bottom: ${root["--position-btm"]};
  width: ${root["--width"]};
  height: ${root["--height"]};
  max-height: ${root["--max-height"]};
`;

const StyledDevtoolContainer = styled.div`
  height: ${root["--max-height"]};
  overflow-y: auto;
  background-color: ${root["--bg-color"]};
  color: ${root["--text-color"]};
`;

const StyledDevtoolContainerHeader = styled.div`
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(2, 6, 23);
  padding: 0.375rem;
`;

const StyledDevtoolContainerHeaderHeading = styled.h4`
  font-weight: 500;
`;

const StyledDevtoolContainerMainWrapper = styled.div`
  padding: 0.375rem;
`;

const StyledDevtoolContainerMain = styled.details`
  margin-top: 0.125rem;
  margin-bottom: 0.125rem;
`;

const StyledDevtoolContainerMainRow = styled.summary`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 300;
  border-bottom-width: 1px;
  border-color: transparent;
  border-bottom-color: rgb(51, 65, 85);
  border-radius: 5px;
  border-style: solid;
  cursor: pointer;
`;

const StyledDevtoolContainerMainRowTitle = styled.p`
  flex-basis: 60%;
`;

const StyledDevtoolContainerMainRowStatus = styled.p`
  flex-basis: 20%;
`;

const StyledDevtoolContainerMainRowIconsWrapper = styled.div`
  display: flex;
  width: fit-content;
`;

const StyledDevtoolContainerMainInformation = styled.div`
  background-color: #2048a790;
  padding: 0.125rem;
  border-radius: 0.25rem;
`;

const StyledDevtoolContainerMainInformationKey = styled.p`
  margin: 0.5rem;
  margin-left: 0.75rem;
`;
//

export {
  root,
  StyledSmIcon,
  StyledLogoAsButton,
  StyledLogo,
  StyledArrowDownMark,
  StyledDevtoolWrapper,
  StyledDevtoolContainer,
  StyledDevtoolContainerHeader,
  StyledDevtoolContainerHeaderHeading,
  StyledDevtoolContainerMainWrapper,
  StyledDevtoolContainerMain,
  StyledDevtoolContainerMainRow,
  StyledDevtoolContainerMainRowTitle,
  StyledDevtoolContainerMainRowStatus,
  StyledDevtoolContainerMainRowIconsWrapper,
  StyledDevtoolContainerMainInformation,
  StyledDevtoolContainerMainInformationKey,
  // ... (other styled components)
};
