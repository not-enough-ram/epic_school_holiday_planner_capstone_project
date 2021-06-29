import React, { useState } from "react";

export default function HolidayBookingForm({ holidays }) {
  const [value, setValue] = useState({
    holidayName: "",
    startDate: "",
    endDate: "",
    children: [],
  });

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    console.log({ ...value });
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Bitte wähle die gewünschten Ferien
        <select name={"holidayName"}>
          <option value={""} label={"Bitte wähle die gewünschten Ferien..."} />
          {holidays.map((holiday) => (
            <option
              id={holiday.name}
              value={holiday.name}
              label={holiday.name}
            />
          ))}
        </select>
      </label>
      <label>
        Startdatum
        <input
          type="date"
          name="startDate"
          value={holidays.startDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Enddatum
        <input
          type="date"
          name="endDate"
          value={holidays.endDate}
          onChange={handleChange}
        />
      </label>
      <div id="checkbox-group">Kinder auswählen</div>
      <div role="group" aria-labelledby="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="children"
            value="One"
            onChange={handleChange}
          />
          One
        </label>
        <label>
          <input
            type="checkbox"
            name="children"
            value="One"
            onChange={handleChange}
          />
          Two
        </label>
        <label>
          <input
            type="checkbox"
            name="children"
            value="Three"
            onChange={handleChange}
          />
          Three
        </label>
      </div>
      <input type={"submit"} value={"Abschicken"} />
    </form>
  );
}
