export default function MyBooking({ booking }) {
  return (
    <section>
      <h1>{booking.childName}</h1>
      <h2>{booking.holidayName}</h2>
      <h3>
        Von: {booking.startDate} bis: {booking.endDate}
      </h3>
    </section>
  );
}
