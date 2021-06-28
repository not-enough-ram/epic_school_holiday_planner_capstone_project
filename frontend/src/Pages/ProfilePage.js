import { ProfileBookingForm } from "../components/ProfileBookingForm";
import styled from "styled-components/macro";
import ChildrenList from "../components/ChildrenList";
import { useHistory } from "react-router-dom";
import useChildren from "../hooks/useChildren";

export default function ProfilePage({ user }) {
  const history = useHistory();
  const { children } = useChildren();
  return (
    <Wrapper>
      <ProfileBookingForm />
      <h3>Kinder</h3>
      {children && <ChildrenList children={children} />}
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
