import { useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
});

export default function ProfileForm({ token, user }) {
  const classes = useStyles();
  const [value, setValue] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    notes: user?.notes,
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
        `/api/user/`,
        {
          firstName: value.firstName,
          lastName: value.lastName,
          notes: value.notes,
          phone: value.phone,
        },
        config
      )
      .catch((error) => console.error(error.message));
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
        required={true}
        type={"text"}
        className={classes.textfield}
      />
      <TextField
        variant={"filled"}
        name={"lastName"}
        onChange={handleChange}
        value={value.lastName}
        placeholder={user?.lastName}
        helperText={"Nachname"}
        required={true}
        type={"text"}
        className={classes.textfield}
      />
      <TextField
        variant={"filled"}
        name={"phone"}
        onChange={handleChange}
        value={value.phone}
        placeholder={user?.phone}
        helperText={"Telefonnummer"}
        required={true}
        type={"text"}
        className={classes.textfield}
      />
      <TextField
        variant={"filled"}
        name={"notes"}
        onChange={handleChange}
        value={value.notes}
        placeholder={user?.notes}
        helperText={"Anmerkungen"}
        required={true}
        type={"text"}
        className={classes.textfield}
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
    </form>
  );
}
