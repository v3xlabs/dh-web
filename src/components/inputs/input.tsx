import styled from "styled-components";

// Use these in the event we want to modify them later
export const TextArea = styled.textarea`
background: transparent;
    border: none;
    outline: none;
    font-size: 100%;
    color: inherit;
    font-family: inherit;
    line-height: inherit;
    padding: 1rem 1rem;
    box-shadow: rgb(0 0 0 / 10%) -3px 4px 14px;
    border-color: ${({ theme }) => theme.palette.primary[700]};
    background: ${({ theme }) => theme.palette.primary[700]};
    border-radius: ${({ theme }) => theme.borderRadius};
    flex: 1;
    
    &:placeholder {
        color: ${({ theme }) => theme.palette.primary[300]};
    }
`;

export const Input = styled.input`
background: transparent;
border: none;
outline: none;
font-size: 100%;
color: inherit;
font-family: inherit;
line-height: inherit;
padding: 1rem 1rem;
box-shadow: rgb(0 0 0 / 10%) -3px 4px 14px;
border-color: ${({ theme }) => theme.palette.primary[700]};
background: ${({ theme }) => theme.palette.primary[700]};
border-radius: ${({ theme }) => theme.borderRadius};
flex: 1;

&:placeholder {
    color: ${({ theme }) => theme.palette.primary[300]};
}
`;
