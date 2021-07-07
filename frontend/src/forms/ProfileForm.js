import { useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "react-query";

const useStyles = makeStyles({
  root: {
    justifyContent: "space-between",
    display: "flex",
    flexFlow: "column",
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    alignSelf: "center",
    width: "auto",
  },
  success: {
    alignSelf: "center",
    color: "green",
  },
});

export default function ProfileForm({ token, user }) {
    const classes = useStyles();
    const [value, setValue] = useState({
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone,
      notes: user?.notes,
    });

    const [errors, setErrors] = useState({});

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
      if (!value.phone) {
        formIsValid = false;
        errors["phone"] = "Telefonnummer darf nicht leer sein";
      }
      setErrors(errors);
      return formIsValid;
    }

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const mutation = useMutation(() =>
      axios
        .post(
          `/api/user/update`,
          {
            firstName: value.firstName,
            lastName: value.lastName,
            notes: value.notes,
            phone: value.phone,
          },
          config
        )
        .catch((error) => console.error(error.message))
    );

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
      event.preventDefault();
      if (handleValidation()) {
          mutation.mutate(value);
      }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root} color={"primary"}>
      <TextField
        variant={"filled"}
        name={"firstName"}
        onChange={handleChange}
        value={value.firstName}
        helperText={"Vorname"}
        placeholder={user?.firstName}
        required={false}
        type={"text"}
      />
      <span style={{ color: "red" }}>{errors["firstName"]}</span>
      <TextField
        variant={"filled"}
        name={"lastName"}
        onChange={handleChange}
        value={value.lastName}
        placeholder={user?.lastName}
        helperText={"Nachname"}
        required={false}
        type={"text"}
      />
      <span style={{ color: "red" }}>{errors["lastName"]}</span>
      <TextField
        variant={"filled"}
        name={"phone"}
        onChange={handleChange}
        value={value.phone}
        placeholder={user?.phone}
        helperText={"Telefonnummer"}
        required={false}
        type={"text"}
      />
      <span style={{ color: "red" }}>{errors["phone"]}</span>
      <TextField
        variant={"filled"}
        name={"notes"}
        onChange={handleChange}
        value={value.notes}
        placeholder={user?.notes}
        helperText={"Anmerkungen"}
        required={false}
        type={"text"}
      />
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
          Profil aktualisiert
        </span>
      )}
    </form>
  );
}
