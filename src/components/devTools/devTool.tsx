import React from "react";
import logo from "@public/irc-logo-v2.png";
import arrowDown from "@public/arrow-down.svg";
import trashIcon from "@public/trash-bin-minimalistic-svgrepo-com.svg";
import repeatIcon from "@public/repeat-svgrepo-com.svg";
import { useIrcRegistriesAndRegister } from "@src/hooks/ircRegisteryProvider";
import ObjectRepresentation from "@src/components/ObjectRepresentation";
import {
  StyledArrowDownMark,
  StyledDevtoolContainer,
  StyledDevtoolContainerHeader,
  StyledDevtoolContainerHeaderHeading,
  StyledDevtoolWrapper,
  StyledLogo,
  StyledLogoAsButton,
  StyledSmIcon,
  StyledDevtoolContainerMain,
  StyledDevtoolContainerMainInformation,
  StyledDevtoolContainerMainInformationKey,
  StyledDevtoolContainerMainRow,
  StyledDevtoolContainerMainRowIconsWrapper,
  StyledDevtoolContainerMainRowStatus,
  StyledDevtoolContainerMainRowTitle,
  StyledDevtoolContainerMainWrapper,
} from "@styles/StylesDevtool";
import { StyledNoStyleButton } from "@styles/StylesCommon";
interface Props {
  initialIsOpen?: boolean;
}

export default function DevTool({ initialIsOpen = false }: Props) {
  const { registerButtons } = useIrcRegistriesAndRegister();
  const [isToolOpen, setIsToolOpen] = React.useState(initialIsOpen);
  const toggleDevTool = (open: boolean) => {
    setIsToolOpen((prev) => (open ? open : !prev));
  };
  return (
    <StyledDevtoolWrapper>
      {isToolOpen ? (
        <div>
          <StyledNoStyleButton onClick={() => toggleDevTool(false)}>
            <StyledArrowDownMark src={arrowDown} alt="arrow-down" />
          </StyledNoStyleButton>
          <StyledDevtoolContainer>
            <StyledDevtoolContainerHeader>
              <StyledLogo src={logo} alt="irc" />
              <StyledDevtoolContainerHeaderHeading>
                IRC Dev tools
              </StyledDevtoolContainerHeaderHeading>
            </StyledDevtoolContainerHeader>
            <StyledDevtoolContainerMainWrapper>
              {registerButtons.map((button, index) => (
                <StyledDevtoolContainerMain>
                  <StyledDevtoolContainerMainRow>
                    <StyledDevtoolContainerMainRowTitle>
                      {" "}
                      {button.buttonProps.filename}
                    </StyledDevtoolContainerMainRowTitle>
                    {/* status goes here */}
                    <StyledDevtoolContainerMainRowIconsWrapper>
                      <StyledNoStyleButton
                        onClick={async (e) => {
                          const target = e.currentTarget;
                          try {
                            target.classList.add("spin");
                            await button.refreshResponse();
                          } finally {
                            target.classList.remove("spin");
                          }
                        }}
                      >
                        <img src={repeatIcon} alt="refresh" />
                      </StyledNoStyleButton>
                      <img src={trashIcon} alt="trash" />
                    </StyledDevtoolContainerMainRowIconsWrapper>
                  </StyledDevtoolContainerMainRow>
                  <StyledDevtoolContainerMainInformation>
                    <p className="xs-light-text key">Input:</p>
                    <ObjectRepresentation props={button.buttonProps} />
                    {button.response && (
                      <>
                        <p className="xs-light-text key">
                          Thoughts and expectation:
                        </p>
                        <ObjectRepresentation props={button.response} />
                      </>
                    )}
                    {button.error && (
                      <>
                        <p className="xs-light-text key">Error:</p>
                        <ObjectRepresentation props={button.error} />
                      </>
                    )}
                  </StyledDevtoolContainerMainInformation>
                </StyledDevtoolContainerMain>
              ))}
            </StyledDevtoolContainerMainWrapper>
          </StyledDevtoolContainer>
        </div>
      ) : (
        <StyledNoStyleButton onClick={() => toggleDevTool(true)}>
          <StyledLogoAsButton src={logo} alt="irc"></StyledLogoAsButton>
        </StyledNoStyleButton>
      )}
    </StyledDevtoolWrapper>
    // <section className="devtool-wrapper">
    //   {isToolOpen ? (
    //     <div>
    //       <button
    //         className="no-style-button"
    //         onClick={() => toggleDevTool(false)}
    //       >
    //         <img className="arrow-down-mark" src={arrowDown} alt="arrow-down" />
    //       </button>
    //       <div className="devtool-container">
    //         <div className="devtool-container--header">
    //           <img className="logo" src={logo} alt="irc" />
    //           <h4 className="devtool-container--header--heading">
    //             IRC Dev tools
    //           </h4>
    //         </div>
    //         <div className="devtool-container--main-wrapper">
    //           {registerButtons.map((button, index) => (
    //             <details key={index} className="devtool-container--main">
    //               <summary className="devtool-container--main--row">
    //                 <p className="devtool-container--main--row--title">
    //                   {button.buttonProps.filename}
    //                 </p>
    //                 <p className={`status-${button.status}`}>{button.status}</p>
    //                 <div className="sm-icon devtool-container--main--row--icons-wrapper">
    //                   <button
    //                     className="no-style-button"
    //                     onClick={async (e) => {
    //                       const target = e.currentTarget;
    //                       try {
    //                         target.classList.add("spin");
    //                         await button.refreshResponse();
    //                       } finally {
    //                         target.classList.remove("spin");
    //                       }
    //                     }}
    //                   >
    //                     <img src={repeatIcon} alt="refresh" />
    //                   </button>
    //                   <img src={trashIcon} alt="trash" />
    //                 </div>
    //               </summary>
    //               <div className="devtool-container--main--information">
    //                 <p className="xs-light-text key">Input:</p>
    //                 <ObjectRepresentation props={button.buttonProps} />
    //                 {button.response && (
    //                   <>
    //                     <p className="xs-light-text key">
    //                       Thoughts and expectation:
    //                     </p>
    //                     <ObjectRepresentation props={button.response} />
    //                   </>
    //                 )}
    //                 {button.error && (
    //                   <>
    //                     <p className="xs-light-text key">Error:</p>
    //                     <ObjectRepresentation props={button.error} />
    //                   </>
    //                 )}
    //               </div>
    //             </details>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <button className="no-style-button" onClick={() => toggleDevTool(true)}>
    //       <img className="logo-as-button" src={logo} alt="irc" />
    //     </button>
    //   )}
    // </section>
  );
}
