/* eslint-disable no-unused-expressions */
import React, { forwardRef } from "react";
import styled from "styled-components";

const TextareaWrapper = styled.div`
    color: "";
    textarea {
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
    }
`;

const InputWrapper = styled.div`
    input {
        width: 100%;
        padding: 1rem 1rem;
        margin: 8px 0;
        box-sizing: border-box;
        box-shadow: rgb(0 0 0 / 10%) -3px 4px 14px;
        z-index: -1;
        border-color: ${({ theme }) => theme.palette.primary[700]};
        background: ${({ theme }) => theme.palette.primary[800]};
        border-radius: ${({ theme }) => theme.borderRadius};
    }
`;

export interface InputProperties extends React.ComponentPropsWithoutRef<"input"> {
    textarea?: boolean;
    rows?: number;
    placeholder?: string;
    name?: string;
    type?: string;
    value?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProperties>(
    // eslint-disable-next-line react/prop-types
    ({ textarea, placeholder, name, type, value, ...properties }, reference) => {


        return textarea ? (
            <TextareaWrapper>
                <textarea
                    ref={reference as any}
                    name={name}
                    placeholder={placeholder}
                    {...(properties as any)}
                >{value}</textarea>
            </TextareaWrapper>
        ) : (
            <InputWrapper >
                <input ref={reference} type={type} placeholder={placeholder} name={name} value={value} {...properties} />
            </InputWrapper >
        );
    }
);

Input.displayName = "Input";