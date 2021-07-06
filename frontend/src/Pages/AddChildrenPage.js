import { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexFlow: "column",
    margin: "10px 20px 10px 20px",
    height: "inherit",
    width: "inherit",
  },
  textfield: {
    width: "100%",
  },
  button: {
    alignSelf: "center",
    width: "auto",
    marginTop: "20px",
  },
  label: {
    width: "inherit",
  },
  addchild: {
    marginBottom: 15,
  },
});

export default function AddChildrenPage() {
  let history = useHistory();
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    schoolClass: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const mutation = useMutation(() =>
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
      .catch((error) => console.error(error.message))
  );

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function handleValidation() {
    let formIsValid = true;
    let errors = {};
    if (!value.firstName) {
      formIsValid = false;
      errors["firstName"] = "Vorname darf nicht leer sein";
    }
    if (value.firstName !== "undefined") {
      if (!value.firstName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["firstName"] = "Nur Buchstaben";
      }
    }
    if (!value.lastName) {
      formIsValid = false;
      errors["lastName"] = "Vorname darf nicht leer sein";
    }
    if (value.lastName !== "undefined") {
      if (!value.lastName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["lastName"] = "Nur Buchstaben";
      }
    }
    if (!value.schoolClass) {
      formIsValid = false;
      errors["schoolClass"] = "Vorname darf nicht leer sein";
    }
    if (value.schoolClass.length !== 2) {
      formIsValid = false;
      errors["schoolClass"] = "Falsche Klasse angegeben";
    }
    if (value.schoolClass !== "undefined") {
      if (!value.schoolClass.match(/^[1-4a-d]+$/)) {
        formIsValid = false;
        errors["schoolClass"] = "Falsche Klasse angegeben";
      }
    }
    setErrors(errors);
    return formIsValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation()) {
      mutation.mutate(value);
      if (mutation.isSuccess) {
        history.push("/profile");
      }
    } else {
      alert("Das Formular beinhaltet Fehler" + errors);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root} color={"primary"}>
      <Typography variant={"h5"} className={classes.addchild}>
        Kind hinzufügen
      </Typography>
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
        <span style={{ color: "red" }}>{errors["firstName"]}</span>
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
        <span style={{ color: "red" }}>{errors["lastName"]}</span>
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
        <span style={{ color: "red" }}>{errors["schoolClass"]}</span>
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
