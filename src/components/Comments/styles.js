import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const spin = keyframes`
  from{
    transform: rotate(0deg);
  }  
  to{
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from{
    opacity: 0
  }
  to{
    opacity: 1;
  }
`;

export const FallbackComponent = styled(FaSpinner)`
  fill: gray;
  animation: ${spin} 2s linear infinite;
  align-self: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
