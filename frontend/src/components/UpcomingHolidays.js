import Holidays from "./Holidays";
import useUpcomingHolidays from "../hooks/useUpcomingHolidays";

export default function UpcomingHolidays() {
  const { upcomingHolidays } = useUpcomingHolidays();
  return <Holidays holidays={upcomingHolidays} />;
}
