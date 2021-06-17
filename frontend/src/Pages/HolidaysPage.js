import styled from "styled-components/macro";
import HolidayList from "../components/HolidayList";

export default function HolidaysPage() {
  return (
    <Wrapper>
      <HolidaysPageHeader>
        <h1>Ferienübersicht</h1>
      </HolidaysPageHeader>
      <HolidayList />
      <section>
        <h1>Gebuchte Ferien</h1>
      </section>
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

const HolidaysPageHeader = styled.div``;
