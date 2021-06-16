import styled from "styled-components/macro";
import { Button, Text, TextInput } from "@primer/components";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function LogInPage() {
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
    /*login(credentials);*/
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <Text fontFamily={"Arial"}>
            Username
            <TextInput
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </Text>

          <Text fontFamily={"Arial"}>
            Password
            <TextInput
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder={"password"}
            />
          </Text>
          <Button>Login</Button>
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

  *:not(img):not(a) {
    margin: 10px;
  }
`;
