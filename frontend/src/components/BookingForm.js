import DropDownMenu from "./DropDownMenu";
import { Formik, Field, Form } from "formik";

export default function BookingForm({ holidays, startDate, endDate }) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  return (
    <div>
      <Formik
        initialValues={{
          startDate: "",
          endDate: "",
          holidaysselect: "",
          checked: [],
        }}
        onSubmit={async (values) => {
          await sleep(500);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <label htmlFor={"holidaysselect"}>
              Bitte wähle die gewünschten Ferien
            </label>
            <DropDownMenu holidays={holidays} name={"holidaysselect"} />
            <label>Startdatum *</label>
            <Field
              type="date"
              id={"startDate"}
              name="startDate"
              value={startDate}
            />
            <label>Enddatum *</label>
            <Field type="date" id={"endDate"} name="endDate" value={endDate} />
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
    </div>
  );
}
