import { ProfileForm } from "../components/ProfileForm";
import styled from "styled-components/macro";
import useChildren from "../hooks/useChildren";
import useHolidays from "../hooks/useHolidays";
import Child from "../components/Child";

export default function ProfilePage({ user }) {
  const { children } = useChildren();
  const { holidays } = useHolidays();
  return (
    <Wrapper>
      {holidays && <ProfileForm holidays={holidays} />}
      <h3>Kinder</h3>
      {children && children.map((child) => <Child child={child} />)}
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
