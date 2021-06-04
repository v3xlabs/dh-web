import { useRouter } from "next/router";
import styled from "styled-components";

import { withAuth } from "../../library/auth/withAuth";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    @media(max-width: 600px) {
        background: ${({ theme }) => theme.palette.primary[800]};
    }
`;

function Room(): JSX.Element {
    const router = useRouter();

    const { roomId } = router.query;

    return (
        <Wrapper>
            <p>Room with room id {roomId}</p>
        </Wrapper>
    );
}

export default withAuth(Room);