export default function HolidayDetails({ name, startDate, endDate }) {
  return (
    <>
      <h1>Details</h1>
      <span>Name: {name}</span>
      <span>Start: {startDate}</span>
      <span>Ende: {endDate}</span>
    </>
  );
}
