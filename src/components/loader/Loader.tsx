// import styled, { keyframes } from "styled-components";

// const rotate4 = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// const dash4 = keyframes`
//   from {
//     stroke-dasharray: 1, 200;
//     stroke-dashoffset: 0;
//   }

//   50% {
//     stroke-dasharray: 90, 200;
//     stroke-dashoffset: -35px;
//   }

//   to {
//     stroke-dashoffset: -125px;
//   }
// `;

// const StyledLoader = styled.svg`
//   width: 2em;
//   margin: 0 10px;
//   transform-origin: center;
//   animation: ${rotate4} 2s linear infinite;
// `;

// const StyledCircle = styled.circle`
//   fill: none;
//   stroke: #429ef5;
//   stroke-width: 5;
//   stroke-dasharray: 1, 200;
//   stroke-dashoffset: 0;
//   stroke-linecap: round;
//   animation: ${dash4} 1.5s ease-in-out infinite;
// `;

// export default function Loader() {
//   return (
//     <StyledLoader viewBox="25 25 50 50 ">
//       <StyledCircle r={20} cy={50} cx={50}></StyledCircle>
//     </StyledLoader>
//   );
// }
export default function Loader() {
  return "loading...";
}
