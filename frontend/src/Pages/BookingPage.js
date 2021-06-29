import HolidayBookingForm from "../components/HolidayBookingForm";
import useHolidays from "../hooks/useHolidays";
import styled from "styled-components/macro";
import useChildren from "../hooks/useChildren";

export default function BookingPage() {
  const { holidays } = useHolidays();
  const { children } = useChildren();
  return (
    <Wrapper>
      {holidays && (
        <HolidayBookingForm holidays={holidays} children={children} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 10px;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin: 10px;
`;
