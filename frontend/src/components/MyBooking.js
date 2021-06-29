export default function MyBooking({ booking }) {
  return (
    <div>
      <h1>{booking.childName}</h1>
      <p>{booking.holidayName}</p>
      <p>
        Von: {booking.startDate} bis: {booking.endDate}
      </p>
    </div>
  );
}
