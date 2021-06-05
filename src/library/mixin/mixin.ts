import { css } from "styled-components";

export const notDraggable = `
    user-drag: none; 
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

export const skeletonLoaderBase = css`
box-sizing: border-box;
position: relative;
background: ${({ theme }) => theme.palette.primary[700]} no-repeat;
animation: pulse 2s infinite;
animation-delay: 0.5s;

@media(prefers-reduced-motion: reduce) {
    background-image: none;
    animation: none;
}
  
@keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

/**
 * Skeleton Loader Accessibility
 * attributes.
 */
export const skeletonLoaderAttributes = {
    "role": "progressbar",
    "tabindex": 0,
    "aria-busy": true,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuetext": "Please wait..."
};