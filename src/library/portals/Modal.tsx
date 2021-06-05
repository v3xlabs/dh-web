import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import ClientOnlyPortal from "./ClientOnlyPortal";

const Backdrop = styled.div`
  position: fixed;
  background-color: rgba(27, 23, 23, 0.7);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const GlobalStyle = createGlobalStyle`
 :global(body) {
    overflow: hidden;
  }
`;

const ModalBody = styled.div`
    background-color: ${({ theme }) => theme.palette.primary[800]};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius:  1% 1%;
`;

type ModalProperties = Readonly<{
    children: React.ReactNode;
}>

export default function Modal({ children }: ModalProperties): JSX.Element {
    return (
        <ClientOnlyPortal selector="#_document-react-portal-modal">
            <GlobalStyle />
            <Backdrop>
                <ModalBody>
                    {children}
                </ModalBody>
            </Backdrop>
        </ClientOnlyPortal>
    );
}