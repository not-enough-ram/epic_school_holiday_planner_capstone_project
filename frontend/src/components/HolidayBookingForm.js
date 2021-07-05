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
  const classes = useStyles();
  const [value, setValue] = useState({
    holidayName: "",
    startDate: "",
    endDate: "",
  });
  const [selectedChild, setSelectedChild] = useState({
    childArray: [],
  });

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

  function handleSubmit(event) {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post(
        `/api/holidays/booked`,
        {
          holidayName: value.holidayName,
          startDate: value.startDate,
          endDate: value.endDate,
          selectedChild: selectedChild.childArray,
        },
        config
      )
      .catch((error) => console.error(error.message));
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id={"selectHolidays"}>Ferien</InputLabel>
        <Select
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
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          name="startDate"
          label="Start"
          type="date"
          value={value.startDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          name="endDate"
          label="Ende"
          type="date"
          value={value.endDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
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
                />
              }
              label={child.firstName}
              labelPlacement={"right"}
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
