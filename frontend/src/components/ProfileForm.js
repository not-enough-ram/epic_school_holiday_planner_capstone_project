import { useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";

export default function ProfileForm(token, user) {
  const [value, setValue] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    notes: user.notes,
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
      .put(
        `/api/user/update`,
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
    <form onSubmit={handleSubmit}>
      <label>
        <TextField
          variant={"filled"}
          name={"firstName"}
          onChange={handleChange}
          value={user.firstName}
          helperText={"Vorname"}
          required={true}
          type={"text"}
        />
        {/*Vorname:*/}
        {/*<input*/}
        {/*  name={"firstName"}*/}
        {/*  type={"text"}*/}
        {/*  onChange={handleChange}*/}
        {/*  value={user.firstName}*/}
        {/*  placeholder={user.firstName}*/}
        {/*/>*/}
      </label>
      <label>
        Nachname:
        <input
          name={"lastName"}
          type={"text"}
          onChange={handleChange}
          value={user.lastName}
          placeholder={user.lastName}
        />
      </label>
      <label>
        Telefon:
        <input
          name={"phone"}
          type={"text"}
          onChange={handleChange}
          value={user.phone}
          placeholder={user.phone}
        />
      </label>
      <label>
        Notizen
        <input
          name={"notes"}
          type={"text"}
          onChange={handleChange}
          value={user.notes}
          placeholder={user.notes}
        />
      </label>
      <input type={"submit"} value={"Submit"} onSubmit={handleSubmit} />
    </form>
  );
}
