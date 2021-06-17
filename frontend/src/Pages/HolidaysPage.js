import styled from "styled-components/macro";
import HolidayList from "../components/HolidayList";

export default function HolidaysPage() {
    return (
        <Wrapper>
            <HolidayList/>
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
