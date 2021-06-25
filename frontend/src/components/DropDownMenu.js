import React from "react";
import { Field } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

function MenuItems({ holidays }) {
  return (
    <>
      {holidays.map((holiday) => (
        <option value={holiday.name}>{holiday.name}</option>
      ))}
    </>
  );
}

export default function DropDownMenu({ holidays }) {
  return (
    <div>
      <Field
        as={"select"}
        name={"holidaysselectmenu"}
        id={"holidaysselectmenu"}
      >
        <option value={""} label={"Bitte wähle die gewünschten Ferien..."} />
        <MenuItems holidays={holidays} />
      </Field>
    </div>
  );
}
