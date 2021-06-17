import Holidays from "./Holidays";
import useHolidays from "../hooks/useHolidays";

export default function HolidayList() {
    const {holidays} = useHolidays()
    return (
        <section>
            {holidays.map((holidays) => (
                <Holidays key={holidays.name} holidays={holidays}
                />))}
        </section>
    )
}