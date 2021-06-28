import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components/macro";

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  notes: "",
};

const validSchema = Yup.object().shape({
  firstName: Yup.string().required("Benötigt"),
  lastName: Yup.string().required("Benötigt"),
  phone: Yup.string().required("Benötigt"),
});

const handleSubmit = (values) => {
  alert(JSON.stringify(values, null, 2));
};

const ProfileForm = ({ errors, touched, handleSubmit }) => (
  <Form>
    <label>
      Vorname:
      <Field name={"firstName"} type={"text"} />
      {errors.firstName && touched.firstName ? (
        <div>{errors.firstName}</div>
      ) : null}
    </label>
    <label>
      {" "}
      Nachname:
      <Field name={"lastName"} type={"text"} />
      {errors.lastName && touched.lastName ? (
        <div>{errors.lastName}</div>
      ) : null}
    </label>
    <label>
      {" "}
      Telefon:
      <Field name={"phone"} type={"text"} />
      {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
    </label>
    <label>
      Notizen
      <Field name={"notes"} type={"text"} />
      {errors.notes && touched.notes ? <div>{errors.notes}</div> : null}
    </label>
    <input type={"submit"} value={"Submit"} onSubmit={handleSubmit} />
  </Form>
);

export const ProfileBookingForm = () => (
  <Wrapper>
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validSchema}
      children={ProfileForm}
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
