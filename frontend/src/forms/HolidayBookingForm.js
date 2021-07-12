import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
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
  formcontrol: {
    margin: 20,
  },
});

export default function HolidayBookingForm({ holidays, children, token }) {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  let history = useHistory();
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [value, setValue] = useState({
    holidayName: "",
  });
  const [selectedChild, setSelectedChild] = useState({
    childArray: [],
  });
  useEffect(() => {
    const chosenHolidays = holidays.filter(
      (holiday) => holiday?.name === value?.holidayName
    );
    setMinDate(chosenHolidays[0]?.startDate);
    setMaxDate(chosenHolidays[0]?.endDate);
  }, [value?.holidayName, maxDate, minDate, holidays]);

  const mutation = useMutation(() =>
    axios
      .post(
        `/api/holidays/booked`,
        {
          holidayName: value.holidayName,
          startDate: selectedStartDate,
          endDate: selectedEndDate,
          selectedChild: selectedChild.childArray,
        },
        config
      )
      .catch((error) => console.error(error.message))
  );

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
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
    if (!selectedStartDate) {
      formIsValid = false;
      errors["startDate"] = "Startdatum darf nicht leer sein";
    }
    if (selectedStartDate.getTime() > selectedEndDate.getTime()) {
      formIsValid = false;
      errors["startDate"] = "Keine Reisen in die Vergangenheit möglich.";
    }
    if (!selectedEndDate) {
      formIsValid = false;
      errors["endDate"] = "Startdatum darf nicht leer sein";
    }
    if (selectedEndDate.getTime() < selectedStartDate.getTime()) {
      formIsValid = false;
      errors["endDate"] = "Das Enddatum liegt vor dem Startdatum.";
    }

    setErrors(errors);
    return formIsValid;
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
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormControl className={classes.formcontrol}>
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
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        className={classes.formcontrol}
      >
        <DatePicker
          className={classes.formcontrol}
          label={"Start"}
          name={"startDate"}
          onChange={handleStartDateChange}
          value={selectedStartDate}
          disablePast
          animateYearScrolling
          format={"dd/MM/yyyy"}
          minDate={minDate}
          maxDate={maxDate}
          initialFocusedDate={minDate}
          minDateMessage={"Bitte ein Datum innerhalb der Ferien wählen"}
          maxDateMessage={"Bitte ein Datum innerhalb der Ferien wählen"}
          autoOk
        />
        <DatePicker
          className={classes.formcontrol}
          label={"Ende"}
          name={"endDate"}
          onChange={handleEndDateChange}
          value={selectedEndDate}
          disablePast
          animateYearScrolling
          format={"dd/MM/yyyy"}
          minDate={minDate}
          maxDate={maxDate}
          initialFocusedDate={minDate}
          minDateMessage={"Bitte ein Datum innerhalb der Ferien wählen"}
          maxDateMessage={"Bitte ein Datum innerhalb der Ferien wählen"}
          autoOk
        />
        <span style={{ color: "red" }}>{errors["endDate"]}</span>
      </MuiPickersUtilsProvider>
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
      {mutation.isSuccess && (
        <span style={{ color: "green", alignSelf: "center" }}>
          Buchung erfolgreich
        </span>
      )}
    </form>
  );
}
