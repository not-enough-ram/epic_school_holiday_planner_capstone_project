import DropDownMenu from "./DropDownMenu";

export default function BookingForm({ holidays }) {
  return (
    <form>
      <DropDownMenu holidays={holidays} />
      {holidays && (
        <p>
          Von: {holidays.startDate} bis: {holidays.endDate}
        </p>
      )}
    </form>
  );
}
