import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    select {
        width: 100%;
        padding: 1rem 1rem;
        margin: 8px 0;
        box-sizing: border-box;
        box-shadow: rgb(0 0 0 / 10%) -3px 4px 14px;
        z-index: -1;
        border-color: ${({ theme }) => theme.palette.primary[700]};
        background: ${({ theme }) => theme.palette.primary[800]};
        border-radius: ${({ theme }) => theme.borderRadius};
        color: ${({ theme }) => theme.palette.primary[100]};
        font-weight: 700;
        option{
            color: ${({ theme }) => theme.palette.primary[100]};
        }
    }
`;

interface NativeSelectProperties {
    children?: any;
    className?: any;
    placeholder?: any;
}

export const Select: React.FC<
    React.ComponentPropsWithoutRef<"select">
> = ({ children, className, placeholder, ...properties }: NativeSelectProperties) => {
    return (
        <Wrapper>
            <select
                placeholder={placeholder}
                className={className}
                style={{
                    backgroundPosition: "right 10px center",
                }}
                {...properties}
            >
                {children}
            </select>
        </Wrapper>
    );
};