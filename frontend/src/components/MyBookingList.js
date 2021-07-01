import useBookingByChild from "../hooks/useBookingByChild";
import styled from "styled-components/macro";

export default function MyBookingList() {
  const { data: bookingsByChild, error, isLoading } = useBookingByChild();

  if (isLoading) return "loading ...";
  return (
    <Wrapper>
      {!isLoading &&
        !error &&
        bookingsByChild.map((child) => (
          <div key={child.id}>
            Childname: {child.childName}
            {child.booking.map((booking) => (
              <div key={booking.id}>{booking.holidayName}</div>
            ))}
          </div>
        ))}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 10px;
  text-align: left;
  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;
  margin: 10px;
  height: inherit;
`;
