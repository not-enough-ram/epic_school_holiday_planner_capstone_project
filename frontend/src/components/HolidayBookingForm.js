import React, { useState } from "react";

export default function HolidayBookingForm({ holidays, children }) {
  const [checkedState, setCheckedState] = useState(
    new Array(children.length).fill(false)
  );
  const [value, setValue] = useState({
    holidayName: "",
    startDate: "",
    endDate: "",
  });
  const [child, setChild] = useState({
    childArray: [],
  });

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function handleCheckBoxChange(event) {
    let oldChildArray = child.childArray;
    if (event.target.checked) {
      oldChildArray = [...oldChildArray, event.target.value];
    } else {
      oldChildArray.filter((child) => child.firstName !== event.target.value);
    }
    setChild({ childArray: oldChildArray });
  }

  function handleSubmit(event) {
    console.log({ ...value, ...child });
    event.preventDefault();
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
        {children.map((child, index) => (
          <label>
            <input
              id={`custom-checkbox-${index}`}
              key={child.firstName}
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
