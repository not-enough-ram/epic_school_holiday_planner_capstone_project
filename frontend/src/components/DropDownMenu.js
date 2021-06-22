import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useHolidays from "../hooks/useHolidays";
function MenuItems() {
  const { holidays } = useHolidays();
  return holidays.map((holiday) => (
    <option value={holiday.name}>{holiday.name}</option>
  ));
}

export default function DropDownMenu() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4">
          <select name={"Ferien"} id={"ferien"}>
            <MenuItems />
          </select>
        </div>
        <div className="col-md-4" />
      </div>
    </div>
  );
}
