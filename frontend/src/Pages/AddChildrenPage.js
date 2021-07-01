import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column",
    margin: "10px 20px 10px 20px",
    height: "inherit",
    width: "inherit",
  },
  textfield: {
    width: "inherit",
  },
  button: {
    alignSelf: "center",
    width: "auto",
    marginTop: "20px",
  },
  label: {
    width: "inherit",
  },
});

export default function AddChildrenPage() {
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    schoolClass: "",
    notes: "",
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
        `/api/user/children`,
        {
          firstName: value.firstName,
          lastName: value.lastName,
          notes: value.notes,
          schoolClass: value.schoolClass,
        },
        config
      )
      .catch((error) => console.error(error.message));
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root} color={"primary"}>
      <label className={classes.label}>
        <TextField
          variant={"filled"}
          name={"firstName"}
          onChange={handleChange}
          value={value.firstName}
          helperText={"Vorname"}
          required={true}
          type={"text"}
          className={classes.textfield}
        />
      </label>
      <label className={classes.label}>
        <TextField
          variant={"filled"}
          name={"lastName"}
          onChange={handleChange}
          value={value.lastName}
          helperText={"Nachname"}
          required={true}
          type={"text"}
          className={classes.textfield}
        />
      </label>
      <label className={classes.label}>
        <TextField
          variant={"filled"}
          name={"schoolClass"}
          onChange={handleChange}
          value={value.schoolClass}
          helperText={"Klasse"}
          required={true}
          type={"text"}
          className={classes.textfield}
        />
      </label>
      <label className={classes.label}>
        <TextField
          variant={"filled"}
          name={"notes"}
          onChange={handleChange}
          value={value.notes}
          helperText={"Anmerkungen"}
          required={true}
          type={"text"}
          className={classes.textfield}
        />
      </label>
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
