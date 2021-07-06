import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    width: "100vw",
    height: "100vh",
  },
  formControl: {
    margin: 20,
    minWidth: 120,
  },
  button: {
    alignSelf: "center",
    width: "auto",
  },
});

export default function HolidayBookingForm({ holidays, children, token }) {
  let history = useHistory();
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [value, setValue] = useState({
    holidayName: "",
  });
  const [selectedChild, setSelectedChild] = useState({
    childArray: [],
  });

  const mutation = useMutation(() =>
    axios
      .post(
        `/api/holidays/booked`,
        {
          holidayName: value.holidayName,
          startDate: date.startDate,
          endDate: date.endDate,
          selectedChild: selectedChild.childArray,
        },
        config
      )
      .catch((error) => console.error(error.message))
  );

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function handleDateChange(event) {
    let addDate = new Date(event.target.value);
    setDate({ ...date, [event.target.name]: addDate });
  }

  function handleCheckBoxChange(event) {
    let selectedChildArray = selectedChild.childArray;
    if (event.target.checked) {
      selectedChildArray = [...selectedChildArray, event.target.value];
    } else {
      selectedChildArray = selectedChildArray.filter(
        (child) => child !== event.target.value
      );
    }
    setSelectedChild({ childArray: selectedChildArray });
  }

  function handleValidation() {
    let formIsValid = true;
    let errors = {};
    if (!date.startDate) {
      formIsValid = false;
      errors["startDate"] = "Startdatum darf nicht leer sein";
    }
    if (date.startDate.getTime() > date.endDate.getTime()) {
      formIsValid = false;
      errors["startDate"] = "Startdatum darf nicht nach dem Enddatum sein";
    }
    if (!date.endDate) {
      formIsValid = false;
      errors["endDate"] = "Startdatum darf nicht leer sein";
    }
    if (date.endDate.getTime() < date.startDate.getTime()) {
      formIsValid = false;
      errors["endDate"] = "Enddatum darf nicht vor dem Startdatum sein";
    }

    setErrors(errors);
    return formIsValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation()) {
      mutation.mutate(value);
      if (mutation.isSuccess) {
        history.push("../mybookings");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id={"selectHolidays"}>Ferien</InputLabel>
        <Select
          required={true}
          labelId={"selectHolidays"}
          value={value.holidayName}
          name={"holidayName"}
          onChange={handleChange}
        >
          {holidays.map((holiday) => (
            <MenuItem key={holiday.name} value={holiday.name}>
              {holiday.name}
            </MenuItem>
          ))}
        </Select>
        <span style={{ color: "red" }}>{errors["holidayName"]}</span>
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          required={true}
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
      <FormControl className={classes.formControl}>
        <TextField
          required={true}
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
      <FormControl className={classes.formControl}>
        <FormLabel component="legend">Kinder auswählen</FormLabel>
        <FormGroup>
          {children.map((child) => (
            <FormControlLabel
              key={child.firstName}
              control={
                <Checkbox
                  onChange={handleCheckBoxChange}
                  name={child.firstName}
                  value={child.firstName}
                  required={true}
                />
              }
              label={child.firstName}
              labelPlacement={"end"}
            />
          ))}
        </FormGroup>
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
  );
}
