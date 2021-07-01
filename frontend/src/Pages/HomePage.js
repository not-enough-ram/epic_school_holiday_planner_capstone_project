import styled from "styled-components/macro";
import useUpcomingHolidays from "../hooks/useUpcomingHolidays";
import MyBookingList from "../components/MyBookingList";
import Holidays from "../components/Holidays";

export default function HolidaysPage() {
  const { upcomingHolidays } = useUpcomingHolidays();

  return (
    <Wrapper>
      <StyledUpcomingHolidays>
        <h1>Die nächsten Ferien</h1>
        {upcomingHolidays && <Holidays holidays={upcomingHolidays[0]} />}
      </StyledUpcomingHolidays>
      <StyledMyBookings>
        <h1>Meine Buchungen</h1>
        <MyBookingList />
      </StyledMyBookings>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  height: inherit;
`;

const StyledUpcomingHolidays = styled.section`
  margin-bottom: 20px;
`;

const StyledMyBookings = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
`;
