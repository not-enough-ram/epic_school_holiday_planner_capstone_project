import React, { useState } from "react";
import axios from "axios";

export default function HolidayBookingForm({ holidays, children, token }) {
  const [value, setValue] = useState({
    holidayName: "",
    startDate: "",
    endDate: "",
  });
  const [selectedChild, setSelectedChild] = useState({
    childArray: [],
  });

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function handleCheckBoxChange(event) {
    let selectedChildArray = selectedChild.childArray;
    if (event.target.checked) {
      selectedChildArray = [...selectedChildArray, event.target.value];
    } else {
      selectedChildArray = selectedChildArray.filter(
        (child) => child !== event.target.value
      );
    }
    setSelectedChild({ childArray: selectedChildArray });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post(
        `/api/holidays/booked`,
        {
          holidayName: value.holidayName,
          startDate: value.startDate,
          endDate: value.endDate,
          selectedChild: selectedChild.childArray,
        },
        config
      )
      .catch((error) => console.error(error.message));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Bitte wähle die gewünschten Ferien
        <select
          name={"holidayName"}
          value={value.holidayName}
          onChange={handleChange}
        >
          <option value={""} label={"Bitte wähle die gewünschten Ferien..."} />
          {holidays.map((holiday) => (
            <option
              key={holiday.name}
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
          value={value.startDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Enddatum
        <input
          type="date"
          name="endDate"
          value={value.endDate}
          onChange={handleChange}
        />
      </label>
      <section className={"checkBoxes"}>
        <div id="checkbox-group">Kinder auswählen</div>
        {children.map((child) => (
          <label key={child.firstName}>
            <input
              type={"checkbox"}
              value={child.firstName}
              name={child.firstName}
              onChange={handleCheckBoxChange}
            />
            {child.firstName}
          </label>
        ))}
      </section>
      <input type={"submit"} value={"Abschicken"} />
    </form>
  );
}
