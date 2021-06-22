import DropDownMenu from "./DropDownMenu";

export default function BookingForm({ holidays, startDate, endDate }) {
  return (
    <form>
      <p>Für welche Ferien: </p>
      <DropDownMenu holidays={holidays} />
      <p>
        Von: {startDate} bis: {endDate}
      </p>
    </form>
  );
}
