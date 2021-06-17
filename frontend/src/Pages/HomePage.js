import styled from "styled-components/macro";
import Holidays from "../components/Holidays";

export default function HomePage() {
    return (
        <Wrapper>
            <Holidays/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  padding: 10px;
  text-align: center;
  display: grid;
  grid-gap: 24px;
  justify-content: center;
`;
