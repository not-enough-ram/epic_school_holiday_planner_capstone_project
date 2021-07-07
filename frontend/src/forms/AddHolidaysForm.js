import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FormControl, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    height: "100vh",
    padding: 10,
  },
  button: {
    alignSelf: "center",
    width: "auto",
    marginTop: 20,
  },
  textfield: {
    width: "100%",
    marginBottom: 10,
  },
  datefield: {
    width: "auto",
    marginBottom: 10,
  },
  addholidays: {
    marginBottom: 10,
  },
});

export default function AddHolidaysForm() {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const mutation = useMutation(() =>
    axios
      .post(
        `/api/holidays`,
        {
          name: value.name + " " + selectedDate.startDate.getFullYear(),
          startDate: selectedDate.startDate,
          endDate: selectedDate.endDate,
        },
        config
      )
      .catch((error) => console.error(error.message))
  );

  let history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const classes = useStyles();
  const [value, setValue] = useState({
    holidayName: "",
  });
  const [errors, setErrors] = useState({});

  function handleValidation() {
    let formIsValid = true;
    let errors = {};
    if (!value.name) {
      formIsValid = false;
      errors["name"] = "Name darf nicht leer sein";
    }
    if (value.name !== "undefined") {
      if (!value.name.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Nur Buchstaben";
      }
    }
    if (!selectedDate.startDate) {
      formIsValid = false;
      errors["startDate"] = "Startdatum darf nicht leer sein";
    }
    if (selectedDate.startDate.getTime() > selectedDate.endDate.getTime()) {
      formIsValid = false;
      errors["startDate"] = "Keine Reisen in die Vergangenheit möglich.";
    }
    if (!selectedDate.endDate) {
      formIsValid = false;
      errors["endDate"] = "Startdatum darf nicht leer sein";
    }
    if (selectedDate.endDate.getTime() < selectedDate.startDate.getTime()) {
      formIsValid = false;
      errors["endDate"] = "Das Enddatum liegt vor dem Startdatum.";
    }
    setErrors(errors);
    return formIsValid;
  }

  function handleDateChange(event) {
    let date = new Date(event.target.value);
    setSelectedDate({ ...selectedDate, [event.target.name]: date });
  }

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation()) {
      mutation.mutate(value);
      if (mutation.isSuccess) {
        history.push("/mybookings");
      }
    }
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className={classes.root} color={"primary"}>
        <Typography className={classes.addholidays} variant={"h5"}>
          Neue Ferien anlegen
        </Typography>
        <TextField
          variant={"filled"}
          name={"name"}
          onChange={handleChange}
          value={value.name}
          helperText={"Name der Ferien"}
          required={true}
          type={"text"}
          className={classes.textfield}
        />
        <span style={{ color: "red" }}>{errors["name"]}</span>
        <FormControl>
          <TextField
            className={classes.datefield}
            name="startDate"
            label="Start"
            type="date"
            value={value.startDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <span style={{ color: "red" }}>{errors["startDate"]}</span>
        </FormControl>
        <FormControl>
          <TextField
            className={classes.datefield}
            name="endDate"
            label="Ende"
            type="date"
            value={value.endDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <span style={{ color: "red" }}>{errors["endDate"]}</span>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type={"submit"}
          value={"Submit"}
          onSubmit={handleSubmit}
          startIcon={<SendIcon />}
          className={classes.button}
        >
          Absenden
        </Button>
      </form>
    </Fragment>
  );
}
