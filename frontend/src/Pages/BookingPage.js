import BookingForm from "../components/BookingForm";
import useHolidays from "../hooks/useHolidays";
import styled from "styled-components/macro";

export default function BookingPage() {
  const { holidays } = useHolidays();
  return <Wrapper>{holidays && <BookingForm holidays={holidays} />}</Wrapper>;
}

const Wrapper = styled.section`
  padding: 10px;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin: 10px;
`;
