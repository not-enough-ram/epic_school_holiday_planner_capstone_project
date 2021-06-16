export default function Holidays({holidays}) {
    return (
        <section>
            <h2>{holidays.name}</h2>
            <h2>{holidays.startDate}</h2>
            <h2>{holidays.endDate}</h2>
        </section>
    )
}