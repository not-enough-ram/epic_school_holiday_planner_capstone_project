import HolidayBookingForm from "../components/HolidayBookingForm";
import useHolidays from "../hooks/useHolidays";
import styled from "styled-components/macro";
import useChildren from "../hooks/useChildren";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function BookingPage() {
  const { holidays } = useHolidays();
  const { children } = useChildren();
  const { token } = useContext(AuthContext);
  return (
    <Wrapper>
      {holidays && (
        <HolidayBookingForm
          holidays={holidays}
          children={children}
          token={token}
        />
      )}
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
