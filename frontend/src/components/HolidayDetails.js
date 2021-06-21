export default function HolidayDetails({ name, startDate, endDate }) {
  return (
    <>
      <h1>Details</h1>
      <p>Name: {name}</p>
      <p>Start: {startDate}</p>
      <p>Ende: {endDate}</p>
    </>
  );
}
