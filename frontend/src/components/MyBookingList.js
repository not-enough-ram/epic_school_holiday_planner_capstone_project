import useBookingByChild from "../hooks/useBookingByChild";

export default function MyBookingList() {
  const { data: bookingsByChild, error, isLoading } = useBookingByChild();

  if (isLoading) return "loading ...";
  return (
    <section>
      {!isLoading &&
        !error &&
        bookingsByChild.map((child) => (
          <div key={child.id}>
            Childname: {child.childName}
            {child.booking.map((booking) => (
              <div key={booking.id}>{booking.holidayName}</div>
            ))}
          </div>
        ))}
    </section>
  );
}
