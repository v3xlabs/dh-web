import styled from 'styled-components';

export const Card = styled.div<{padding?: boolean, margin?: boolean}>`
    border-radius: ${({theme}) => theme.borderRadius};
    background-color: ${({theme}) => theme.palette.primary[800]};
    width: 100%;
    font-weight: 700;
    padding: ${({padding}) => padding ? '2rem' : '0'};
    margin-top: ${({margin}) => margin ? '1rem' : '0'};
`;