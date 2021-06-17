export default function Holidays({holidays}) {
    return (
        <section>
            <h1>{holidays.name}</h1>
            <h2>{holidays.startDate}</h2>
            <h2>{holidays.endDate}</h2>
        </section>
    )
}
