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

    function handleSubmit(event) {
      event.preventDefault();
      mutation.mutate(value);
      if (mutation.isSuccess) {
        history.push("/profile");
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
