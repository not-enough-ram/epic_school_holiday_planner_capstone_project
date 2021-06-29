import DropDownMenu from "./DropDownMenu";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import React, { useContext } from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";

const initialValues = {
  firstName: "",
  lastName: "",
  children: [],
  holidayName: "",
};

const validSchema = Yup.object().shape({
  startDate: Yup.string().required("Benötigt"),
  endDate: Yup.string().required("Benötigt"),
  holidayName: Yup.string().required("Benötigt"),
});

const BookingForm = ({ errors, touched, handleSubmit, holidays }) => (
  <Form>
    <label>
      Bitte wähle die gewünschten Ferien
      <DropDownMenu name={"holidayName"} holidays={holidays} />
      {errors.holidayName && touched.holidayName ? (
        <div>{errors.holidayName}</div>
      ) : null}
    </label>
    <label>
      Startdatum
      <Field
        type="date"
        id={"startDate"}
        name="startDate"
        value={holidays.startDate}
      />
      {errors.startDate && touched.startDate ? (
        <div>{errors.startDate}</div>
      ) : null}
    </label>
    <label>
      Enddatum
      <Field
        type="date"
        id={"endDate"}
        name="endDate"
        value={holidays.endDate}
      />
      {errors.endDate && touched.endDate ? <div>{errors.endDate}</div> : null}
    </label>
    <div id="checkbox-group">Kinder auswählen</div>
    <div role="group" aria-labelledby="checkbox-group">
      <label>
        <Field type="checkbox" name="children" value="One" />
        One
      </label>
      <label>
        <Field type="checkbox" name="children" value="One" />
        Two
      </label>
      <label>
        <Field type="checkbox" name="children" value="Three" />
        Three
      </label>
    </div>
    <input type="submit" name="submit" value="Senden" onSubmit={handleSubmit} />
  </Form>
);

export function HolidayBookingForm(holidays) {
  const { token } = useContext(AuthContext);

  const handleSubmit = (values) => {
    setTimeout(() => {
      axios.post("api/holidays", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }, 500);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validSchema}
        children={BookingForm}
        holidays={holidays}
      />
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
