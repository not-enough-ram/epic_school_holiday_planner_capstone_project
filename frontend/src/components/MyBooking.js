export default function MyBooking({ booking }) {
  return (
    <section>
      <p>{booking.childName}</p>
      <p>{booking.holidayName}</p>
      <p>
        Von: {booking.startDate} bis: {booking.endDate}
      </p>
    </section>
  );
}
