import React from "react";
import styled, { keyframes } from "styled-components";
import { Loding } from "./Icons";

const loadingCircleAni = keyframes`
   0% { stroke-dashoffset: 157; }
   75% { stroke-dashoffset: -147; }
   100% { stroke-dashoffset: -157; }
`;

const loadingSpin = keyframes`
    100% { transform: rotate(360deg); }
`;

const CssLoading = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 100;
   animation: ${loadingSpin} 3s infinite;

`;

const Animation = styled.div`
    stroke: black;
   stroke-width: 4;
   stroke-dasharray: 157;
   stroke-dashoffset: 0;
   fill: transparent;
   animation: ${loadingCircleAni} 1s infinite;

`;


export default () => (
    <Animation>
            <CssLoading>
                <Loding />
            </CssLoading>
    </Animation>
);