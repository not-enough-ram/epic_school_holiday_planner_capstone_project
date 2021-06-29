import { useState } from "react";

export default function ProfileForm(children) {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    notes: "",
  });

  function handleChange(event) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    console.log({ ...value });
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Vorname:
        <input name={"firstName"} type={"text"} onChange={handleChange} />
      </label>
      <label>
        Nachname:
        <input name={"lastName"} type={"text"} onChange={handleChange} />
      </label>
      <label>
        Telefon:
        <input name={"phone"} type={"text"} onChange={handleChange} />
      </label>
      <label>
        Notizen
        <input name={"notes"} type={"text"} onChange={handleChange} />
      </label>
      <input type={"submit"} value={"Submit"} onSubmit={handleSubmit} />
    </form>
  );
}
