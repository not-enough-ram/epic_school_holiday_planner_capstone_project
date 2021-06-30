import ProfileForm from "../components/ProfileForm";
import styled from "styled-components/macro";
import useChildren from "../hooks/useChildren";
import Child from "../components/Child";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useUser from "../hooks/useUser";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useHistory } from "react-router-dom";

export default function ProfilePage() {
  const { children } = useChildren();
  const { token } = useContext(AuthContext);
  const { user } = useUser();
  const { history } = useHistory();
  return (
    <Wrapper>
      {user && <ProfileForm token={token} user={user} />}
      {children && <h3>Kinder</h3>}
      {children && children.map((child) => <Child child={child} />)}
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/child")}
        endIcon={<AddCircleOutlineIcon />}
      >
        Kind hinzufügen
      </Button>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  padding: 10px;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin: 10px;
`;
