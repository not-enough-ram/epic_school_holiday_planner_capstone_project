import { useState } from "react";

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function DatePicker(startDateOfHolidays, endDateOfHolidays) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
      includeDates={[new Date(), addDays(new Date(), endDateOfHolidays)]}
      placeholderText="Wählen Sie Start- und Enddatum"
    />
  );
}
