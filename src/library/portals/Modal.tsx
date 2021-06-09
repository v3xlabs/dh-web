import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import ClientOnlyPortal from "./ClientOnlyPortal";

const Backdrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const GlobalStyle = createGlobalStyle`
 :global(body) {
    overflow: hidden;
  }
`;

const ModalBody = styled.div`
    background-color: ${({ theme }) => theme.palette.primary[800]};
    max-width: calc(100vw - 1rem);
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