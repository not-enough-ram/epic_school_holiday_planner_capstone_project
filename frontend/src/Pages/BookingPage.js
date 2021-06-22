import BookingForm from "../components/BookingForm";
import useHolidays from "../hooks/useHolidays";

export default function BookingPage() {
  const { holidays } = useHolidays();
  return <section>{holidays && <BookingForm holidays={holidays} />}</section>;
}
