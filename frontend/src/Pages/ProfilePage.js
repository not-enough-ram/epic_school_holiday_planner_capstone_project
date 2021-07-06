import ProfileForm from "../components/ProfileForm";
import styled from "styled-components/macro";
import useChildren from "../hooks/useChildren";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useUser from "../hooks/useUser";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { children } = useChildren();
  const { token } = useContext(AuthContext);
  const { user } = useUser();

  return (
    <Wrapper>
      {user && <ProfileForm token={token} user={user} />}
      {children && <h3>Kinder</h3>}
      {children &&
        children.map((child) => (
          <section>
            <p>
              {child?.firstName}
              {child?.schoolClass}
            </p>
          </section>
        ))}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={"/children"}
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
