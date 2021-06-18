import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";

export default function Holidays({ holidays }) {
  let history = useHistory();
  function handleClick() {
    history.push("/details");
  }
  return (
    <Holiday>
      <div>
        <h1>{holidays.name}</h1>
      </div>
      <h3>{holidays.startDate}</h3>
      <h3>{holidays.endDate}</h3>
      <button onClick={handleClick}>Details</button>
    </Holiday>
  );
}

const Holiday = styled.section`
  display: flex;
  flex-direction: column;
  background: darkgrey;
  border: black thin;
  border-radius: 25px;
`;
