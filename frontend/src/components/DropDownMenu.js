import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useHolidays from "../hooks/useHolidays";
function MenuItems() {
  const { holidays } = useHolidays();
  return holidays.map((holiday) => (
    <option name={"holidaysselect"} value={holiday.name}>
      {holiday.name}
    </option>
  ));
}

export default function DropDownMenu() {
  return (
    <div>
      <select name={"holidaysselect"} id={"holidaysselect"}>
        <MenuItems />
      </select>
    </div>
  );
}
