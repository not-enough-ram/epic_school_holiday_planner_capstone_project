import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function AddChild() {
  const { token } = useContext(AuthContext);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastname: "",
        notes: "",
      }}
      onSubmit={async (values) => {
        await sleep(500);
        await axios.put("api/test/children", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <label>Vorname: </label>
          <Field name={"firstName"} type={"text"} placeholder={"Vorname"} />
          <label>Nachname: </label>
          <Field name={"lastName"} type={"text"} placeholder={"Nachname"} />
          <label>Notizen: </label>
          <Field name={"notes"} type={"text"} placeholder={"Notizen"} />
        </Form>
      )}
    </Formik>
  );
}
