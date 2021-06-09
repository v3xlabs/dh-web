import styled from "styled-components";

export const Card = styled.div<{padding?: boolean, margin?: boolean, red?: boolean}>`
    border-radius: ${({theme}) => theme.borderRadius};
    background-color: ${({theme}) => theme.palette.primary[800]};
    width: 100%;
    font-weight: 700;
    padding: ${({padding}) => padding ? "2rem" : "0"};
    margin-top: ${({margin}) => margin ? "3rem" : "0"};
    border: ${({red, theme}) => red ? ("0.2rem solid "+theme.palette.accent.default) : "none"};
`;