import styled from "styled-components/macro";

export default function Child({ child }) {
  return (
    <Wrapper>
      <p>Vorname: {child?.firstName}</p>
      <p>Nachname: {child?.lastName}</p>
      <p>Klasse: {child?.schoolClass}</p>
      <p>Anmerkungen: {child?.notes}</p>
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
