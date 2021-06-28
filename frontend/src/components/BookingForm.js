import DropDownMenu from "./DropDownMenu";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import * as Yup from "yup";

export default function BookingForm({ holidays }) {
  const { token } = useContext(AuthContext);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const validation = Yup.object().shape({
    holidayselectmenu: Yup.string().required("Required"),
  });
  return (
    <div>
      {holidays && (
        <Formik
          initialValues={{
            startDate: "",
            endDate: "",
            holidaysselectmenu: "",
            checked: [],
          }}
          onSubmit={async (values) => {
            await sleep(500);
            await axios.post("api/holidays/booked", values, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values }) => (
            <Form>
              <label htmlFor={"holidaysselectmenu"}>
                Bitte wähle die gewünschten Ferien
              </label>
              <DropDownMenu name={"holidaysselectmenu"} holidays={holidays} />
              <label>Startdatum *</label>
              <Field
                type="date"
                id={"startDate"}
                name="startDate"
                value={holidays.startDate}
              />
              <label>Enddatum *</label>
              <Field
                type="date"
                id={"endDate"}
                name="endDate"
                value={holidays.endDate}
              />
              <div id="checkbox-group">Kinder auswählen</div>
              <div role="group" aria-labelledby="checkbox-group">
                <label>
                  <Field type="checkbox" name="checked" value="One" />
                  One
                </label>
                <label>
                  <Field type="checkbox" name="checked" value="Two" />
                  Two
                </label>
                <label>
                  <Field type="checkbox" name="checked" value="Three" />
                  Three
                </label>
              </div>
              <input type="submit" name="submit" value="Senden" />
              <small>Felder markiert mit * sind Pflichtfelder.</small>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
