import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FormControl, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

export default function AddHolidaysPage() {
  const { token } = useContext(AuthContext);
  const [selectedDate, handleDateChange] = useState(new Date(2000));
  const classes = useStyles();
  const [value, setValue] = useState({
    holidayName: "",
    startDate: "",
    endDate: "",
  });

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
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
        `/api/holidays`,
        {
          name: value.name,
          startDate: value.startDate,
          endDate: value.endDate,
        },
        config
      )
      .catch((error) => console.error(error.message));
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            views={["year"]}
            value={selectedDate}
            onChange={handleDateChange}
            animateYearScrolling
          />
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl}>
          <TextField
            className={classes.datefield}
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
            className={classes.datefield}
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
