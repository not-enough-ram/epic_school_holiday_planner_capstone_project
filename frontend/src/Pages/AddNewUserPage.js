import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import AuthContext from "../context/AuthContext";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

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
    marginTop: 20,
  },
});

export default function AddNewUserPage() {
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const [value, setValue] = useState({
    login: "",
    password: "",
    role: "",
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
        `/api/user/appuser`,
        {
          login: value.login,
          password: value.password,
          role: value.role,
        },
        config
      )
      .catch((error) => console.error(error.message));
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root} color={"primary"}>
      <TextField
        variant={"filled"}
        name={"login"}
        onChange={handleChange}
        value={value.login}
        helperText={"Login"}
        placeholder={"Login"}
        required={true}
        type={"text"}
        className={classes.textfield}
      />
      <TextField
        variant={"filled"}
        name={"password"}
        onChange={handleChange}
        value={value.password}
        placeholder={"Passwort"}
        helperText={"Passwort"}
        required={true}
        type={"text"}
        className={classes.textfield}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id={"selectRole"}>Rolle</InputLabel>
        <Select
          labelId={"selectRole"}
          value={value.role}
          name={"role"}
          onChange={handleChange}
        >
          <MenuItem value={"user"}>Elternteil</MenuItem>
          <MenuItem value={"admin"}>Ferienkoordinator</MenuItem>
        </Select>
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
