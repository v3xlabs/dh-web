import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { AuthResourceReducerAction } from "../../store/authResourceReducer";

const Wrapper = styled.div`
    position: absolute;
    top: 100%;
    margin-top: 1rem;
    min-width: 20rem;
    right: 0;
    background: ${({ theme }) => theme.palette.primary[800]};
    border: 1px solid ${({ theme }) => theme.palette.primary[600]};
    border-radius: ${({ theme }) => theme.borderRadius};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    overflow: hidden;
    z-index: 1;
`;

const Item = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 1rem;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.palette.primary[700]};
    }
`;

export const ProfilePopup: FC = () => {
    const router = useRouter();
    const github = "https://github.com/dogehousetv/web/issues";
    const dispatch = useDispatch();

    return (
        <Wrapper>
            {
                [
                    { label: "Profile", route: "/profile" },
                    { label: "Report A Bug", route: github },
                ].map((entry) => (
                    <Link href={entry.route} key={entry.route}>
                        <Item>
                            {entry.label}
                        </Item>
                    </Link>
                ))
            }
            <Item onClick={() => {
                dispatch({ type: AuthResourceReducerAction.AUTH_RESOURCE_RESET });
                router.push("/login");
            }}>
                Logout
            </Item>
        </Wrapper>
    );
};