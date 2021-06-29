import BookingForm from "../components/BookingForm";
import useHolidays from "../hooks/useHolidays";

export default function BookingPage() {
  const { holidays } = useHolidays();
  console.log(holidays);
  return (
    <section>
      {holidays && (
        <BookingForm
          holidays={holidays}
          startDate={holidays.startDate}
          endDate={holidays.endDate}
        />
      )}
    </section>
  );
}
