import styled from "styled-components/macro";
import { Button } from "@primer/components";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { FormControl, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    justifyContent: "space-between",
    display: "flex",
    flexFlow: "column",
  },
  textfield: {
    width: "87vw",
  },
  button: {
    alignSelf: "center",
    width: "auto",
  },
});

export default function LogInPage() {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(credentials);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <FormControl>
            <TextField
              variant={"filled"}
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              helperText="Username"
              required={true}
            />
          </FormControl>
          <TextField
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            helperText={"password"}
            variant={"filled"}
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
        </Wrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  height: inherit;

  *:not(img):not(a) {
    margin: 10px;
  }
`;
