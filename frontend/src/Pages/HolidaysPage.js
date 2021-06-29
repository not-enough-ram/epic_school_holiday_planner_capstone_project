import styled from "styled-components/macro";
import useUpcomingHolidays from "../hooks/useUpcomingHolidays";
import HolidayList from "../components/HolidayList";

export default function HolidaysPage() {
  const holidays = useUpcomingHolidays();
  return (
    <Wrapper>
      <h1>Alle Ferien im Überblick</h1>
      {holidays && <HolidayList />}
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
