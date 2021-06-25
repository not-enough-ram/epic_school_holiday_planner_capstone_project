import MyBooking from "./MyBooking";
import useMyBookings from "../hooks/useMyBookings";

export default function MyBookingList() {
  const { myBookings } = useMyBookings();
  return (
    <section>
      {myBookings.map((myBooking) => (
        <MyBooking key={myBooking.id} booking={myBooking} />
      ))}
    </section>
  );
}
