import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    position: relative;
    z-index: 1;
`;

const Box = styled.div`
    background: ${({ theme }) => theme.palette.primary[700]};
    display: flex;
    flex-direction: row-reverse;
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.palette.primary[300]};
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    margin: 0 20px;
    color: inherit;
    transition: color ${({ theme }) => theme.animation.micro};
    svg {
        fill: currentColor;
    }
`;

const Input = styled.input`
    padding: 10px 20px 10px 0;
    flex: 1;
    color: ${({ theme }) => theme.palette.primary[100]};
    
    &:focus + ${Icon} {
        color: ${({ theme }) => theme.palette.primary[100]};
    }
`;

const Underlay = styled.div<{ show: boolean }>`
    display: ${({ show }) => show ? "block" : "none"};

    position: absolute;
    left: -1rem;
    top: -1rem;
    right: -1rem;

    min-height: 198px;
    max-height: 50vh;

    box-shadow: rgb(0 0 0 / 70%) -3px 4px 14px;
    z-index: -1;

    border-color: ${({ theme }) => theme.palette.primary[700]};
    background: ${({ theme }) => theme.palette.primary[800]};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

export function Search(): JSX.Element {
    const [searchResults, setSearchResults] = useState(""); // change to [] of actual results

    return (
        <Wrapper>
            <Box>
                <Input placeholder="Search for rooms, users or categories" onChange={(event) => { setSearchResults(event.target.value); }} />
                <Icon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#sm-solid-search_svg__clip0)" fillRule="evenodd" clipRule="evenodd"><path d="M7.212 1.803a5.409 5.409 0 100 10.818 5.409 5.409 0 000-10.818zM0 7.212a7.212 7.212 0 1114.424 0A7.212 7.212 0 010 7.212z"></path><path d="M11.03 11.03a.901.901 0 011.275 0l3.43 3.432a.902.902 0 01-1.274 1.275l-3.431-3.431a.901.901 0 010-1.275z"></path></g><defs><clipPath id="sm-solid-search_svg__clip0"><path d="M0 0h16v16H0z"></path></clipPath></defs></svg>
                </Icon>
                <Underlay show={searchResults.length > 0} />
            </Box>
        </Wrapper>
    );
}