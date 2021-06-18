import HolidayList from "../components/HolidayList";
import DatePicker from "../components/DatePicker";
import styled from "styled-components/macro";

export default function DetailsPage() {
  return (
    <Wrapper>
      <HolidaysPageHeader>
        <h1>Wählen Sie die gewünschten Ferien aus</h1>
      </HolidaysPageHeader>
      <HolidayList />
      <DatePicker />
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
