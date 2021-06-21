import styled from "styled-components/macro";
import UpcomingHolidays from "../components/UpcomingHolidays";
import useUpcomingHolidays from "../hooks/useUpcomingHolidays";

export default function HolidaysPage() {
  const holidays = useUpcomingHolidays();
  return (
    <Wrapper>
      <HolidaysPageHeader>
        <h1>Die nächsten Ferien</h1>
      </HolidaysPageHeader>
      {/*{holidays && <HolidayList />}*/}
      {holidays && <UpcomingHolidays />}
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
