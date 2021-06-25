import styled from "styled-components/macro";
import useUpcomingHolidays from "../hooks/useUpcomingHolidays";
import useMyBookings from "../hooks/useMyBookings";
import MyBookingList from "../components/MyBookingList";
import Holidays from "../components/Holidays";

export default function HolidaysPage() {
  const { upcomingHolidays } = useUpcomingHolidays();
  const { myBookings } = useMyBookings();
  return (
    <Wrapper>
      <HolidaysPageHeader>
        <h1>Die nächsten Ferien</h1>
      </HolidaysPageHeader>
      {upcomingHolidays && <Holidays holidays={upcomingHolidays[0]} />}
      <HolidaysPageHeader>
        <h1>Meine Buchungen</h1>
      </HolidaysPageHeader>
      {myBookings && <MyBookingList myBookings={myBookings} />}
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
