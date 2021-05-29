import styled from 'styled-components';

export const Card = styled.div<{padding?: boolean}>`
    border-radius: ${({theme}) => theme.borderRadius};
    background-color: ${({theme}) => theme.palette.primary[700]};
    width: 100%;
    padding: ${({padding}) => padding ? '1rem' : '0'};
`;