import styled from "styled-components";

export const SecondaryButton = styled.button`
    background: ${({ theme }) => theme.palette.primary[700]};
    border: none;
    outline: none;
    padding: 10px 40px;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    transition: ${({ theme }) => theme.animation.micro};
    color: ${({ theme }) => theme.palette.buttonText};
    font-weight: 700;
    font-size: 1.225rem;
    line-height: 1.8rem;
    display: block;  
    height: fit-content;
    &:hover {
        background: ${({ theme }) => theme.palette.primary[600]};
    }
`;