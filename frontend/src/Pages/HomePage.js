import styled from "styled-components/macro";
import useUpcomingHolidays from "../hooks/useUpcomingHolidays";
import useMyBookings from "../hooks/useMyBookings";
import MyBookingList from "../components/MyBookingList";
import Holidays from "../components/Holidays";

export default function HolidaysPage() {
  const { upcomingHolidays } = useUpcomingHolidays();
  const { myBookings } = useMyBookings();

  const sortHolidaysByChild = () =>
    myBookings.map((booking) => booking.childName);
  return (
    <Wrapper>
      <h1>Die nächsten Ferien</h1>
      {upcomingHolidays && <Holidays holidays={upcomingHolidays[0]} />}
      <h1>Meine Buchungen</h1>
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
