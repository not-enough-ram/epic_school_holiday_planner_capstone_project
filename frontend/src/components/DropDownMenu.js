import React from "react";
import { Field } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";


export default function DropDownMenu({ holidays }) {
  return (
      <Field
        as={"select"}
        name={"holidaysselectmenu"}
        id={"holidaysselectmenu"}
      >
        <option value={""} label={"Bitte wähle die gewünschten Ferien..."} />
        {holidays.map((holiday) => (
              <option value={holiday.name}>{holiday.name}</option>
          ))}
      </Field>
  );
}
