export default function HolidayDetails({ name, startDate, endDate }) {
  return (
    <>
      <h1>Details</h1>
      <h2>Name: {name}</h2>
      <h2>Start: {startDate}</h2>
      <h2>Ende: {endDate}</h2>
    </>
  );
}
