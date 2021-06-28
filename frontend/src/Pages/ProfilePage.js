import useUser from "../hooks/useUser";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import styled from "styled-components/macro";
import AddChildForm from "../components/AddChildForm";

export default function ProfilePage() {
  const user = useUser;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const { token } = useContext(AuthContext);
  return (
    <Wrapper>
      <h1>Profil</h1>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastname: user.lastName,
          phone: user.phone,
          notes: user.notes,
        }}
        onSubmit={async (values) => {
          await sleep(500);
          await axios.put("api/test/user/update", values, {
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
            <Field
              name={"firstName"}
              type={"text"}
              placeholder={user.firstName}
            />
            <label>Nachname: </label>
            <Field
              name={"lastName"}
              type={"text"}
              placeholder={user.lastName}
            />
            <label>Telefonnummer: </label>
            <Field name={"phone"} type={"text"} placeholder={user.phone} />
            <label>Notizen: </label>
            <Field name={"notes"} type={"text"} placeholder={user.notes} />
            <button type={"submit"}>Submit</button>
          </Form>
        )}
      </Formik>
      <AddChildForm />
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 10px;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin: 10px;
`;
