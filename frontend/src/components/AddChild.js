import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React from "react";
import styled from "styled-components/macro";

const validSchema = Yup.object().shape({
  firstName: Yup.string().required("Benötigt"),
  lastName: Yup.string().required("Benötigt"),
});

const initialValues = {
  childFirstName: "",
  childLastName: "",
  childNotes: "",
};

const handleSubmit = (values) => {
  alert(JSON.stringify(values, null, 2));
};

const addChildForm = ({ errors, touched, handleSubmit }) => (
  <Form>
    <label>
      Vorname:
      <Field name={"childFirstName"} type={"text"} />
      {errors.childFirstName && touched.childFirstName ? (
        <div>{errors.childFirstName}</div>
      ) : null}
    </label>
    <label>
      {" "}
      Nachname:
      <Field name={"childLastName"} type={"text"} />
      {errors.childLastName && touched.childLastName ? (
        <div>{errors.childLastName}</div>
      ) : null}
    </label>
    <label>
      Notizen
      <Field name={"childNotes"} type={"text"} />
      {errors.childNotes && touched.childNotes ? (
        <div>{errors.childNotes}</div>
      ) : null}
    </label>
    <input type={"submit"} value={"Submit"} onSubmit={handleSubmit} />
  </Form>
);

export const AddChild = () => (
  <Wrapper>
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validSchema}
      children={addChildForm}
    />
  </Wrapper>
);
const Wrapper = styled.section`
  padding: 10px;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin: 10px;
`;
